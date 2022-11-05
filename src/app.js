import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.listen(5000, () => {
    console.log("App running in port: 5000");
})

