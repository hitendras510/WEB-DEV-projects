import mongoose, { Schema } from "mongoose";
import 

mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema({
  videoFile: {
    type: String,
    required: true,
  },
  thubnail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    default: 0,
  },
  isPublished: {
      type: String,
      deafult: true,
    },
    owner: {
        type: Schema.types.Objectid,
        ref: "User"
    }
}, {timestamps: true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)