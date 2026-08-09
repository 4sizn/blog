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

// 최신 릴리즈 가져오기
async function getLatestRelease(owner, repo) {
  try {
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/releases/latest`;
    return await fetchGitHubAPI(url);
  } catch (error) {
    log(`⚠️  ${owner}/${repo}의 릴리즈를 가져올 수 없습니다: ${error.message}`, 'yellow');
    return null;
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

// 릴리즈 노트를 섹션별로 파싱
function parseReleaseNotes(body) {
  const sections = {
    features: [],
    improvements: [],
    bugfixes: [],
    breaking: [],
    others: [],
  };

  if (!body) return sections;

  const lines = body.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // 마크다운 리스트 아이템 파싱
    const listMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (listMatch) {
      const content = listMatch[1];

      // Conventional Commits 스타일 감지
      if (content.match(/^feat(\(.+?\))?:/i)) {
        sections.features.push(content.replace(/^feat(\(.+?\))?:\s*/i, ''));
      } else if (content.match(/^fix(\(.+?\))?:/i)) {
        sections.bugfixes.push(content.replace(/^fix(\(.+?\))?:\s*/i, ''));
      } else if (content.match(/^(chore|refactor|perf|style)(\(.+?\))?:/i)) {
        sections.improvements.push(content.replace(/^(chore|refactor|perf|style)(\(.+?\))?:\s*/i, ''));
      } else if (content.match(/BREAKING|breaking change/i)) {
        sections.breaking.push(content);
      } else {
        sections.others.push(content);
      }
    }
  }

  return sections;
}

// 섹션 생성 헬퍼
function buildSection(title, emoji, items) {
  if (items.length === 0) return '';
  let section = `### ${emoji} ${title}\n\n`;
  items.forEach(item => {
    section += `- ${item}\n`;
  });
  return section + '\n';
}

// 마크다운 파일 생성 (템플릿 기반)
async function generateMarkdown(release, repoInfo) {
  const { owner, repo, displayName, category, description } = repoInfo;
  const { tag_name, name, body, published_at, html_url, author } = release;

  const version = tag_name.replace(/^v/, '');
  const date = new Date(published_at).toISOString().split('T')[0];
  const datePrefix = date; // Keep YYYY-MM-DD format for URL safety
  const sections = parseReleaseNotes(body);

  // 템플릿 파일 읽기
  const templatePath = join(ROOT_DIR, 'content', 'templates', 'new_releases.md');
  let template = await readFile(templatePath, 'utf-8');

  // 섹션 생성
  const featuresSection = buildSection('새로운 기능', '✨', sections.features);
  const improvementsSection = buildSection('개선사항', '🔧', sections.improvements);
  const bugfixesSection = buildSection('버그 수정', '🐛', sections.bugfixes);
  const breakingSection = buildSection('Breaking Changes', '⚠️', sections.breaking);
  const othersSection = buildSection('기타 변경사항', '📝', sections.others);

  // 원본 릴리즈 노트 (파싱된 항목이 없는 경우)
  let rawBodySection = '';
  if (sections.features.length === 0 &&
      sections.improvements.length === 0 &&
      sections.bugfixes.length === 0 &&
      sections.breaking.length === 0 &&
      sections.others.length === 0) {
    rawBodySection = `### 📝 변경사항\n\n${body || '자세한 변경사항은 GitHub 릴리즈 페이지를 참조하세요.'}\n\n`;
  }

  // 작성자 섹션
  let authorSection = '';
  if (author) {
    authorSection = `### 👥 릴리즈 작성자\n\n- [@${author.login}](${author.html_url})\n\n`;
  }

  // Placeholder 치환
  const replacements = {
    '{{DATE_PREFIX}}': datePrefix,
    '{{DISPLAY_NAME}}': displayName,
    '{{TAG_NAME}}': tag_name,
    '{{VERSION}}': version,
    '{{DESCRIPTION}}': description || `${displayName}의 새로운 버전`,
    '{{CATEGORY}}': category,
    '{{REPO}}': repo,
    '{{PERMALINK}}': `/blog/releases/${datePrefix}-${repo}-${version}`,
    '{{DATE}}': date,
    '{{FEATURES_SECTION}}': featuresSection,
    '{{IMPROVEMENTS_SECTION}}': improvementsSection,
    '{{BUGFIXES_SECTION}}': bugfixesSection,
    '{{BREAKING_SECTION}}': breakingSection,
    '{{OTHERS_SECTION}}': othersSection,
    '{{RAW_BODY_SECTION}}': rawBodySection,
    '{{RELEASE_URL}}': html_url,
    '{{REPO_URL}}': `https://github.com/${owner}/${repo}`,
    '{{ISSUES_URL}}': `https://github.com/${owner}/${repo}/issues`,
    '{{AUTHOR_SECTION}}': authorSection,
  };

  // 템플릿 치환
  Object.keys(replacements).forEach(placeholder => {
    template = template.replace(new RegExp(placeholder, 'g'), replacements[placeholder]);
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

    // 최신 릴리즈 가져오기
    const release = await getLatestRelease(owner, repo);
    if (!release) {
      continue;
    }

    const version = release.tag_name.replace(/^v/, '');
    const releaseDate = new Date(release.published_at).toISOString().split('T')[0];
    const datePrefix = releaseDate; // Keep YYYY-MM-DD format for URL safety
    const filename = `${datePrefix}-${repo}-${version}.md`;
    const filepath = join(ROOT_DIR, 'content', 'blog', 'releases', filename);

    // 이미 존재하는지 확인
    const exists = await fileExists(filepath);
    if (exists) {
      log(`✓ ${displayName} ${release.tag_name} - 이미 존재함`, 'green');
      continue;
    }

    // 마크다운 생성
    log(`✨ ${displayName} ${release.tag_name} - 새 릴리즈 발견!`, 'yellow');
    const markdown = await generateMarkdown(release, repoInfo);

    // 파일 저장
    await writeFile(filepath, markdown, 'utf-8');
    log(`✓ 파일 생성: ${filename}`, 'green');

    results.push({
      repo: `${owner}/${repo}`,
      version: release.tag_name,
      filename,
    });
  }

  // 결과 출력
  log('\n' + '='.repeat(50), 'blue');
  if (results.length === 0) {
    log('📝 새로운 릴리즈가 없습니다.', 'yellow');
  } else {
    log(`✅ ${results.length}개의 새로운 릴리즈를 추가했습니다:`, 'green');
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
