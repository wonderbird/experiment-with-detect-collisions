import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import reload from "reload";
import * as path from "node:path";
import {watchTree} from "watch";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
const publicDir = path.join(__dirname, "../public");

app.get("/", (_: Request, res: Response) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(port, () => {
  console.log(`[server]: server is running at http://localhost:${port}`);
});

reload(app).then((reloadReturned) => {
  watchTree(publicDir, function () {
    reloadReturned.reload();
  });
});
