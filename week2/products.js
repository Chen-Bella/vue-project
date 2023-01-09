import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import axios from "https://cdnjs.cloudflare.com/ajax/libs/axios/1.2.2/esm/axios.min.js";

const url = "https://vue3-course-api.hexschool.io/v2"; // 請加入站點
const path = "bella";

createApp({
  data() {
    return {
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    checkAdmin() {
      axios
        .post(`${url}/api/user/check`)
        .then(() => {
          this.getAllProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html";
        });
    },
    getAllProducts() {
      axios
        .get(`${url}/api/${path}/admin/products`)
        .then((response) => {
          this.products = response.data.products;
        })
        .catch((err) => {
          // console.dir(err);
        });
    },
    openProduct(item) {
      this.tempProduct = item;
    },
  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin();
  },
}).mount("#app");
