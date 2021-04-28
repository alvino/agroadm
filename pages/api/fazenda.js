import fb from "../../server/firebase";
import firebase from "firebase";

export default async function useHandler(req, res) {
  const db = fb.firestore();

  const getFazenda = async () => {
    const snapshot = await db.collection("fazenda").get();

    const data = await snapshot.docs.map((item) => ({
      id: item.id,
      path: item.ref.path,
      ...item.data(),
    }));

    return data;
  };

  const postFazenda = async (data) => {
    const fazenda = {
      ...data,
      marker: new firebase.firestore.GeoPoint(
        data.marker.latitude,
        data.marker.longitude
      ),
    };

    const resposta = await db.collection("fazenda").doc().set(fazenda);
    return resposta;
  };

  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(await getFazenda());
      break;
    case "POST":
      res.status(200).json(postFazenda(req.body));
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
