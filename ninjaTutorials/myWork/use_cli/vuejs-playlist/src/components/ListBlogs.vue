<template>
	<div>
		<div id="show-blogs">
			<h1>LIst Blog Titles</h1>
			<input type="text" v-model="search" placeholder="search blogs" />
			<!-- Searchbox filter -->
			<div v-for="blog in filteredBlogs" class="single-blog">
				<h2 v-rainbow>{{ blog.title | toUpperCase }}</h2>
			</div>
		</div>
	</div>
</template>

<script>
	import searchMixin from "../mixins/searchMixin";

	export default {
		data() {
			return {
				blogs: [],
				loading: true,
				search: "",
			};
		},
		methods: {},
		created() {
			this.$http.get("https://jsonplaceholder.typicode.com/posts").then((data) => {
				setTimeout(() => {
					this.loading = false;
					console.log(data);
					this.blogs = data.body.slice(0, 10);
				}, 2000);
			});
		},
		computed: {},
		mixins: [searchMixin],
	};
</script>

<style>
	#show-blogs {
		max-width: 800px;
		margin: 0 auto;
	}

	.single-blog {
		padding: 20px;
		margin: 20px 0;
		box-sizing: border-box;
		background: #eee;
	}
</style>
