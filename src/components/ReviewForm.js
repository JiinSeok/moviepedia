import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";

function ReviewForm() {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
    imgFile: null,
  });

  const handleChange = (name, value) => {
    setValues((preValues) => ({
      ...preValues,
      [name]: value, // 표현식 [name의 값으로 프로퍼티명 지정하고 value에 해당하는 값 지정 가능.
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    // onChange js 사용자 입력 끝났을 때, React-jsx 사용자가 입력할 때마다
    <form className='ReviewForm' onSubmit={handleSubmit}>
      <FileInput
        name='imgFile'
        value={values.imgFile}
        onChange={handleChange}
      />
      <input name='title' value={values.title} onChange={handleInputChange} />
      <input
        name='rating'
        type='number'
        value={values.rating}
        onChange={handleInputChange}
      />
      <textarea
        name='content'
        value={values.content}
        onChange={handleInputChange}
      />
      <button type='submit'>확인</button>
    </form>
  );
}

export default ReviewForm;
