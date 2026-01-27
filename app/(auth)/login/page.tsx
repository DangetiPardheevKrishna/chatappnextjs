import { Suspense } from "react";
import LoginClient from "./Loginclient";
export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginClient />
    </Suspense>
  );
}
