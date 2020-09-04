<template>
  <!-- Listeners -->
  <div class="col-4 d-flex flex-column scrolly">
    <div class="mb-2 d-flex justify-content-between">
      <button @click="clearData" type="button" class="btn btn-sm btn-secondary">
        <fa-icons icon="redo-alt" /> Clear All
      </button>
      <span
        :class="[
          'btn btn-sm disabled',
          { 'btn-success': this.$mqttcon, 'btn-outline-secondary': !this.$mqttcon },
        ]"
        ><fa-icons icon="wifi" />
      </span>
    </div>
    <div class="flex-grow-1">
      <div
        v-for="sen in this.$sens"
        :key="sen.name"
        :class="'d-flex justify-content-between align-items-center alert alert-' + types[sen.type][0]"
      >
        {{ sen.name }}
        <span :class="'badge badge-' + types[sen.type][1]">{{ sen.value }}</span>
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
  methods: {
    clearData: function() {
      this.$sens = []
    },
    addData: function(_title, _value, _type = 0) {
      console.log(this.$sens)
      let newtopic = true
      //let _ = this
      this.$sens.map((sen) => {
        if (sen.name == _title) {
          console.log(_title, _value)
          //_.$sens.splice(i, 0)
          sen.value = _value
          newtopic = false
        }
      })
      if (newtopic) {
        this.$sens.unshift({ name: _title, value: _value, type: _type })
      }
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
      return this.$sens.slice(0, 10)
    },
  },

  watch: {
    '$parent.$mqttcon'(nv) {
      //debugger // eslint-disable-line
      let _ = this
      if (nv) {
        this.$mqtt.on('message', function(topic, message) {
          //console.log(topic, message.toString())
          if (topic.includes('/')) {
            _.addData(topic, message.toString())
          }
        })
      }
    },
  },
}
</script>

<style></style>
