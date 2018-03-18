<template>
	<div>
		<v-modal :content="tips" ref="modal"></v-modal>
		<button @click="showModal">show</button>
	</div>
</template>

<script>
	import modal from './modal.vue'
	export default {
		data () {
			return {
				tips: 'Oops'
			}
		},
		methods: {
			showModal () {
				this.$refs.modal.isShow = true
			}
		},
		components: {
			'v-modal': modal
		}
	}
</script>

<!-- <style lang="scss">
	@import '../../scss/common.scss';
</style> -->