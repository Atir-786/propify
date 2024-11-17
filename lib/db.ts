import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI!);
    console.log(`Succesfully conectd to mongb`);
  } catch (error: any) {
    console.log(`Error:${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
