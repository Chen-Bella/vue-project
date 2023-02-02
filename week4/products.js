import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import axios from "https://cdnjs.cloudflare.com/ajax/libs/axios/1.2.2/esm/axios.min.js";
import pagination from "./pagination.js";

let productModal = {};
let delProductModal = {};

const app = createApp({
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      path: "bella",
      tempProduct: {
        imagesUrl: [],
      },
      products: [],
      isNew: false,
      page: {},
    };
  },
  methods: {
    checkAdmin() {
      axios
        .post(`${this.apiUrl}/api/user/check`)
        .then((response) => {
          this.getAllProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html";
        });
    },
    getAllProducts(page = 1) {
      //預設參數
      axios
        .get(`${this.apiUrl}/api/${this.path}/admin/products/?page=${page}`)
        .then((response) => {
          // console.log(response.data)
          this.products = response.data.products;
          this.page = response.data.pagination;
        })
        .catch((err) => {
          // console.dir(err);
        });
    },
    openModal(state, item) {
      if (state === "insert") {
        productModal.show(); // 2.呼叫方法
        this.isNew = true;
        this.tempProduct = {
          imagesUrl: [],
        };
      } else if (state === "update") {
        productModal.show();
        this.isNew = false;
        this.tempProduct = { ...item };
      } else if (state === "delete") {
        delProductModal.show();
        this.tempProduct = { ...item }; //取id
      }
    },
    updateProduct() {
      let productUrl = `${this.apiUrl}/api/${this.path}/admin/product`;
      let http = "post";

      if (!this.isNew) {
        //Update
        productUrl = `${this.apiUrl}/api/${this.path}/admin/product/${this.tempProduct.id}`;
        http = "put";
      }

      //Insert
      axios[http](productUrl, { data: this.tempProduct })
        .then((response) => {
          productModal.hide(); // 2.呼叫方法
          alert(response.data.message);
          this.getAllProducts();
          this.tempProduct = {};
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    deleteProduct() {
      // console.log("deleteProduct", this.tempProduct.id);
      axios
        .delete(
          `${this.apiUrl}/api/${this.path}/admin/product/${this.tempProduct.id}`
        )
        .then((response) => {
          alert(response.data.message);
          delProductModal.hide();
          this.tempProduct = {};
          this.getAllProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  components: {
    pagination, //import //區域
  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin();

    productModal = new bootstrap.Modal(document.querySelector("#productModal")); //1.初始化 new
    delProductModal = new bootstrap.Modal(
      document.querySelector("#delProductModal")
    );
  },
});

//新增修改元件
app.component("product-modal", {
  props: ["tempProduct","updateProduct","isNew"],
  template: "#product-modal-template",
});

//刪除元件
app.component("del-product-modal", {
  props: ["tempProduct","deleteProduct"],
  template: "#del-product-modal-template",
});

app.mount("#app");
