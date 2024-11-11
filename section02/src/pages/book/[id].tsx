import Image from "next/image";
import s from "@/pages/book/[id].module.scss";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
    // false : 404 Notfound
    // blocking : SSR 방식
    // true : SSR 방식 + fallback 상태의 페이지(Props 데이터가 없는 상태의 페이지)부터 생성해 보내 줌

    // fallback: "blocking", // 모든 도서를 불러와야하는 상황이나 또는 새로운 데이터(새로운 도서)가 계속 추가되어야 하는 상황에 사용 가능
    // 처음 요청에는 SSR방식으로 페이지를 새롭게 생성하여 신규 데이터 반영
    // 이후 요청에는 SSG방식으로 저장된 데이터를 빠르게 반영
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id; // ! 단언으로 undefined가 아니라고 단언
  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요!"
        />
      </Head>
      <div>로딩 중입니다.</div>
    </>;
  }
  if (!book) return "문제가 발생했습니다. 다시 시도해주세요.";

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <div className={s.container}>
        <div
          className={s.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <Image src={coverImgUrl} width={275} height={350} alt={title} />
        </div>
        <div className={s.title}>{title}</div>
        <div className={s.subTitle}>{subTitle}</div>
        <div className={s.author}>
          {author} | {publisher}
        </div>
        <div className={s.description}>{description}</div>
      </div>
    </>
  );
}
