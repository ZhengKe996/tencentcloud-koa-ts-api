import dotenv from "dotenv";
dotenv.config();

import Koa from "koa";
import router from "./router";
import { Server } from "http";
import AccessLogMiddleware from "./middleware/AccessLogMiddleware";
import KoaBody from "koa-body";
const app = new Koa();

app
  .use(
    KoaBody({
      multipart: true,
      formidable: {
        maxFileSize: 200 * 1024 * 1024,
      },
    })
  )
  .use(AccessLogMiddleware)
  .use(router.routes());

const run = (port: any): Server => {
  return app.listen(port);
};

export default run;
