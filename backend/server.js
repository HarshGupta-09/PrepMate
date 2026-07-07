import "./src/config/env.js";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";


















const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};
startServer();
