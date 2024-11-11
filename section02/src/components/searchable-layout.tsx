import { useRouter } from "next/router";
import {
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import s from "@/components/searchable-layout.module.scss";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return; // 예외처리
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <div className={s.searchbar_container}>
        <input
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          placeholder="검색어를 입력하세요 ..."
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
