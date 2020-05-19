<template>
	<div id="index-register">
		<header-component></header-component>
		<section class="register">
			<p class="register-header">注册</p>
			<ul class="register-mian no-padding">
				<li>
					<label><span class="red-text">*</span>角色：</label>
					<section>
						<div class="inp">
							<select v-model="role">
								<option value="1">运动员</option>
								<option value="2">教练</option>
							</select>
						</div>
					</section>
					<p class="is" v-html="isRole"></p>
				</li>
			</ul>
			<yun-component v-if="role == 1"></yun-component>
			<jiao-component v-if="role == 2"></jiao-component>
		</section>
	</div>
</template>
<script>
	var vm;
	import header from '../../components/header.vue';
	import yun from './register/yunDongYuan.vue';
	import jiao from './register/jiaoLian.vue';
	export default {
		//变量
		data: function() {
			return {
				role: '1',
				isRole: ''
			}
		},
		//公共模板
		components: {
			headerComponent: header,
			yunComponent: yun,
			jiaoComponent: jiao
		},
		watch: {},
		//计算属性
		computed: {},
		methods: {},
		beforeCreate: function() {
			vm = this;
		},
		mounted: function() {}
	}
</script>
