import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
// import {
//   GetServerSidePropsContext,
//   GetStaticPropsContext,
//   InferGetServerSidePropsType,
// } from "next";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types/types";
import Head from "next/head";

// export const getStaticProps = async (
//   context: GetStaticPropsContext
// ) => {
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);

//   return {
//     props: { books },
//   };
// };

/**
 * 기본적으로 SSG 방식으로 동작한다.
 * 쿼리스트링으로 전달되는 검색어를 빌드타임에는 알 수 없기 때문에 사전 렌더링 과정에서는 레이아웃만 렌더링하게 된다. => SSG 방식으로는 동적 api를 불러올 수 없다.
 * Page 컴포넌트가 마운트 된 이후에 클라이언트 사이드(브라우저) 측에서 컴포넌트가 다시 실행되면서 클라이언트 사이드 방식으로 데이터를 불러와 렌더링한다.
 */
export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  useEffect(() => {
    const fetchSearchResult = async () => {
      const data = await fetchBooks(q as string);
      setBooks(data);
    };

    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스 - 검색결과" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요!"
        />
      </Head>

      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
