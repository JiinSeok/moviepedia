import ReviewList from "./ReviewList";
import mockitems from "../mock.json";
import { useState } from "react";

function App() {
  const [items, setItems] = useState(mockitems);
  const [order, setOrder] = useState("createdAt");
  const sortedItems = items.sort((a, b) => b[order] - a[order]); // a, b는 객체

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  const handleDelete = (id) => {
    // 5. handleDelete 함수는 items 배열에서 해당 id를 가진 아이템을 제외한 새로운 배열 nextItems를 생성하고, setItems(nextItems)를 호출하여 상태를 업데이트합니다.
    const nextItems = items.filter((item) => item.id !== id); // id가 일치하지 않는 요소로 새로운 배열
    setItems(nextItems);
  };

  return (
    // 4. onDelete는 App.js에서 정의된 handleDelete 함수로 연결되어 있으며, item.id를 인자로 받습니다.
    // 부모 컴포넌트인 App.js는 ReviewList 컴포넌트를 렌더링할 때 handleDelete 함수를 onDelete라는 이름의 props로 전달합니다.
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleBestClick}>별점순</button>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
}

export default App;
