import cloud from "@lafjs/cloud";

export default async function (ctx: FunctionContext) {
  console.log("Hello World", ctx, cloud);
  return { data: "hi, laf" };
}
