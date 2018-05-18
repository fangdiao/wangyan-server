import Koa from 'koa';
import bodyParser from "koa-bodyparser";
import onerror from "koa-onerror";
import json from "koa-json";
import staticSever from "koa-static";
import logger from "koa-logger";
import convert from "koa-convert";
import send from "koa-send";
import mongoose from 'mongoose';
import path from 'path';

import { routeFun } from "./routes";

mongoose.connect('mongodb://localhost:27017/wangyan');

const app = new Koa();

onerror(app);

app.use(logger())
  .use(convert(json()))
  .use(bodyParser())
  .use(convert(staticSever(path.join(__dirname, "../static"))))
  .use(async (ctx, next) => {
    ctx.send = send;
    await next();
  })
  .use(routeFun().routes());

app.listen(8080);