<template>
	<div id="index-choice-register">
		<header-component></header-component>
		<section class="choice">
			<p class="choice-header">选择教练</p>
			<ul class="choice-mian">
				<li>
					<label><span class="red-text">*</span>教练员：</label>
					<section>
						<div class="inp">
							<select v-model="role">
								<option value="运动员">运动员</option>
								<option value="教练">教练</option>
							</select>
						</div>
					</section>
				</li>
				<li style="margin: 0px -25px;"><button class="choice-but" v-on:click="next()">下一步</button><button class="back-but"
					 v-on:click="back()">返回</button></li>
			</ul>
		</section>
	</div>
</template>

<script>
	var vm;
	import header from '../../components/header.vue';
	export default {
		//变量
		data: function() {
			return {
				role:'运动员'
			}
		},
		//公共模板
		components: {
			headerComponent: header
		},
		watch: {},
		//计算属性
		computed: {},
		methods: {
			start: function() {},
			next:function(){
				vm.$router.push({
					path: '/register'
				});
			},
			back:function(){
				vm.$router.back(-1);
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

<style>
</style>
