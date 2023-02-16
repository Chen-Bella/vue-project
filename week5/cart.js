import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js";

const apiUrl = "https://vue3-course-api.hexschool.io";
const apiPath = "bella";

const app = createApp({
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProducts() {
      axios
        .get(`${apiUrl}/v2/api/${apiPath}/admin/products/all`)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getProducts();
  },
});

app.mount("#app");

// 1.取得品列表
// 2.按鈕顯示單一產品細節
// 3.加入購物車(可選擇數量)
// 4.購物車列表
// 5.調整數量
// 6.刪除品項
// eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS92dWUtY291cnNlLWFwaSIsImF1ZCI6InZ1ZS1jb3Vyc2UtYXBpIiwiYXV0aF90aW1lIjoxNjc2MjkzNDMyLCJ1c2VyX2lkIjoic0NYNk1qWmk1SFh3TFFZYmFJUFJMQWk0TWNMMiIsInN1YiI6InNDWDZNalppNUhYd0xRWWJhSVBSTEFpNE1jTDIiLCJpYXQiOjE2NzYyOTM0MzIsImV4cCI6MTY3NjcyNTQzMiwiZW1haWwiOiJiZWxsaWUxMTEwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJiZWxsaWUxMTEwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.eRewwT3SkhUMdwCro061JDPIAgOxuRS5KGSzcDBCUEPy4v4ITOOSzyvRF4a_7NTvGM8sroVVcR2VxZhyq4A4y-dJvU--1UaCmky8XiaWaBLiJC1A8OimFrLx9u7nxZccr_iR3C4mhYIr-kDxlgI4LaX3iBfmRiv22DzOIUraTLpK4FwEncHvAOPRsHV7hYV9QRYIAfsPfpB1jERe15jv10JZA8x6bl3Sg449SkzttBglDbBSvLl5YacrvzWYzhyftN1__rpPrjdTEvnqhW1jEo6VlHYoCpu_r_1Prg1fHvQgGbvVFNAerPEIB-qXSo_u8KXpYHyiZGIpRlthUJWHgA