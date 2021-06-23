import mongoose from "mongoose";

const fazendaSchema = new mongoose.Schema({
  descricao: "String",
  slug: "String",
  email: "String",
  cidade: "String",
  estado: "String",
  codigoPostal: "String",
  marker: {
    latitude: "Decimal128",
    longitude: "Decimal128",
  },
  createAt: { type: Date, default: Date.now },
});

mongoose.models = {};

const Fazenda = mongoose.model("fazenda", fazendaSchema);

export default Fazenda;
