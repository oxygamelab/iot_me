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
              <label>Theme</label>
              <select class="form-control" v-model="this.$dark">
                <option value="0" selected>Default</option>
                <option value="1" disabled>Dark</option>
              </select>
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
            <div class="form-group">
              <label>MQTT Servers</label>
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
            <div class="form-group form-check">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="serverSel"
                :disabled="serverSelected"
              />
              <label class="form-check-label">Selected</label>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary">Save</button>
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
export default {
  data() {
    return {
      selServer: null,
      serverHost: '',
      serverPort: '',
      serverPath: '',
      serverUser: '',
      serverPass: '',
      serverSel: 0,
      serverEditable: false,
      serverSelected: false,
    }
  },
  mqtt: {},
  methods: {
    saveServer: function() {
      switch (this.selServer) {
        case 0: {
          //create
          break
        }
        case '1': {
        //add
        
          let _uniq = this.$options.filters.toSafe(this.serverHost + '-' + this.serverPort)
          console.log(_uniq)
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

          if (this.serverSel) {
            this.$servers.map((ss) => {
              if (ss.uniq !== _uniq) {
                ss.selected = 0
              }
            })
          }
          this.selServer = _uniq
          break
          }
        default: {
          //select
            let _server = this.$servers.find((srv) => srv.uniq == this.selServer)
            _server.host= this.serverHost
            _server.port= this.serverPort
            _server.path= this.serverPath
            _server.user= this.serverUser
            _server.pass= this.serverPass
          if (this.serverSel) {
            if (!_server.selected) {
              this.$servers.map((ss) => {
                ss.selected = 0
              })
              _server.selected = 1
              this.serverSelected = true
            }
          }
          }
      }
      //if (this.serverSel) {}
    },
    chgServer: function() {
      this.serverEditable = this.serverSelected = false
      this.serverHost = this.serverPort = this.serverPath = this.serverUser = this.serverPass = ''
      this.serverSel = 0

      let _server = this.$servers.find((srv) => srv.uniq == this.selServer)
      if (_server) {
        this.serverHost = _server.host
        this.serverPort = _server.port
        this.serverPath = _server.path
        this.serverUser = _server.user
        this.serverPass = _server.pass
        this.serverSel = _server.selected
        this.serverEditable = Boolean(!_server.editable)
        this.serverSel = this.serverSelected = Boolean(_server.selected)
      }
    },
  },
  computed: {},
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
