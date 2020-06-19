<template>
	<div id="person">
		<header-component v-bind:shuaxin="shuaxin" v-bind:person-img="personImg"></header-component>
		<section class="content">
			<top-menu></top-menu>
			<div class="index-content">
				<div class="person-menu">
					<div class="title">菜单</div>
					<ul>
						<li :class="{'current':chileNum == 1}" v-on:click="chileNum = 1">
							<p></p>
							<div><img class="img" src="../../assets/imgs/person-info.png" /><span>个人信息</span></div>
						</li>
						<li :class="{'current':chileNum == 2}" v-on:click="chileNum = 2">
							<p></p>
							<div><img class="img" src="../../assets/imgs/person-band.png" /><span>更改绑定</span></div>	
						</li>
					</ul>
				</div>
				<div class="person-content">
					<div class="title">基本信息</div>
					<person-info class="person-content-box" v-if="chileNum == 1"></person-info>
					<person-band class="person-content-box" v-if="chileNum == 2"></person-band>
					<person-ability class="person-content-box" v-if="chileNum == 3"></person-ability>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	var vm;
	import header from '../../components/header.vue';
	import topMenu from '../../components/menu.vue';
	import personInfo from '../person/person-info.vue';
	import personBand from '../person/person-band.vue';
	import personAbility from '../person/person-ability.vue';
	import '../../assets/styles/person.css';
	
	export default {
		//变量
		data: function() {
			return {
				chileNum:1,
				shuaxin:true,
				personImg:''
			}
		},
		//公共模板
		components: {
			headerComponent: header,
			topMenu:topMenu,
			personInfo:personInfo,
			personBand:personBand,
			personAbility:personAbility
		},
		watch: {},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				window.bus.$on('person', function(val) {
					vm.shuaxin = !vm.shuaxin;
				});
				window.bus.$on('personImg', function(val) {
					vm.personImg = val;
				});
			}
		},
		beforeCreate: function() {
			vm = this;
		},
		beforeDestroy: function() {
			window.bus.$off('person');
			window.bus.$off('personImg');
		},
		mounted: function() {
			vm.start();
		}
	}
</script>