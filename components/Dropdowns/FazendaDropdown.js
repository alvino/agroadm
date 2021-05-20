import React from "react";
import Link from "next/link";
import useSWR from "swr";

import { createPopper } from "@popperjs/core";

import { fetcher } from "../../server/axios";

const FazendaDropdown = () => {
  const { data } = useSWR("fazenda", fetcher);
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  const openDropdownPopover = () => {
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
      <a
        className="hover:text-gray-600 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
        href="#fazendas"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
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
        {!data
          ? null
          : data.map((item, index) => {
              return (
                <Link href={`/admin/${item.id}/dashboard`} key={index}>
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
  );
};

export default FazendaDropdown;
