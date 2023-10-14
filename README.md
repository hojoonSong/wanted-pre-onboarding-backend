# 원티드 프리온보딩 개발과정

## 요구사항 분석

### Model:

- **User:** 시스템 내의 일반 사용자를 나타냅니다. 유일한 식별자로 `id`를 가지고 있습니다.
- **Company:** 기업 정보를 담고 있으며, 기업명과 국가, 지역 정보를 포함합니다.
- **JobPosting:** 특정 기업이 게시한 채용 정보를 담고 있습니다. 채용 포지션, 보상, 콘텐츠 및 사용 기술을 포함합니다.
- **Applicant:** 채용에 지원한 사용자의 정보를 담고 있습니다.

### 기능들:

1. **회사 관리**
   - 회사 정보 생성, 수정, 조회, 삭제
2. **채용 정보 관리**
   - 채용 정보 생성, 수정, 조회, 삭제
3. **지원자 관리**
   - 사용자가 채용 정보에 지원
   - 지원자 목록 조회

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
