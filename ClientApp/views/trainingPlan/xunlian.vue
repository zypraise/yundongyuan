<template>
	<div>
		<section class="shengli-main" style="width:100%">
			<div class="body-item">
				<section>
					<div class="table-box">

					</div>
				</section>
			</div>
		</section>
	</div>
</template>

<script>
	var vm;
	export default {
		props: [],
		data: function() {
			return {}
		},
		//公共模板
		components: {},
		watch: {},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				mpPublic.tableHeader('.table-box')
			},
			backWorkout: function(num) {
				window.bus.$emit('trainingPlan', num);
			}
		},
		beforeCreate: function() {
			vm = this;
		},
		mounted: function() {
			vm.start();
			vm.getOnr = {};
			window.onresize = function() {
				clearTimeout(vm.getOnr);
				vm.getOnr = setTimeout(function() {
					vm.start();
				}, 200);
			}
		}
	}
</script>
