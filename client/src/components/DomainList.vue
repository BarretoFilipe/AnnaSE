<template>
  <div>
    <div id="main">
      <div class="container">
        <div class="row">
          <div class="col-md">
            <AppItemList
              title="Prefix"
              v-bind:items="prefixes"
              v-on:addItem="addPrefix"
              v-on:deleteItem="deletePrefix"
            ></AppItemList>
          </div>
          <div class="col-md">
            <AppItemList></AppItemList>
            <AppItemList
              title="Suffix"
              v-bind:items="suffixes"
              v-on:addItem="addSuffix"
              v-on:deleteItem="deleteSuffix"
            ></AppItemList>
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
              <li
                class="list-group-item"
                v-for="domain in domains"
                v-bind:key="domain.name"
              >
                <div class="row">
                  <div class="col-md">{{ domain.name }}</div>
                  <div class="col-md text-right">
                    <a
                      class="btn btn-info"
                      v-bind:href="domain.checkout"
                      target="_blank"
                    >
                      <span class="fa fa-shopping-cart"></span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios/dist/axios";
import AppItemList from "./AppItemList";

export default {
  name: "App",
  components: {
    AppItemList
  },
  data: function() {
    return {
      prefixes: [],
      suffixes: []
    };
  },
  methods: {
    addPrefix(prefix) {
      this.prefixes.push(prefix);
    },
    deletePrefix(prefix) {
      this.prefixes.splice(this.prefixes.indexOf(prefix), 1);
    },
    addSuffix(suffix) {
      this.suffixes.push(suffix);
    },
    deleteSuffix(suffix) {
      this.suffixes.splice(this.suffixes.indexOf(suffix), 1);
    }
  },
  computed: {
    domains() {
      const domains = [];
      for (const prefix of this.prefixes) {
        for (const suffix of this.suffixes) {
          const name = prefix + suffix;
          const url = name.toLowerCase();
          const checkout = `https://domains.google.com/m/registrar/search?searchTerm=${url}`;
          domains.push({
            name,
            checkout
          });
        }
      }
      return domains;
    }
  },
  created() {
    axios({
      url: "http://localhost:4000",
      method: "post",
      data: {
        query: `
          {
            prefixes: items (type: "prefix"){
              id
              type
              description
            }
            suffixes: items (type: "suffix"){
              description
            }
          }
        `
      }
    }).then(response => {
      const query = response.data;
      this.prefixes = query.data.prefixes.map(prefix => prefix.description);
      this.suffixes = query.data.suffixes.map(suffix => suffix.description);
    });
  }
};
</script>

<style></style>
