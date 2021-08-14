import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/client";

import { fetcher } from "server/axios";
import { useAxios } from "../../server/axios";

// import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
// import UserDropdown from "components/Dropdowns/UserDropdown.js";

// function LinkSidebarExterno(props) {
//   return (
//     <>
//       <a
//         href={props.href}
//         // target="_blank"
//         className="text-gray-800 hover:text-gray-600 text-sm block mb-4 no-underline font-semibold"
//       >
//         <i className={`${props.classIcon} mr-2 text-gray-400 text-base`}></i>
//         {props.children}
//       </a>
//     </>
//   );
// }

function LinkSidebarInterno(props) {
  const router = useRouter();

  const ref = props.href.split("/").pop();
  return (
    <>
      <Link href={props.href}>
        <a
          href="#pablo"
          className={
            "text-xs uppercase py-3 font-bold block " +
            (router.pathname.includes(ref)
              ? "text-blue-500 hover:text-blue-600"
              : "text-gray-800 hover:text-gray-600")
          }
        >
          <i
            className={
              `${props.classIcon} mr-2 text-sm ` +
              (router.pathname.indexOf(ref) !== -1
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
      {!props.titulo ? null : (
        <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
          {props.titulo}
        </h6>
      )}
      {/* Navigation */}

      <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
        {Array(props.children).map((child, index) => (
          <li key={index} className="items-center">
            {child}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();
  const { fazenda } = router.query;

  const { data: session, loading } = useAxios(`auth/session`);

  const handlerSignout = () => {
    signOut();
    router.push("/");
  };

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
                      href="#home"
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
            <hr className="my-4 md:min-w-full" />
            {loading && "carregndo..."}
            {session && (
              <div className="items-center flex ">
                <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                  <img
                    alt="..."
                    className="w-full rounded-full align-middle border-none shadow-lg"
                    src={session.user.image}
                  />
                </span>
                <div className="text-gray-800 uppercase md:inline-block font-semibold  mx-4">
                  {session.user.name}
                </div>
              </div>
            )}
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

            <Navigator key="navigator1">
              <LinkSidebarInterno
                href={`/admin/${fazenda}/dashboard`}
                classIcon="fas fa-tv"
              >
                dashboard
              </LinkSidebarInterno>

              <LinkSidebarInterno
                href={`/admin/${fazenda}/pasto`}
                classIcon="fas fa-newspaper"
              >
                pasto
              </LinkSidebarInterno>

              <LinkSidebarInterno
                href={`/admin/${fazenda}/rebanho`}
                classIcon="fas fa-newspaper"
              >
                rebanho
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

            <Navigator key="navigatordocumention">
              <button
                className="text-xs uppercase py-3 font-bold block text-gray-800 hover:text-gray-600"
                onClick={handlerSignout}
              >
                <i className="fas fa-sign-out-alt mr-2 text-sm text-gray-400"></i>
                sair
              </button>
            </Navigator>
          </div>
        </div>
      </nav>
    </>
  );
}
