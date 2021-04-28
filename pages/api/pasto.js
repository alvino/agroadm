import fb from "../../server/firebase";
import firebase from "firebase";

const get = async (req, res, db) => {
  const { query } = req;

  const fazendaRef = db.collection("fazenda").doc(query.fazenda);
  const pastoOrderRef = fazendaRef.collection("pasto").orderBy("descricao");

  const snapshot = await pastoOrderRef.get();

  const data = snapshot.docs.map((item) => ({
    id: item.id,
    path: item.ref.path,
    ...item.data(),
  }));

  res.status(200).json(data);
};

const post = async (req, res, db) => {
  const { body, query } = req;
  const data = {
    ...body,
    marker: new firebase.firestore.GeoPoint(
      body.marker.latitude,
      body.marker.longitude
    ),
  };

  const fazendaRef = db.collection("fazenda").doc(query.fazenda);
  await fazendaRef.collection("pasto").doc().set(data);
  res.status(200);
};

const put = async (req, res, db) => {
  const { body, query } = req;
  const data = {
    ...body,
    marker: new firebase.firestore.GeoPoint(
      body.marker.latitude,
      body.marker.longitude
    ),
  };

  const fazendaRef = db.collection("fazenda").doc(query.fazenda);
  await fazendaRef.collection("pasto").doc(query.pasto).set(data);
  res.status(200);
};

export default async function useHandler(req, res) {
  const db = fb.firestore();
  const { method } = req;

  switch (method) {
    case "GET":
      await get(req, res, db);
      break;
    case "POST":
      await post(req, res, db);
      break;
    case "PUT":
      await put(req, res, db);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
