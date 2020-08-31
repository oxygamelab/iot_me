<template>
  <div class="content">
    <div>
      <span>{{ boss }}</span>
    </div>
    <div>
      <button @click="clickPub">Send Test Data</button>
      <button @click="clickSub">Subscribe</button>
      <button @click="clickUnsub">Unsubscribe</button>
      <ul>
        <li v-for="(sen, i) in sens" :key="i">
          <span>{{ sens[i].name }}</span>
          <span>{{ sens[i].value }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boss: "hi boss..",
      sens: [],
    };
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
    "gateway/+"(data, topic) {
      if (topic.split("/").pop() === "sensor") {
        //console.log("topic:", "gateway/sensor");
        //console.log(topic + ": " + String.fromCharCode.apply(null, data));
        this.sens.unshift({
          name: "sensor",
          value: String.fromCharCode.apply(null, data),
        });
        this.sens.splice(-1, this.sens.length - 10);
      }
    },
  },
  methods: {
    clickSub: function() {
      this.$mqtt.subscribe("gateway/sensor", {}, (err) => {
        if (!err) {
          //console.log(granted);
          console.log("Subscribe | topic: gateway/sensor");
        }
      });
    },
    clickUnsub: function() {
      this.$mqtt.unsubscribe("gateway/sensor", (err) => {
        if (!err) {
          console.log("Unsubscribe | topic: gateway/sensor");
        }
      });
    },
    clickPub: function() {
      this.$mqtt.publish("gateway/sensor", "14.6");
    },
    created() {
      //this.clickSub();
    },
  },
};
</script>

<style>
.content {
  width: 100%;
  display: flex;
}
.content > div {
  flex: 1;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 10px;
  background-color: #eee;
}
li {
  padding: 4px 8px;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
}
ul li:first-child {
  border: none;
}
</style>
