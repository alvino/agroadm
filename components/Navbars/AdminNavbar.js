import React from "react";
import { useRouter } from "next/router";

// import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { useAxios } from "server/axios";

function AdminNavbar() {
  const router = useRouter();
  const { fazenda } = router.query;

  // const [defaultValue, setDefaultValue] = React.useState("dashboard");
  const { data: fazendas } = useAxios(`fazenda`);

  const fazendaRef = React.useRef();

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-no-wrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <select
            className="text-white lg:inline-block font-semibold bg-gray-900"
            ref={fazendaRef}
            value={fazenda}
            onChange={() => {
              const value = fazendaRef.current.value;
              if (value !== "dashboard")
                router.push(`/admin/${value}/dashboard`);
            }}
          >
            {!fazendas ? (
              <option value="dashboard">Dashboard</option>
            ) : (
              fazendas.map((item, index) => {
                // if (item.slug === fazenda) setDefaultValue(item.slug);
                return (
                  <option
                    key={index}
                    value={item.slug}
                    // selected={item.slug === fazenda}
                  >
                    {item.descricao}
                  </option>
                );
              })
            )}
          </select>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}

export default AdminNavbar;
