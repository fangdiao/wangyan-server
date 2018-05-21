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
console.log('链接数据库成功...');

const app = new Koa();
console.log('新建Koa实例对象成功...');

console.log('开始载入中间件...');
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
console.log('载入中间件成功...');

app.listen(8080);
console.log('启动Koa服务,监听8080端口...');