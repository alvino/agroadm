import React from "react";
import { useRouter } from "next/router";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import HeaderDefault from "components/Headers/HeaderDefault.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

export default function Admin({ children }) {
  const router = useRouter();
  const { fazenda } = router.query;

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        {/* Header */}
        {router.pathname.includes("dashboard") ? (
          <HeaderStats />
        ) : (
          <HeaderDefault />
        )}

        <div className="px-4 md:px-10 mx-auto w-full -m-16">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
