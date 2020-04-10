<template>
	<div>
		<div id="main">
			<div class="container">
				<div class="row">
					<div class="col-md">
						<AppItemList
							title="Prefix"
							type="prefix"
							v-bind:items="items.prefix"
							v-on:addItem="addItem"
							v-on:deleteItem="deleteItem"
						></AppItemList>
					</div>
					<div class="col-md">
						<AppItemList
							title="Suffix"
							type="suffix"
							v-bind:items="items.suffix"
							v-on:addItem="addItem"
							v-on:deleteItem="deleteItem"
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
							<li class="list-group-item" v-for="domain in domains" v-bind:key="domain.name">
								<div class="row">
									<div class="col-md-8">{{ domain.name }}</div>
									<div class="col-md-2">
										<div v-if="domain.available" class="text-right">
											<span class="badge badge-info">Available</span>
										</div>
										<div v-else class="text-right">
											<span class="badge badge-danger">Unavailable</span>
										</div>
									</div>
									<div class="col-md-2 text-right">
										<a class="btn btn-info" v-bind:href="domain.checkout" target="_blank">
											<span class="fa fa-shopping-cart"></span>
										</a>
										&nbsp;
										<button class="btn btn-info" @click="openDomain(domain)">
											<span class="fa fa-search"></span>
										</button>
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
import { mapState, mapActions } from "vuex";
import AppItemList from "./AppItemList";

export default {
	name: "App",
	components: {
		AppItemList
	},
	data: function() {
		return {};
	},
	methods: {
		...mapActions(["addItem", "deleteItem", "getItems", "generateDomains"]),
		openDomain(domain) {
			this.$router.push({
				path: `/domains/${domain.name}`
			});
		}
	},
	computed: {
		...mapState(["items", "domains"])
	}
};
</script>

<style></style>
