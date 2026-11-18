import { Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";

const PublicLayout = () => (
  <div className="min-h-screen">
    <PublicNavbar />
    <main className="mx-auto max-w-6xl p-4 md:p-8">
      <Outlet />
    </main>
  </div>
);

export default PublicLayout;