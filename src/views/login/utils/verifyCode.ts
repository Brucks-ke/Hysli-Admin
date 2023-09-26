import type { FormInstance, FormItemProp } from "element-plus";
import { clone } from "@pureadmin/utils";
import { ref } from "vue";

import { register_phone_code } from "@/api/user";

const isDisabled = ref(false);
const timer = ref(null);
const text = ref("");

export const useVerifyCode = () => {
  const start = async (
    formEl: FormInstance | undefined,
    props: FormItemProp,
    val = "",
    time = 60
  ) => {
    if (!formEl) return;
    const initTime = clone(time, true);
    await formEl.validateField(props, isValid => {
      if (isValid) {
        clearInterval(timer.value);
        isDisabled.value = true;
        text.value = `${time}`;
        console.log(val);
        register_phone_code({ phone: val }).then(res => {
          console.log(res);
        });
        timer.value = setInterval(() => {
          // console.log(props, val, "各种信息");

          if (time > 0) {
            time -= 1;
            text.value = `${time}`;
          } else {
            text.value = "";
            isDisabled.value = false;
            clearInterval(timer.value);
            time = initTime;
          }
        }, 1000);
      }
    });
  };

  const end = () => {
    text.value = "";
    isDisabled.value = false;
    clearInterval(timer.value);
  };

  return {
    isDisabled,
    timer,
    text,
    start,
    end
  };
};
