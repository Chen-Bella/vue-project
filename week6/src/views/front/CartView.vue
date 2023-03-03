<template>

  <table class="table align-middle">
    <thead>
      <tr>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
        <th>移除</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cart.carts">
        <tr v-for="item in cart.carts" :key="item.id">
          <td>
            {{ item.product.title }}
          </td>
          <td>
            <div class="input-group input-group-sm">
              <select
                name=""
                id=""
                class="form-select"
                v-model="item.qty"
                :disabled="item.id === loadingItem"
                @change="modifyCart(item)"
              >
                <option :value="i" v-for="i in 20" :key="`${i}456`">
                  {{ i }}
                </option>
              </select>
            </div>
          </td>
          <td class="text-end">
            {{ item.total }}
          </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="removeCartItem(item)"
              :disabled="item.id === loadingItem"
            >
              <i class="fas fa-spinner fa-pulse"></i>
              x
            </button>
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cart.total }}</td>
      </tr>
      <tr>
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cart.final_total }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import Swal from 'sweetalert2'
const { VITE_API_URL, VITE_API_PATH } = import.meta.env
export default {
  data () {
    return {
      cart: {},
      productID: '',
      loadingItem: ''
    }
  },
  methods: {
    getCarts () {
      this.$http
        .get(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`)
        .then((res) => {
          this.cart = res.data.data
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    modifyCart (item) {
      this.loadingItem = item.id // 抓id 觸發axios前 先存取
      const data = {
        product_id: item.product.id,
        qty: item.qty
      }
      this.$http
        .put(`${VITE_API_URL}/api/${VITE_API_PATH}/cart/${item.id}`, { data })
        .then((res) => {
          this.showAlert(res.data.message)
          this.getCarts()
          this.loadingItem = '' //  結束時清空id
        })
        .catch((err) => {
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
    removeCartItem (item) {
      // 刪除購物車品項
      this.loadingItem = item.id
      this.$http
        .delete(`${VITE_API_URL}/api/${VITE_API_PATH}/cart/${item.id}`)
        .then((res) => {
          this.showAlert(res.data.message)
          this.loadingItem = ''
          this.getCarts()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getCarts()
  }
}
</script>
