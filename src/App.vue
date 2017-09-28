<template>
	<div id="app">
		<ul class="menu">
			<li>
				<router-link to="/resume">简历重构</router-link>
			</li>
			<li>
				<router-link to="/apidoc">接口系统</router-link>
			</li>
		</ul>
		<router-view class="view"></router-view>
	</div>

</template>

<script>

export default {
	name: 'app',
}
</script>

<style lang="less">

	.menu {
		margin: 0;
		position: absolute;
		top: 0;
		left: 0;
		background: #efefef;
		li {
			padding: 10px 40px 10px 40px;
			margin: 0;
			text-align: center;
			border-bottom: 1px solid #888;
			display: block;
			&:hover {
				background: #dfdfdf;
			}
		}
		a {
			text-decoration: none;
		}
	}

	h2 {
		margin-top: 40px;
		font-weight: bold;
	}

	.button {
		margin: 10px auto;
		padding: 5px;
		border: 1px solid #777;
		border-radius: 5px;
		overflow: hidden;
		background: #fff;
		cursor: pointer;
	}

	.button:hover {
		background: #efefef;
	}

	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}

	h1, h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
