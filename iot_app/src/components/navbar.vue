<template>
  <nav class="navbar navbar-light bg-light">
    <a class="navbar-brand" href="#">
      <img
        src="https://getbootstrap.com/docs/4.5/assets/brand/bootstrap-solid.svg"
        width="30"
        height="30"
        class="d-inline-block align-top"
        alt=""
        loading="lazy"
      />
      {{ title }}
    </a>
    <button @click="togglePanel()" type="button" class="btn btn-sm btn-secondary">
      <fa-icons :icon="btnBack[this.$pan][1]" /> {{ btnBack[this.$pan][0] }}
    </button>
  </nav>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: () => 'IOT Listener',
    },
  },
  data() {
    return {
      btnBack: [
        ['Settings', 'cog'],
        ['Close', 'times'],
      ],
    }
  },
  methods: {
    togglePanel() {
      this.$pan = Number(!this.$pan)
    },
  },
  watch: {
    '$parent.panno'(nv) {
      debugger // eslint-disable-line
      console.log(nv)
    },
  },
}
</script>

<style></style>
