import React from "react";

// layout for page

import Formulario from "layouts/Formulario";
import CardFazendaSettings from "../../components/Cards/Fazenda/CardFazendaSettings";

export default function Register() {
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full  px-4">
            <CardFazendaSettings />
          </div>
        </div>
      </div>
    </>
  );
}

Register.layout = Formulario;
