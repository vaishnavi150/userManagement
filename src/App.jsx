import { useState } from "react";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Loading from "./common/Loading";
import ErrorPage from "./common/ErrorPage";

const Dashboard = lazy(()=>import("./components/Dashboard"))
const AddUsers = lazy(()=>import("./components/AddUsers"))
const Edit = lazy(()=>import("./components/Edit"))

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <ErrorBoundary FallbackComponent={({ error }) => <ErrorPage statusCode={error.statusCode || "500"} message={error.message || "An unexpected error occurred."} />}>
           
            <Routes>
            <Route path="/" element={ <Dashboard/>} />  
            <Route path="/addusers" element={<AddUsers/>} />
            <Route path="/edit/:id" element={<Edit/>}/>
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
