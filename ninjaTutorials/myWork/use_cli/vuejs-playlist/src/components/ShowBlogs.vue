<template>
	<div>
		<h1 v-show="loading">loading...</h1>
		<div id="show-blogs" v-show="!loading" v-theme:column="'narrow'">
			<h1>All Blog Articles</h1>
			<div v-for="blog in blogs" class="single-blog">
				<h2 v-rainbow>{{ blog.title }}</h2>
				<article>{{ blog.body }}</article>
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
