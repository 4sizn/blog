---
name: blog-release-note
description: "4sizn 블로그(content/blog/releases/)의 릴리즈 노트를 12섹션 골격에 맞춰 쓴다. 릴리즈 노트·새 버전 글·릴리즈 글·스토어 등록 글·마일스톤 기록 요청에 사용한다. GitHub 릴리즈가 있는 프로젝트, App Store 앱처럼 릴리즈가 없는 프로젝트, 버전이 없는 마일스톤을 모두 다룬다. 문장은 humanize-korean 을 반드시 거치고 이미지를 최소 1장 넣는다. sync-releases.mjs 가 만든 draft 초안을 완성하는 일도 이 skill 이다."
version: 1.0.0
---

# 블로그 릴리즈 노트 쓰기

## 언제 쓰는가

- "릴리즈 노트 써줘", "새 버전 글 써줘", "vX.Y 글 올려줘"
- "스토어 등록 글", "마일스톤 기록" — 버전이 없는 작업도 이 골격을 쓴다
- `content/blog/releases/` 의 `draft: true` 초안을 완성할 때
- 릴리즈 노트를 고칠 때 (기존 글 보정 포함)

**해당 없음**: 회고·에세이·읽은 글 정리는 `content/blog/log/`·`content/blog/dev/` 로 가며 이 골격을 쓰지 않는다.

## 절차

순서를 바꾸지 않는다. 특히 **이미지를 글보다 먼저** 확보한다 — 글을 먼저 쓰면 이미지를 끼워 맞추게 되고,
그 순서가 내용과 무관한 장식 이미지를 만든다.

### 1. 초안이 있는지 본다

```bash
ls content/blog/releases/ | tail -5
grep -l "draft: true" content/blog/releases/*.md
```

초안이 있으면 그 파일에서 시작한다. `<!-- SOURCE(원본 릴리즈 본문 …) -->` 주석이 근거다.
초안이 없으면 2로 간다.

### 2. 사실을 확보한다

입력원은 세 가지다. 위에서 얻으면 아래는 보지 않는다.

| 입력원 | 명령 | 실패하면 |
|--------|------|----------|
| GitHub 릴리즈 | `gh release view <tag> --repo 4sizn/<repo> --json body,publishedAt,assets` | 다음 입력원으로 |
| 로컬·원격 커밋 | `git log <prev-tag>..<tag> --pretty='%s'` / `gh api repos/4sizn/<repo>/compare/<a>...<b>` | 근거 없는 섹션은 **생략**한다 |
| 마일스톤 (버전 없음) | 작업한 커밋과 산출물 파일을 직접 확인 | 무엇을 기록할지 사용자에게 묻는다 |

**날짜**는 `published_at` → 태그 커밋 날짜 → 소스 마지막 업데이트 일자(`gh repo view --json pushedAt`) 순으로 정한다.
어느 단계에서 얻었는지 기록한다.

없는 사실은 만들지 않는다. 릴리즈 본문이 한 줄이면 한 줄로 쓰고, 모르면 섹션을 지운다.

### 3. 이미지를 확보한다 (글보다 먼저)

최소 1장이 필수다. 확보 방법은 프로젝트 유형마다 다르다 → `references/images.md`

### 4. 골격에 맞춰 초고를 쓴다

12섹션 구조와 각 섹션의 판정 기준 → `references/skeleton.md`

필수는 네 개뿐이다 — **도입부 · ✨ What's New · 🔜 What's Next · 🚀 Try it** (+ Hero Image).
나머지는 내용이 없으면 **섹션째 지운다.** 헤딩만 남기지 않는다.

### 5. humanize-korean 으로 윤문한다 — 건너뛸 수 없다

```
Skill(skill: "humanize-korean:humanize-korean")
```

정밀이 필요하면 "정밀 모드"로 heavy 경로를 고정한다. 등급이 C/D면 heavy로 재실행한다.
**스킬을 못 찾으면 작업을 멈추고 사용자에게 알린다.** 직접 다듬어 우회하지 않는다.

절차와 사실 대조 방법 → `references/writing.md`

### 6. 사실을 대조한다

윤문 결과와 초고를 나란히 놓고 **버전·날짜·수치·기능명·링크**가 한 글자도 달라지지 않았는지 본다.
어긋난 문장은 초고를 쓴다. 전체를 다시 윤문하지 않는다.

### 7. 게시 준비

- `<!-- SOURCE(...) -->` 주석 삭제
- `<!-- TODO(...) -->` 마커 전부 해소
- `<!-- 선택: ... -->` 안내 주석 중 쓰지 않은 것 삭제
- frontmatter `description` 을 이번 릴리즈에 맞게 고친다 (저장소 설명이 그대로 들어와 있다)
- `draft: true` 줄 삭제

### 8. 프로젝트 페이지를 갱신한다

`content/projects/<slug>.md` 의 최신 릴리즈 줄과 링크를 고친다.

```markdown
- 최신 릴리즈: v1.2.4 (2026-02-24)
- [릴리즈 노트](../blog/releases/2026-02-24-ai-config-monitor-1.2.4)
```

### 9. 검증한다 — 여기까지 해야 끝이다

```bash
grep -c "TODO(" <파일>          # → 0
grep -c "{{" <파일>             # → 0
grep -c "SOURCE(원본" <파일>    # → 0
grep -cE "^- (feat|fix|chore|refactor|perf|docs|style)(\(.+\))?:" <파일>   # → 0
npx quartz build                # 오류 없음
grep -c "internal broken" public/blog/releases/<파일>.html                # → 0
```

그리고 **눈으로 본다.** 로컬 서버를 띄워 다크·라이트 양쪽에서 이미지가 뜨는지 확인하고,
사용자에게 스크린샷을 보여준다. 경로만 알려주는 것은 완료가 아니다.

```bash
npx quartz build --serve --port 8080
```

## 금지

- 커밋 메시지를 본문에 붙여넣지 않는다. `feat:`·`fix:`·`chore:` 가 남으면 실패다
- 커밋 제목을 `###` 기능 제목으로 승격하지 않는다. 그게 옛 글들을 changelog로 만든 원인이다
- 없는 동기를 지어내지 않는다. "사용자 경험을 혁신적으로 개선했습니다" 같은 문장은 근거가 없으면 쓰지 않는다
- 작성자 섹션을 두지 않는다
- 본문에 `#`(h1)을 쓰지 않는다. frontmatter `title` 이 h1으로 렌더된다
- 검증 로그·로컬 절대 경로를 본문에 남기지 않는다 (`/Users/...` 는 게시되면 개인 경로 노출이다)
- `🔜 What's Next` 를 지키지 못할 약속으로 채우지 않는다. 미정이면 "미정"이라고 쓴다

## 참고 파일

| 파일 | 언제 읽는가 |
|------|-----------|
| `references/skeleton.md` | 4단계 — 섹션 구성·마일스톤 변형·frontmatter |
| `references/images.md` | 3단계 — 유형별 이미지 확보·변환·용량 |
| `references/writing.md` | 5·6단계 — humanize 경유·사실 대조·문체 |

골격의 근거는 `docs/sdlc/requirements.md` 부록 A다. 골격을 바꾸려면 그 문서를 먼저 고친다.
