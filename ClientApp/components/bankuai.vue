<template>

	<div class="body-item">
		<div class="title">
			<img v-on:click="closePingFen()" style="width: 20px;height: 20px;vertical-align: top;float: right;margin-top: 20px;cursor: pointer;" src="../assets/imgs/close.png" />
			<div>板块体能参考标准</div>
		</div>
		<section>
			<div class="" style="height: 400px !important;line-height: 30px;">
				<p><b> 一、测试指标：</b></p>
				<p>攀爬时间（秒）、攀爬距离（m）、平均心率、最大心率（实测值）、80%以上最大心率保持时间。</p>
				<p><b>二、得分计算方法：</b></p>
				<p>得分（百分制）=80%以上最大心率保持时间÷（攀爬时间-7）</p>
				<p>说明：“最大心率”是指使用“220-年龄”推测出的“最大心率”；所有时间单位为“秒”。得分超过100分的按100分计算。</p>

			</div>
		</section>
	</div>
</template>

<script>
	var vm;
	export default {
		data: function() {
			return {}
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {},
			closePingFen:function(){
				window.bus.$emit('pingfen', true)
			}
		},
		beforeCreate: function() {
			vm = this;
		},
		mounted: function() {
			vm.start();
		}
	}
</script>