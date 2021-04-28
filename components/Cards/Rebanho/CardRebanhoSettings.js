import React from "react";
import { useRouter } from "next/router";

import fb from "../../../server/firebase";

import firebase from "firebase";

import isEmpty from "../../../util/isEmpty";

export default function CardSettings() {
  const router = useRouter();

  const pasto = React.useRef();
  const area = React.useRef();

  const [id, setId] = React.useState(null);

  const storageFazenda = JSON.parse(sessionStorage.getItem("fazenda"));

  React.useEffect(() => {
    const query = router.query;

    if (!isEmpty(query)) {
      pasto.current.value = query.descricao;
      area.current.value = query.area;

      // setId(query.id);
    }
  }, []);

  const handleSalvar = async (event) => {
    const data = {
      descricao: pasto.current.value,
      area: area.current.value,
    };

    const db = fb.firestore();
    const fazendaRef = db.collection("fazenda").doc(storageFazenda.id);
    // const pastoRef = id
    //   ? fazendaRef.collection("pasto").doc(id)
    //   : fazendaRef.collection("pasto").doc();

    // pastoRef.set(data).then(() => {
    //   router.push("dashboard");
    // });
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
            {/* <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
              Marque uma localização
            </h6>
            <div className="flex flex-wrap">
              <MapExample
                onMarkerClick={handleMarkerClick}
                markers={markers}
                defaultCenter={posicao}
                zoom={16}
              />
              <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                {markers.map(
                  (marker) => `Lat: ${marker.lat} ,Long: ${marker.lng}`
                )}
              </label>
            </div>

            <hr className="mt-6 border-b-1 border-gray-400" /> */}

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
                  <input
                    type="text"
                    ref={pasto}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="Pasto ...."
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
                    Femeas Mamando
                  </label>
                  <input
                    type="number"
                    step="0"
                    ref={area}
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
                    ref={area}
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
                    ref={area}
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
                    ref={area}
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
                    ref={area}
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
                    ref={area}
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
                    Femeas 12/24 m
                  </label>
                  <input
                    type="number"
                    step="0"
                    ref={area}
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
                    Machos 12/24 m
                  </label>
                  <input
                    type="number"
                    step="0"
                    ref={area}
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
                    Femeas 24/36 m
                  </label>
                  <input
                    type="number"
                    step="0"
                    min="0"
                    ref={area}
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
                    Machos 24/36 m
                  </label>
                  <input
                    type="number"
                    step="0"
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
                    ref={area}
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
                    ref={area}
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
