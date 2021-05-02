import React from "react";
// components
import CardRebanhoSettings from "components/Cards/Rebanho/CardRebanhoSettings";

// layout for page
import Admin from "layouts/Admin.js";

export default function Fazenda() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          <CardRebanhoSettings />
        </div>
      </div>
    </>
  );
}

Fazenda.layout = Admin;
