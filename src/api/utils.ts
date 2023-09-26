export const baseUrlApi = (url: string) =>
  process.env.NODE_ENV === "development"
    ? `https://yi2r44.console.hysli.cn/${url}`
    : `http://127.0.0.1:3000/${url}`;
