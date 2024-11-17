"use client";
import { useEffect } from "react";

export const Redirect = ({ url }: { url: string }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return null;
};
