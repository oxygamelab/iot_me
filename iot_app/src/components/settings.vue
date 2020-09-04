<template>
  <!-- Settings -->
  <div class="row h-100">
    <div class="col-3 scrolly">
      <div class="nav flex-column nav-pills">
        <a class="nav-link" data-toggle="pill" href="#v-pills-home">General</a>
        <a class="nav-link" data-toggle="pill" href="#v-pills-profile">Account</a>
        <a class="nav-link active" data-toggle="pill" href="#v-pills-messages">Server</a>
        <a class="nav-link" data-toggle="pill" href="#v-pills-settings">Info</a>
      </div>
    </div>
    <div class="col-9 scrolly">
      <div class="tab-content" id="v-pills-tabContent">
        <div class="tab-pane fade" id="v-pills-home">
          <h4>General Settings</h4>
          <form>
            <div class="form-group">
              <label>Language</label>
              <select class="form-control">
                <option value="1" selected>English</option>
                <option value="2" disabled>Türkçe</option>
              </select>
            </div>
            <div class="form-group">
              <label>Dark Mode</label>
              <div>
                <label class="switch">
                  <input type="checkbox" :checked="this.$dark" @change="toggleDark()" />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
          </form>
        </div>
        <div class="tab-pane fade" id="v-pills-profile">
          <h4>Account &amp; Sync</h4>
          <form>
            <div class="form-group">
              <label>Username</label>
              <input type="text" class="form-control" />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" />
            </div>
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" />
              <label class="form-check-label">Auto sync</label>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary">Sign-In</button>
            </div>
          </form>
        </div>
        <div class="tab-pane fade show active" id="v-pills-messages">
          <h4>Server Settings</h4>
          <form ref="serverFrm" @submit.prevent="saveServer">
            <div class="form-group ">
              <label
                >MQTT Servers
                <span v-show="showDisconnect" class="badge badge-success">Connected..</span></label
              >

              <select class="form-control" v-model="selServer">
                <option value="0">Create Your Server</option>
                <option value="1">Add Other Server</option>
                <option :value="serv.uniq" v-for="serv in this.$servers" :key="serv.uniq"
                  >{{ serv.host }}:{{ serv.port }}</option
                >
              </select>
            </div>
            <div class="form-group form-row">
              <div class="col">
                <label>Host</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="serverHost"
                  :disabled="serverEditable"
                  required
                />
              </div>
              <div class="col-3">
                <label>Port</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="serverPort"
                  :disabled="serverEditable"
                  required
                />
              </div>
              <div class="col-3">
                <label>Path</label>
                <input type="text" class="form-control" v-model="serverPath" :disabled="serverEditable" />
              </div>
            </div>
            <div class="form-group form-row">
              <div class="col">
                <label>Username</label>
                <input type="text" class="form-control" v-model="serverUser" :disabled="serverEditable" />
              </div>
              <div class="col">
                <label>Password</label>
                <input type="password" class="form-control" v-model="serverPass" :disabled="serverEditable" />
              </div>
            </div>
            <div class="form-group">
              <button type="submit" v-show="!serverEditable" class="btn btn-primary mr-2">
                Save
              </button>
              <button type="button" v-show="showConnect" @click="connServer()" class="btn btn-success mr-2">
                Connect
              </button>
              <button type="button" v-show="showDisconnect" @click="disconnServer()" class="btn btn-danger">
                Disconnect
              </button>
            </div>
          </form>
        </div>
        <div class="tab-pane fade" id="v-pills-settings">
          <p class="mt-2">
            <img src="https://trex.com.tr/wp-content/themes/trex/src/img/trex_color.svg" width="40%" />
          </p>
          <p>
            <small class="text-muted">
              Pellentesque elementum tortor ligula, ut tempor sapien fringilla in. Morbi a condimentum ex.
              Praesent euismod eget tortor non lacinia. Vivamus iaculis convallis elit ut eleifend. Maecenas
              nibh turpis, posuere vel posuere et, hendrerit ac est. Pellentesque ultricies ultricies enim ac
              iaculis. Aenean sit amet neque sit amet leo ullamcorper eleifend.
            </small>
          </p>
          <p class="mt-2 text-center">
            <img src="https://behrtech.com/wp-content/uploads/2019/03/MQTT-.jpg" width="60%" />
          </p>

          <p>
            <small class="text-muted">
              Nulla scelerisque tincidunt diam vel laoreet. Sed euismod pulvinar ipsum at lacinia. Phasellus
              sed urna at libero rhoncus dignissim nec vitae ex. Suspendisse potenti. Duis finibus facilisis
              sapien facilisis mollis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Donec malesuada, mauris et pellentesque viverra.
            </small>
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- Settings -->
</template>

