---
title: 블로그 릴리즈 노트 골격 + 작성 skill 구현 기록
stage: implementation
status: draft
created: 2026-08-11
updated: 2026-08-11
repo: 4sizn-blog
branch: main
---

# 블로그 릴리즈 노트 골격 + 작성 skill 구현 기록

> 근거: `design.md` (`status: approved`, 2026-08-11)
> 실행 방식: `agent-skills:incremental-implementation` — 얇은 슬라이스마다 구현 → 검증 → 커밋

## 1. 착수 게이트 통과 기록

| 게이트 | 확인 | 결과 |
|--------|------|------|
| A — SDLC 단계 | 2026-08-11 | `design.md` `status: approved` (approved_by: 4sizn) |
| B — 프로젝트 로컬 | 2026-08-11 | 루트 `CLAUDE.md` 확인. 코드 수정 착수 게이트가 정의돼 있지 않다. 검증 명령은 `npx quartz build`, 커밋 규칙은 conventional prefix |
| 세션 격리 | 2026-08-11 | 요구 없음. `main` 에서 직접 작업한다 (이 저장소의 기존 관례 — git log 전부 main 직접 커밋) |

**RVS 2.0의 Redmine 착수 8단계는 해당 없다.** 이 저장소는 이슈 트래커를 쓰지 않는다 (`requirements.md` 8절).

## 2. 작업 환경

| 항목 | 값 |
|------|-----|
| 저장소 | `/Users/hsshin-rsupport/Documents/lotus/4sizn-blog` |
| 브랜치 | `main` (워크트리 없음) |
| 검증 | `npx quartz build` · `grep -c "internal broken"` · Chrome DevTools MCP 눈검증 |
| push | **보류** — 사용자 지시로 구현 완료 후 한 번에 push (2026-08-11) |

## 3. 구현 단위별 진행

### S1 — 골격 확정 (3h 예상)

| WBS | 내용 | 상태 | 커밋 | 비고 |
|-----|------|------|------|------|
| W-05 | 워크플로 경로 3곳 수정 | **완료** | `594ca32` | 로컬 재현으로 `has_changes=true` 확인 |
| W-01 | 골격 템플릿 교체 | **완료** | `218b539` | placeholder 19개 (설계 18 + `{{INTRO_TODO}}`) |
| W-02 | 기존 11건 매핑 실측 | **완료** | — (검증 작업, 산출물은 본 문서 §3-1) | 매핑 불가 0건 |

### S2 — 파이프라인 (4.5h 예상)

| WBS | 내용 | 상태 | 커밋 | 비고 |
|-----|------|------|------|------|
| W-03 | placeholder 계약 갱신 | **완료** | `8351668` | 템플릿 19개 == 스크립트 19개, 폐기 6개 잔존 0 |
| W-04 | draft 초안화 | **완료** | `8351668` | 초안 `draft: true`, 빌드 filtered out 10 → 12 |
| W-15 | 다중 릴리즈 조회 | **완료** | `8351668` | 누락 2건(v1.2.1·v1.2.3) 초안 회수 |
| W-14 | `CLAUDE.md` 정정 | **완료** | `78a2993` | 경로 4곳 + 디렉토리 트리 + "자동 게시" 기술 |

### S3 — skill (6.5h 예상)

| WBS | 내용 | 상태 | 커밋 | 비고 |
|-----|------|------|------|------|
| W-06 | skill 골자 | **완료** | `a700954` | `SKILL.md` 128줄 — 발동 조건·9단계 절차·금지·검증 |
| W-07 | 입력원 3종 + 마일스톤 규칙 | **완료** | `a700954` | SKILL.md §2 표 + `references/skeleton.md` 마일스톤 변형 |
| W-08 | 부속 규칙 3종 | **완료** | `a700954` | `references/images.md`(이미지) · `writing.md`(문체·금지) · SKILL.md §8(프로젝트 페이지) |
| W-17 | humanize 경유 강제 | **완료** | `a700954` | SKILL.md §5·§6 + `writing.md` + `.gitignore` `_workspace/` |
| W-09 | 발동 테스트 | **부분** | — | 세션 등록은 확인. 신규 세션 3회 발동은 다음 세션에서 (아래 §6) |

### S4~S5 — 사용자 지시로 이번 회차에서 중단

