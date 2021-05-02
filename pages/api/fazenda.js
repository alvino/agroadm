import fb, { GeoPoint } from "server/firebase";

const getAll = async (req, res, db) => {
  const snapshot = await db.collection("fazenda").get();

  const data = await snapshot.docs.map((item) => ({
    id: item.id,
    path: item.ref.path,
    ...item.data(),
  }));

  res.status(200).json(data);
};

const getFilterFazenda = async (req, res, db) => {
  const { query } = req;

  const ref = db.doc(`fazenda/${query.fazenda}`);
  ref.onSnapshot((doc) => {
    const data = doc.data();
    res.status(200).json(data);
  });
};

const post = async (req, res, db) => {
  const { body } = req;
  const data = {
    ...body,
    marker: new GeoPoint(body.marker.latitude, body.marker.longitude),
  };

  const resposta = await db.collection("fazenda").doc().set(data);
  res.status(200).json(resposta);
};

export default function useHandler(req, res) {
  const db = fb.firestore();
  const { method, query } = req;

  switch (method) {
    case "GET":
      if (query.fazenda) {
        getFilterFazenda(req, res, db);
      } else {
        getAll(req, res, db);
      }
      break;
    case "POST":
      post(req, res, db);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
