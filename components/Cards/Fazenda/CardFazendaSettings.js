import React from "react";

import axios from "../../../server/axios";

// components
import MapExample from "components/Maps/MapExample.js";

export default function CardSettings() {
  const propriedade = React.useRef();
  const cidade = React.useRef();
  const estado = React.useRef();
  const codPostal = React.useRef();

  const [markers, setMarkers] = React.useState([]);

  const handleMarkerClick = (event) => {
    setMarkers([{ lat: event.latLng.lat(), lng: event.latLng.lng() }]);
  };

  const handleSalvar = async (event) => {
    const data = {
      descricao: propriedade.current.value,
      cidade: cidade.current.value,
      estado: estado.current.value,
      codigoPostal: codPostal.current.value,
      marker: {
        latitude: markers[0].lat,
        longitude: markers[0].lng,
      },
    };

    axios
      .post("fazenda", data)
      .then((resp) =>
        console.info("OK CardFarmSettings post fazenda " + resp.status)
      )
      .catch((resp) =>
        console.error("ERROR CardFarmSetting post fazenda " + resp.status)
      );
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">
              Cadastra Fazenda
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
              Marque uma localização
            </h6>
            <div className="flex flex-wrap">
              <MapExample onMarkerClick={handleMarkerClick} markers={markers} />
              <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                {markers.map(
                  (marker) => `Lat: ${marker.lat} ,Long: ${marker.lng}`
                )}
              </label>
            </div>

            <hr className="mt-6 border-b-1 border-gray-400" />

            <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
              Informações
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Nome da propriedade
                  </label>
                  <input
                    type="text"
                    ref={propriedade}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="Fazenda ...."
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Cidade
                  </label>
                  <input
                    type="text"
                    ref={cidade}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="Alto Horizonte"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Estado
                  </label>
                  <input
                    type="text"
                    ref={estado}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="Goias"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Codigo Postal
                  </label>
                  <input
                    type="text"
                    ref={codPostal}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    defaultValue="76560000"
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