2026-08-11 사용자 판단: **S3까지 끊는다.** 도구(skill)가 완성됐으므로 소급 보정 9건은
앞으로 필요할 때 이 skill 로 처리한다.

| WBS | 내용 | 상태 |
|-----|------|------|
| W-18~W-20 | 이미지 확보 (6h) | **보류** — 다음 회차 |
| W-10~W-12, W-16, W-13 | 글 9건 + 전체 검증 (9h) | **보류** — 다음 회차 |

**진행: 11 / 20** (S4·S5의 9건은 보류)

### 3-1. W-02 매핑 실측 결과 (FR-01 판정)

기존 11건에서 뽑은 섹션 헤딩 57개를 골격의 필수∪선택 집합에 매핑했다.

| 기존 섹션 | 등장 | 골격 배치 |
|-----------|------|----------|
| ✨ 새로운 기능 | 4건 | `whats-new` |
| ✨ 주요 기능 | 3건 | `whats-new` 또는 `what-it-is` (글마다 판정 — 앱 3건은 제품 소개이므로 `what-it-is`) |
| 🆕 이번 버전 | 2건 | `whats-new` |
| 🔧 개선사항 | 5건 | `improvements` |
| 🐛 버그 수정 | 4건 | `bugfixes` |
| 📝 기타 변경사항 | 6건 | `improvements` 또는 `under-hood` 로 분해 |
| 💻 지원 플랫폼 | 3건 | `platforms` |
| 📜 버전 히스토리 | 1건 | `version-history` |
| 📦 설치 / 다운로드 | 3건 | `try-it` |
| 🔗 관련 링크 | 8건 | `try-it` |
| 👥 릴리즈 작성자 | 11건 | 제거 (D-04) |
| 마일스톤 고유 섹션 5개 | 1건 | `intro`·`whats-new`·`under-hood`·`whats-next` (A-4 변형) |

- **매핑 불가: 0건**
- **골격 밖 타깃: 0건**
- ⚠️ Breaking Changes는 기존 글에 한 번도 쓰이지 않았다 (템플릿에만 존재했다). 골격에는 선택 섹션으로 유지한다

검증 스크립트: `scratchpad/map_check.py` (재현용, 저장소에는 넣지 않았다 — 계획 범위 밖).
W-13 전체 검증에서 다시 돌릴 값어치가 있으면 그때 `scripts/` 로 승격할지 판단한다.

## 4. 변경 파일

| 경로 | 성격 | 요구사항 |
|------|------|---------|
| `.github/workflows/sync-releases.yml` | 수정 (경로 3곳) | FR-06 |
| `content/templates/new_releases.md` | 교체 | FR-01, FR-04 |
| `scripts/sync-releases.mjs` | 수정 (조회·파싱·치환·초안) | FR-04, FR-05, FR-12 |
| `content/blog/releases/2026-02-23-ai-config-monitor-1.2.1.md` | 추가 (초안) | FR-12 |
| `content/blog/releases/2026-02-24-ai-config-monitor-1.2.3.md` | 추가 (초안) | FR-12 |
| `CLAUDE.md` | 수정 (경로·트리·흐름) | FR-11 |
| `.claude/skills/blog-release-note/SKILL.md` | 추가 | FR-02, FR-03, FR-09, FR-13 |
| `.claude/skills/blog-release-note/references/skeleton.md` | 추가 | FR-01, FR-08 |
| `.claude/skills/blog-release-note/references/images.md` | 추가 | FR-10, NFR-03 |
| `.claude/skills/blog-release-note/references/writing.md` | 추가 | FR-13, NFR-01 |
| `.gitignore` | 수정 (`_workspace/` 추가, `.claude/skills/` 패턴 축소) | FR-13 ④ |

## 5. 설계 대비 변경

