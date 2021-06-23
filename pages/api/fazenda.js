import slug from "slug";

import withSession from "middleware/withSession";
import connectDB from "middleware/mongoose";
import Fazenda from "models/fazenda";

const getAll = async (session) => {
  return await Fazenda.find({ email: session.user.email });
};

const getFilterFazenda = async (query, session) => {
  return await Fazenda.findOne({
    slug: query.fazenda,
    email: session.user.email,
  });
};

const post = async (body, session) => {
  const fazenda = new Fazenda({
    ...body,
    slug: slug(body.descricao),
    email: session.user.email,
  });

  return await fazenda.save();
};

const useHandler = async (req, res) => {
  const { method, query, body, session } = req;

  switch (method) {
    case "GET":
      if (query.fazenda) {
        res.json(await getFilterFazenda(query, session));
      } else {
        res.json(await getAll(session));
      }
      break;
    case "POST":
      res.json(await post(body, session));
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).send(`Method ${method} Not Allowed`);
  }
  res.end();
};

export default withSession(connectDB(useHandler));
