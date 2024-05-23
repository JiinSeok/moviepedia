import { useState } from "react";
import "./ReviewForm.css";

function ReviewForm() {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleRatingChange = (e) => {
    const nextRating = Number(e.target.value) || 0; // false면 오른쪽
    setRating(nextRating);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    // onChange js 사용자 입력 끝났을 때, React-jsx 사용자가 입력할 때마다
    <form className='ReviewForm'>
      <input value={title} onChange={handleTitleChange} />
      <input type='number' value={rating} onChange={handleRatingChange} />
      <textarea value={content} onChange={handleContentChange} />
    </form>
  );
}

export default ReviewForm;
