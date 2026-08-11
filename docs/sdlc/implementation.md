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

### S2~S5

| WBS | 내용 | 상태 |
|-----|------|------|
| W-03 | placeholder 계약 갱신 | 미착수 — **다음 작업** |
| W-04 | draft 초안화 | 미착수 |
| W-15 | 다중 릴리즈 조회 | 미착수 |
| W-14 | `CLAUDE.md` 정정 | 미착수 |
| W-06~W-09, W-17 | skill 작성 | 미착수 |
| W-18~W-20 | 이미지 확보 | 미착수 |
| W-10~W-12, W-16, W-13 | 글 9건 + 전체 검증 | 미착수 |

**진행: 3 / 20**

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

## 5. 설계 대비 변경

| 설계 | 실제 | 이유 |
|------|------|------|
| §5-1 신규 placeholder **8개** (합 18개) | **9개** (합 19개) — `{{INTRO_TODO}}` 추가 | 도입부는 골격의 **필수 섹션**인데 자동으로 채울 수 없다. 설계 §5-1에 도입부용 마커가 빠져 있었다. 사람이 채울 자리를 표시하지 않으면 초안이 필수 섹션 없이 나온다 |

`design.md` §5-1의 placeholder 표에 `{{INTRO_TODO}}` 를 추가해야 한다 (문서 갱신은 S2에서 W-03과 함께 처리한다 — 같은 계약을 두 번 고치지 않기 위해).

그 밖에 설계와 다르게 구현한 것은 없다.

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

## 7. 미해결

- **중간 상태**: `sync-releases.mjs` 는 아직 옛 placeholder를 채운다. 지금 스크립트를 돌리면 새 템플릿의
  `{{WHATS_NEW_SECTION}}` 등이 미치환으로 남는다. **W-03에서 해소한다.** cron은 push 전까지 이 변경을
  보지 못하므로 실사용 영향은 없다
- `design.md` §5-1 placeholder 표에 `{{INTRO_TODO}}` 반영 필요 (S2에서 처리)
- push 보류 중 — `main` 이 `origin/main` 보다 앞서 있다
