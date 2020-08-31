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
        <div class="card mt-3" v-for="topic in groupTopics(groups[k].id)" :key="topic.id">
          <div class="card-body">
            <h5 class="card-title">{{ topic.name }}</h5>
            <p v-show="topic.desc" class="card-text">{{ topic.desc }}</p>
            <hr />
            <p v-html="topicOpt(topic.id)"></p>
            <hr />
            <div class="d-flex justify-content-between">
              <a
                @click="toggleStatus(topic.id)"
                :class="'btn btn-sm flex-fill mr-2 btn-' + types[topic.status].style"
                ><fa-icons :icon="types[topic.status].icon" /> {{ types[topic.status].text }}</a
              >
              <a @click="removeTopic(topic.id)" :class="`btn btn-sm px-3 btn-${types[2].style}`"
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
import { groups, topics } from '../globals'

export default {
  data() {
    return {
      types: [
        { icon: 'pause', text: 'Paused!', style: 'secondary' },
        { icon: 'play', text: 'Working..', style: 'success' },
        { icon: 'trash-alt', text: 'Remove', style: 'danger' },
      ],
      groups: groups,
      topics: topics,
    }
  },
  methods: {
    groupTopics: function(_groupid) {
      return this.topics.filter((topic) => topic.group_id == _groupid)
    },
    topicOpt: function(_topicId) {
      let topic_data = this.topics.find((topic) => topic.id == _topicId)
      return topic_data.opt.map((obj) => obj.name + ': ' + obj.value.toFixed(2)).join('<br>')
    },
    toggleStatus: function(_topicId) {
      let topic = this.topics.find((topic) => topic.id == _topicId)
      topic.status = Number(!topic.status)
    },
    removeTopic: function(_topicId) {
      this.topics = this.topics.filter((topic) => topic.id !== _topicId)
    },
  },
  computed: {},
}
</script>

<style>
.card-body > .card:first-child {
  margin-top: 0 !important;
}
</style>
