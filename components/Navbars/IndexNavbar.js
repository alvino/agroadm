import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";
// components

import FazendaDropdown from "components/Dropdowns/FazendaDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [session] = useSession();

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className="text-gray-800 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase"
                href="#pablo"
              >
                GPS
              </a>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {!session && (
                <>
                  <li className="flex items-center">
                    <button
                      className="hover:text-gray-600 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                      onClick={() => signIn("google")}
                    >
                      Sign in
                    </button>
                  </li>
                </>
              )}
              {session && (
                <>
                  <li className="flex items-center">
                    <FazendaDropdown />
                  </li>
                  <li className="flex items-center">
                    <Link href="formulario/fazenda">
                      <a className="hover:text-gray-600 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
                        Cadastra Fazenda
                      </a>
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <button
                      className="hover:text-gray-600 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                      onClick={() => signOut()}
                    >
                      Sign out
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
