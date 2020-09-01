<template>
  <div style="position:relative" v-bind:class="{ open: isOpen }">
    <input
      class="form-control"
      type="text"
      v-model="search"
      @input="onChange"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
      @focus="onChange"
      required
      :placeholder="this.placeholder"
    />
    <ul class="dropdown-menu" style="width:100%" :class="{ show: isOpen }">
      <li class="dropdown-item" v-for="(result, i) in results" :key="i" @click="setResult(result)">
        {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    placeholder: {
      type: String,
    },
  },
  data() {
    return {
      search: '',
      results: [],
      isOpen: false,
    }
  },
  methods: {
    onChange() {
      this.$emit('input', this.search)
      //this.isOpen = true
      this.filterResults()
    },
    filterResults() {
      this.results = this.items.filter((item) => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
      this.isOpen = this.results.length > 0 ? 1 : 0
    },
    setResult(result) {
      this.search = result
      this.isOpen = false
      this.$emit('input', result)
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter]
      this.isOpen = false
      this.arrowCounter = -1
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false
        this.arrowCounter = -1
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside)
  },
}
</script>
