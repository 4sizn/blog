# 이미지 확보

릴리즈 노트는 이미지를 **최소 1장** 갖는다. 글보다 먼저 확보한다 — 글을 먼저 쓰면 이미지를 끼워 맞추게 되고,
그 순서가 내용과 무관한 장식 이미지를 만든다.

## 유형별 확보 방법

| 유형 | 대상 | 방법 |
|------|------|------|
| 브라우저 확장 | `screen-saver-extension` | 스토어 등록 스크린샷 재사용(`quartz/static/screen-saver/`) 또는 로컬 빌드 후 실행 화면 캡처 |
| CLI · 터미널 UI | `ai-config-monitor` | 저장소를 클론해 빌드·실행하고 **터미널 화면을 캡처**한다 (아래 절차) |
| 이 블로그 자체 | `4sizn-blog` | **당시 커밋을 재현**해 캡처한다 (아래 절차). 지금 화면을 당시 것처럼 쓰지 않는다 |
| 데스크톱 · 모바일 앱 | `gardeneel-desktop`, App Store 앱 | 앱 실행 화면 또는 스토어 스크린샷 |

## CLI 터미널 캡처

```bash
# 저장소가 로컬에 없으면 스크래치 영역에 클론한다 (블로그 저장소를 더럽히지 않는다)
git clone https://github.com/4sizn/<repo> <scratch>/<repo>
cd <scratch>/<repo> && bun install && bun run build

# 해당 버전 상태로 맞춘다
git checkout <tag>

# 실행 후 터미널 창을 캡처한다 (macOS)
# 창 단위 캡처: Cmd+Shift+4 → Space → 창 클릭
# 또는 screencapture -w <출력>.png
```

터미널은 폰트가 작아 뭉개진다. 창을 넓히고(120칼럼 이상) 확대해 캡처한다.

## 블로그 당시 커밋 재현

현재 화면은 그때와 다르다. worktree로 그 시점을 되살린다.

```bash
# 릴리즈 날짜 직전 커밋을 찾는다
git rev-list -1 --until="<릴리즈 날짜>" main

# 워크트리로 꺼낸다 (현재 작업 트리를 건드리지 않는다)
git worktree add <scratch>/blog-<version> <커밋 SHA>
cd <scratch>/blog-<version>
npm install && npx quartz build --serve --port 8081
# → 캡처 후
git worktree remove <scratch>/blog-<version>
```

당시 Quartz 버전이 지금과 같은지 확인한다 — 다르면 의존성 설치가 실패할 수 있다.

```bash
git show <커밋 SHA>:package.json | grep '"version"'
```

## 저장·변환

```bash
# 저장 위치: 프로젝트별로 폴더를 나눈다
quartz/static/<project-slug>/01-<무엇>.jpg

# PNG 가 크면 JPEG 로 변환한다 (품질 82, 폭 유지)
sips -s format jpeg -s formatOptions 82 <원본>.png --out quartz/static/<slug>/<이름>.jpg

# 용량 확인 — 장당 300KB 이하
ls -lh quartz/static/<slug>/
```

투명 배경이 필요 없는 자산이면 알파 채널을 없앤다. RGBA 로 뽑힌 PNG 는 픽셀마다 쓸모없는
알파 값을 들고 있어 용량이 두 배 가까이 커진다.

## 본문 참조

```markdown
![무엇을 보여주는 화면인지 한 문장](/static/<slug>/01-<무엇>.jpg)
```

- 절대 경로(`/static/...`)를 쓴다. Quartz 가 상대 경로로 변환한다
- 대체 텍스트를 반드시 채운다. `![스크린샷]` 처럼 비우지 않는다
- Hero Image 는 frontmatter `socialImage` 에도 같은 경로를 넣는다

## 규칙

- **시점이 다른 이미지를 당시 것처럼 쓰지 않는다.** 불가피하면 캡션에 기준 시점을 적는다
- 다크·라이트 양쪽에서 확인한다. 밝은 배경 이미지가 다크 모드에서 튀는지 본다
- 어떤 이미지도 사실을 보여주지 못하면 **생략하고 이유를 기록한다.** 억지 장식 이미지를 넣지 않는다
- 이미지 파일명에 버전을 넣지 않는다. 다음 릴리즈에서 재사용할 수 있어야 한다
