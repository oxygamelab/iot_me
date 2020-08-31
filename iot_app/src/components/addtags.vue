<template>
  <!-- Add Tags/Groups -->
  <div class="col-4">
    <form ref="topicFrm" @submit.prevent="getForm">
      <div class="form-group">
        <label for="exampleInputEmail1">Topic Group</label>
        <input type="text" class="form-control" v-model="topicGroup" placeholder="e.g. MySensors" required />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Topic Name</label>
        <input type="text" class="form-control" v-model="topicName" placeholder="e.g. Humidity" required />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Description</label>
        <textarea
          class="form-control"
          v-model="topicDesc"
          placeholder="Short desc about topic.."
          rows="3"
        ></textarea>
      </div>
      <div class="form-row">
        <div class="col-md-4 mb-3">
          <label>Min.</label>
          <input type="text" class="form-control" v-model="topicMin" placeholder="e.g. 0.01" />
        </div>
        <div class="col-md-4 mb-3">
          <label>Max.</label>
          <input type="text" class="form-control" v-model="topicMax" placeholder="e.g. 70.0" />
        </div>
        <div class="col-md-4 mb-3">
          <label>Ratio (%)</label>
          <input type="text" class="form-control" v-model="topicRatio" placeholder="e.g. 1.0" />
        </div>
      </div>
      <div class="form-group">
        <div class="form-check">
          <input type="checkbox" class="form-check-input" v-model="topicPush" />
          <label class="form-check-label">Start pushing after create</label>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Create Topic</button>
    </form>
  </div>
  <!-- Add Tags/Groups -->
</template>

<script>
import { topics } from '../globals'

export default {
  data() {
    return {
      topics: topics,
      topicGroup: null,
      topicName: null,
      topicDesc: null,
      topicMin: null,
      topicMax: null,
      topicRatio: null,
      topicPush: null,
    }
  },
  methods: {
    getForm: function() {
      this.addTopic(
        this.topicGroup,
        this.topicName,
        this.topicDesc,
        this.topicMin,
        this.topicMax,
        this.topicRatio,
        this.topicPush
      )
    },
    addTopic: function(_group, _topic, _desc, _min, _max, _ratio, _status) {
      this.topics.push({
        id: 4,
        uniq: `${_group}-${_topic}-1-1`,
        name: _topic,
        desc: _desc,
        opt: [
          { slug: 'min', name: 'Min. value', value: parseFloat(_min) },
          { slug: 'max', name: 'Max. value', value: parseFloat(_max) },
          { slug: 'ratio', name: 'Ratio', value: parseFloat(_ratio) },
        ],
        status: Number(_status),
        group_id: 2,
      })
      this.$refs.topicFrm.reset()
    },
  },
}
</script>

<style></style>
