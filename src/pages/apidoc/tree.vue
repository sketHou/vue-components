<template>
	<div id="tree">
		<h1>TREE</h1>
		<sktree :list="lists" @show="showData" class="json-area"></sktree>
		<textarea :value="content"></textarea>
	</div>
</template>

<script>

import sktree from '../../component/tree/tree.js'

export default {
	name: 'tree',
	components: {
		sktree: sktree
	},
	data () {
		return {
			lists: {
				a: {
					aa: 1,
					bb: 2
				},
				c: [
					{
						ca: 1,
						cb: [
							{
								cc: 1,
								bb: 2,
								gg: [1, 2, 3, 4]
							},
							{
								ee: 1,
								ff: 2
							}
						]
					}
				]
			},
			content: ''
		}
	},
	watch: {
	},
	methods: {
		showData: function (data) {
			console.log(data);
			this.content = JSON.stringify(data, null, 4);
		}
	}
}
</script>



<style lang="less" src="../../component/tree/tree.less"></style>
<style lang="less">
	.json-area {
		width: 500px;
		float: left;
	}
	textarea {
		width: 500px;
		height: 1000px;
		float: right;
	}
</style>
