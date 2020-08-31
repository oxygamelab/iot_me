<template>
  <!-- Listeners -->
  <div class="col-4 d-flex flex-column">
    <div class="mb-2 text-right">
      <button @click="clearData" type="button" class="btn btn-sm btn-secondary">
        <fa-icons icon="redo-alt" /> Clear All
      </button>
    </div>
    <div class="flex-grow-1">
      <div
        v-for="(v, k) in datas"
        :key="k"
        :class="'d-flex justify-content-between align-items-center alert alert-' + types[datas[k].type][0]"
      >
        {{ datas[k].name }}
        <span :class="'badge badge-' + types[datas[k].type][1]">{{ datas[k].value }}</span>
      </div>
    </div>
  </div>
  <!-- Listeners -->
</template>

<script>
export default {
  data() {
    return {
      types: [
        ['warning', 'success'],
        ['danger', 'danger'],
      ],
      datas: [
        { name: 'MySensors/Humidity', value: 23.4, type: 0 },
        { name: 'MySensors/Temperature', value: 11.2, type: 1 },
      ],
    }
  },
  methods: {
    clearData: function() {
      this.datas = []
    },
    addData: function(_group, _topic, _value, _type) {
      this.datas.unshift({ name: `${_group}/${_topic}`, value: _value, type: _type })
    },
  },
}
</script>

<style></style>
