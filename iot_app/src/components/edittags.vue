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
          <div class="card-body">
            <h5 class="card-title">{{ topic.name }}</h5>
            <p v-show="topic.desc" class="card-text">{{ topic.desc }}</p>
            <hr />
            <p v-html="topicOpt(topic.uniq)"></p>
            <hr />
            <div class="d-flex justify-content-between">
              <a
                @click="toggleStatus(topic.uniq)"
                :class="'btn btn-sm flex-fill mr-2 btn-' + types[topic.status].style"
                ><fa-icons :icon="types[topic.status].icon" /> {{ types[topic.status].text }}</a
              >
              <a @click="removeTopic(topic.uniq)" :class="`btn btn-sm px-3 btn-${types[2].style}`"
                ><fa-icons :icon="types[2].icon" /> {{ types[2].text }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Edit/Remove Tags -->
</template>

<script>
//import { groups, topics } from '../globals'

export default {
  data() {
    return {
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
      //this.topics = this.topics.filter((_topic) => _topic.uniq !== _topicUniq)
      this.topics.splice(
        this.topics.findIndex((e) => e.uniq === _topicUniq),
        1
      )

      this.unsubTopic(topic, (err, topic) => {
        if (!err) {
          //console.log(granted);
          console.log(`Unubscribe | topic: ${topic}`)
        } else {
          console.log(`Err: ${err}`)
        }
      })
    },
    unsubTopic: function(_topic, _call) {
      let topic = `${_topic.groupSlug}/${_topic.slug}`
      this.$mqtt.unsubscribe(topic, (err) => {
        _call(err, topic)
      })
    },
  },
}
</script>

<style>
.card-body > .card:first-child {
  margin-top: 0 !important;
}
</style>
