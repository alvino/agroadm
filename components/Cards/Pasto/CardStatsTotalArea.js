import React from "react";
import { useRouter } from "next/router";

import { useAxios } from "server/axios";

export default function CardStatsTotalArea() {
  const router = useRouter();
  const { fazenda } = router.query;

  const { data } = useAxios(`pasto?fazenda=${fazenda}`);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-gray-500 uppercase font-bold text-xs">
                Total de área (ha)
              </h5>
              <span className="font-semibold text-xl text-gray-800">
                {!data
                  ? null
                  : data
                      .reduce((acc, item) => (acc += parseFloat(item.area)), 0)
                      .toFixed(2)}
              </span>
            </div>
            {/* <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  statIconColor
                }
              >
                <i className={statIconName}></i>
              </div>
            </div>*/}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            <span className="whitespace-no-wrap">áreas cadastradas</span>
          </p>
        </div>
      </div>
    </>
  );
}
