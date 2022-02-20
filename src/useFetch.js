import React, { useEffect, useState } from 'react';

// Custom Hook
const useFetch = (callback, url) => {
  // loading
  const [loading, setLoading] = useState(false);

  // ---- fetching Data X useEffect ---- //
  // todolist 초기 데이터를 가져오는 함수
  const fetchInitialData = async () => {
    setLoading(true);
    const response = await fetch(url);
    const initialData = await response.json();
    callback(initialData);
    setLoading(false);
  }

  // - useEffect의 콜백함수에는 비동기 처리 로직을 직접 작성하면 X
  // - 빈 deps 배열 []은 useEffect가 componentDidMount()처럼 한 번만 실행되는 것을 의미
  useEffect(()=>{
    fetchInitialData();
  }, []);

  return loading;
}

export default useFetch;