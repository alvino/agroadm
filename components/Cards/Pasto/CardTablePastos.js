import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

import { fetcher } from "../../../server/axios";

// components

export default function CardTablePastos() {
  const router = useRouter();
  const { fazenda } = router.query;

  const { data } = useSWR(`pasto?fazenda=${fazenda}`, fetcher);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-gray-800">Pastos</h3>
            </div>
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
                ? null
                : data.map((item, index) => {
                    return (
                      <>
                        <tr key={index} className="hover:bg-gray-100">
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                            <Link
                              href={`/admin/${item.fazenda}/pasto?id=${item._id}`}
                            >
                              <a className="text-sm font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800">
                                {item.descricao}
                              </a>
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
