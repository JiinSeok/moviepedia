### 삭제 버튼의 동작 원리

사용자가 삭제 버튼을 누르면 handleDeleteClick이 실행되고,
onDelete 함수를 item의 id 값으로 실행합니다.
이때 onDelete 함수를 보면 ReviewList 컴포넌트의 onDelete prop이고,
이 prop은 다시 App 컴포넌트에서 handleDelete 함수죠.

즉 버튼을 누르면 App 컴포넌트의 handleDelete 함수의 파라미터로 해당 요소의 id가 전달되고,
이 id를 바탕으로 filter 함수로 걸러낸 배열이 새로운 State 값으로 변경되는 겁니다.
