# [React] Todo Application

### [1] Initialize project using Create React App
* 할 일의 목록을 보여주고, 새로운 할 일을 등록하는 애플리케이션

### [2] Server 구축 + fetching Data | README.md 수정 | App.js 수정
* 서버에 데이터 요청하고 서버에서 가져온 데이터 나타내기
(TodoList의 초기 데이터 = initialTodoData.js는 임시로 작성한 데이터이며, 추후 MySQL DB 연동 예정)

### [3] Todo의 Done상태 & UndoneTasks 표현
* TodoList 목록의 특정 Todo를 클릭하면 완료/미완료 표현하기
* 각 Todo의 done 속성값(true는 완료, false는 미완료)따라 남은 할 일의 개수 표현하기

### [4] Context API & useContext + useRef
* Form 컴포넌트에서 input 태그에 입력한 값을 전달하는 방식을 useRef를 사용하여 수정
* useContext를 이용해 하위 컴포넌트들이 todos 정보에 접근할 수 있도록 수정
* <버그 발견>
  * 원인 : TodoCode의 형식과 타입이 잘못되었다.
    todoCode는 YYYYMMDDN.. 형식의 문자열이어야 한다.
    하지만 새로 추가된 todo의 todoCode는 todos 목록에서의 순서를 의미하는 숫자 타입이다.
  * 해결방법 : 오늘에 해당하는 할 일만 렌더링되도록 todo application을 수정하고, todoCode형식도 변경해준다.

### [5] 버그 수정  +  오늘의 TodoList 보기
* Header 컴포넌트에 날짜 & 요일 표현 추가
* 해당 날짜에 대한 Todo 목록 불러오기
* 새로운 항목 추가 시 올바른 todoCode 적용
* 할 일의 완료/미완료 상태 표현 기능 버그 수정 완료

### [6] TodoList 기능 구현  +  DB 연결 전 Save
Todo 추가/수정/삭제/완료상태 표현 기능 구현 미완성
* 추가 (완료)
* 수정 (미완료)
* 삭제 (미완료)
* 완료상태 표현 (완료)

### [7] DB 연결
* Database : MySQL
* 런타임 환경 : Express
#### DB <---> Server
* 1) Node.js MySQL Module version
* 2) Sequelize version

### [8] 버그 수정
1. 남은 할 일 제대로 count 못하는 버그
* 원인 : DB에 false값은 "0", true값을 "1"로 저장됨
* 해결 : Header.jsx의 undoneTasks의 filter 조건을 false가 아닌 "0" 즉, todo.done === "0"으로 변경
2. PREV NEXT 버튼을 눌러 날짜 조정 시, 날짜에 맞는 TODO 목록 렌더링 안되는 버그
* 원인 : when의 변화를 감지하지 못함
* 해결 : useFetch 에 when을 전달하여 useEffect 훅에서 when에 변화가 있을 때마다 fetchInitialData를 호출하도록 지정

### [9] 버그 수정  +  POST : 새로운 Todo 추가 기능  +  DELETE : Todo 삭제 기능
0. 버그는 아니지만 나중에 문제될까봐 미리 수정
* MySQL 데이터베이스에는 BOOLEAN TYPE은 TINYINT(1) 형식으로 정의
* 즉, FALSE 값은 "0" 으로,TRUE 값은 "1" 로 저장
* initialTodoData에서 boolean 값으로 저장된 속성은 done, edit, delete 3가지가 존재
* 이 3가지 속성에 해당하는 값을 false/true 대신 "0"/"1"로 변경
1. 버그 1 ) EDIT 버튼 첫 클릭에 반응하지 않음
* 원인 : 반대로 생각해서 코드 작성 & "0"/"1"가 아닌 false/true 값 때문인 것으로 예상
* 영향 : 이 것 때문에 edit 속성값 얽히는 문제 발생
2. 새로운 Todo 추가 기능 구현
* POST API 작성
* React, Express, MySQL 작업 완료
3. Todo 삭제 기능 구현
* DELETE API 작성
* React, Express, MySQL 작업 완료
