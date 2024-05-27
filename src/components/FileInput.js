import { useEffect, useRef, useState } from "react";

function FileInput({ name, value, onChange }) {
  // onChange를 name과 value로 호출
  // State Lifting: state 직접 사용 대신 부모 컴포넌트 state를 props로 사용
  const [preview, setPreview] = useState();
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  // useEffect(() => {
  //   if (inputRef.current) {
  //     console.log(inputRef);
  //   }
  // }, []);

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    // 컴포넌트 함수에서 네트워크 리퀘스트, 메모리 할당 같은 외부의 상태를 변경(사이드이펙트)할 때 사용
    if (!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);
  }, [value]);

  return (
    // FileInput은 비제어 컴포넌트. input 태그에 value prop을 지정할 수 없다 - 보안
    <div>
      <img src={preview} alt='이미지 미리보기' />
      <input type='file' onChange={handleChange} ref={inputRef} />;
      {value && <button onClick={handleClearClick}>초기화</button>}
    </div>
  );
}
export default FileInput;
