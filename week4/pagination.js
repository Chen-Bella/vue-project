export default {
  props: ["pages","getAllProducts"],
  template: `<nav aria-label="Page navigation example">
  <!--{{ pages }}-->
  <ul class="pagination">
    <li class="page-item"
    :class = "{ disable : !pages.has_pre }">
      <a class="page-link" href="#" aria-label="Previous"
      @click.prevent="getAllProducts(pages.current_page -1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>


    <li class="page-item"
    :class = "{ active : page === pages.current_page }" 
    v-for="page in pages.total_pages" :key="page +'page'">  <!-- if page === page.current_page => active-->
        <a class="page-link" href="#"

        @click.prevent="$emit('chang-page', page)"
            ><!--@click.prevent="getAllProducts(page)-->
            {{ page }}
        </a>

    </li>
    
    
    <li class="page-item"
    :class = "{ disable : !pages.has_next }">
      <a class="page-link" href="#" aria-label="Next"
      @click.prevent="getAllProducts(pages.total_pages)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`,
};
