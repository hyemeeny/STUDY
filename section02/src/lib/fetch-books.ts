import { BookData } from "@/types/types";

// 비동기로 반환하기 때문에 반환값의 타입으로 비동기 결과를 의미하는 Promise 객체 사용
export default async function fetchBooks(q?: string): Promise<BookData[]> {
  let url = `https://onebite-books-server-ebon.vercel.app/book`;

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
