import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import { store } from "./redux/store/index.tsx";
import { SocketProvider } from "./context/SocketProvider.tsx";

const clientId = import.meta.env.VITE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Provider store={store}>
        <GoogleOAuthProvider clientId={clientId}>
          <Toaster richColors position="top-center" />
          <SocketProvider>
            <App />
          </SocketProvider>
        </GoogleOAuthProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
