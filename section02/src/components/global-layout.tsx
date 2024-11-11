import Link from "next/link";
import { ReactNode } from "react";
import { Noto_Sans_KR } from "next/font/google";
import s from "@/components/global-layout.module.scss";
import classNames from "classnames";

const notoSansKr = Noto_Sans_KR({ subsets: ["latin"] });

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={classNames(notoSansKr.className, s.container)}>
      <header className={s.header}>
        <Link href={"/"}>📚 ONEBITE BOOKS</Link>
      </header>
      <main className={s.main}>{children}</main>
      <footer className={s.footer}>제작 @hyemeeny</footer>
    </div>
  );
}
