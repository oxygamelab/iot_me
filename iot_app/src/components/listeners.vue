<template>
  <!-- Listeners -->
  <div class="col-4 d-flex flex-column scrolly">
    <div class="mb-2 d-flex justify-content-between">
      <button @click="clearData" type="button" class="btn btn-sm btn-secondary">
        <fa-icons icon="redo-alt" /> Clear All
      </button>
      <span class="text-muted">broker.hivemq.com:8000</span>
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
        ['info', 'primary'],
        ['danger', 'danger'],
      ],
      datas: [{ name: 'mysensor/humidity', value: 15.7, type: 2 }],
    }
  },
  mqtt: {
    /* '+'(data, topic) {
      console.log(topic + ': ' + String.fromCharCode.apply(null, data))
      this.addData(topic, String.fromCharCode.apply(null, data))
    }, */
    '+/+'(data, topic) {
      //console.log(topic + ': ' + String.fromCharCode.apply(null, data))
      this.addData(topic, String.fromCharCode.apply(null, data))
    },
  },
  methods: {
    clearData: function() {
      this.datas = []
    },
    addData: function(_title, _value, _type = 0) {
      this.datas.unshift({ name: _title, value: _value, type: _type })
      //this.pubTopic(_title, _value)
    },
    pubTopic: function(_topic, _value) {
      this.$mqtt.publish(_topic, _value)
    },
    /* subTopic: function(_topic, _call) {
      let topic = `${_topic.groupSlug}/${_topic.slug}`
      this.$mqtt.subscribe(topic, {}, (err) => {
        _call(err, topic)
      })
    }, */
    rndMinMax: function(min, max, rat) {
      let rnd = ((Math.random() * (max - min) + min) * rat).toFixed(2)
      let risk = (((max - min) * 8) / 10).toFixed(2)
      let type = 1
      if (rnd > max) {
        type = 2
      } else if (risk > rnd) {
        type = 0
      }
      return [rnd, type]
    },
    update: function() {
      /* this.datas = []
      this.topics.map((topic) => {
        if (topic.status) {
          let arr = topic.opt.map((topicOpt) => topicOpt.value)
          let val = this.rndMinMax(...arr)
          let title = `${topic.groupSlug}/${topic.slug}`
          //console.log(arr, vall)
          //val.unshift(title)
          //this.addData(...[title, ...val])
          console.log(title, val)
          //this.pubTopic(title, val[0])
        }
      }) */
    },
  },
  computed: {
    mtopics: function() {
      //this.groups.map((gro)=>{})
      return {
        'mysensor/+'(data, topic) {
          this.addData(topic, String.fromCharCode.apply(null, data))
        },
      }
    },
    datas10: function() {
      return this.datas.slice(0, 10)
    },
  },
  created: function() {
    /* let _ = this
    this.timer = setInterval(function() {
      _.update()
    }, this.rtime) */
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
