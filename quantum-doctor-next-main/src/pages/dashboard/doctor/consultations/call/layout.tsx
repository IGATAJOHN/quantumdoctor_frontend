import React from "react";
export default function CallLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#3b392d]">
      {children}
    </div>
  );
}

