import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: { type: String, default: null },
  slug: { type: String, default: null },
  publishedAt: { type: Date }
});

articleSchema.method("toJSON", function () {
    // eslint-disable-next-line
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const article = mongoose.model("article", articleSchema);
export = article; 
