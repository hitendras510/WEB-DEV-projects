import mongoose, { Schema } from "mongoose"; // mongodb


const videoSchema = new Schema({
  videoFile: {
    type: String,
    required: true,
  },