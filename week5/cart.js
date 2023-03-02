import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js";

Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== "default") {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

VeeValidateI18n.loadLocaleFromURL("./zh_TW.json");

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize("zh_TW"),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

const apiUrl = "https://vue3-course-api.hexschool.io";
const apiPath = "bella";

const productModal = {
  // 當id變動時，取得遠端資料，並呈現Modal
  props: ["id", "addToCart", "openModal"],
  data() {
    return {
      modal: {},
      tempProduct: {},
      qty: 1,
    };
  },
  template: "#userProductModal",
  watch: {
    id() {
      // id 變動了
      // console.log("productModalId", this.id);
      if (this.id) {
        axios
          .get(`${apiUrl}/v2/api/${apiPath}/product/${this.id}`)
          .then((res) => {
            // console.log("單一產品:", res.data.product);
            this.tempProduct = res.data.product;
            this.modal.show();
          });
      }
    },
  },
  methods: {
    hide() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
    // 監聽DOM, 當Modal關閉時...要做其他事情
    this.$refs.modal.addEventListener("hidden.bs.modal", (event) => {
      this.openModal(""); //改 ID
    });
  },
};

const app = createApp({
  data() {
    return {
      products: [],
      productId: "",
      order: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      state: {
        loadingItem: "",
        order: false,
      },
      cart: {},
      loadingItem: "", //存id
    };
  },
  methods: {
    getProducts() {
      axios.get(`${apiUrl}/v2/api/${apiPath}/products/all`).then((res) => {
        // console.log("產品列表:", res.data.products);
        this.products = res.data.products;
      });
    },
    openModal(id) {
      this.productId = id;
      // console.log("外層帶入productId:", id);
      this.state.loadingItem = id;
    },
    addToCart(product_id, qty = 1) {
      const data = {
        product_id,
        qty,
      };
      this.state.loadingItem = product_id;
      axios.post(`${apiUrl}/v2/api/${apiPath}/cart`, { data }).then((res) => {
        // console.log("加入購物車:", res.data);
        this.$refs.productModal.hide();
        this.getCarts();
        this.state.loadingItem = "";
      });
    },
    getCarts() {
      axios.get(`${apiUrl}/v2/api/${apiPath}/cart`).then((res) => {
        // console.log("購物車列表:", res.data.data);
        this.cart = res.data.data;
      });
    },
    updateCartItem(item) {
      // 購物車的id, 產品的id
      const data = {
        product_id: item.product.id, // 展開選取項目
        qty: item.qty,
      };
      this.loadingItem = item.id;
      // console.log(data, item.id);
      axios
        .put(`${apiUrl}/v2/api/${apiPath}/cart/${item.id}`, { data })
        .then((res) => {
          // console.log("更新購物車:", res.data);
          this.getCarts();
          this.loadingItem = "";
        });
    },
    deleteCartItem(item) {
      this.loadingItem = item.id;
      axios
        .delete(`${apiUrl}/v2/api/${apiPath}/cart/${item.id}`)
        .then((res) => {
          // console.log("刪除購物車:", res.data);
          this.getCarts();
          this.loadingItem = "";
        });
    },
    createOrder() {
      this.state.order = true;
      axios
        .post(`${apiUrl}/v2/api/${apiPath}/order`, { data: this.order })
        .then((res) => {
          // console.log("新增訂單:", res.data);
          // alert(res.message);
          this.$refs.form.resetForm();
          this.order = {
            user: {
              name: "",
              email: "",
              tel: "",
              address: "",
            },
            message: "",
          };
          this.state.order = false;
          this.getCarts();
        })
        .catch((err) => {
          alert(err);
          this.state.order = false;
        });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需要正確的電話號碼 ex:09開頭";
    },
  },
  components: {
    productModal,
  },
  mounted() {
    this.getProducts();
    this.getCarts();
  },
});

app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);

app.mount("#app");

// 1.取得品列表
// 2.按鈕顯示單一產品細節
//   2-1 點擊按鈕 > Modal展開(顯示lording) > 取得遠端資料 > 呈現資料 (皆可)
//   2-2 點擊按鈕 > 取得遠端資料 > Modal展開 > 呈現資料
//    取得遠端資料 1.外部元件執行 2.Modal 元件執行
// 3.加入購物車(可選擇數量)
// 4.購物車列表
// 5.調整數量
// 6.刪除品項
// 7.修正(讀取效果，watch錯誤)
