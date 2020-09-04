<template>
  <!-- Add Tags/Groups -->
  <div class="col-4 scrolly">
    <form ref="topicFrm" @submit.prevent="getForm">
      <div class="form-group">
        <label>Topic Group</label>
        <autocomplete :items="groupName()" v-model="topicGroup" :placeholder="'e.g. MySensor'">
        </autocomplete>
      </div>
      <div class="form-group">
        <label>Topic Name</label>
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
          <label>Ratio</label>
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
//import { groups, topics } from '../globals'
import { lowercase, spinalcase } from 'stringcase'
import { v4 as uuidv4 } from 'uuid'

export default {
  data() {
    return {
      //groups: groups,
      //topics: topics,
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
    toSafe: function(text) {
      return spinalcase(lowercase(text))
    },
    groupName: function() {
      return this.groups.map((group) => group.name)
    },
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
    addTopic: function(...args) {
      const [_group, _topic, _desc, _min, _max, _ratio, _status] = args

      /** create group get slug */
      //--
      let _groupObj = this.groups.find((group) => group.slug == this.toSafe(_group))
      let _groupSlug = this.toSafe(_group)
      if (!_groupObj) {
        this.groups.push({ slug: _groupSlug, name: _group })
      }

      /** create topic get uniq */
      //--
      let _topicUniq = uuidv4()

      const newTopic = {
        //id: _topicId,
        uniq: _topicUniq,
        slug: this.toSafe(_topic),
        name: _topic,
        desc: _desc,
        opt: [
          { slug: 'min', name: 'Min. value', value: parseFloat(_min) },
          { slug: 'max', name: 'Max. value', value: parseFloat(_max) },
          { slug: 'ratio', name: 'Ratio', value: parseFloat(_ratio) },
        ],
        status: Number(_status),
        groupSlug: _groupSlug,
      }

      //console.log(newTopic)
      this.topics.push(newTopic)

      //** subscribe topic */
      //--
      this.subTopic(newTopic, (err, topic) => {
        if (!err) {
          //console.log(granted);
          console.log(`Subscribe | topic: ${topic}`)
          //console.log(`Unsubscribe | topic: ${_topic}`)
        } else {
          console.log(`Err: ${err}`)
        }
      })

      //** publish */
      //--

      this.clearForm()
    },
    clearForm: function() {
      this.topicGroup = null
      this.topicName = null
      this.topicDesc = null
      this.topicMin = null
      this.topicMax = null
      this.topicRatio = null
      this.topicPush = null
      this.$refs.topicFrm.reset()
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
    pubTopic: function(_topic, _value) {
      let topic = `${_topic.groupSlug}/${_topic.slug}`
      this.$mqtt.publish(topic, _value)
    },
  },
}
</script>

<style></style>
