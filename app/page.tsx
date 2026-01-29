import { Suspense } from "react";
import ChatPageClient from "./chatpageclient";

export default function Page() {
  return (
    <Suspense fallback={<div className="h-dvh" />}>
      <ChatPageClient />
    </Suspense>
  );
}
