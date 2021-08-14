import withSession from "middleware/withSession";
import connectDB from "middleware/mongoose";
import Rebanho from "models/rebanho";

const save = async (body, query) => {
  const find = await Rebanho.findOne({
    pasto: body.pasto,
    fazenda: query.fazenda,
  }).exec();

  if (find !== null) {
    return await Rebanho.findOneAndUpdate(
      { _id: find._id },
      {
        ...body,
        fazenda: query.fazenda,
        updateAt: Date.now(),
      }
    );
  } else {
    const res = await new Rebanho({
      ...body,
      fazenda: query.fazenda,
    });
    console.log(res);
    return res.save();
  }
};

async function useHandler(req, res) {
  const { method, query, body } = req;

  // console.log("Rebanho");
  // console.log(method);
  // console.log(query);
  // console.log(body);
  switch (method) {
    case "GET":
      if (query._id) res.json(await Rebanho.findOne(query));
      else res.json(await Rebanho.find(query));
      break;
    case "POST":
      res.json(await save(body, query));
      break;

    case "DELETE":
      res.json(await Rebanho.deleteOne({ _id: query._id }));
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).send(`Method ${method} Not Allowed`);
  }
  res.end();
}

export default withSession(connectDB(useHandler));
