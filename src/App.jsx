import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import router from "./router";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              className: "!bg-white/90 dark:!bg-dark-700/90 !backdrop-blur-xl !border !border-white/20 dark:!border-white/10 !text-gray-900 dark:!text-white",
              style: {
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
              },
              success: {
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;