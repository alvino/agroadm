import React from "react";
import Link from "next/link";

import { createPopper } from "@popperjs/core";

import { useAxios } from "server/axios";

export default function FazendaDropdown() {
  const { data, loading } = useAxios("fazenda");
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  const openDropdownPopover = (props) => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <>
      {loading && (
        <sapn className="text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
          carregando...
        </sapn>
      )}
      {data && (
        <>
          <a
            className="hover:text-gray-600 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
            href="#fazendas"
            ref={btnDropdownRef}
            onClick={(e) => {
              e.preventDefault();
              dropdownPopoverShow
                ? closeDropdownPopover()
                : openDropdownPopover();
            }}
          >
            Fazendas
          </a>
          <div
            ref={popoverDropdownRef}
            className={
              (dropdownPopoverShow ? "block " : "hidden ") +
              "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
            }
          >
            {data.map((item, index) => {
              return (
                <Link href={`/admin/${item.slug}/dashboard`} key={index}>
                  <a
                    href={`#${item.descricao}`}
                    className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
                  >
                    {item.descricao}
                  </a>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
