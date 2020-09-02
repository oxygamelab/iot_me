<template>
  <div class="card-body">
    <h5 class="card-title">{{ topic.name }}</h5>
    <p v-show="topic.desc" class="card-text">{{ topic.desc }}</p>
    <hr />
    <p v-show="topic.status" v-html="topicOpt"></p>
    <div v-show="!topic.status" class="form-row">
      <div class="col-md-4 mb-3">
        <label>Min.</label>
        <input type="text" class="form-control" v-model="topicMin" />
      </div>
      <div class="col-md-4 mb-3">
        <label>Max.</label>
        <input type="text" class="form-control" v-model="topicMax" />
      </div>
      <div class="col-md-4 mb-3">
        <label>Ratio</label>
        <input type="text" class="form-control" v-model="topicRatio" />
      </div>
    </div>
    <hr />
    <div class="d-flex justify-content-between">
      <a
        @click="toggleStatus(topic.uniq)"
        :class="'btn btn-sm flex-fill mr-2 btn-' + types[topic.status].style"
        ><fa-icons :icon="types[topic.status].icon" /> {{ types[topic.status].text }}</a
      >
      <a @click="removeTopic" :class="`btn btn-sm px-3 btn-${types[2].style}`"
        ><fa-icons :icon="types[2].icon" /> {{ types[2].text }}</a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    topic: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      gidendata: 0,
      timer: null,
      topicMin: 0,
      topicMax: 0,
      topicRatio: 0,
      types: [
        { icon: 'pause', text: 'Paused!', style: 'secondary' },
        { icon: 'play', text: 'Working..', style: 'success' },
        { icon: 'trash-alt', text: 'Remove', style: 'danger' },
      ],
      //groups: null,
      //topics: null,
    }
  },
  methods: {
    getRandom: function() {
      let arr = this.topic.opt.map((topicOpt) => topicOpt.value)
      let val = this.rndMinMax(...arr)
      return val
    },
    update: function() {
      let arr = this.topic.opt.map((topicOpt) => topicOpt.value)
      let val = this.rndMinMax(...arr)
      let title = `${this.topic.groupSlug}/${this.topic.slug}`
      //this.pubTopic(title, val)
      this.$emit('getval', [title, val])
    },
    toggleTimer: function() {
      let _ = this
      if (_.topic.status) {
        _.timer = setInterval(function() {
          _.update()
        }, 2000)
      } else {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    groupTopics: function(_groupSlug) {
      return this.topics.filter((topic) => topic.groupSlug == _groupSlug)
    },
    /* topicOpt: function(_topicUniq) {
      let topic_data = this.topics.find((topic) => topic.uniq == _topicUniq)
      return topic_data.opt.map((obj) => obj.name + ': ' + obj.value.toFixed(2)).join('<br>')
    }, */
    toggleStatus: function(_topicUniq) {
      let topic = this.topics.find((topic) => topic.uniq == _topicUniq)
      topic.opt.map((topt) => {
        switch (topt.slug) {
          case 'min':
            topt.value = Number(this.topicMin)
            break
          case 'max':
            topt.value = Number(this.topicMax)
            break
          case 'ratio':
            topt.value = Number(this.topicRatio)
            break
        }
      })
      topic.status = Number(!topic.status)
      //this.toggleTimer()
    },
    removeTopic: function() {
      //let topic = this.topics.find((_topic) => _topic.uniq == _topicUniq)
      //this.topics = this.topics.filter((_topic) => _topic.uniq !== _topicUniq)

      this.topics.splice(
        this.topics.findIndex((e) => e.uniq === this.topic.uniq),
        1
      )

      this.unsubTopic(this.topic, (err, topic) => {
        if (!err) {
          //console.log(granted);
          console.log(`Unubscribe | topic: ${topic}`)
        } else {
          console.log(`Err: ${err}`)
        }
      })
    },
    pubTopic: function(_topic, _value) {
      let topic = `${_topic}`
      this.$mqtt.publish(topic, _value)
    },
    subTopic: function(_topic, _call) {
      let topic = `${_topic.groupSlug}/${_topic.slug}`
      this.$mqtt.subscribe(topic, {}, (err) => {
        _call(err, topic)
      })
    },
    unsubTopic: function(_topic, _call) {
      let topic = `${_topic.groupSlug}/${_topic.slug}`
      this.$mqtt.unsubscribe(topic, (err) => {
        _call(err, topic)
      })
    },
    rndMinMax: function(min, max, rat) {
      return ((Math.random() * (max - min) + min) * rat).toFixed(2)
      /* let risk = (((max - min) * 8) / 10).toFixed(2)
      let type = 1
      if (rnd > max) {
        type = 2
      } else if (risk > rnd) {
        type = 0
      }
      return [rnd, type] */
    },
  },
  computed: {
    topicOpt: function() {
      return this.topic.opt.map((obj) => obj.name + ': ' + obj.value.toFixed(2)).join('<br>')
    },
  },
  created() {
    var _ = this
    this.$mqtt.subscribe(this.topic.groupSlug, {}, (err) => {
      if (!err) {
        //console.log(granted);
        console.log(`Subscribe | topic: ${_.topic.groupSlug}`)
      } else {
        console.log(`Err: ${err}`)
      }
    })
    this.subTopic(this.topic, (err, topic) => {
      if (!err) {
        //console.log(granted);
        console.log(`Subscribe | topic: ${topic}`)
        //console.log(`Unsubscribe | topic: ${_topic}`)
      } else {
        console.log(`Err: ${err}`)
      }
    })

    let topicOpts = this.topic.opt.map((topt) => topt.value)

    this.topicMin = topicOpts[0]
    this.topicMax = topicOpts[1]
    this.topicRatio = topicOpts[2]
  },
}
</script>

<style></style>