<script>
import mqtt from 'mqtt'

export default {
  data() {
    return {
      selServer: null,
      serverHost: '',
      serverPort: '',
      serverPath: '',
      serverUser: '',
      serverPass: '',
      //serverSel: 0,
      serverEditable: false,
      serverSelected: false,
      serverConnected: null,
    }
  },
  mqtt: {},
  methods: {
    toggleDark: function() {
      this.$dark = Number(!this.$dark)
    },
    saveServer: function() {
      switch (this.selServer) {
        case 0: {
          //create
          break
        }
        case '1': {
          //add

          let _uniq = this.$options.filters.toSafe(this.serverHost + '-' + this.serverPort)
          //console.log(_uniq)
          this.$servers.push({
            uniq: _uniq,
            host: this.serverHost,
            port: this.serverPort,
            path: this.serverPath,
            user: this.serverUser,
            pass: this.serverPass,
            editable: 1,
            selected: this.serverSel,
          })

          this.selServer = _uniq
          break
        }
        default: {
          //select
          let _server = this.$servers.find((srv) => srv.uniq == this.selServer)
          _server.host = this.serverHost
          _server.port = this.serverPort
          _server.path = this.serverPath
          _server.user = this.serverUser
          _server.pass = this.serverPass

          if (_server.uniq == this.$mqttuniq) {
            this.$mqtt.end()
          }
        }
      }
    },
    chgServer: function() {
      this.serverEditable = this.serverSelected = false
      this.serverHost = this.serverPort = this.serverPath = this.serverUser = this.serverPass = ''
      //this.serverSel = 0

      let _server = this.$servers.find((srv) => srv.uniq == this.selServer)
      if (_server) {
        this.serverHost = _server.host
        this.serverPort = _server.port
        this.serverPath = _server.path
        this.serverUser = _server.user
        this.serverPass = _server.pass
        //this.serverSel = _server.selected
        this.serverEditable = Boolean(!_server.editable)
        //this.serverSel = this.serverSelected = Boolean(_server.selected)
        this.serverSelected = Boolean(_server.selected)
      }
    },
    disconnServer: function() {
      this.$mqtt.end()
    },
    connServer: function() {
      let _server = this.$servers.find((srv) => srv.uniq == this.selServer)
      let _ = this

      if (_.$mqttcon) {
        _.$mqtt.end()
      }

      if (_server) {
        let _cli = mqtt.connect({
          host: _server.host,
          port: _server.port,
          path: _server.path,
          username: _server.user,
          password: _server.pass,
          reconnectPeriod: 0,
          connectTimeout: 1000,
        })
        _cli.on('connect', () => {
          console.log('connected..')
          _.$mqtt = _cli
          _.$mqttcon = 1
          _.$mqttuniq = _server.uniq
        })
        _cli.on('close', () => {
          console.log('disconnected..')
          _.$mqtt = null
          _.$mqttcon = 0
          _.$mqttuniq = ''
        })
      }
    },
  },
  computed: {
    showConnect: function() {
      let _server = this.$servers.find((srv) => srv.uniq == this.selServer)
      return this.$mqttuniq !== this.selServer && _server
    },
    showDisconnect: function() {
      return this.$mqttuniq == this.selServer && this.$mqttcon == 1
    },
    connStatus: function() {
      return this.serverConnected
    },
  },
  created: function() {
    this.selServer = this.$servers.map((srv) => (srv.selected ? srv.uniq : false))[0]
  },
  watch: {
    selServer: function() {
      //console.log(nw)
      this.chgServer()
    },
  },
}
</script>

<style></style>
