import "../globals.css";
import { Route, Routes } from "react-router-dom";
import { AuthLayout, RequireAuthentication, RequireSuperAdmin } from "./_auth";
import { SignInForm, SignUpForm } from "./_auth/forms";
import RootLayout from "./_root/RootLayout";
import { Home, NotFound, Unauthorized } from "./_root/pages";
import { AllUsers, ExploreUsers, Profile } from "./_root/pages/users";
import {
  AutoDeleteUser,
  CreateUser,
  DashBoard,
  ManageRoles,
  UpgradeUser,
} from "./_root/pages/admin";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/**  Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
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
        </Route>

        {/** Super Admin Routes */}
        <Route element={<RequireSuperAdmin />}>
          <Route path="/admin/create-user" element={<CreateUser />} />
          <Route path="/admin/update-user" element={<UpgradeUser />} />
          <Route path="/admin/manage-roles" element={<ManageRoles />} />
          <Route path="/admin/delete-user" element={<AutoDeleteUser />} />
        </Route>

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default App;
