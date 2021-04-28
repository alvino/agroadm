import React from "react";
import Link from "next/link";
import useSWR from "swr";

import { createPopper } from "@popperjs/core";

import axios from "../../server/axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const LinkDropdown = (props) => {
  const handleOnClick = () => {
    sessionStorage.setItem("fazenda", JSON.stringify(props.data));
  };

  return (
    <>
      <Link href={props.href}>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
          }
          onClick={handleOnClick}
        >
          {props.children}
        </a>
      </Link>
    </>
  );
};

const FazendaDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  const { data } = useSWR("fazenda", fetcher);

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
        href="#pablo"
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
          ? ""
          : data.map((item, index) => {
              return (
                <LinkDropdown key={index} href={`/admin/dashboard`} data={item}>
                  {item.descricao}
                </LinkDropdown>
              );
            })}
      </div>
    </>
  );
};

export default FazendaDropdown;
