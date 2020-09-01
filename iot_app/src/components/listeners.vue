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
        v-for="(v, k) in datas10"
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
//import { groups, topics } from '../globals'

export default {
  data() {
    return {
      //groups: null,
      //topics: null,
      timer: null,
      rtime: 2000,
      types: [
        ['warning', 'success'],
        ['danger', 'danger'],
      ],
      datas: [],
    }
  },
  mqtt: {
    /* "param/+/+/test": function(val) {
      console.log("param/+/+/test");
    },
    "param/#": function(val) {
      console.log("param/#");
    },
    "param/param/param/test": function(val) {
      console.log("param/param/param/test");
    }, */
    'gateway/+'(data, topic) {
      if (topic.split('/').pop() === 'sensor') {
        //console.log("topic:", "gateway/sensor");
        console.log(topic + ': ' + String.fromCharCode.apply(null, data))
        /* this.sens.unshift({
          name: 'sensor',
          value: String.fromCharCode.apply(null, data),
        })
        this.sens.splice(-1, this.sens.length - 10) */
      }
    },
  },
  methods: {
    clearData: function() {
      this.datas = []
    },
    addData: function(_title, _value, _type = 0) {
      this.datas.unshift({ name: _title, value: _value, type: _type })
      this.pubTopic(_title, _value)
    },
    pubTopic: function(_topic, _value) {
      this.$mqtt.publish(_topic, _value)
    },
    rndMinMax: function(min, max, rat) {
      let rnd = (Math.random() * (max - min) + min).toFixed(2)
      let risk = (((max - min) * rat) / 100).toFixed(2)
      return [rnd, risk > rnd ? 0 : 1]
    },
    update: function() {
      this.datas = []
      this.topics.map((topic) => {
        if (topic.status) {
          let arr = topic.opt.map((topicOpt) => topicOpt.value)
          let val = this.rndMinMax(...arr)
          let title = `${topic.groupSlug}/${topic.slug}`
          //console.log(arr, vall)
          val.unshift(title)
          this.addData(...val)
        }
      })
    },
  },
  computed: {
    datas10: function() {
      return this.datas.slice(0, 10)
    },
  },
  created: function() {
    let _ = this
    this.timer = setInterval(function() {
      _.update()
    }, this.rtime)
  },
  /* watch: {
    '$parent.topics'(nv) {
      debugger // eslint-disable-line
      console.log(nv)
    },
  }, */
}
</script>

<style></style>