| 설계 | 실제 | 이유 | 문서 반영 |
|------|------|------|----------|
| §5-1 신규 placeholder **8개** (합 18개) | **9개** (합 19개) — `{{INTRO_TODO}}` 추가 | 도입부는 골격의 **필수 섹션**인데 자동으로 채울 수 없다. 마커가 없으면 초안이 필수 섹션 없이 나온다 | `design.md` §5-1 갱신 완료 |
| 릴리즈 본문 전체를 파싱 | 검증 로그 섹션(`Verification` 등)은 **건너뛴다** | `ai-config-monitor` v1.2.1 본문의 `## Verification` 항목이 `Improvements` 로 흡수돼 `bun run build passed` 와 로컬 절대 경로가 초안 본문에 실렸다. 게시되면 개인 경로가 노출된다 | `design.md` DD-13 추가 완료 |
| skill을 `.claude/skills/` 에 두면 git 추적된다는 전제 (D-05) | `.gitignore:25` 가 `.claude/skills/` 전체를 무시하고 있었다. 패턴을 `.claude/skills/*` + `!.claude/skills/blog-release-note/` 로 축소했다 | 디렉토리 자체를 제외하면 하위 negation이 동작하지 않는다. `npx skills add` 로 받은 외부 스킬(hallmark 등)은 계속 무시되어야 하므로 전체 해제는 하지 않았다 | 설계 변경 아님 — 전제가 사실과 달랐던 것 |

두 건 모두 `design.md` 승인 후 변경 이력에 기록했다. 그 밖에 설계와 다르게 구현한 것은 없다.

## 6. 검증

실제로 실행한 명령과 결과만 적는다.

**W-05 — 워크플로 경로**

```bash
grep -n "content/releases" .github/workflows/sync-releases.yml
# → 없음 (수정 전 3곳)

# 수정 전 동작 재현
git status --porcelain content/releases/
# → warning: 'content/releases/' 디렉터리를 열 수 없습니다 / 빈 출력 / exit 0
#   즉 has_changes 는 항상 false

# 수정 후 동작
touch content/blog/releases/__probe.md
[ -z "$(git status --porcelain content/blog/releases/)" ] && echo false || echo true
# → true   (probe 삭제 완료)
```

**W-01 — 골격 템플릿**

```bash
grep -o "{{[A-Z_]*}}" content/templates/new_releases.md | sort -u | wc -l
# → 19

npx quartz build
# → Found 51 input files / Filtered out 10 files / Emitted 249 files. 오류 없음

ls public/templates
# → No such file or directory
#   quartz.config.ts:20 ignorePatterns 에 "templates" 가 있어 템플릿은 빌드에서 제외된다.
#   placeholder·TODO 마커가 사이트에 노출되지 않음을 확인
```

`Filtered out 10 files` 의 정체도 확인했다 — `draft: true` 인 기존 파일 10건이며,
`Plugin.RemoveDrafts()` (`quartz.config.ts:85`)가 걸러낸다. FR-04는 이 필터를 그대로 쓴다.

**W-02 — 매핑 실측**

```bash
python3 scratchpad/map_check.py
# → 검사 파일 11건 / 매핑 불가 0건 / 골격 밖 타깃 0건 / exit=0
```

**W-03 · W-15 — placeholder 계약과 다중 릴리즈 조회**

```bash
node --check scripts/sync-releases.mjs        # → 문법 OK
node scripts/sync-releases.mjs
# → 4sizn Blog v1.0.0 / v1.0.1 이미 존재함
#   Screen Saver Extension v1.0.4 / v1.0.6 이미 존재함
#   AI Config Monitor v1.2.0 이미 존재함
#   AI Config Monitor v1.2.1 → 초안 생성      ← 회수
#   AI Config Monitor v1.2.2 이미 존재함
#   AI Config Monitor v1.2.3 → 초안 생성      ← 회수
#   AI Config Monitor v1.2.4 이미 존재함
#   Garden Eel Cove v1.6.0 이미 존재함
#   → 2개의 초안을 만들었습니다

# 계약 일치 (FR-05 ①)
템플릿 키 19개 == 스크립트 키 19개, diff 차이 없음
# 폐기 키 잔존 (AUTHOR_SECTION·ISSUES_URL·PERMALINK·RAW_BODY_SECTION·OTHERS_SECTION·FEATURES_SECTION)
# → 스크립트 0건 / 템플릿 0건

# 초안 내용 (FR-05 ②, FR-04 ①)
grep -c "{{" <초안>            # → 0   (미치환 없음)
grep -m1 "^draft:" <초안>      # → draft: true
grep -c "TEMPLATE-DOC" <초안>  # → 0   (안내 주석 제거됨)
grep -o "TODO([a-z-]*)" <초안> # → TODO(hero) TODO(intro) TODO(whats-new) TODO(next)
grep -c "SOURCE(원본" <초안>   # → 1   (근거 보존)
```

