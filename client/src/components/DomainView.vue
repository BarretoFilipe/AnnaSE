<template>
  <div>
    <div class="container">
      <div class="text-left">
        <router-link to="/domains" tag="button" class="btn btn-info">
          Back
        </router-link>
        <h2>{{ domain }}</h2>
        <div class="card">
          <div class="card-body">
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="domain in domains"
                v-bind:key="domain.extension"
              >
                <div class="row">
                  <div class="col-md-8">{{ domain.extension }}</div>
                  <div class="col-md-2">
                    <div v-if="domain.available" class="text-right">
                      <span class="badge badge-info">Available</span>
                    </div>
                    <div v-else class="text-right">
                      <span class="badge badge-danger">Unavailable</span>
                    </div>
                  </div>
                  <div class="col-md-2 text-right">
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

export default {
  props: ["domain"],
  data() {
    return {
      domains: []
    };
  },
  created() {
    axios({
      url: "http://localhost:4000",
      method: "post",
      data: {
        query: `
            mutation ($name: String){
                domains: generateDomain(name: $name){
                    name
                    extension
                    checkout
                    available
                }
            }
          `,
        variables: {
          name: this.domain
        }
      }
    }).then(response => {
      const query = response.data;
      this.domains = query.data.domains;
    });
  }
};
</script>

<style></style>
