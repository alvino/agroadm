import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

// import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { fetcher } from "../../server/axios";

export default function Navbar() {
  const router = useRouter();
  const { fazenda } = router.query;

  const { data } = useSWR(`fazenda?fazenda=${fazenda}`, fetcher);
  const { data: session } = useSWR(`auth/session`, fetcher);

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
        {session && (
          <div className="items-center flex">
            <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
              <img
                alt="..."
                className="w-full rounded-full align-middle border-none shadow-lg"
                src={session.user.image}
              />
            </span>
            <div className="text-white text uppercase hidden lg:inline-block font-semibold  mx-4">
              {session.user.name}
            </div>
          </div>
        )}
      </nav>
      {/* End Navbar */}
    </>
  );
}
