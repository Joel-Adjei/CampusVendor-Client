import { ToastContainer } from "react-toastify";
import Router from "./routes";
import React from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

function App() {
  const client = new QueryClient();

  return (
    <>
      <QueryClientProvider client={client}>
        <ToastContainer />
        <Router />
      </QueryClientProvider>
    </>
  );
}

export default App;
