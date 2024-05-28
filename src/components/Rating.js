import './Rating.css';

const RATINGS = [1, 2, 3, 4, 5]; // 각 별점의 값을 요소로 하는 배열 -> key

function Star({ selected = false, rating = 0, onSelect, onHover }) { // 별 선택 여부, hover/click 핸들러 설정하는 props
  const className = `Rating-star ${selected ? 'selected' : ''}`;

  const handleClick = onSelect ? () => onSelect(rating) : undefined; // 삼항연산자: onSelect 있으면 함수 : 없으면 undefined 반환
  // 별점을 보여주기만 하는 컴포넌트에는 onSelect 값이 없어서 아무 동작 X (undefined)

  const handleMouesOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouesOver}
    >
      ★
    </span>
  );
}

function Rating({ className, value = 0, onSelect, onHover, onMouseOut }) { // 전체 리스트의 별점, 이벤트핸들러 전달
  return (
    <div className={className} onMouseOut={onMouseOut}> 
      {RATINGS.map((rating) => (
        <Star
          key={rating}
          selected={value >= rating} // 클릭되어 있는 값을 별표 하는 용도
          rating={rating}
          onSelect={onSelect} // 별점 인풋 클릭한 값으로 실행
          onHover={onHover} // 별점 인풋 마우스 올린 값으로 실행
        />
      ))}
    </div>
  );
}

export default Rating;
