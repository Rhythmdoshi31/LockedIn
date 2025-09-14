import express from "express";
const app = express();
import type { Request, Response } from "express";

app.get("/", (req : Request, res : Response) => {
    res.send("Hi");
})

app.listen(3000);