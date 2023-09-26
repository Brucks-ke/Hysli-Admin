//@ts-ignore
import cloud, { FunctionContext } from "@lafjs/cloud";
import Dysmsapi, * as dysmsapi from "@alicloud/dysmsapi20170525";
import * as OpenApi from "@alicloud/openapi-client";
import * as Util from "@alicloud/tea-util";

const accessKeyId = "LTAI5tPa8uw7EYwYQspSGwtd";
const accessKeySecret = "OFebGpQCiFhkHMRhNbSk7eKYIlWglW";
const signName = "Hysli";
const templateCode = "SMS_461395865";
const endpoint = "dysmsapi.aliyuncs.com";

export default async function (ctx: FunctionContext) {
  const { phone } = ctx.body;
  console.log(phone, "手机号码");

  async function genSmsCode(phone: string): Promise<any> {
    try {
      // 生成新的验证码
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      // 设置验证码有效期为 10 分钟
      const expires_time = Date.now() + 10 * 60 * 1000;
      // 创建时间
      const create_time = Date.now();
      // 将验证码和有效期保存到数据库中
      const newCode = { phone, code, expires_time, create_time };
      const db = cloud.database();
      await db.collection("phone_code").add(newCode);

      // 调用阿里云短信服务发送短信验证码
      const sendSmsRequest = new dysmsapi.SendSmsRequest({
        phoneNumbers: phone,
        signName,
        templateCode,
        templateParam: `{"code":${code}}`
      });

      const config = new OpenApi.Config({
        accessKeyId,
        accessKeySecret,
        endpoint
      });
      const client = new Dysmsapi(config);
      const runtime = new Util.RuntimeOptions({});
      const res = await client.sendSmsWithOptions(sendSmsRequest, runtime);
      // console.log(res)
      const Code = res.body.code;
      if (Code === "OK") {
        return "验证码发送成功！";
      } else {
        console.error(`验证码发送失败，${res.body.message}`);
        return res.body.message;
      }
    } catch (error) {
      return error;
    }
  }

  const result = await genSmsCode(phone);
  return { msg: result };
}
