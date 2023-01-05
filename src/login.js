import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import axios from "https://cdnjs.cloudflare.com/ajax/libs/axios/1.2.2/esm/axios.min.js";

const url = "https://vue3-course-api.hexschool.io/v2"; // 請加入站點
const path = "testadd";

createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios
        .post(`${url}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `myToken=${token}; expires= ${new Date(expired)}`;
        })
        // error
        .catch((error) => {
          console.dir(error);
        });
    },
  },
}).mount("#app");
