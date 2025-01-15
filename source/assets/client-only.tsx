"use client";
import { useEffect, useState } from "react";

export const ClientOnly = ({
  children,
  state = true
}: {
  children: React.ReactNode;
  state?: boolean;
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (state && !mounted) return null;

  return <>{children}</>;
};
