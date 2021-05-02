import React from "react";
// components
import CardFazendaSettings from "components/Cards/Fazenda/CardFazendaSettings.js";

// layout for page
import Admin from "layouts/Admin.js";

export default function Fazenda() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          <CardFazendaSettings />
        </div>
      </div>
    </>
  );
}

Fazenda.layout = Admin;
