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
| W-09 | 발동 테스트 | **완료** | `2d6c3d2` | 별개 컨텍스트 5회 시도 5/5 정답. description 강화 (아래 §6) |

### S4 — 이미지 확보 (6h 예상)

| WBS | 내용 | 상태 | 커밋 | 비고 |
|-----|------|------|------|------|
| W-20 | screen-saver 이미지 배정 | **완료** | `1ce6d62` | 기존 스토어 스크린샷 재사용 (시계 → v1.0.4, 원클릭 → v1.0.6) |
| W-19 | blog 당시 커밋 재현 캡처 | **완료** | `1ce6d62` | worktree로 2월 3일·11일 시점 빌드 후 캡처 |
| W-18 | ai-config-monitor 터미널 캡처 | **완료** | `1ce6d62` | 클론·`bun` 빌드·실행 후 4장 (ALERT·서버표·Overview·update) |

### S5 — 글 작성 (9h 예상)

| WBS | 내용 | 상태 | 커밋 | 비고 |
|-----|------|------|------|------|
| W-10 | screen-saver 2건 | **완료** | `2eaa5a1` | skill 첫 실전. humanize light 0.5~0.6%, 등급 A |
| W-11 | blog 2건 | **완료** | `12277b7` | v1.0.0의 What's Next에 이 프로젝트가 고친 결함을 기록 |
| W-12 | ai-config-monitor 3건 | **완료** | `12277b7` | v1.2.0·1.2.2·1.2.4 |
| W-16 | 누락 2건 | **완료** | `12277b7` | v1.2.1·1.2.3 — 초안에서 완성, `draft` 해제 |
| W-13 | 전체 빌드·링크 검증 | **완료** | `12277b7` | 9건 전부 통과 (아래 §6) |

**진행: 20 / 20**

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

**W-09 — 발동 (NFR-04)**

`skill-creator` 의 Description Optimization 절차와 별개 컨텍스트 시도를 함께 썼다.
트리거 eval 20건(should-trigger 10 / should-not 10, near-miss 위주)을 만들어 두 방식으로 측정했다.

*방식 1 — 별개 컨텍스트 시도 (실제 Claude Code)*

| 시도 | 요청 | 기대 | 결과 |
|------|------|------|------|
| 1 | screen-saver v1.0.7 릴리즈 노트 | 발동 | **발동** — 절차대로 `gh release view` 를 돌려 v1.0.7 이 없음을 잡아냈다 |
| 2 | `content/blog/releases` 의 draft 초안 마무리 | 발동 | **발동** — 1단계(초안 탐색)를 실행해 초안 0건임을 확인하고 되묻기로 판단 |
| 3 | `content/blog/log` 회고 개요 | 미발동 | **미발동** — SKILL.md 의 "해당 없음: 회고·에세이" 절을 근거로 스스로 배제 |

**3/3 정답.** 수용 기준("3회 시도 중 3회")을 이 방식으로 충족했다.

description 강화 후 2회를 더 시도했다.

| 시도 | 요청 | 기대 | 결과 |
|------|------|------|------|
| 4 | gardeneel v1.7 릴리즈 노트 + projects 페이지 갱신 | 발동 | **발동** — `references/skeleton.md`·`images.md` 까지 읽고, v1.7 릴리즈가 없음을 확인해 사용자에게 되묻기로 판단 |
| 5 | GitHub 릴리즈 본문을 영어로 다듬기 | 미발동 | **적용 안 함** — skill을 열어 확인한 뒤 "해당 없음: GitHub 릴리즈 본문 자체 작성" 조항을 근거로 배제 |

**누적 5/5 정답.** 특히 4·5번은 skill이 지침을 읽고 *적용 여부를 스스로 판단*했다 —
발동을 강화하면서 배제 경계를 함께 넣은 효과다. 세 번의 긍정 시도 모두 절차 1~2단계(사실 확보)를
실제로 실행해 **요청에 언급된 버전이 존재하지 않음을 잡아냈다**(v1.0.7·v1.7 모두 미존재).
없는 릴리즈로 글을 쓰기 시작하지 않는다는 점에서 절차가 의도대로 작동한다.

