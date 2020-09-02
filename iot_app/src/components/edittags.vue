<template>
  <!-- Edit/Remove Tags -->
  <div class="col-4 topic-gouup">
    <div class="card mb-3" v-for="(v, k) in groups" :key="k">
      <div class="card-header" data-toggle="collapse" :data-target="'#topic-gouup-' + k">
        <fa-icons icon="share-alt" /> {{ groups[k].name }}
      </div>

      <div
        :id="'topic-gouup-' + k"
        :class="'card-body collapse ' + (k > 0 ? '' : 'show')"
        data-parent=".topic-gouup"
      >
        <div class="card mt-3" v-for="topic in groupTopics(groups[k].slug)" :key="topic.uniq">
          <sensorcard :topic="topic" :ref="topic.uniq" />
        </div>
      </div>
    </div>
  </div>
  <!-- Edit/Remove Tags -->
</template>

<script>
import sensorcard from '../components/sensorcard'

export default {
  components: {
    sensorcard,
  },
  data() {
    return {
      timer: null,
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
    groupTopics: function(_groupSlug) {
      return this.topics.filter((topic) => topic.groupSlug == _groupSlug)
    },
    topicOpt: function(_topicUniq) {
      let topic_data = this.topics.find((topic) => topic.uniq == _topicUniq)
      return topic_data.opt.map((obj) => obj.name + ': ' + obj.value.toFixed(2)).join('<br>')
    },
    toggleStatus: function(_topicUniq) {
      let topic = this.topics.find((topic) => topic.uniq == _topicUniq)
      topic.status = Number(!topic.status)
    },
    removeTopic: function(_topicUniq) {
      let topic = this.topics.find((_topic) => _topic.uniq == _topicUniq)

      //this.topics = Object.values([this.topics.filter((_topic) => _topic.uniq !== _topicUniq)])
      /* this.topics.splice(
           this.topics.findIndex((e) => e.uniq === _topicUniq),
           1
         ) */

      this.unsubTopic(topic, (err, topic) => {
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
      console.log(topic, _value)
      this.$mqtt.publish(topic, _value)
    },
    unsubTopic: function(_topic, _call) {
      let topic = `${_topic.groupSlug}/${_topic.slug}`
      this.$mqtt.unsubscribe(topic, (err) => {
        _call(err, topic)
      })
    },
    topicval: function() {
      let arr = {}
      this.topics.map((top) => {
        if (top.status) {
          let _rnd = this.$refs[top.uniq][0].getRandom()
          if (!arr[top.groupSlug]) {
            arr[top.groupSlug] = {}
          }
          arr[top.groupSlug][top.slug] = _rnd
        }
      })
      //console.log(arr)

      Object.keys(arr).map((a) => {
        //console.log(a, JSON.stringify(arr[a]))
        this.pubTopic(`${a}`, JSON.stringify(arr[a]))
        Object.keys(arr[a]).map((b) => {
          //console.log(b, arr[a][b])
          this.pubTopic(`${a}/${b}`, arr[a][b])
        })
      })
    },
    update: function() {
      this.topicval()
    },
  },
  created: function() {
    let _ = this
    this.timer = setInterval(function() {
      _.update()
    }, 2000)
  },
}
</script>

<style>
.card-body > .card:first-child {
  margin-top: 0 !important;
}
</style>
