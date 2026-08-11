#!/usr/bin/env node

import { readFile, writeFile, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

// GitHub API 기본 설정
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// 저장소당 확인할 릴리즈 수 (DD-11). 이보다 많이 밀리면 workflow_dispatch 로 수동 실행한다
const RELEASES_PER_PAGE = 10;

// 색상 출력 헬퍼
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// GitHub API 호출
async function fetchGitHubAPI(url) {
  const headers = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// 릴리즈 목록 가져오기 — 오래된 것부터 처리하도록 오름차순 정렬해 돌려준다.
// /releases/latest 단건만 보면 같은 날 두 번 릴리즈한 경우 앞엣것이 영구히 누락된다 (FR-12).
async function fetchReleases(owner, repo) {
  try {
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/releases?per_page=${RELEASES_PER_PAGE}`;
    const releases = await fetchGitHubAPI(url);

    return releases
      .filter(release => !release.draft && !release.prerelease)
      .sort((a, b) => new Date(a.published_at) - new Date(b.published_at));
  } catch (error) {
    log(`⚠️  ${owner}/${repo}의 릴리즈를 가져올 수 없습니다: ${error.message}`, 'yellow');
    return [];
  }
}

// 파일 존재 확인
async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

// 릴리즈 노트를 골격 섹션별로 파싱 (DD-09 매핑)
//   feat                        → whats-new 후보
//   fix                         → Bug Fixes
//   perf refactor build deps    → Under the Hood  (내부 변경)
//   chore style docs 그 외      → Improvements    (체감되는 개선)
function parseReleaseNotes(body) {
  const sections = {
    features: [],
    improvements: [],
    bugfixes: [],
    underHood: [],
    breaking: [],
  };

  if (!body) return sections;

  // 검증 로그 섹션은 릴리즈 노트 재료가 아니다. 여기 항목에는 빌드 결과나 로컬 절대 경로가
  // 섞여 있어 그대로 본문에 넣으면 개인 경로가 게시된다. 원문은 SOURCE 주석에 남는다
  const SKIP_SECTION = /^#{1,6}\s*(verification|testing|test plan|검증|테스트)/i;
  let skipping = false;

  for (const line of body.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith('#')) {
      skipping = SKIP_SECTION.test(trimmed);
      continue;
    }
    if (skipping) continue;

    const listMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (!listMatch) continue;

    const content = listMatch[1];
    const strip = (re) => content.replace(re, '');

    if (content.match(/BREAKING|breaking change/i)) {
      sections.breaking.push(content);
    } else if (content.match(/^feat(\(.+?\))?:/i)) {
      sections.features.push(strip(/^feat(\(.+?\))?:\s*/i));
    } else if (content.match(/^fix(\(.+?\))?:/i)) {
      sections.bugfixes.push(strip(/^fix(\(.+?\))?:\s*/i));
    } else if (content.match(/^(perf|refactor|build|deps)(\(.+?\))?:/i)) {
      sections.underHood.push(strip(/^(perf|refactor|build|deps)(\(.+?\))?:\s*/i));
    } else if (content.match(/^(chore|style|docs)(\(.+?\))?:/i)) {
      sections.improvements.push(strip(/^(chore|style|docs)(\(.+?\))?:\s*/i));
    } else {
      sections.improvements.push(content);
    }
  }

  return sections;
}

// 골격 섹션 생성. 비었으면 섹션째 만들지 않는다 (헤딩만 남기지 않는다)
function buildSection(heading, items) {
  if (items.length === 0) return '';
  return `## ${heading}\n\n` + items.map(item => `- ${item}`).join('\n') + '\n';
}

// What's New 는 커밋 문장을 본문에 그대로 두지 않는다 (DD-07).
// 뽑아낸 항목은 TODO 주석 안에 후보로만 남기고, 사람이 ### 제목 + 서사로 다시 쓴다.
function buildWhatsNew(items) {
  const candidates = items.length
    ? items.map(item => `       - ${item}`).join('\n')
    : '       (릴리즈 본문에서 뽑을 항목이 없었다. 커밋 로그를 직접 확인한다)';

  return [
    `## ✨ What's New`,
    ``,
    `<!-- TODO(whats-new): 기능마다 ### 제목을 달고 "왜 만들었는지 / 무엇이 달라졌는지"를 쓴다.`,
    `     각 기능에 이미지를 붙인다. 아래 후보를 그대로 목록으로 두면 안 된다.`,
    candidates,
    `-->`,
  ].join('\n') + '\n';
}

// 사람이 채울 자리 — 게시 전에 TODO( 가 0건이어야 한다
function buildTodo(kind, guide) {
  return `<!-- TODO(${kind}): ${guide} -->`;
}

// 근거 보존 (DD-02). 게시 전 삭제한다. 본문에 --> 가 있으면 주석이 깨지므로 끊어준다
function buildSourceComment(body) {
  if (!body) return '';
  const safe = body.replace(/--+>/g, '-- >');
  return [
    `<!-- SOURCE(원본 릴리즈 본문 — 다듬을 때 근거로 쓰고 게시 전 삭제한다)`,
    safe.trim(),
    `-->`,
  ].join('\n');
}

// 마크다운 파일 생성 (템플릿 기반)
async function generateMarkdown(release, repoInfo) {
  const { owner, repo, displayName, category, description } = repoInfo;
  const { tag_name, body, published_at, html_url } = release;

  const version = tag_name.replace(/^v/, '');
  const date = new Date(published_at).toISOString().split('T')[0];
  const datePrefix = date; // Keep YYYY-MM-DD format for URL safety
  const sections = parseReleaseNotes(body);

  // 템플릿 파일 읽기
  const templatePath = join(ROOT_DIR, 'content', 'templates', 'new_releases.md');
  let template = await readFile(templatePath, 'utf-8');

  // 템플릿 안내 주석은 초안에 남기지 않는다
  template = template.replace(/^<!-- TEMPLATE-DOC[\s\S]*?-->\n/, '');

  // Placeholder 치환 (골격 19개)
  const replacements = {
    '{{DATE_PREFIX}}': datePrefix,
    '{{DISPLAY_NAME}}': displayName,
    '{{TAG_NAME}}': tag_name,
    '{{VERSION}}': version,
    '{{DESCRIPTION}}': description || `${displayName} ${tag_name} 릴리즈`,
    '{{CATEGORY}}': category,
    '{{REPO}}': repo,
    '{{DATE}}': date,
    '{{RELEASE_URL}}': html_url,
    '{{REPO_URL}}': `https://github.com/${owner}/${repo}`,

    '{{BREAKING_SECTION}}': buildSection('⚠️ Breaking Changes', sections.breaking),
    '{{WHATS_NEW_SECTION}}': buildWhatsNew(sections.features),
    '{{IMPROVEMENTS_SECTION}}': buildSection('🔧 Improvements', sections.improvements),
    '{{BUGFIXES_SECTION}}': buildSection('🐛 Bug Fixes', sections.bugfixes),
    '{{UNDER_HOOD_SECTION}}': buildSection('⚙️ Under the Hood', sections.underHood),

    '{{HERO_TODO}}': buildTodo(
      'hero',
      '이번 릴리즈를 한 장으로 보여주는 이미지. 확보 방법은 skill 의 references/images.md',
    ),
    '{{INTRO_TODO}}': buildTodo(
      'intro',
      `"${tag_name} 을 공개합니다. 이번 버전에서는 ___ 에 집중했습니다." 2~3문장으로 쓴다`,
    ),
    '{{WHATS_NEXT_TODO}}': buildTodo(
      'next',
      "## 🔜 What's Next 섹션을 만들고 다음 방향을 쓴다. 미정이면 \"미정\"이라고 쓴다",
    ),

    '{{SOURCE_BODY_COMMENT}}': buildSourceComment(body),
  };

  // 템플릿 치환 — 키 길이 내림차순으로 돌린다 (DD-03).
  // {{DATE}} 가 {{DATE_PREFIX}} 의 접두라서 짧은 키가 먼저 치환되면 뒤가 깨진다.
  // { 는 정규식 수량자 문자이므로 RegExp 대신 split/join 을 쓴다.
  Object.keys(replacements)
    .sort((a, b) => b.length - a.length)
    .forEach(placeholder => {
      template = template.split(placeholder).join(replacements[placeholder]);
    });

  // 빈 섹션 제거 (연속된 빈 줄)
  template = template.replace(/\n{3,}/g, '\n\n');

  return template;
}

// 메인 함수
async function main() {
  log('🚀 GitHub 릴리즈 동기화 시작...', 'blue');

  // 설정 파일 읽기
  const configPath = join(ROOT_DIR, '.github', 'tracked-repos.json');
  const configContent = await readFile(configPath, 'utf-8');
  const config = JSON.parse(configContent);

  const { repositories } = config;
  log(`📋 ${repositories.length}개의 저장소를 추적합니다.`, 'blue');

  const results = [];

  for (const repoInfo of repositories) {
    const { owner, repo, displayName } = repoInfo;
    log(`\n🔍 ${owner}/${repo} 확인 중...`, 'blue');

    // 미동기화 릴리즈를 전부 확인한다 (오래된 것부터)
    const releases = await fetchReleases(owner, repo);
    if (releases.length === 0) {
      continue;
    }

    for (const release of releases) {
      const version = release.tag_name.replace(/^v/, '');
      const releaseDate = new Date(release.published_at).toISOString().split('T')[0];
      const datePrefix = releaseDate; // Keep YYYY-MM-DD format for URL safety
      const filename = `${datePrefix}-${repo}-${version}.md`;
      const filepath = join(ROOT_DIR, 'content', 'blog', 'releases', filename);

      // 이미 있으면 덮어쓰지 않는다 — 사람이 다듬은 글을 초안으로 되돌리면 안 된다
      if (await fileExists(filepath)) {
        log(`✓ ${displayName} ${release.tag_name} - 이미 존재함`, 'green');
        continue;
      }

      // 초안 생성 (draft: true — 사람이 다듬어야 게시된다)
      log(`✨ ${displayName} ${release.tag_name} - 새 릴리즈 발견!`, 'yellow');
      const markdown = await generateMarkdown(release, repoInfo);

      await writeFile(filepath, markdown, 'utf-8');
      log(`✓ 초안 생성: ${filename}`, 'green');

      results.push({
        repo: `${owner}/${repo}`,
        version: release.tag_name,
        filename,
      });
    }
  }

  // 결과 출력
  log('\n' + '='.repeat(50), 'blue');
  if (results.length === 0) {
    log('📝 새로운 릴리즈가 없습니다.', 'yellow');
  } else {
    log(`✅ ${results.length}개의 초안을 만들었습니다 (draft: true — 다듬어야 게시됩니다):`, 'green');
    results.forEach(({ repo, version, filename }) => {
      log(`   - ${repo} ${version} → ${filename}`, 'green');
    });
  }
  log('='.repeat(50), 'blue');

  // GitHub Actions 환경에서 출력 설정
  if (process.env.GITHUB_OUTPUT) {
    const output = `new_releases=${results.length}\n`;
    await writeFile(process.env.GITHUB_OUTPUT, output, { flag: 'a' });
  }
}

// 실행
main().catch(error => {
  log(`❌ 오류 발생: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
