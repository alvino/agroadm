import React from "react";

import fb from "../../../server/firebase";

export default function CardStats() {
  const storageFazenda = JSON.parse(sessionStorage.getItem("fazenda"));

  const [pastos, setPastos] = React.useState([]);

  React.useEffect(() => {
    const init = async () => {
      const db = fb.firestore();
      const fazendaRef = db.collection("fazenda").doc(storageFazenda.id);
      const pastoRef = fazendaRef.collection("pasto");

      const snapshot = await pastoRef.get();

      const data = snapshot.docs.map((item) => ({
        id: item.id,
        path: item.ref.path,
        ...item.data(),
      }));

      setPastos(data);
    };

    init();
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-gray-500 uppercase font-bold text-xs">
                Pastos
              </h5>
              <span className="font-semibold text-xl text-gray-800">
                {pastos.length}
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
            <span className="whitespace-no-wrap">{"pastos cadastrados"}</span>
          </p>
        </div>
      </div>
    </>
  );
}

CardStats.defaultProps = {
  statSubtitle: "Traffic",
  statTitle: "350,897",
  statArrow: "up",
  statPercent: "3.48",
  statPercentColor: "text-green-500",
  statDescripiron: "Since last month",
  statIconName: "far fa-chart-bar",
  statIconColor: "bg-red-500",
};
