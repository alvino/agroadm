import fb, { Timestamp } from "server/firebase";
import slug from "slug";

const getAll = async (req, res, db) => {
  const { query } = req;
  const { fazenda: fazendaQuery } = query;

  const fazendaRef = db.collection("fazenda").doc(fazendaQuery);
  const rebanhoRef = fazendaRef.collection("rebanho");

  const snapshot = await rebanhoRef.get();

  const data = snapshot.docs.map((item) => ({
    id: item.id,
    path: item.ref.path,
    ...item.data(),
  }));

  res.status(200).json(data);
};

const post = (req, res, db) => {
  const { body, query } = req;
  const { fazenda: fazendaQuery } = query;

  const data = {
    ...body,
    createAt: new Timestamp.fromDate(new Date()),
  };

  delete data.pasto;

  const fazendaRef = db.collection("fazenda").doc(fazendaQuery);
  fazendaRef
    .collection("rebanho")
    .doc(slug(body.pasto))
    .set(data)
    .then(() => res.status(200))
    .catch(() => res.status(500));
};

const put = (req, res, db) => {
  const { body, query } = req;
  const { fazenda: fazendaQuery, rebanho: rebanhoQuery } = query;
  const data = {
    ...body,
    updateAt: new Timestamp.fromDate(new Date()),
    pasto: db.doc(body.pasto),
  };

  const fazendaRef = db.collection("fazenda").doc(fazendaQuery);
  fazendaRef
    .collection("rebanho")
    .doc(rebanhoQuery)
    .set(data)
    .then(() => res.status(200))
    .catch(() => res.status(500));
  res.status(200);
};

export default async function useHandler(req, res) {
  const db = fb.firestore();
  const { method } = req;

  switch (method) {
    case "GET":
      await getAll(req, res, db);
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
