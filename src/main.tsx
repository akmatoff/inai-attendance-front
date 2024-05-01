// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20000,
      gcTime: 60000 * 3,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
