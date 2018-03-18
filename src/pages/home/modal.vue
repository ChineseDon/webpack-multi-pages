<template>
	<div class="modal" v-show="isShow">
		<div class="modal-content">{{ content }}</div>
		<button @click="close"><i class="fa fa-times"></i></button>
	</div>
</template>

<script>
	export default {
		props: {
			content: {
				type: String
			}
		},
		data () {
			return {
				isShow: false
			}
		},
		methods: {
			close () {
				this.isShow = false
			}
		}
	}
</script>

<style lang="scss">
  $height: 200px;

	.modal {
		position: absolute;
		width: 400px;
		height: $height;
		left: 0; top: 0; right: 0; bottom: 0;
		margin: auto;
		border: 1px solid #ccc;
		text-align: center;
	}
	.modal-content {
		height: 160px;
		line-height: 200px;
	}
</style>