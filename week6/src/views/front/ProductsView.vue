<template>
    <table class="table align-middle">
        <thead>
            <tr>
                <td>商品</td>
                <td>圖片</td>
                <td>價格</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products" :key="product.id">
                <td style="width: 200px">
                    <div
                        :style="{ backgroundImage : `url(${product.imageUrl})`}"
                        style="height: 100px; background-size: cover; background-position: center;">
                    </div>
                </td>
                <td>{{ product.title }}</td>

                <td>
                    <div v-if="product.price === product.origin_price" class="h5">
                        {{ product.price }} 元
                    </div>
                    <div v-else>
                        <del class="h6">原價 {{ product.origin_price }} 元</del>
                        <div class="h5">現在只要 {{ product.price }} 元</div>
                    </div>
                </td>
                <td>
                    <RouterLink :to="`/product/${product.id}`" class="btn btn-outline-secondary">查看產品</RouterLink>
                    <button type="button" class="btn btn-danger" :disabled="product.id === loadingItem"
                    @click="addToCart(product.id)">加到購物車</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { RouterLink } from 'vue-router'
import Swal from 'sweetalert2' // 引入SweetAlert
const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      loadingItem: ''
    }
  },
  components: {
    RouterLink
  },
  methods: {
    getProducts () {
      this.$http.get(`${VITE_API_URL}/api/${VITE_API_PATH}/products/all`)
        .then((res) => {
          console.log(res)
          this.products = res.data.products
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    },
    showAlert (messsage) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${messsage}`,
        showConfirmButton: false,
        timer: 1500
      })
    },
    addToCart (productId, qty = 1) {
      this.loadingItem = productId
      const data = {
        productId,
        qty
      }
      this.$http.post(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`, { data })
        .then(res => {
          this.loadingItem = ''
          this.showAlert(res.data.message)
        })
        .catch(err => {
          alert(err)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
