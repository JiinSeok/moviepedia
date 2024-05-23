import { useState } from "react";
import "./ReviewForm.css";

function ReviewForm() {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((preValues) => ({
      ...preValues,
      [name]: value, // 표현식 [name의 값으로 프로퍼티명 지정하고 value에 해당하는 값 지정 가능.
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    // onChange js 사용자 입력 끝났을 때, React-jsx 사용자가 입력할 때마다
    <form className='ReviewForm' onSubmit={handleSubmit}>
      <input name='title' value={values.title} onChange={handleChange} />
      <input
        name='rating'
        type='number'
        value={values.rating}
        onChange={handleChange}
      />
      <textarea name='content' value={values.content} onChange={handleChange} />
      <button type='submit'>확인</button>
    </form>
  );
}

export default ReviewForm;
