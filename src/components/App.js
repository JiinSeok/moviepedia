import { getReviews } from "../api";
import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const sortedItems = items.sort((a, b) => b[order] - a[order]); // a, b는 객체

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  const handleDelete = (id) => {
    // 5. handleDelete 함수는 items 배열에서 해당 id를 가진 아이템을 제외한 새로운 배열 nextItems를 생성하고, setItems(nextItems)를 호출하여 상태를 업데이트합니다.
    const nextItems = items.filter((item) => item.id !== id); // id가 일치하지 않는 요소로 새로운 배열
    setItems(nextItems);
  };
  const handleLoad = async (orderQuery) => {
    const { reviews } = await getReviews(orderQuery); // 리스폰스 body의 reviews 값을 destructuring. 비동기로 리스폰스 보내고, 도착하면 reviews 변수 지정
    setItems(reviews); // state 변경 -> 렌더링을 위해 App 컴포넌트 함수 재실행
  };

  useEffect(() => {
    handleLoad(order);
  }, [order]); // 두 번째 아규먼트로 빈 배열 디펜던시 리스트 전달하면 첫 아규먼트 콜백함수는 첫 렌더링 끝나면 비동기 실행됨. 두 번째부터는 디펜던시 리스트를 비교해서 달라진 경우에만 실행하기 때문임. - 특정 값이 바뀔 때마다 실행할 수도 있다.

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
