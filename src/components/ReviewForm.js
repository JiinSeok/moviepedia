import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import { createReview } from "../api";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm({ onSubmitSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const [values, setValues] = useState(INITIAL_VALUES);

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

  const handleSubmit = async (e) => { // 비동기 함수로 변경
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('rating', values.rating);
    formData.append('content', values.content);
    formData.append('imgFile', values.imgFile);

    let result;
    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      result = await createReview(formData); // POST 리퀘스트 함수로 전달
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }
    const { review } = result;
    onSubmitSuccess(review);
    setValues(INITIAL_VALUES); // 리퀘스트 후 폼 초기화
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
      <RatingInput
        name='rating'
        type='number'
        value={values.rating}
        onChange={handleChange}
      />
      <></>
      <textarea
        name='content'
        value={values.content}
        onChange={handleInputChange}
      />
      <button type='submit' disabled={isSubmitting}>확인</button>
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
}

export default ReviewForm;
