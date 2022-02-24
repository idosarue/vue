<template>
	<div id="add-blog">
		<h2>Add a New Blog Post</h2>
		<form action="">
			<label for="">Blog Title:</label>
			<input type="text" v-model.lazy="blog.title" required />
			<label for="">Blog Content</label>
			<textarea name="" id="" cols="30" rows="10" v-model.lazy="blog.content"></textarea>
			<div id="checkboxes">
				<label>Ninjas</label>
				<input type="checkbox" name="" id="" value="ninjas" v-model="blog.categories" />
				<label>Wizards</label>
				<input type="checkbox" name="" id="" value="wizards" v-model="blog.categories" />
				<label>Mario</label>
				<input type="checkbox" name="" id="" value="mario" v-model="blog.categories" />
				<label>Cheese</label>
				<input type="checkbox" name="" id="" value="cheese" v-model="blog.categories" />
			</div>
		</form>
		<div id="preview">
			<h3>Preview Blog</h3>
			<p>Blog Title: {{ blog.title }}</p>
			<p>Blog Content:</p>
			<p>{{ blog.content }}</p>
			<p>Blog Categories:</p>
            <p>
                <ul>
                    <li v-for="category in blog.categories">{{ category }}</li>
                </ul>
            </p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				blog: {
					title: "",
					content: "",
					categories: [],
				},
			};
		},
		methods: {},
	};
</script>

<style>
	#add-blog * {
		box-sizing: border-box;
	}
	#add-blog {
		margin: 20px auto;
		max-width: 500px;
	}
	label {
		display: block;
		margin: 20px 0 10px;
	}
	input[type="text"],
	textarea {
		display: block;
		width: 100%;
		padding: 8px;
	}
	#preview {
		padding: 10px 20px;
		border: 1px dotted #ccc;
		margin: 30px 0;
	}
	h3 {
		margin-top: 10px;
	}

	#checkboxes input,
	#checkboxes label {
		display: inline-block;
	}
</style>
