import cloud from "@lafjs/cloud";
const db = cloud.database();

export default async function (ctx: FunctionContext) {
  console.log("登录信息", ctx.body);
  const { username, password } = ctx.body;
  const res = await db
    .collection("user")
    .where({
      email: username,
      password: password
    })
    .getOne();
  console.log(res);
  const payload = {
    uid: 1,
    // 默认 token 有效期为 7 天，请务必提供此 `exp` 字段，详见 JWT 文档。
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
  };
  // 生成 access_token
  const access_token = cloud.getToken(payload);
  console.log("云函数生成的 token：", access_token);
  if (res.data) {
    // return res.data
    return {
      success: true,
      data: {
        username: "admin",
        // 一个用户可能有多个角色
        roles: ["admin"],
        accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
        refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
        expires: "2023/10/30 00:00:00"
      }
    };
  } else {
    return {
      success: false,
      err: "账号密码不存在"
    };
  }
}
