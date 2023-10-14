# 원티드 프리온보딩 개발과정

## NestJS: 새로운 도전

- 저는 과거에는 스프링(Spring) + 코틀린(Kotlin), ExpressJS, 그리고 FastAPI를 사용하여 백엔드 서비스를 개발한 경험이 있습니다. 그런데, 최근에 주어진 프로젝트에서 어떤 프레임워크를 해야하는지 고민이 되었습니다. 저는 다양한 언어와 프레임워크를 경험하는 것을 좋아하고, 이번 기회에 NestJS를 경험하면 좋겠다 생각이 들었습니다.

### NestJS는?

#### 1. 모듈 시스템과 의존성 주입(DI)

- NestJS에서 가장 빛나는 부분 중 하나는 모듈 시스템과 의존성 주입(DI)입니다. 제가 사용해보았던 스프링과 유사한 개념을 가지고 있으며, 코드를 모듈로 구성하고 컴포넌트 간의 의존성을 체계적으로 관리할 수 있도록 도와줍니다. 이러한 접근 방식은 코드의 가독성을 향상시키고 재사용성을 높입니다.

#### 2. TypeScript와 정적 타입 검사

- NestJS는 TypeScript를 기반으로 하고 있어 코드의 안정성을 보장하는 데 큰 도움을 줍니다. 정적 타입 검사를 통해 런타임 오류를 사전에 방지할 수 있습니다.

#### 3. 코드 구성

- NestJS는 모듈 시스템을 통해 코드를 구성하고 각 모듈은 독립적으로 테스트 및 유지보수가 가능합니다. 이는 스프링의 모듈화 개념과 유사하며 큰 프로젝트에서 특히 유용합니다.

### NestJS를 통한 프로젝트 구현

- 프로젝트를 구현하는 과정에서, Nest CLI를 사용하여 프로젝트를 초기화하고 모듈 및 컨트롤러를 생성했습니다. NestJS는 코드의 구조를 표준화하고 클라이언트 요청을 컨트롤러 메서드와 자동으로 연결해주는 편리한 기능을 제공합니다.

- 비즈니스 로직을 구현할 때에는 의존성 주입(DI)를 사용하여 서비스와 리포지토리 사이의 의존성을 관리하였습니다. 이를 통해 코드를 모듈로 나누고 테스트 가능한 형태로 유지할 수 있었습니다. 또한 미들웨어와 인터셉터를 활용하여 요청과 응답을 가로채고 로깅, 권한 검사 등을 수행했습니다.

## 요구사항 분석

- **JobPosting:** 특정 기업이 게시한 채용 정보를 담고 있습니다. 채용 포지션, 보상, 콘텐츠 및 사용 기술을 포함합니다.
- **Applicant:** 채용에 지원한 사용자의 정보를 담고 있습니다.

## ERD

### 기능들:

#### 1. **채용 정보 관리**

- 생성: POST `/job-postings`
- 업데이트: PUT & PATCH `/job-postings/:id`
- 삭제: DELETE `/job-postings/:id`
- 전체 조회: GET `/job-postings`
- 상세 조회: GET `/job-postings/:id/job_posting_detail`

#### 2. **지원자 관리**

- 채용공고에 지원: POST `/applications`

#### 3. **Sample 데이터 생성**

- 기능 테스트를 위한 회사와 사용자를 생성: POST 'sample/company', 'sample/user'

## 구현 과정

### 폴더 구조:

```
project-root
│
├── src
│   ├── DTO
│   ├── controllers
│   ├── models
│   └── services
├── test
└── 기타 설정 및 메타데이터 파일들
```

## API 엔드포인트 상세

### 채용 공고 관리

#### 1. 채용 공고 생성 (요구사항 1)

- **Endpoint:** `POST /job-postings`
- **Description:** 새로운 채용 공고를 등록합니다.
- **Request Body:** `JobPostingDto`
- **Response:**
  - **201 Created:** 채용 공고가 성공적으로 등록되었을 때의 응답.
  - **Body:** 생성된 `JobPostingDto`

#### 2. 채용 공고 업데이트 (요구사항 2)

- **Endpoint:** `PUT /job-postings/:id`, `PATCH /job-postings/:id`
- **Description:** 특정 채용 공고를 업데이트합니다.
- **Path Parameters:**
  - `id`: 업데이트할 채용 공고의 ID
- **Request Body:** `UpdateJobPostingDto`
- **Response:**
  - **200 OK:** 채용 공고가 성공적으로 업데이트되었을 때의 응답.
  - **Body:** 업데이트된 `UpdateJobPostingDto`

#### 3. 채용 공고 삭제 (요구사항 3)

- **Endpoint:** `DELETE /job-postings/:id`
- **Description:** 특정 채용 공고를 삭제합니다.
- **Path Parameters:**
  - `id`: 삭제할 채용 공고의 ID
- **Response:**
  - **200 OK:** 채용 공고가 성공적으로 삭제되었을 때의 응답.

#### 4. 채용 공고 목록 조회 (요구사항 4-1, 4-2 구현 완료)

- **Endpoint:** `GET /job-postings`
- **Description:** 모든 채용 공고의 목록을 조회합니다. `search` 쿼리 파라미터를 통해 채용 공고를 검색할 수 있습니다.
- **Query Parameters:**
  - `search` (optional): 채용 공고 검색 키워드, 파라미터가 없을 경우 전체 목록을 조회합니다.
- **Response:**
  - **200 OK:** 채용 공고 목록을 성공적으로 가져왔을 때의 응답.
  - **Body:** `JobPostingResponseDto[]` (채용 공고의 배열)

#### 5. 채용 공고 상세 정보 조회 (요구사항 5)

- **Endpoint:** `GET /job-postings/:id/job_posting_detail`
- **Description:** 특정 채용 공고의 상세 정보를 조회합니다.
- **Path Parameters:**
  - `id`: 조회할 채용 공고의 ID
- **Response:**
  - **200 OK:** 채용 공고 상세 정보를 성공적으로 가져왔을 때의 응답.
  - **Body:** `JobPostingDetailDto`
  - **404 Not Found:** 해당 ID의 채용 공고를 찾을 수 없을 때의 응답.

### 지원자 관리 (요구사항 6)

#### 1. 채용 공고에 지원

- **Endpoint:** `POST /applications`
- **Description:** 특정 채용 공고에 지원합니다.
- **Request Body:** `CreateApplicationDto`
- **Response:**
  - **201 Created:** 채용 공고에 성공적으로 지원했을 때의 응답.
  - **Body:** `CreateApplicationDto`
  - **409 Conflict:** 이미 채용 공고에 지원했을 경우의 응답.

## 마무리와 배운 점

- NestJS를 처음 사용하는 과정은 새로운 도전이었지만, 이러한 도전이 개발자로서 성장을 이끄는 원동력 중 하나라고 믿습니다. 스프링과 비슷한 개념을 가지고 있어서 스프링 개발자에게 친숙하게 다가올 수 있었습니다. 또한 TypeScript와 모듈 시스템을 통한 코드 구성은 코드의 가독성과 재사용성을 높여주었습니다.
