import React from "react";
import { useRouter } from "next/router";

import CardSettings from "components/Cards/CardSettings";
import FormFazenda from "components/Forms/FormFazenda";

export default function CardFazendaSettings() {
  const router = useRouter();

  return (
    <>
      <CardSettings title="Cadastra Fazenda">
        <FormFazenda handleSucesso={() => router.push("/")} />
      </CardSettings>
    </>
  );
}
