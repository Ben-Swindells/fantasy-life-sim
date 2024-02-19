import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { prefabPages } from "./pages.tsx";
import { PrefabLayout } from "./layouts/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<App />} />
        {prefabPages.map((page, index) => {
          return (
            <Route
              key={index}
              path={page.path}
              element={<PrefabLayout>{page.scene}</PrefabLayout>}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
