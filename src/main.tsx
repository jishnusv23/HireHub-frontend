import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import { store } from "./redux/store/index.tsx";
// import Apps from "./Apps.tsx";
const clientId = import.meta.env.VITE_CLIENT_ID;
// console.log("🚀 ~ file: main.tsx:11 ~ clientId:", clientId)
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>
        <GoogleOAuthProvider clientId={clientId}>
          <Toaster richColors position="top-center" />

          <App />
          {/* <Apps /> */}
        </GoogleOAuthProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
