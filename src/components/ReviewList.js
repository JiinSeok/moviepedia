import Rating from "./Rating";
import "./ReviewList.css";

function formatDate(value) {
  // 숫자형의 날짜를 예쁘게 보여주는 함수
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ReviewListItem({ item, onDelete }) {
  // onDelete 함수가 부모 컴포넌트에서 전달되었다는 것은 ReviewListItem 컴포넌트가 자신의 부모 컴포넌트인 ReviewList를 통해 App.js에서 정의된 handleDelete 함수를 props로 전달받아 사용하고 있다
  // ReviewList 컴포넌트는 ReviewListItem 컴포넌트를 렌더링할 때, onDelete props를 다시 ReviewListItem 컴포넌트로 전달합니다.
  // 3. handleDeleteClick 함수는 부모 컴포넌트에서 전달된 onDelete 함수를 호출하며, item.id를 인자로 전달
  const handleDeleteClick = () => onDelete(item.id);

  return (
    // 1. 사용자가 ReviewListItem 컴포넌트의 삭제 버튼을 클릭. 2. 삭제 버튼의 onClick 이벤트가 발생하고, handleDeleteClick 함수가 호출.
    // ReviewListItem 컴포넌트는 onDelete 함수를 props로 받아서, 삭제 버튼의 클릭 이벤트 핸들러로 사용
    // 버튼을 클릭하면 handleDeleteClick 함수를 통해 onDelete 함수가 호출되며, 이 함수는 부모 컴포넌트에서 정의된 handleDelete 함수
    <div className='ReviewListItem'>
      <img className='ReviewListItem-img' src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <Rating value={item.rating} />
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </div>
  );
}

function ReviewList({ items, onDelete }) {
  // 6. items 상태가 변경되면 리액트는 컴포넌트를 다시 렌더링하고, 최신 상태를 반영한 ReviewList 컴포넌트가 렌더링됩니다. 7. 결과적으로, 삭제된 아이템이 화면에서 사라지게 됩니다.
  return (
    <ul>
      {items.map(
        (
          item // map 메소드 콜백함수 안에서 JSX를 리턴하면 JSX를 여러 개 추가한 것처럼 동작. 많은 데이터 보여줄 때.
        ) => (
          <li key={item.id}>
            <ReviewListItem item={item} onDelete={onDelete} />
          </li>
        )
      )}
    </ul>
  );
}

export default ReviewList;
