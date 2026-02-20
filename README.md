이 프로젝트는 `create-next-app`으로 생성된 Next.js 프로젝트입니다.

## 1. 실행 방법 (OS 별)

### 공통 요구사항

- Node.js 20 이상 권장
- Yarn 설치 (`npm i -g yarn`)

#### macOS

```bash
# 프로젝트 루트에서
yarn install
yarn dev
```

#### Windows (PowerShell)

```powershell
# 프로젝트 루트에서
yarn install
yarn dev
```

#### Linux

```bash
# 프로젝트 루트에서
yarn install
yarn dev
```

개발 서버 실행 후 브라우저에서 `http://localhost:3000`으로 접속하면 됩니다.


## 2. 상태(State) 관리를 위해 사용한 방법론

- 로컬 상태 관리 (Colocation): UI에 가까운 상태는 해당 컴포넌트에서 useState로 관리
    - 예: Box의 모달 열림/닫힘, page의 활성 필터들(다중 선택)
- 서버/비동기 상태 분리: API 데이터는 useBoxStatus 같은 커스텀 훅으로 분리
- 파생 상태(derived state): 원본 데이터에서 필터링 결과를 계산해 렌더링 (useMemo 활용)
    - 필터 정규화 규칙(모든 개별 필터 선택 시 all 전환) 적용
- 단방향 데이터 흐름: 상위에서 데이터/필터를 결정하고 하위(Box)에 props 전달

종합적으로는 React 기본 훅 기반의 경량 상태관리 방법론을 사용한 구조입니다.


## 3. AI 도구를 활용했다면 어떤 프롬프트를 통해 어떤 로직의 도움을 받았는지 솔직하기 기재해 주세요.

본 과제는 Cursor Editor의 AI 기능을 활용해 개발 생산성을 높였고, 최종 판단과 검증은 직접 수행했습니다.

- 사용 도구
    - Cursor Editor 내 AI 채팅/코드 수정 기능

- AI 도움을 받은 로직
    1. 보관함 상태 필터(전체/비어있음/사용중/고장)의 단일 선택 → 다중 선택 전환
    2. “개별 필터 3개 모두 선택 시 전체로 정규화” 규칙 구현
    3. BoxFilterType 관련 TypeScript 타입 오류 해결 (Exclude<..., 'all'> 기반 타입 분리)
    4. 보관함 클릭 시 모달 표시 및 상세 정보 렌더링
    5. Unix timestamp를 YYYY-MM-DD HH:mm로 변환해 표시
    6. 연락처 포맷 정규화 (010-xxxx-xxxx, 02-xxxx-xxxx 등)

- 사용한 프롬프트 예시
    - “필터 버튼을 컴포넌트로 분리하고 다중 선택 가능하도록 바꿔줘”
    - “‘BoxFilterType’ 타입 에러를 수정하고 타입체크까지 확인해줘”
    - “연락처 포맷 규칙에 02-xxxx-xxxx 지원을 추가해줘”
    - “보관함 클릭 시 모달에 courier_mobile_num, onetime_password, 시작일시를 보여줘”

- 검증 및 책임
    - AI 제안 코드를 그대로 채택하지 않고 코드 스타일/요구사항에 맞게 수정
    - eslint, tsc --noEmit, 실제 화면 동작 확인으로 검증
    - 제출 코드의 최종 책임은 작성자 본인에게 있습니다.