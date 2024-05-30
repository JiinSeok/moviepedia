import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import { createReview } from "../api";
import useAsync from "../hooks/useAsync";
import useTranslate from "../hooks/useTranslate";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm({ initialPreview, initialValues = INITIAL_VALUES, onSubmit, onSubmitSuccess, onCancel }) {
  const t = useTranslate();

  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);
  
  const [values, setValues] = useState(initialValues);

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

    const result = await onSubmitAsync(formData); // POST API 실행하고 로딩, 에러 처리하는 함수
    if (!result) return;

    const { review } = result;
    onSubmitSuccess(review);
    setValues(INITIAL_VALUES); // 리퀘스트 후 폼 초기화
  };

  return (
    // onChange js 사용자 입력 끝났을 때, React-jsx 사용자가 입력할 때마다
    <form className='ReviewForm' onSubmit={handleSubmit}>
      <FileInput
        name='imgFile'
        initialPreview={initialPreview}
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
      <textarea
        name='content'
        value={values.content}
        onChange={handleInputChange}
      />
      {onCancel && <button onClick={onCancel}>{t('cancel button')}</button>}
      <button type='submit' disabled={isSubmitting}>{t('confirm button')}</button>
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
}

export default ReviewForm;
