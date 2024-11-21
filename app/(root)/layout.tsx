import Navbar from "@/components/auth/Navbar";
import React from "react";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
