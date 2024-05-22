import { getReviews } from "../api";
import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";

const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const sortedItems = items.sort((a, b) => b[order] - a[order]); // a, b는 객체

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  const handleDelete = (id) => {
    // 5. handleDelete 함수는 items 배열에서 해당 id를 가진 아이템을 제외한 새로운 배열 nextItems를 생성하고, setItems(nextItems)를 호출하여 상태를 업데이트합니다.
    const nextItems = items.filter((item) => item.id !== id); // id가 일치하지 않는 요소로 새로운 배열
    setItems(nextItems);
  };
  const handleLoad = async (options) => {
    const { reviews, paging } = await getReviews(options); // 리스폰스 body의 reviews 값을 destructuring. 비동기로 리스폰스 보내고, 도착하면 reviews 변수 지정
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems([...items, ...reviews]); // 추가로 데이터 불러올 땐 items 배열에 가져온 요소 추가
    }
    setOffset(options.offset + reviews.length); // state 변경 -> 렌더링을 위해 App 컴포넌트 함수 재실행 // 변경 offset = 현재 데이터 로드의 시작 위치 + 이번에 가져온 리뷰 데이터 개수 = 다음 번 데이터 로드가 시작될 위치
    setHasNext(paging.hasNext);
  };

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]); // 두 번째 아규먼트로 빈 배열 디펜던시 리스트 전달하면 첫 아규먼트 콜백함수는 첫 렌더링 끝나면 비동기 실행됨. 두 번째부터는 디펜던시 리스트를 비교해서 달라진 경우에만 실행하기 때문임. - 특정 값이 바뀔 때마다 실행할 수도 있다.

  return (
    // 4. onDelete는 App.js에서 정의된 handleDelete 함수로 연결되어 있으며, item.id를 인자로 받습니다.
    // 부모 컴포넌트인 App.js는 ReviewList 컴포넌트를 렌더링할 때 handleDelete 함수를 onDelete라는 이름의 props로 전달합니다.
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleBestClick}>별점순</button>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      <button disabled={!hasNext} onClick={handleLoadMore}>
        더 보기
      </button>
    </div>
  );
}

export default App;
