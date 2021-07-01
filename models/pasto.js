import mongoose from "mongoose";

const pastoSchema = new mongoose.Schema({
  descricao: "String",
  slug: "String",
  fazenda: "String",
  area: "Number",
  marker: {
    latitude: "Decimal128",
    longitude: "Decimal128",
  },
  createAt: { type: Date, default: Date.now },
});

mongoose.models = {};

const Pasto = mongoose.model("pasto", pastoSchema);

export default Pasto;
