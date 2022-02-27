<template>
	<div>
		<h1 v-show="loading">loading...</h1>
		<div id="show-blogs" v-show="!loading">
			<h1>All Blog Articles</h1>
			<input type="text" v-model="search" placeholder="search blogs" />
			<!-- Searchbox filter -->
			<div v-for="blog in filteredBlogs" class="single-blog">
				<h2>{{ blog.title | toUpperCase }}</h2>
				<article>{{ blog.body | snippet }}</article>
			</div>
		</div>
	</div>
</template>

<script>
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
		computed: {
			filteredBlogs: function() {
				return this.blogs.filter((blog) => {
					return blog.title.match(this.search.toLowerCase());
				});
			},
		},
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
