<template>
  <div>
    <div id="slogan" class="text-center">
      <h1>AnnaSE</h1>
      <h6 class="text-secondary">Your Company Name Generator</h6>
    </div>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <div class="row">
              <div class="col-md">
                <h5>Prefixes</h5>
              </div>
              <div class="col-md text-right">
                <h5>
                  <span class="badge badge-info">{{ prefixes.length }}</span>
                </h5>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item" v-for="prefix in prefixes" v-bind:key="prefix">
                    <div class="row">
                      <div class="col-md">{{prefix}}</div>
                      <div class="col-md text-right">
                        <button class="btn btn-info" v-on:click="deletePrefix(prefix)">
                          <span class="fa fa-trash"></span>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
                <br />
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    v-model="prefix"
                    v-on:keyup.enter="addPrefix(prefix)"
                    placeholder="New prefix"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-info" v-on:click="addPrefix(prefix)">
                      <span class="fa fa-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md">
            <div class="row">
              <div class="col-md">
                <h5>Sufixes</h5>
              </div>
              <div class="col-md text-right">
                <h5>
                  <span class="badge badge-info">{{ sufixes.length }}</span>
                </h5>
              </div>
            </div>
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item" v-for="sufix in sufixes" v-bind:key="sufix">
                    <div class="row">
                      <div class="col-md">{{sufix}}</div>
                      <div class="col-md text-right">
                        <button class="btn btn-info" v-on:click="deleteSufix(sufix)">
                          <span class="fa fa-trash"></span>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
                <br />
                <div class="input-group">
                  <input
                    class="form-control"
                    type="text"
                    v-model="sufix"
                    v-on:keyup.enter="addSufix(sufix)"
                    placeholder="New sufix"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-info" v-on:click="addSufix(sufix)">
                      <span class="fa fa-plus"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md">
            <h5>Domains</h5>
          </div>
          <div class="col-md text-right">
            <h5>
              <span class="badge badge-info">{{ domains.length }}</span>
            </h5>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <ul class="list-group">
              <li class="list-group-item" v-for="domain in domains" v-bind:key="domain">{{domain}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

export default {
  name: "App",
  data: function() {
    return {
      prefix: "",
      sufix: "",
      prefixes: ["Comic", "Graphic", "Book"],
      sufixes: ["Hub", "Station", "Mart"],
      domains: [
        "ComicHub",
        "ComicStation",
        "ComicMart",
        "GraphicHub",
        "GraphicStation",
        "GraphicMart",
        "BookHub",
        "BookStation",
        "BookMart"
      ]
    };
  },
  methods: {
    addPrefix(prefix) {
      this.prefixes.push(prefix);
      this.prefix = "";
      this.generate();
    },
    deletePrefix(prefix) {
      this.prefixes.splice(this.prefixes.indexOf(prefix), 1);
      this.generate();
    },
    addSufix(sufix) {
      this.sufixes.push(sufix);
      this.sufix = "";
      this.generate();
    },
    deleteSufix(sufix) {
      this.sufixes.splice(this.sufixes.indexOf(sufix), 1);
      this.generate();
    },
    generate() {
      this.domains = [];
      for (const prefix of this.prefixes) {
        for (const sufix of this.sufixes) {
          this.domains.push(prefix + sufix);
        }
      }
    }
  }
};
</script>

<style>
#slogan {
  margin-top: 30px;
  margin-bottom: 30px;
}
#main {
  background-color: #f1f1f1;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
