import { useEffect, useState } from 'react';

export function useFetch(baseUrl, initalType) {
  const [data, setDate] = useState(null);

  const fetchUrl = type => {
    // users(유저), posts(게시물), todos(할일)
    fetch(baseUrl + '/' + type)
      .then(res => res.json())
      .then(res => setDate(res));
  };

  useEffect(() => {
    fetchUrl(initalType);
  }, []);

  return {
    data,
    fetchUrl,
  };
}
