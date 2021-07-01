import mongoose from "mongoose";

const rebanhoSchema = new mongoose.Schema({
  pasto: String,
  femeasMamando: Number,
  machosMamando: Number,
  femeasProducao: Number,
  machosProducao: Number,
  femeasDesm: Number,
  machosDesm: Number,
  femeas12: Number,
  machos12: Number,
  femeas24: Number,
  machos24: Number,
  femeas36: Number,
  machos36: Number,
  fazenda: String,
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});

mongoose.models = {};

const Rebanho = mongoose.model("rebanho", rebanhoSchema);

export default Rebanho;
