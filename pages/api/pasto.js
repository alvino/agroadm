import slug from "slug";

import withSession from "middleware/withSession";
import connectDB from "middleware/mongoose";
import Pasto from "models/pasto";
import Rebanho from "models/rebanho";

const verificarExistenciaDoPasto = async (fazenda, slug) => {
  const pasto = await Pasto.find({
    fazenda,
    slug,
  });

  return pasto ? true : false;
};

const verificarExistenciaDeRebanho = async (fazenda, id) => {
  const pasto = Pasto.find({ _id: id });
  const rebanho = Rebanho.find({ slug: pasto.slug, fazenda });

  return rebanho ? true : false;
};

const save = async (body, query) => {
  return await Pasto.create({
    ...body,
    fazenda: query.fazenda,
    slug: slug(body.descricao),
  });
};

async function useHandler(req, res) {
  const { method, query, body } = req;

  // console.log("Pasto");
  // console.log(method);
  // console.log(query);
  // console.log(body);
  switch (method) {
    case "GET":
      if (query._id) res.json(await Pasto.findOne({ _id: query._id }));
      else res.json(await Pasto.find(query));
      break;
    case "POST":
      const isPasto = await verificarExistenciaDoPasto(
        query.fazenda,
        slug(body.descricao)
      );
      if (isPasto) res.status(400);
      else res.json(await save(body, query));
      break;
    case "PUT":
      res.json(await Pasto.findByIdAndUpdate({ _id: body._id }, body));
      break;
    case "DELETE":
      const isRebanho = await verificarExistenciaDeRebanho(
        query.fazenda,
        query._id
      );
      if (isRebanho) res.status(400);
      else res.json(await Pasto.deleteOne({ _id: query._id }));
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).send(`Method ${method} Not Allowed`);
  }
  res.end();
}

export default withSession(connectDB(useHandler));
