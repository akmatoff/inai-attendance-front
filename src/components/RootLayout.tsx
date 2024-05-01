import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <main className="light text-foreground bg-background min-h-screen w-screen">
      <Outlet />
    </main>
  );
}
