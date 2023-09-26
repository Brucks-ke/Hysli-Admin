import { http } from "@/utils/http";
import { baseUrlApi } from "@/utils/utils.ts";

export type UserResult = {
  success: boolean;
  data: {
    /** 用户名 */
    username: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", baseUrlApi("login"), { data });
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", baseUrlApi("refreshToken"), {
    data
  });
};

/**
 * @description 注册验证手机号的验证码的
 * @param data {string}传输一个手机号码
 * @returns
 */
export const register_phone_code = (data?: Object) => {
  return http.request<RefreshTokenResult>(
    "post",
    "https://yi2r44.console.hysli.cn/phone_code",
    { data }
  );
};

export const register = (data?: Object) => {
  return http.request<RefreshTokenResult>(
    "post",
    "https://yi2r44.console.hysli.cn/registerAccount",
    { data }
  );
};
