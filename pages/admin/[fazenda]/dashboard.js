import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardTablePastos from "components/Cards/Pasto/CardTablePastos";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

// layout for page

import AdminStats from "layouts/AdminStats.js";
import axios from "server/axios";

function Dashboard({ fazenda, fazendas }) {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          {/* <CardLineChart /> */}
        </div>
        <div className="w-full xl:w-4/12 px-4">{/* <CardBarChart /> */}</div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardTablePastos fazenda={fazenda} fazendas={fazendas} />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          {/* <CardSocialTraffic /> */}
        </div>
      </div>
    </>
  );
}

Dashboard.getInitialProps = async (ctx) => {
  const { fazenda } = ctx.query;
  const resPasto = await axios.get(`pasto`, { params: { fazenda } });
  const fazendas = resPasto.data;

  return {
    fazenda,
    fazendas,
  };
};

Dashboard.layout = AdminStats;

export default Dashboard;
