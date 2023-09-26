import cloud, { FunctionContext } from "@lafjs/cloud";
import Dysmsapi, * as dysmsapi from "@alicloud/dysmsapi20170525";
import * as OpenApi from "@alicloud/openapi-client";
import * as Util from "@alicloud/tea-util";

export default async function (ctx: FunctionContext) {
  const { phone, email, password, phone_code, create_time } = ctx.body;
  console.log(phone, email, "手机号码", "邮箱");
  const db = cloud.database();
  //一.1 查询验证码
  const result = await db
    .collection("phone_code")
    .where({
      code: phone_code
    })
    .getOne();
  console.log(result);
  const { data: phone_data } = result;
  //一.2 进入逻辑
  if (phone_data) {
    // 向 user 集合中添加一条记录
    const now_time = +new Date();
    const res = await db.collection("user").add({
      phone: phone,
      email: email,
      password: password,
      role: ["api"],
      balance: 0,
      api_list: ["api1", "api2", "api3"],
      create_time: create_time,
      last_login_time: "",
      last_login_ip: "127.0.0.1",
      update_time: now_time,
      access_token: ["token1", "token2"],
      count: 0,
      status: 1,
      inviter: "",
      invite_code: "",
      comment: "This is user 1",
      register_ip: "127.0.0.1",
      level: 1
    });
    if (res.ok) {
      return {
        success: true,
        msg: "账号注册成功"
      };
    }
  } else {
    return { success: false, msg: "注册失败,手机验证不通过" };
  }
}
