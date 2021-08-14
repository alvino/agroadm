import React from "react";

import axios from "server/axios";

import MapExample from "components/Maps/MapExample.js";

export default function FormFazenda({ handleSucesso }) {
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

    axios.post("fazenda", data).then(handleSucesso());
  };

  return (
    <>
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
            {markers.map((marker) => `Lat: ${marker.lat} ,Long: ${marker.lng}`)}
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
      <div className="text-center flex justify-end">
        <button
          className="bg-gray-800 active:bg-gray-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
          onClick={handleSalvar}
        >
          Salvar
        </button>
      </div>
    </>
  );
}
