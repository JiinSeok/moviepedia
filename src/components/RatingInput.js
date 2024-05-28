import { useState } from "react";
import Rating from "./Rating";
import './RatingInput.css';

function RatingInput({ name, value, onChange}){ // 인풋 이름, 값, 선택했을 때 실행할 함수
  const [rating, setRating] = useState(value); // 선택한/마우스오버한 별점을 보여줌

  const handleSelect = (nextValue) => onChange(name, nextValue); // onChane 함수에 nextValue 넣는 함수.

  const handleMouseOut = () => setRating(value); // 마우스 벗어남 -> 다시 value 보여줌

  return <Rating className='RatingInput' value={rating} onSelect={handleSelect} onHover={setRating} onMouseOut={handleMouseOut} /> // 선택할 때 해당값 선택, 마우스 올릴 때 이미 선택된 것처럼 미리보기, 영역 벗어나면 미리보기 대신 현재값
}

export default RatingInput;