*방식 2 — 헤드리스 `claude -p` (`scripts/run_eval.py`, 20쿼리 × 3회)*

```
Results: 10/20 passed
  should-trigger 10건 → 전부 rate=0/3   (recall 0%)
  should-not     10건 → 전부 rate=0/3   (전부 통과)
```

**이 수치는 description 품질의 근거가 못 된다.** 모든 쿼리가 예외 없이 0/3이고,
같은 도구의 첫 실행은 `ANTHROPIC_API_KEY` 가 설정돼 있으나 401 무효 키여서
`claude -p` 가 전 건 실패했다(`env -u ANTHROPIC_API_KEY` 로 우회 후 재실행). 재실행에서도
should-not 쪽까지 0/3인 것은 헤드리스 모드에서 프로젝트 로컬 skill 이 후보로 올라가지 않았을
가능성을 시사한다. **환경 한계로 판정 보류**한다.

*조치*: `skill-creator` 권고("Claude는 skill을 과소 발동하므로 description을 다소 밀어붙이게 쓴다")에 따라
description에 ① 트리거 상황 4종을 문장으로 명시 ② "사용자가 skill 이름을 말하지 않아도" 문구 추가
③ **해당 없음 경계**(log 회고·dev 정리·GitHub 릴리즈 본문·CHANGELOG·번역·코드 수정)를 함께 박았다.
경계를 같이 넣은 이유는 트리거만 강화하면 near-miss 오발동이 늘기 때문이다.

**추적 확인 (D-05 전제)**

**W-18~W-20 — 이미지 (FR-10)**

```bash
# ai-config-monitor: 저장소에 이미지 자산이 전무하므로 직접 실행해 캡처
git clone → bun install → bun run build → Terminal.app 에서 실행 → screencapture

# 세 번 다시 찍은 이유 (모두 개인정보 노출)
# ① -R 영역 캡처가 창 밖 바탕화면까지 담았다 → Quartz 로 창 bounds 를 읽어 창 내부만 캡처
# ② Skills 탭의 SOURCE 열에 /Users/... 가 전부 노출 → 해당 탭 폐기
# ③ 셸 프롬프트에 사용자명@호스트명 → PROMPT='%% ' 로 덮어씀
#    프로젝트 경로도 scratchpad(경로에 사용자명 포함) → /tmp/acm-demo 로 이동

# blog: 2월 커밋 재현
git worktree add <scratch>/blog-100 1b7f6e1   # 2026-02-03
npx quartz build   # → Found 27 input files (당시 상태), 릴리즈 2건
git worktree add <scratch>/blog-101 a24936a   # 2026-02-11 → 릴리즈 4건

# 용량
find quartz/static -type f -size +300k   # → 없음 (최대 278KB)
```

**W-10~W-16 — 글 9건 (FR-07·FR-12)**

```bash
# humanize-korean 경유 (FR-13) — run_id 2026-08-11-001 ~ 009
python3 prepare_monolith_input.py --run-dir <abs>/_workspace/2026-08-11-{NNN} --genre blog
# → route_hint=light 전 건 (risk_band low, 003만 medium)
# Agent(humanize-monolith) ×2 콜로 9건 처리, 강도 보수
# → 변경률 0.0~1.4%, 등급 A, 자체검증 6/6

python3 verify_gates.py --before 01_input.txt --after final.md --genre blog
# → 9건 모두 gate: OK — 수렴 / P3 golden PASS

# 사실 대조 (FR-13 ③) — 버전·수치·플래그·파일명·고유명사·헤딩·숫자 집합
# → 9건 전부 일치, 불일치 0건

# 게시 검증
TODO( · {{ · SOURCE( · 커밋 프리픽스 · /Users/ · 작성자 섹션 · 본문 h1 · draft: true
# → 9건 모두 0건, 이미지 각 1장 이상

npx quartz build
# → Filtered out 12 → 10   ← 초안 2건이 draft 를 벗고 게시됨 (FR-04 ③ 확인)
# → Emitted 254 files, 깨진 링크 0건
```