**W-04 — draft 초안화 (FR-04 ①②)**

```bash
npx quartz build
# → Found 53 input files (51 + 초안 2)
#   Filtered out 12 files (10 + 초안 2)   ← RemoveDrafts 가 초안을 걸러냈다
#   Emitted 249 files                     ← 게시물 수 변화 없음
```

수용 기준 ③(draft 해제 시 게시)은 W-16에서 초안을 완성할 때 확인한다.

**DD-13 — 검증 로그 섹션 제외 (개인 경로 노출 차단)**

```bash
# 수정 전 초안 본문
- bun run build passed
- Confirmed parser detects Blender MCP from /Users/hsshin-rsupport/.../blender-test/.codex/mcp.json

# 수정 후: 초안 재생성하고 SOURCE 주석을 제외한 본문에서 홈 경로 검사
sed '/^<!-- SOURCE(/,/^-->/d' <초안> | grep -c "/Users/"
# → 0
```

**W-14 — CLAUDE.md**

```bash
grep -n "content/releases" CLAUDE.md    # → 없음 (수정 전 4곳)
```

**W-06~W-08 — skill 구조**

```bash
find .claude/skills/blog-release-note -type f
# → SKILL.md · references/skeleton.md · references/images.md · references/writing.md

head -5 .claude/skills/blog-release-note/SKILL.md
# → name: blog-release-note / version: 1.0.0
```

**W-17 — humanize 강제와 `_workspace/` 격리**

```bash
mkdir -p _workspace/2026-08-11-001 && touch _workspace/2026-08-11-001/01_input.txt
git status --porcelain | grep -c "_workspace"     # → 0
git check-ignore -v _workspace/                  # → .gitignore:24:_workspace/
```

**W-09 — 발동 (NFR-04) — 부분 검증**

```bash
# description 트리거 문구 포함 확인
릴리즈 노트 / 새 버전 / 스토어 등록 / 마일스톤 / draft → 5종 모두 포함
```

세션 skill 목록에 `blog-release-note` 가 **등록된 것을 이 세션에서 확인했다**
(파일 생성 직후 사용 가능 skill 목록에 나타났다).

**하지 못한 것**: "신규 세션 3회 시도 중 3회 발동"은 이 세션에서 검증할 수 없다.
같은 세션에서는 이미 등록된 상태이고, 발동 여부는 새 세션의 요청 문구에 달려 있다.
**다음 세션에서 확인해야 하는 항목으로 남긴다.**

**추적 확인 (D-05 전제)**

```bash
git check-ignore -v .claude/skills/blog-release-note/SKILL.md   # → 무시 안 됨
git check-ignore -v .claude/skills/hallmark                     # → .gitignore:28 (외부 스킬은 계속 무시)
git ls-files .claude/skills/                                    # → blog-release-note 4파일 추적
```

## 7. 미해결

- ~~중간 상태: 스크립트가 옛 placeholder를 채운다~~ → **S2에서 해소** (계약 19개 일치 확인)
- ~~`design.md` §5-1에 `{{INTRO_TODO}}` 반영~~ → **완료** (DD-13도 함께 추가)
- **W-09 미완**: 신규 세션에서의 발동 3회 테스트가 남았다. 다음 세션에서 "릴리즈 노트 써줘"류 요청으로 확인한다
- 초안 2건(`ai-config-monitor` v1.2.1·v1.2.3)이 `draft: true` 로 대기 중이다. S5(W-16)가 보류되어
  **당장 게시되지 않는다.** 방치되면 영구 미게시가 된다 (R-03) — 다음 회차의 첫 작업 후보
- ~~초안 `description` 이 저장소 설명 그대로~~ → skill 절차 7단계와 `references/skeleton.md` 에 반영 완료
- FR-04 수용 기준 ③(draft 해제 시 게시)은 아직 확인하지 못했다. 초안을 완성하는 회차에서 확인한다
- FR-07·FR-10·FR-12 ③④는 S4·S5 보류로 미충족이다. 요구사항 자체는 유효하며 다음 회차 대상이다
- push 보류 중 — `main` 이 `origin/main` 보다 12커밋 앞서 있다
