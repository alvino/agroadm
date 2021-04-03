import React from "react";
import Link from "next/link";
import { createPopper } from "@popperjs/core";

import fb from "../../server/firebase";
import { isPropertySignature } from "typescript";

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

const IndexDropdown = () => {
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

  const [fazendas, setFazendas] = React.useState([]);

  React.useEffect(() => {
    async function init() {
      const db = fb.firestore();

      const fazendaRef = db.collection("fazenda");

      const snapshot = await fazendaRef.get();

      const data = await snapshot.docs.map((item) => ({
        id: item.id,
        path: item.ref.path,
        ...item.data(),
      }));
      setFazendas(data);
    }

    init();
  }, []);

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
        {fazendas.map((item, index) => {
          return (
            <LinkDropdown key={index} href={`/admin/dashboard`} data={item}>
              {item.descricao}
            </LinkDropdown>
          );
        })}

        {/* <LinkDropdown href="/admin/dashboard">Dashboard</LinkDropdown>
        <LinkDropdown href="/admin/settings">Settings</LinkDropdown>
        <LinkDropdown href="/admin/tables">Tables</LinkDropdown>
        <LinkDropdown href="/admin/maps">Maps</LinkDropdown>
        <div className="h-0 mx-4 my-2 border border-solid border-gray-200" />
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-no-wrap bg-transparent text-gray-500"
          }
        >
          Auth Layout
        </span>
        <Link href="/auth/login">
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }
          >
            Login
          </a>
        </Link>
        <Link href="/auth/register">
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }
          >
            Register
          </a>
        </Link>
        <div className="h-0 mx-4 my-2 border border-solid border-gray-200" />
        <span
          className={
            "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-no-wrap bg-transparent text-gray-500"
          }
        >
          No Layout
        </span>
        <Link href="/landing">
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }
          >
            Lading
          </a>
        </Link>
        <Link href="/profile">
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }
          >
            Profile
          </a>
        </Link> */}
      </div>
    </>
  );
};

export default IndexDropdown;
