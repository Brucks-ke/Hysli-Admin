import { baseUrlApi } from "@/api/utils";
import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data: Array<any>;
};

export const getAsyncRoutes = () => {
  return http.request<Result>("get", baseUrlApi("getAsyncRoutes"));
};
