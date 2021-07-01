import slug from "slug";

import withSession from "middleware/withSession";
import connectDB from "middleware/mongoose";
import Pasto from "models/pasto";

const save = async (body, query) => {
  const pasto = new Pasto({
    ...body,
    fazenda: query.fazenda,
    slug: slug(body.descricao),
  });
  return await Pasto.create(pasto);
};

async function useHandler(req, res) {
  const { method, query, body } = req;

  console.log("Pasto");
  console.log(method);
  console.log(query);
  console.log(body);
  switch (method) {
    case "GET":
      if (query._id) res.json(await Pasto.findOne({ _id: query._id }));
      else res.json(await Pasto.find(query));
      break;
    case "POST":
      res.json(await save(body, query));
      break;
    case "PUT":
      res.json(await Pasto.findByIdAndUpdate({ _id: body._id }, body));
      break;
    case "DELETE":
      res.json(await Pasto.deleteOne({ _id: query._id }));
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).send(`Method ${method} Not Allowed`);
  }
  res.end();
}

export default withSession(connectDB(useHandler));
