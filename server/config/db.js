import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.mongodb_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(
      `Mongodb connected ${con.connection.host}`.green.underline.bold
    );
  } catch (error) {
    console.log(`DB did'nt connect Error: ${error.message}`.red.inverse.bold);
    process.exit(1);
  }
};

export default connectDB;
