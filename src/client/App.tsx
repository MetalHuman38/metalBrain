import "../globals.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import { SignInForm, SignUpForm } from "./_auth/forms";
import RootLayout from "./_root/RootLayout";
import { Home } from "./_root/pages";
import RequireAuthentication from "./_auth/RequireAuthentication";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/**  Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>

        {/**  Private Routes */}
        <Route element={<RequireAuthentication />}>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </main>
  );
};

export default App;
