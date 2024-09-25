import "../globals.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import { SignInForm, SignUpForm } from "./_auth/forms";
import RootLayout from "./_root/RootLayout";
import { Home, NotFound } from "./_root/pages";
import RequireAuthentication from "./_auth/RequireAuthentication";
import { AllUsers, ExploreUsers, Profile } from "./_root/pages/users";
import { DashBoard } from "./_root/pages/admin";

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
            <Route path="/profile/:id/*" element={<Profile />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/explore" element={<ExploreUsers />} />
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
