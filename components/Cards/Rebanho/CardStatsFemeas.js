import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

import { fetcher } from "server/axios";

export default function CardStatsFemeas() {
  const router = useRouter();
  const { fazenda: fazendaQuery } = router.query;

  const { data } = useSWR(`rebanho?fazenda=${fazendaQuery}`, fetcher);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-gray-500 uppercase font-bold text-xs">
                Femeas
              </h5>
              <span className="font-semibold text-xl text-gray-800">
                {!data
                  ? null
                  : data.reduce(
                      (acc, item) =>
                        (acc =
                          acc +
                          parseInt(item.femeasProducao) +
                          parseInt(item.femeasMamando) +
                          parseInt(item.femeasDesm) +
                          parseInt(item.femeas12) +
                          parseInt(item.femeas24) +
                          parseInt(item.femeas36)),
                      0
                    )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
