import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projects:{
    type: Array
  }
});

const ProjectModel =
  mongoose.models.Projectdetail ||
  mongoose.model("Projectdetail", projectSchema);

export default ProjectModel;