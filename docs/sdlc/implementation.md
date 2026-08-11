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

### S3~S5

| WBS | 내용 | 상태 |
|-----|------|------|
| W-06~W-09, W-17 | skill 작성 | 미착수 — **다음 작업 (S3)** |
| W-18~W-20 | 이미지 확보 | 미착수 |
| W-10~W-12, W-16, W-13 | 글 9건 + 전체 검증 | 미착수 |

**진행: 7 / 20**

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

## 5. 설계 대비 변경

| 설계 | 실제 | 이유 | 문서 반영 |
|------|------|------|----------|
| §5-1 신규 placeholder **8개** (합 18개) | **9개** (합 19개) — `{{INTRO_TODO}}` 추가 | 도입부는 골격의 **필수 섹션**인데 자동으로 채울 수 없다. 마커가 없으면 초안이 필수 섹션 없이 나온다 | `design.md` §5-1 갱신 완료 |
| 릴리즈 본문 전체를 파싱 | 검증 로그 섹션(`Verification` 등)은 **건너뛴다** | `ai-config-monitor` v1.2.1 본문의 `## Verification` 항목이 `Improvements` 로 흡수돼 `bun run build passed` 와 로컬 절대 경로가 초안 본문에 실렸다. 게시되면 개인 경로가 노출된다 | `design.md` DD-13 추가 완료 |

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

## 7. 미해결

- ~~중간 상태: 스크립트가 옛 placeholder를 채운다~~ → **S2에서 해소** (계약 19개 일치 확인)
- ~~`design.md` §5-1에 `{{INTRO_TODO}}` 반영~~ → **완료** (DD-13도 함께 추가)
- 초안 2건(`ai-config-monitor` v1.2.1·v1.2.3)이 `draft: true` 상태로 대기 중이다. W-16에서 완성한다.
  **방치되면 영구 미게시**가 된다 (R-03) — 이번 프로젝트 안에서 소진하므로 지금은 위험이 낮다
- 초안의 `description` 은 `tracked-repos.json` 의 저장소 설명이 그대로 들어간다. 릴리즈별 설명이 아니므로
  사람이 고쳐야 한다. skill 절차(W-08)에 넣을 항목
- push 보류 중 — `main` 이 `origin/main` 보다 앞서 있다 (사용자 지시: 구현 완료 후 한 번에)
