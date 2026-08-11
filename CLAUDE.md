# 4sizn Blog - 개발 가이드

> Quartz 기반 블로그 with GitHub 릴리즈 자동화 시스템

## 📋 목차

- [프로젝트 개요](#프로젝트-개요)
- [버전 관리 정책](#버전-관리-정책)
- [개발 환경 설정](#개발-환경-설정)
- [개발 서버 실행](#개발-서버-실행)
- [빌드 및 배포](#빌드-및-배포)
- [GitHub 릴리즈 자동화](#github-릴리즈-자동화)
- [주요 명령어](#주요-명령어)
- [디렉토리 구조](#디렉토리-구조)
- [문제 해결](#문제-해결)

---

## 프로젝트 개요

이 프로젝트는 Quartz v4.5.2를 사용하는 정적 사이트 생성기(SSG) 기반 블로그입니다.

**주요 기능:**
- 📝 마크다운 기반 콘텐츠 작성
- 🚀 GitHub 릴리즈 자동 동기화
- 🎨 Quartz의 디지털 가든 스타일
- 📱 반응형 디자인

**기술 스택:**
- Quartz v4.5.2
- Node.js 22+
- npm 10.9.2+
- GitHub Actions

---

## 버전 관리 정책

이 프로젝트는 **Blog 콘텐츠**와 **Quartz 엔진**의 버전을 명확히 분리하여 관리합니다.

### 📌 버전 체계

| 타겟 | 버전 | 용도 | 관리 방법 |
|------|------|------|-----------|
| **Blog 릴리즈** | `v1.x.x` | 블로그 프로젝트 버전 | Git Tag + GitHub Release |
| **Quartz 엔진** | `4.5.2` | 정적 사이트 생성기 버전 | package.json |

### 🎯 Blog 릴리즈 버전 (v1.x.x)

**Semantic Versioning 사용:**

```
v1.0.0 - 초기 릴리즈 (GitHub Release Auto-Sync System)
v1.1.0 - 새 기능 추가 (Minor)
v1.0.1 - 버그 수정 (Patch)
v2.0.0 - 중대한 변경 (Major)
```

**릴리즈 생성 방법:**

```bash
# 1. GitHub에서 새 Release 생성
#    - Releases → "Draft a new release" 클릭
#    - Tag: v1.1.0
#    - Title: "4sizn Blog v1.1.0 - Feature Name"
#    - Description: 변경사항 작성

# 2. 자동 동기화
#    - 매일 오전 9시 자동 실행
#    - 또는 수동 트리거: https://github.com/4sizn/blog/actions/workflows/sync-releases.yml

# 3. 블로그에 초안 생성 (자동 게시가 아니다)
#    - content/blog/releases/YYYY-MM-DD-blog-1.1.0.md 생성 (draft: true)
#    - blog-release-note skill 로 다듬고 draft 를 지워야 게시된다
```

### 🔧 Quartz 엔진 업그레이드

**Quartz 버전 업그레이드 시:**

```bash
# 1. 의존성 업데이트
npm update

# 2. package.json 버전 확인
# "version": "4.5.2" → "4.6.0"

# 3. 테스트 후 커밋
git commit -m "chore: upgrade Quartz to v4.6.0"
```

**주의:** Quartz 업그레이드는 Blog 릴리즈 버전(v1.x.x)과 무관합니다.

### 📝 버전 관리 예시

```
2026-02-11: v1.0.0 릴리즈 (Quartz 4.5.2)
   ↓ 블로그 콘텐츠 업데이트
2026-03-01: v1.1.0 릴리즈 (Quartz 4.5.2)
   ↓ Quartz 엔진 업그레이드
2026-04-01: package.json 4.5.2 → 4.6.0
   ↓ 블로그 기능 추가
2026-05-01: v1.2.0 릴리즈 (Quartz 4.6.0)
```

### ⚠️ 무한루프 방지

릴리즈 동기화 시스템은 `[skip ci]` 플래그를 사용하여 무한루프를 방지합니다:

- ✅ 릴리즈 동기화 커밋은 추가 workflow를 트리거하지 않음
- ✅ 매일 오전 9시 또는 수동 실행만 릴리즈 확인
- ✅ 같은 릴리즈에 대해 중복 실행 방지

---

## 개발 환경 설정

### 필수 요구사항

```bash
node >= 22
npm >= 10.9.2
```

### 초기 설정

```bash
# 저장소 클론
git clone https://github.com/4sizn/blog.git
cd blog

# 의존성 설치
npm install
```

---

## 개발 서버 실행

### 로컬 개발 서버 시작

```bash
npx quartz build --serve
```

**또는:**

```bash
npm run docs
```

**접속 주소:**
- http://localhost:8080

**특징:**
- ✅ 파일 변경 감지 자동 리빌드
- ✅ 핫 리로드 지원
- ✅ 실시간 미리보기

### 개발 서버 종료

```bash
# Ctrl + C 또는 Cmd + C
```

---

## 빌드 및 배포

### 1. 로컬 빌드

```bash
npx quartz build
```

**결과:**
- `public/` 디렉토리에 정적 파일 생성
- 총 150+ 개의 HTML, CSS, JS 파일 생성

### 2. 변경사항 커밋

```bash
# 변경사항 확인
git status

# 파일 스테이징
git add .

# 커밋
git commit -m "chore: update content"

# 또는 Claude Code에서 자동 커밋
# Claude가 자동으로 적절한 커밋 메시지 생성
```

### 3. 배포 (GitHub Pages)

```bash
# 원격 저장소에 푸시
git push origin main
```

**자동 배포 프로세스:**
1. `git push` 실행
2. GitHub Actions 자동 트리거
3. Quartz 빌드 실행
4. GitHub Pages에 배포
5. 5-10분 후 사이트 업데이트 완료

**배포 상태 확인:**
- https://github.com/4sizn/blog/actions

---

## GitHub 릴리즈 자동화

이 프로젝트는 GitHub 저장소의 릴리즈를 자동으로 감지하여 블로그 글을 작성하는 시스템을 갖추고 있습니다.

### 동작 방식

```
┌─────────────────────────────────────────────┐
│  GitHub Repository에 새 Release 생성         │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│  매일 오전 9시 GitHub Actions 자동 실행      │
│  (또는 수동 실행)                            │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│  scripts/sync-releases.mjs 실행              │
│  - API로 최신 릴리즈 확인                     │
│  - 릴리즈 노트 파싱                          │
│  - 마크다운 파일 생성                         │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│  content/blog/releases/ 에 초안 생성         │
│  - {date}-{repo}-{version}.md (draft: true) │
│  - 자동 커밋 & 푸시                          │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│  블로그에 자동으로 릴리즈 노트 게시          │
└─────────────────────────────────────────────┘
```

### 추적할 저장소 추가/수정

**파일:** `.github/tracked-repos.json`

```json
{
  "repositories": [
    {
      "owner": "4sizn",
      "repo": "screen-saver-extension",
      "category": "extension",
      "displayName": "Screen Saver Extension",
      "description": "크롬 확장 프로그램"
    },
    {
      "owner": "facebook",
      "repo": "react",
      "category": "library",
      "displayName": "React",
      "description": "JavaScript 라이브러리"
    }
  ]
}
```

**새 저장소 추가 후:**

```bash
# 로컬에서 테스트
node scripts/sync-releases.mjs

# 커밋 & 푸시
git add .github/tracked-repos.json
git commit -m "chore: add new repository to track"
git push
```

### 수동으로 릴리즈 동기화

```bash
# 로컬에서 실행
node scripts/sync-releases.mjs
```

**또는 GitHub Actions에서 수동 실행:**
1. https://github.com/4sizn/blog/actions/workflows/sync-releases.yml
2. "Run workflow" 버튼 클릭
3. "Run workflow" 확인

### 생성되는 파일

**파일명 형식:**
```
content/blog/releases/{YYYY-MM-DD}-{repo-name}-{version}.md
```

**예시:**
```
content/blog/releases/2026-02-03-screen-saver-extension-1.0.4.md
```

**URL:**
```
https://4sizn.github.io/blog/releases/2026-02-03-screen-saver-extension-1.0.4
```

### 릴리즈 노트 작성 팁

GitHub Release를 만들 때 다음 형식을 사용하면 자동으로 섹션별로 분류됩니다:

```markdown
## v1.0.0

- feat: 새로운 기능 추가 (✨ 새로운 기능)
- fix: 버그 수정 (🐛 버그 수정)
- chore: 코드 개선 (🔧 개선사항)
- refactor: 리팩토링 (🔧 개선사항)
- BREAKING CHANGE: 호환성 변경 (⚠️ Breaking Changes)
```

---

## 주요 명령어

### Quartz 명령어

```bash
# 개발 서버 시작
npx quartz build --serve

# 프로덕션 빌드
npx quartz build

# 코드 포맷팅
npm run format

# 타입 체크
npm run check
```

### Git 명령어

```bash
# 상태 확인
git status

# 변경사항 확인
git diff

# 커밋
git add .
git commit -m "type: message"

# 푸시 (배포)
git push origin main

# 최신 변경사항 가져오기
git pull origin main
```

### 릴리즈 동기화

```bash
# 로컬에서 릴리즈 동기화 테스트
node scripts/sync-releases.mjs

# 스크립트 실행 가능하도록 권한 부여
chmod +x scripts/sync-releases.mjs
```

---

## 디렉토리 구조

```
4sizn-blog/
├── .github/
│   ├── tracked-repos.json          # 추적할 저장소 설정
│   └── workflows/
│       └── sync-releases.yml       # 릴리즈 동기화 워크플로우
│
├── content/                         # 블로그 콘텐츠 (빌드 대상)
│   ├── index.md                    # 메인 페이지
│   ├── about.md
│   ├── blog/
│   │   ├── log/                    # 회고·생각
│   │   ├── dev/                    # 읽고 정리한 것
│   │   └── releases/               # 릴리즈 노트 (스크립트가 초안 생성)
│   ├── projects/                   # 프로젝트 카드 (ProjectGrid 가 읽는다)
│   ├── templates/                  # 템플릿 — ignorePatterns 로 빌드 제외
│   │   ├── new_releases.md         # 릴리즈 노트 골격 (12섹션)
│   │   └── new_post.md
│   └── private/                    # 비공개 — 빌드 제외
│
├── docs/sdlc/                       # SDLC 산출물 (빌드 대상 아님)
│
├── scripts/
│   └── sync-releases.mjs           # 릴리즈 초안 생성 스크립트
│
├── .claude/skills/                  # 프로젝트 로컬 skill
│
├── quartz/                          # Quartz 엔진
├── public/                          # 빌드 결과물 (git ignore)
│
├── quartz.config.ts                # Quartz 설정
├── package.json                    # 프로젝트 의존성
└── CLAUDE.md                       # 이 파일
```

---

## 문제 해결

### 개발 서버가 시작되지 않을 때

```bash
# Node.js 버전 확인
node --version  # v22 이상이어야 함

# 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# 캐시 클리어
npx quartz build --clean
```

### 빌드 오류가 발생할 때

```bash
# 에러 로그 확인
npx quartz build

# 마크다운 문법 확인
# - 잘못된 frontmatter
# - 닫히지 않은 코드 블록
# - 특수 문자 이스케이프

# public 폴더 삭제 후 재빌드
rm -rf public
npx quartz build
```

### 릴리즈 동기화가 작동하지 않을 때

```bash
# 로컬에서 테스트
node scripts/sync-releases.mjs

# API 호출 확인
curl https://api.github.com/repos/4sizn/screen-saver-extension/releases/latest

# GitHub Actions 로그 확인
# https://github.com/4sizn/blog/actions/workflows/sync-releases.yml
```

**일반적인 원인:**
- ❌ GitHub Release가 아닌 단순 Tag만 있는 경우
- ❌ 저장소가 private인 경우 (public만 지원)
- ❌ API rate limit 초과 (하루 60회 제한)

**해결 방법:**
1. GitHub에서 정식 Release 생성 (Tag만으로는 안 됨)
2. 저장소를 public으로 변경
3. GitHub Token 설정 (rate limit 증가)

### 배포가 반영되지 않을 때

```bash
# 1. 로컬에서 빌드 확인
npx quartz build

# 2. 커밋 푸시 확인
git push origin main

# 3. GitHub Actions 확인
# https://github.com/4sizn/blog/actions

# 4. 브라우저 캐시 클리어
# Cmd+Shift+R (Mac) 또는 Ctrl+Shift+R (Windows)
```

### Git 저장소가 이동했다는 메시지가 나올 때

```bash
# 원격 저장소 URL 업데이트
git remote set-url origin https://github.com/4sizn/blog.git

# 확인
git remote -v
```

---

## 유용한 팁

### 1. 새 글 작성하기

```bash
# content/ 디렉토리에 마크다운 파일 생성
touch content/my-new-post.md
```

**Frontmatter 예시:**

```markdown
---
title: "제목"
description: "설명"
tags:
  - tag1
  - tag2
draft: false
lang: "ko"
created: "2026-02-03"
---

# 내용 작성
```

### 2. 이미지 추가하기

```bash
# public/images/ 디렉토리에 이미지 추가
cp image.png public/images/

# 마크다운에서 참조
![설명](/images/image.png)
```

### 3. 커스텀 CSS 추가하기

```css
/* quartz/styles/custom.scss */
.custom-class {
  color: red;
}
```

### 4. 로컬에서 빠르게 테스트하기

```bash
# 빌드 없이 개발 서버만 실행 (가장 빠름)
npx quartz build --serve

# 파일 변경하면 자동으로 리빌드됨
```

---

## 참고 자료

- **Quartz 공식 문서:** https://quartz.jzhao.xyz
- **GitHub Actions 문서:** https://docs.github.com/en/actions
- **GitHub API 문서:** https://docs.github.com/en/rest

---

## 라이선스

MIT License

---

## 작성자

- **4sizn** - [GitHub](https://github.com/4sizn)
- **Claude Sonnet 4.5** - AI Assistant

---

**마지막 업데이트:** 2026-02-11

---

## 변경 이력

### v1.0.0 (2026-02-11)
- ✨ GitHub Release Auto-Sync System 구축
- 📝 버전 관리 정책 수립 (Blog v1.x.x / Quartz 4.5.2)
- 🔒 무한루프 방지 장치 추가 (`[skip ci]`)
- 📚 CLAUDE.md 문서 완성
