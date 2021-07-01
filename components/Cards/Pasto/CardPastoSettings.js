import React from "react";
import { useRouter } from "next/router";

// components
import MapExample from "components/Maps/MapExample.js";

import axios, { fetcher } from "server/axios";
import useSWR from "swr";

export default function CardPastoSettings() {
  const router = useRouter();
  const query = router.query;
  const { fazenda } = router.query;

  const pasto = React.useRef();
  const area = React.useRef();

  const [markers, setMarkers] = React.useState([]);
  const [posicao, setPosicao] = React.useState({});

  const { data: fazendaSWR } = useSWR(`fazenda?fazenda=${fazenda}`, fetcher);
  const { data: pastoSWR } = useSWR(
    `pasto?fazenda=${fazenda}&_id=${query.id}`,
    fetcher
  );

  React.useEffect(() => {
    if (fazendaSWR) {
      setPosicao({
        lat: parseFloat(fazendaSWR.marker.latitude.$numberDecimal),
        lng: parseFloat(fazendaSWR.marker.longitude.$numberDecinal),
      });
    }
  }, [fazendaSWR]);

  React.useEffect(() => {
    if (pastoSWR && query) {
      pasto.current.value = pastoSWR.descricao;
      area.current.value = pastoSWR.area;
      setMarkers([
        {
          lat: parseFloat(pastoSWR.marker.latitude.$numberDecimal),
          lng: parseFloat(pastoSWR.marker.longitude.$numberDecimal),
        },
      ]);
      setPosicao({
        lat: parseFloat(pastoSWR.marker.latitude.$numberDecimal),
        lng: parseFloat(pastoSWR.marker.longitude.$numberDecimal),
      });
    }
  }, [pastoSWR, query]);

  const handleMarkerClick = (event) => {
    setMarkers([{ lat: event.latLng.lat(), lng: event.latLng.lng() }]);
  };

  function sucesso() {
    router.push(`/admin/${fazenda}/dashboard`);
  }

  const handleDelete = async (event) => {
    axios.delete(`pasto?fazenda=${fazenda}&_id=${query.id}`).then(sucesso());
  };

  const handleUpdate = async (event) => {
    const data = {
      ...pastoSWR,
      descricao: pasto.current.value,
      area: area.current.value,
      marker: { latitude: markers[0].lat, longitude: markers[0].lng },
    };

    axios.put(`pasto?fazenda=${fazenda}`, data).then(sucesso());
  };

  const handleSalvar = async (event) => {
    const data = {
      descricao: pasto.current.value,
      area: area.current.value,
      marker: { latitude: markers[0].lat, longitude: markers[0].lng },
    };

    axios.post(`pasto?fazenda=${fazenda}`, data).then(sucesso());
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">
              Cadastra Pastagem
            </h6>
            <div>
              {query.id && (
                <>
                  <button
                    className="bg-red-600 active:bg-red-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleDelete}
                  >
                    Deletar
                  </button>
                  <button
                    className="bg-gray-800 active:bg-gray-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleUpdate}
                  >
                    Atualizar
                  </button>
                </>
              )}
              {!query.id && (
                <button
                  className="bg-gray-800 active:bg-gray-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleSalvar}
                >
                  Salvar
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
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

            <hr className="mt-6 border-b-1 border-gray-400" />

            <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
              Informações
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
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
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Área (ha)
                  </label>
                  <input
                    type="number"
                    step="0.1"
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
