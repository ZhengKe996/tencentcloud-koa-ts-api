import { Context } from "koa";
import * as tencentcloud from "tencentcloud-sdk-nodejs";
const TmtClient = tencentcloud.tmt.v20180321.Client;
import response from "../../utils/response";
import config from "../config";
const clientConfig = {
  credential: {
    secretId: config.tencentcloud.secretId,
    secretKey: config.tencentcloud.secretKey,
  },
  region: config.tencentcloud.region,
  profile: {
    httpProfile: {
      endpoint: config.tencentcloud.endpoint,
    },
  },
};
class indexController {
  async index(ctx: Context) {
    const { SourceText, Target } = ctx.request.body;

    const client = new TmtClient(clientConfig);
    const params = {
      SourceText: SourceText,
      Source: "auto",
      Target: Target,
      ProjectId: 0,
    };

    await client.TextTranslate(params).then(
      (data) => {
        response.success(ctx, data);
      },
      (err) => {
        response.error(ctx, err);
      }
    );
  }
}

export default new indexController();
