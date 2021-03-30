import React from "react";
// components
import CardFarmSettings from "components/Cards/Farm/CardFarmSettings.js";

// layout for page
import Admin from "layouts/Admin.js";

export default function Fazenda() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          <CardFarmSettings />
        </div>
      </div>
    </>
  );
}

Fazenda.layout = Admin;
