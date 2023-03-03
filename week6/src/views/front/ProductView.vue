<template>
    <div class="row">
        <div class="col-sm-6">
            <img class="img-fluid" :src="product.imageUrl" alt="" width="300">
        </div>
        <div class="col-sm-6">
            <span class="badge bg-primary rounded-pill">{{  }}</span>
            <p>商品描述：{{ product.description }}</p>
            <p>商品內容：{{ product.content }}</p>
            <div v-if="product.price === product.origin_price" class="h5">{{ product.price }} 元</div>
            <div v-else>
            <del class="h6">原價 {{ product.origin_price }} 元</del>
            <div class="h5">現在只要 {{ product.price }} 元</div>
            </div>
            <div>
                <div class="input-group">
                    <select name="num" id="" class="form-select">
                    <option :value="i" v-for="i in 10" :key="`${i}12`">{{ i }}</option>
                    </select>
                </div>
            </div>
        </div>
    <!-- col-sm-6 end -->
    </div>
</template>

<script>
const { VITE_API_URL, VITE_API_PATH } = import.meta.env

export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      this.$http.get(`${VITE_API_URL}/api/${VITE_API_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product
        })
        .catch(err => {
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
