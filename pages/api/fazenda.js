import fb from "../../server/firebase";
import firebase from "firebase";

const db = fb.firestore();

const get = async (req, res) => {
  const snapshot = await db.collection("fazenda").get();

  const data = await snapshot.docs.map((item) => ({
    id: item.id,
    path: item.ref.path,
    ...item.data(),
  }));

  res.status(200).json(data);
};

const post = async (req, res) => {
  const { body } = req;
  const data = {
    ...body,
    marker: new firebase.firestore.GeoPoint(
      body.marker.latitude,
      body.marker.longitude
    ),
  };

  const resposta = await db.collection("fazenda").doc().set(data);
  res.status(200).json(resposta);
};

export default async function useHandler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      await get(req, res);
      break;
    case "POST":
      await post(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