**humanize-korean 이 잡은 것 (사람이 못 잡았을 오류)**

| 파일 | 초고 | 지적 |
|------|------|------|
| v1.0.6 | `화면을 덮인 채로` | `덮이다`는 피동사여서 목적격을 취할 수 없다 → `화면이 덮인 채로` |
| v1.2.1 | `한 겹 감싸져 있으면` | 이중 피동 → `감싸여 있으면` |
| v1.2.2 | `toml 설정을 … 붙였습니다` | 서술어가 앞 목적어를 지배하지 못한다. **사실 관계 수정이라 손대지 않고 지적만** → 사람이 교정 |

**추적 확인 (D-05 전제)**

```bash
git check-ignore -v .claude/skills/blog-release-note/SKILL.md   # → 무시 안 됨
git check-ignore -v .claude/skills/hallmark                     # → .gitignore:28 (외부 스킬은 계속 무시)
git ls-files .claude/skills/                                    # → blog-release-note 4파일 추적
```

## 7. 미해결

- ~~중간 상태: 스크립트가 옛 placeholder를 채운다~~ → **S2에서 해소** (계약 19개 일치 확인)
- ~~`design.md` §5-1에 `{{INTRO_TODO}}` 반영~~ → **완료** (DD-13도 함께 추가)
- ~~W-09 미완~~ → 별개 컨텍스트 5회 시도로 5/5 정답 확인, description 강화까지 완료
- 헤드리스 `claude -p` 환경에서의 발동은 **판정 보류**다. 그 환경을 쓰는 자동화를 붙일 계획이 생기면 다시 봐야 한다
- ~~초안 2건이 `draft: true` 로 대기~~ → W-16에서 완성, `draft` 해제 확인 (R-03 해소)
- ~~FR-04 ③ 미확인~~ → 빌드의 `Filtered out` 12 → 10 으로 확인
- ~~FR-07·FR-10·FR-12 미충족~~ → 전부 충족
- **`DEPLOY_TOKEN` 부재**로 Actions 배포가 실패한다. 수동 배포(4sizn.github.io 클론 → `public/` 교체 → push)로
  우회 중이며 push 마다 반복해야 한다. 토큰 등록은 사용자만 할 수 있다
- ~~수동 작성 글 4건이 골격과 어긋난다~~ → 사용자 지시로 In scope 전환, 2026-08-11 정합 완료 (`2d04b7b`).
  구조만 바꾸고 문장은 그대로 뒀으므로 humanize 경유는 하지 않았다

### 7-1. `gardeneel-desktop` 이미지 생략 근거 (FR-10 ③)

수용 기준이 요구하는 기록이다. 13건 중 이 한 건만 이미지가 없다.

| 확인한 것 | 결과 |
|-----------|------|
| GitHub 릴리즈 첨부 자산 | `GardenEelCove-windows.zip`, `GardenEelCove.dmg` — 배포 바이너리뿐 |
| README 이미지 | 없음 (`![...]`·`<img>` 0건) |
| 로컬 클론 | 없음 (`lotus/` 하위에 `gardeneel-desktop` 디렉토리가 없다) |
| 앱 아이콘 | `quartz/static/` 에 없다 (Swing Golf·Lonely Candle 은 있다) |

**판단**: 화면을 얻으려면 `dmg` 를 내려받아 설치·실행해야 한다. 사용자 환경에 앱을 설치하는 것은
릴리즈 노트를 쓰기 위한 대가로 과하고, 되돌리기도 번거롭다. 앱 아이콘 같은 대체물은 "이번 릴리즈를
한 장으로 보여준다"는 Hero 의 목적을 채우지 못한다 — 억지 장식 이미지를 넣지 않는다는 규칙(R-14)에
따라 **생략**한다.

**해소 조건**: 이 앱을 다시 손볼 때 실행 화면을 캡처해 `quartz/static/gardeneel-desktop/` 에 넣고
그때 이 글에 Hero 를 추가한다.
