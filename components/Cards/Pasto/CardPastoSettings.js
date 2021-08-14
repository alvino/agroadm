import React from "react";
import { useRouter } from "next/router";

import CardSettings from "components/Cards/CardSettings";
import FormPasto from "components/Forms/FormPasto";

export default function CardPastoSettings() {
  const router = useRouter();
  const query = router.query;
  const { fazenda } = router.query;

  function handleSucesso() {
    router.push(`/admin/${fazenda}/dashboard`);
  }

  return (
    <>
      <CardSettings title="Cadastra Pastagem">
        <FormPasto
          fazenda={fazenda}
          id={query.id}
          handleSucesso={handleSucesso}
        />
      </CardSettings>
    </>
  );
}
