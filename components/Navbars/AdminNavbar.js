import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { signOut } from "next-auth/client";

// import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { fetcher } from "../../server/axios";

export default function Navbar() {
  const router = useRouter();
  const { fazenda } = router.query;

  const { data } = useSWR(`fazenda?fazenda=${fazenda}`, fetcher);

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-no-wrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <button
            className="text-white text uppercase hidden lg:inline-block font-semibold"
            onClick={(e) => e.preventDefault()}
          >
            {!data ? "Dashboard" : data.descricao}
          </button>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
