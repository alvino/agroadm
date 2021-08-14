import React from "react";

// components
import MapExample from "components/Maps/MapExample.js";

import axios, { useAxios } from "server/axios";

export default function FormPasto({ fazenda, id = null, handleSucesso }) {
  const [pasto, setPasto] = React.useState(null);

  const pastoRef = React.useRef();
  const areaRef = React.useRef();

  const [markers, setMarkers] = React.useState([]);
  const [posicao, setPosicao] = React.useState({});

  const { data: fazendaSWR } = useAxios(`fazenda?fazenda=${fazenda}`);

  React.useEffect(() => {
    if (fazendaSWR) {
      console.log("fazendaSWR", fazendaSWR.marker);
      setPosicao({
        lat: parseFloat(fazendaSWR.marker.latitude.$numberDecimal),
        lng: parseFloat(fazendaSWR.marker.longitude.$numberDecimal),
      });
    }
  }, [fazendaSWR]);

  React.useEffect(() => {
    async function init() {
      const res = await axios.get(`pasto?fazenda=${fazenda}&_id=${id}`);

      pastoRef.current.value = res.data.descricao;
      areaRef.current.value = res.data.area;
      setMarkers([
        {
          lat: parseFloat(res.data.marker.latitude.$numberDecimal),
          lng: parseFloat(res.data.marker.longitude.$numberDecimal),
        },
      ]);
      setPosicao({
        lat: parseFloat(res.data.marker.latitude.$numberDecimal),
        lng: parseFloat(res.data.marker.longitude.$numberDecimal),
      });

      setPasto(res.data);
    }

    if (id && pasto === null) init();
  }, [pasto, id, fazenda]);

  const handleMarkerClick = (event) => {
    setMarkers([{ lat: event.latLng.lat(), lng: event.latLng.lng() }]);
  };

  const handleDelete = async (event) => {
    axios.delete(`pasto?fazenda=${fazenda}&_id=${id}`).then(handleSucesso());
  };

  const handleUpdate = async (event) => {
    const data = {
      ...pasto,
      descricao: pastoRef.current.value,
      area: areaRef.current.value,
      marker: { latitude: markers[0].lat, longitude: markers[0].lng },
    };

    axios.put(`pasto?fazenda=${fazenda}`, data).then(handleSucesso());
  };

  const handleSalvar = async (event) => {
    const data = {
      descricao: pastoRef.current.value,
      area: areaRef.current.value,
      marker: { latitude: markers[0].lat, longitude: markers[0].lng },
    };
    try {
      await axios.post(`pasto?fazenda=${fazenda}`, data);
      handleSucesso();
    } catch (err) {
      console.error("File CARDPASTOSETTINGS event HandleSalver");
    }
  };

  return (
    <>
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
            {markers.map((marker) => `Lat: ${marker.lat} ,Long: ${marker.lng}`)}
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
                ref={pastoRef}
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
                ref={areaRef}
                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                defaultValue="0"
              />
            </div>
          </div>
        </div>
      </form>
      <div className="text-center flex justify-end">
        {id && (
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
        {!id && (
          <button
            className="bg-gray-800 active:bg-gray-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button"
            onClick={handleSalvar}
          >
            Salvar
          </button>
        )}
      </div>
    </>
  );
}
