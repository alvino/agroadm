import React from "react";
// components
import CardPastoSettings from "components/Cards/Pasto/CardPastoSettings";

// layout for page
import Admin from "layouts/Admin.js";

export default function Fazenda() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          <CardPastoSettings />
        </div>
      </div>
    </>
  );
}

Fazenda.layout = Admin;
