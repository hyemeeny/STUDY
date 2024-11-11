import type { BookData } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import s from "@/components/book-item.module.scss";

export default function BookItem({
  id,
  title,
  subTitle,
  author,
  publisher,
  coverImgUrl,
}: BookData) {
  return (
    <Link href={`/book/${id}`} className={s.container}>
      <div className={s.coverImgUrl}>
        <Image src={coverImgUrl} fill alt={title} />
      </div>
      <div>
        <div className={s.title}>{title}</div>
        <div className={s.subTitle}>{subTitle}</div>
        <br />
        <div className={s.author}>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}
