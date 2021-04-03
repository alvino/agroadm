import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

function LinkSidebarExterno(props) {
  return (
    <>
      <a
        href={props.href}
        target="_blank"
        className="text-gray-800 hover:text-gray-600 text-sm block mb-4 no-underline font-semibold"
      >
        <i className={`${props.classIcon} mr-2 text-gray-400 text-base`}></i>
        {props.children}
      </a>
    </>
  );
}

function LinkSidebarInterno(props) {
  const router = useRouter();
  return (
    <>
      <Link href={props.href}>
        <a
          href="#pablo"
          className={
            "text-xs uppercase py-3 font-bold block " +
            (router.pathname.indexOf(props.href) !== -1
              ? "text-blue-500 hover:text-blue-600"
              : "text-gray-800 hover:text-gray-600")
          }
        >
          <i
            className={
              `${props.classIcon} mr-2 text-sm ` +
              (router.pathname.indexOf(props.href) !== -1
                ? "opacity-75"
                : "text-gray-400")
            }
          ></i>
          {props.children}
        </a>
      </Link>
    </>
  );
}

function Navigator(props) {
  return (
    <>
      {/* Divider */}
      <hr className="my-4 md:min-w-full" />
      {/* Heading */}
      {!props.titulo ? (
        ""
      ) : (
        <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
          {props.titulo}
        </h6>
      )}
      {/* Navigation */}

      <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
        {Array(props.children).map((child) => (
          <li className="items-center">{child}</li>
        ))}
      </ul>
    </>
  );
}

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link href="/">
            <a
              href="#pablo"
              className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
            >
              agroadm
            </a>
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/">
                    <a
                      href="#pablo"
                      className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                    >
                      agroadm
                    </a>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-3 py-2 h-12 border border-solid  border-gray-600 placeholder-gray-400 text-gray-700 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            <Navigator>
              <LinkSidebarInterno href="/admin/dashboard" classIcon="fas fa-tv">
                dashboard
              </LinkSidebarInterno>

              <LinkSidebarInterno
                href="/admin/pasto"
                classIcon="fas fa-laptop-house"
              >
                pasto
              </LinkSidebarInterno>

              <LinkSidebarInterno
                href="/admin/settings"
                classIcon="fas fa-tools"
              >
                settings
              </LinkSidebarInterno>

              <LinkSidebarInterno href="/admin/tables" classIcon="fas fa-table">
                tables
              </LinkSidebarInterno>

              <LinkSidebarInterno
                href="/admin/maps"
                classIcon="fas fa-map-marked"
              >
                Maps
              </LinkSidebarInterno>
            </Navigator>

            <Navigator titulo="Documentation">
              <LinkSidebarExterno
                href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/colors/notus"
                classIcon="fas fa-paint-brush"
              >
                Styles
              </LinkSidebarExterno>

              <LinkSidebarExterno
                href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus"
                classIcon="fab fa-css3-alt"
              >
                CSS Components
              </LinkSidebarExterno>

              <LinkSidebarExterno
                href="https://www.creative-tim.com/learning-lab/tailwind/angular/overview/notus"
                classIcon="fab fa-angular"
              >
                Angular
              </LinkSidebarExterno>

              <LinkSidebarExterno
                href="https://www.creative-tim.com/learning-lab/tailwind/js/overview/notus"
                classIcon="fab fa-js-square"
              >
                Javascript
              </LinkSidebarExterno>

              <LinkSidebarExterno
                href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus"
                classIcon="fab fa-react"
              >
                NextJS
              </LinkSidebarExterno>

              <LinkSidebarExterno
                href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus"
                classIcon="fab fa-react"
              >
                React
              </LinkSidebarExterno>

              <LinkSidebarExterno
                href="https://www.creative-tim.com/learning-lab/tailwind/svelte/overview/notus"
                classIcon="fas fa-link"
              >
                Svelte
              </LinkSidebarExterno>

              <LinkSidebarExterno
                href="https://www.creative-tim.com/learning-lab/tailwind/vue/overview/notus"
                classIcon="fab fa-vuejs"
              >
                VueJS
              </LinkSidebarExterno>
            </Navigator>
          </div>
        </div>
      </nav>
    </>
  );
}
