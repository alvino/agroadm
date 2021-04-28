import React from "react";
import Link from "next/link";
import useSWR from "swr";

import { fetcher } from "../../../server/axios";

// components

export default function CardTablePastos() {
  const storageFazenda = JSON.parse(sessionStorage.getItem("fazenda"));

  const { data } = useSWR(`pasto?fazenda=${storageFazenda.id}`, fetcher);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-gray-800">Pastos</h3>
            </div>
            {/* <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div> */}
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  Descrição
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  Área (ha)
                </th>
              </tr>
            </thead>
            <tbody>
              {!data
                ? ""
                : data.map((item, index) => {
                    return (
                      <>
                        <tr
                          key={`cardtablepastos${index}`}
                          className="hover:bg-gray-100"
                        >
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                            <Link
                              className="text-sm font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
                              href={`pasto?id=${item.id}&descricao=${item.descricao}&area=${item.area}&latitude=${item.marker.latitude}&longitude=${item.marker.longitude}`}
                            >
                              <a>{item.descricao}</a>
                            </Link>
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {item.area}
                          </td>
                        </tr>
                      </>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
