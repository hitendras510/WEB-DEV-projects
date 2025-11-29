import mongoose, { Schema } from "mongoose"; // mongodb


const subscriptionSchema = new Schema(
  {
    susbcriber: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const subscription = mongoose.model("Subscription",subscriptionSchema);