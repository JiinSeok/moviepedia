import { useCallback, useState } from "react";

function useAsync(asyncFunction) { // API 함수를 전달하면 비동기 + 로딩 + 에러 처리해서 실행, 리턴하는 함수
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = useCallback(async (...args) => { // asyncFunction 실행하는 함수 (원하는 기능 씌워진)
    try {
      setError(null);
      setPending(true);
      return await asyncFunction(...args); // API 함수
    } catch (error) {
      setError(error);
      return; // 에러 나면 종료 (undefined 리턴)
    } finally {
      setPending(false);
    }
  }, [asyncFunction]); // setter 함수는 바뀌면 이 함수가 아니라 리액트가 재렌더링되기 때문에 디펜던시 리스트에 넣을 필요 X

  return [pending, error, wrappedFunction]; // 로딩상태, 에러, try catch 콜백 실행할 수 있는 함수를 배열로 리턴
}

export default useAsync;