import React from "react";

import fb from "../../server/firebase";
// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
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
      console.log(data);
    };

    init();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="relative bg-gray-900 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PASTO"
                  statTitle={pastos.length}
                  statArrow={null}
                  statPercent={null}
                  statPercentColor={null}
                  statDescripiron="Pastos cadastrados"
                  statIconName={null}
                  statIconColor={null}
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Area (ha)"
                  statTitle={pastos.reduce(
                    (acc, item) => (acc += parseFloat(item.area)),
                    0
                  )}
                  statArrow={null}
                  statPercent={null}
                  statPercentColor={null}
                  statDescripiron="Total de área"
                  statIconName={null}
                  statIconColor={null}
                />
              </div>
              {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="SALES"
                  statTitle="924"
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="PERFORMANCE"
                  statTitle="49,65%"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-green-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-blue-500"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
