"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// 共有レイアウト(ヘッダー)があるため、Next.jsのデフォルトではページ遷移時に
// ページセグメントの先頭(ヘッダーの下)までしかスクロールされない。
// パスが変わったらウィンドウの最上部までスクロールする。
// 戻る/進む(popstate)のときはブラウザのスクロール位置復元に任せる。
export const ScrollToTop = () => {
  const pathname = usePathname();
  const isPopState = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      isPopState.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (isPopState.current) {
      isPopState.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
