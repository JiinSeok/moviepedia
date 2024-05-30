import { createReview, deleteReview, getReviews, updateReview } from '../api';
import useAsync from '../hooks/useAsync';
import { LocaleProvider } from '../contexts/LocaleContext';
import LocaleSelect from './LocaleSelect';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import { useCallback, useEffect, useState } from 'react';

const LIMIT = 5;

function App() {
  console.log('App 실행')

  const [items, setItems] = useState([]);
  const [order, setOrder] = useState('createdAt');
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews); // 실행한 pending 상태, error 상태, getReviewsAsync = wrappedFunction (API 함수 실행 함수)를 리턴 받음

  const sortedItems = items.sort((a, b) => b[order] - a[order]); // a, b는 객체

  const handleNewestClick = () => setOrder('createdAt');

  const handleBestClick = () => setOrder('rating');

  const handleDelete = async (id) => {
    const result = await deleteReview(id);
    if (!result) return;

    // 5. handleDelete 함수는 items 배열에서 해당 id를 가진 아이템을 제외한 새로운 배열 nextItems를 생성하고, setItems(nextItems)를 호출하여 상태를 업데이트합니다.
    setItems((prevItems) => prevItems.filter((item) => item.id !== id)); // 비동기 + 상태변경은 콜백으로. id가 일치하지 않는 요소로 새로운 배열 구성.
  };

  const handleLoad = useCallback(async (options) => { // handleLoad는 호출할 때마다 렌더링하는 함수. options는 객체 파라미터
    console.log('handleLoad 실행')
    const result = await getReviewsAsync(options); // 리턴 받은 함수로 try...catch 로딩, 에러 처리
    console.log('getReviewsAsync 실행')
    if (!result) return; // undefined 리턴 (에러) 받으면 종료 (아래 코드 실행 X)

    const { reviews, paging } = result;
    // 리스폰스 body의 reviews 값을 destructuring. 비동기로 리스폰스 보내고, 도착하면 reviews 변수 지정
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]); // 추가로 데이터 불러올 땐 items 배열에 가져온 요소 추가
    }
    setOffset(options.offset + reviews.length); // state 변경 -> 렌더링을 위해 App 컴포넌트 함수 재실행 // 변경 offset = 현재 데이터 로드의 시작 위치 + 이번에 가져온 리뷰 데이터 개수 = 다음 번 데이터 로드가 시작될 위치
    setHasNext(paging.hasNext);
  }, [getReviewsAsync]); //useCallback(고정할 함수, [디펜던시 리스트]) 함수 리턴

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  const handleCreateSuccess = (newItem) => {
    setItems((prevItems) => [newItem, ...prevItems]); // 비동기 함수에서 이전 스테이트 사용하려면 콜백함수 활용
  };

  const handleUpdateSuccess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order, handleLoad]); // 두 번째 아규먼트로 빈 배열 디펜던시 리스트 전달하면 첫 아규먼트 콜백함수는 첫 렌더링 끝나면 비동기 실행됨. 두 번째부터는 디펜던시 리스트를 비교해서 달라진 경우에만 실행하기 때문임. - 특정 값이 바뀔 때마다 실행할 수도 있다.

  console.log('App 리턴')
  return (
    // 4. onDelete는 App.js에서 정의된 handleDelete 함수로 연결되어 있으며, item.id를 인자로 받습니다.
    // 부모 컴포넌트인 App.js는 ReviewList 컴포넌트를 렌더링할 때 handleDelete 함수를 onDelete라는 이름의 props로 전달합니다.
    <LocaleProvider defaultValue={'ko'}> 
      <div>
        <LocaleSelect />
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>별점순</button>
        <ReviewForm
          onSubmit={createReview}
          onSubmitSuccess={handleCreateSuccess}
        />
        <ReviewList // ReviewForm에 prop 전달
          items={sortedItems}
          onDelete={handleDelete}
          onUpdate={updateReview}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {hasNext && (
          <button disabled={isLoading} onClick={handleLoadMore}>
            더 보기
          </button>
        )}
        {loadingError?.message && <span>{loadingError.message}</span>}
      </div> 
    </LocaleProvider>
    // 옵셔널 체이닝(?.): loadingError가 null 또는 undefined가 아니면 loadingError.message를 평가하고, 그렇지 않으면 평가를 멈추고 undefined를 반환합니다.
  ); // 조건부 렌더링 - hasNext 참일 때 뒤의 조건을 계산해서 값을 사용(버튼 렌더링), 거짓일 때는 앞의 조건(false)
}

export default App;
