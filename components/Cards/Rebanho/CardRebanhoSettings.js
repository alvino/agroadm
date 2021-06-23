import React from "react";
import { useRouter } from "next/router";

import axios, { fetcher } from "../../../server/axios";
import useSWR from "swr";

export default function CardSettings() {
  const router = useRouter();
  const { fazenda: fazendaQuery } = router.query;

  const pastoRef = React.useRef();
  const femeasMamandoRef = React.useRef();
  const machosMamandoRef = React.useRef();
  const femeasProducaoRef = React.useRef();
  const machosProducaoRef = React.useRef();
  const femeasDesmRef = React.useRef();
  const machosDesmRef = React.useRef();
  const femeas12Ref = React.useRef();
  const machos12Ref = React.useRef();
  const femeas24Ref = React.useRef();
  const machos24Ref = React.useRef();
  const femeas36Ref = React.useRef();
  const machos36Ref = React.useRef();

  // const { data: fazenda } = useSWR(`fazenda?fazenda=${fazendaQuery}`, fetcher);
  const { data: pastos } = useSWR(`pasto?fazenda=${fazendaQuery}`, fetcher);

  const handleSalvar = async (event) => {
    const data = {
      pasto: pastoRef.current.value.split("/")[3],
      femeasMamando: femeasMamandoRef.current.value,
      machosMamando: machosMamandoRef.current.value,
      femeasProducao: femeasProducaoRef.current.value,
      machosProducao: machosProducaoRef.current.value,
      femeasDesm: femeasDesmRef.current.value,
      machosDesm: machosDesmRef.current.value,
      femeas12: femeas12Ref.current.value,
      machos12: machos12Ref.current.value,
      femeas24: femeas24Ref.current.value,
      machos24: machos24Ref.current.value,
      femeas36: femeas36Ref.current.value,
      machos36: machos36Ref.current.value,
    };

    try {
      await axios.post(`rebanho?fazenda=${fazendaQuery}`, data).then((res) => {
        if (res.status === 200) router.push(`/admin/${fazendaQuery}/dashboard`);
        else alert("500");
      });
    } catch (e) {
      alert("Algo deu errado.");
    }
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">
              Cadastra Rebanho
            </h6>
            <button
              className="bg-gray-800 active:bg-gray-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleSalvar}
            >
              Salvar
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
              Informações
            </h6>
            <div className="flex flex-wrap py-4">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Descrição do pasto
                  </label>
                  {/* <input
                    type="text"
                    ref={pasto}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="Pasto ...."
                  /> */}

                  <select
                    ref={pastoRef}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  >
                    {!pastos ? (
                      <option value="0">
                        Não foi possivel carregar a lista
                      </option>
                    ) : (
                      pastos.map((item, index) => (
                        <option key={index} value={item.path}>
                          {item.descricao}
                        </option>
                      ))
                    )}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Femeas Mamando
                  </label>
                  <input
                    type="number"
                    step="0"
                    ref={femeasMamandoRef}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="0"
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Machos Mamando
                  </label>
                  <input
                    type="number"
                    step="0"
                    ref={machosMamandoRef}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="0"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Femeas P/ Produção
                  </label>
                  <input
                    type="number"
                    step="0"
                    ref={femeasProducaoRef}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="0"
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Machos P/ Produção
                  </label>
                  <input
                    type="number"
                    step="0"
                    ref={machosProducaoRef}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="0"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Femeas Desm.
                  </label>
                  <input
                    type="number"
                    step="0"
                    ref={femeasDesmRef}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="0"
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Machos Desm.
                  </label>
                  <input
                    type="number"
                    step="0"
                    ref={machosDesmRef}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="0"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Femeas 12/23 m
                  </label>
                  <input
                    type="number"
                    step="0"
                    ref={femeas12Ref}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="0"
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Machos 12/23 m
                  </label>
                  <input
                    type="number"
                    step="0"
                    ref={machos12Ref}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="0"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Femeas 24/35 m
                  </label>
                  <input
                    type="number"
                    step="0"
                    min="0"
                    ref={femeas24Ref}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="0"
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Machos 24/35 m
                  </label>
                  <input
                    type="number"
                    step="0"
                    ref={machos24Ref}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="0"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Femeas +36 m
                  </label>
                  <input
                    type="number"
                    step="0"
                    ref={femeas36Ref}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="0"
                  />
                </div>
              </div>

              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Machos +36 m
                  </label>
                  <input
                    type="number"
                    step="0"
                    ref={machos36Ref}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="0"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
