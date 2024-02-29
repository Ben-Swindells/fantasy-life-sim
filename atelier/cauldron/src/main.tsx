import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { prefabPages } from "./pages.tsx";
import { PrefabLayout } from "./layouts/index.tsx";
import { Provider } from "react-redux";
import { store } from "@toolbelt/redux/store.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
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
  </Provider>
);
