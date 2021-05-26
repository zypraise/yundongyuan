<template>
	<div id="top-menu">
		<section v-if="userjuese == 1" class="top-menu-box" style="width: 660px;">
			<div class="top-menu-item" v-on:click="goUrl('/subjective')">
				<img v-if="menu == 1" src="../assets/imgs/menu-current-1.png" />
				<img v-else src="../assets/imgs/menu-1.png" />
				<div class="text" :style="{'color':(menu == 1?'#ba2538':'#545454')}">主观评价</div>
			</div>
			<div class="top-menu-item" v-on:click="goUrl('/phyConstituents')">
				<img v-if="menu == 3" src="../assets/imgs/menu-current-3.png" />
				<img v-else src="../assets/imgs/menu-3.png" />
				<div class="text" :style="{'color':(menu == 3?'#ba2538':'#545454')}">机能评价</div>
			</div>
			<div class="top-menu-item" v-on:click="goUrl('/stamina')">
				<img v-if="menu == 2" src="../assets/imgs/menu-current-2.png" />
				<img v-else src="../assets/imgs/menu-2.png" />
				<div class="text" :style="{'color':(menu == 2?'#ba2538':'#545454')}">体能数据</div>
			</div>
			<div class="top-menu-item" v-on:click="goUrl('/bodyComposition')">
				<img v-if="menu == 4" src="../assets/imgs/menu-current-4.png" />
				<img v-else src="../assets/imgs/menu-4.png" />
				<div class="text" :style="{'color':(menu == 4?'#ba2538':'#545454')}">体重/体成分</div>
			</div>
      <div class="top-menu-item" v-on:click="goUrl('/trainingPlan')">
        <img v-if="menu == 13" src="../assets/imgs/menu-current-9.png" />
        <img v-else src="../assets/imgs/menu-9.png" />
        <div class="text" :style="{'color':(menu == 13?'#ba2538':'#545454')}">训练计划</div>
      </div>
      <div class="top-menu-item" v-on:click="goUrl('/skiing')">
        <img v-if="menu == 15" src="../assets/imgs/menu-current-10.png" />
        <img v-else src="../assets/imgs/menu-10.png" />
        <div class="text" :style="{'color':(menu == 15?'#ba2538':'#545454')}">越野滑雪</div>
      </div>
			<!-- <div class="top-menu-item" v-on:click="goUrl('/sportInjury')">
				<img v-if="menu == 5" src="../assets/imgs/menu-current-5.png" />
				<img v-else src="../assets/imgs/menu-5.png" />
				<div class="text" :style="{'color':(menu == 5?'#ba2538':'#545454')}">伤病记录</div>
			</div> -->
		</section>
		<section v-if="userjuese == 2" class="top-menu-box" style="width: 660px;">
			<!--<div class="top-menu-item" v-on:click="goUrl('/primary')">
				<img v-if="menu == 6" src="../assets/imgs/menu-current-6.png" />
				<img v-else src="../assets/imgs/menu-6.png" />
				<div class="text" :style="{'color':(menu == 6?'#ba2538':'#545454')}">首页</div>
			</div>-->
			<div class="top-menu-item" v-on:click="goUrl('/allSubjective')">
				<img v-if="menu == 7" src="../assets/imgs/menu-current-7.png" />
				<img v-else src="../assets/imgs/menu-7.png" />
				<div class="text" :style="{'color':(menu == 7?'#ba2538':'#545454')}">主观评价</div>
			</div>
			<div class="top-menu-item" v-on:click="goUrl('/allConstituents')">
				<img v-if="menu == 12" src="../assets/imgs/menu-current-3.png" />
				<img v-else src="../assets/imgs/menu-3.png" />
				<div class="text" :style="{'color':(menu == 12?'#ba2538':'#545454')}">机能评价</div>
			</div>
			<div class="top-menu-item" v-on:click="goUrl('/workout')">
				<img v-if="menu == 8" src="../assets/imgs/menu-current-2.png" />
				<img v-else src="../assets/imgs/menu-2.png" />
				<div class="text" :style="{'color':(menu == 8?'#ba2538':'#545454')}">体能测试</div>
			</div>
			<div class="top-menu-item" v-on:click="goUrl('/allComposition')">
				<img v-if="menu == 11" src="../assets/imgs/menu-current-4.png" />
				<img v-else src="../assets/imgs/menu-4.png" />
				<div class="text" :style="{'color':(menu == 11?'#ba2538':'#545454')}">体重/体成分</div>
			</div>
			<div class="top-menu-item" v-on:click="goUrl('/allTrainingPlan')">
				<img v-if="menu == 14" src="../assets/imgs/menu-current-9.png" />
				<img v-else src="../assets/imgs/menu-9.png" />
				<div class="text" :style="{'color':(menu == 14?'#ba2538':'#545454')}">训练计划</div>
			</div>
      <div class="top-menu-item" v-on:click="goUrl('/allSkiing')">
        <img v-if="menu == 16" src="../assets/imgs/menu-current-10.png" />
        <img v-else src="../assets/imgs/menu-10.png" />
        <div class="text" :style="{'color':(menu == 16?'#ba2538':'#545454')}">越野滑雪</div>
      </div>
			<!-- <div class="top-menu-item" v-on:click="goUrl('/trainInjury')">
				<img v-if="menu == 10" src="../assets/imgs/menu-current-5.png" />
				<img v-else src="../assets/imgs/menu-5.png" />
				<div class="text" :style="{'color':(menu == 10?'#ba2538':'#545454')}">伤病记录</div>
			</div> -->
			<!--<div class="top-menu-item" v-on:click="goUrl('/mixedAbility')">
				<img v-if="menu == 9" src="../assets/imgs/menu-current-8.png" />
				<img v-else src="../assets/imgs/menu-8.png" />
				<div class="text" :style="{'color':(menu == 9?'#ba2538':'#545454')}">综合能力</div>
			</div>-->
		</section>
		<!-- <a href="http://www.cissatmes.com/platform" style="float: right;margin: 12px;border: 1px solid #bcbcbc;border-radius: 4px;width: 120px;text-align: center;line-height: 34px;text-decoration: none;" v-if="userjuese == 2">后台管理</a> -->
		<a href="http://www.cissatmes.com/platform" style="float: right;margin: 12px;border: 1px solid #bcbcbc;border-radius: 4px;width: 120px;text-align: center;line-height: 34px;text-decoration: none;" v-if="ishoutai">后台管理</a>
	</div>
</template>

<script>
	var vm;
	export default {
		data: function() {
			return {
				userjuese:0,//1:远动员 2:教练员
				ishoutai:false
			}
		},
		//计算属性
		computed: {
			menu: function() {
				var _d = '';
				switch(vm.$route.path) {

          case '/allSkiing':
            _d = 16;
            break;
          case '/skiing':
            _d = 15;
            break;
          case '/allTrainingPlan':
            _d = 14;
					break;
					case '/trainingPlan':
					_d = 13;
					break;
					case '/allConstituents':
					_d = 12;
					break;
					case '/allComposition':
					_d = 11;
					break;
					case '/trainInjury':
						_d = 10;
						break;
					case '/mixedAbility':
						_d = 9;
						break;
					case '/workout':
						_d = 8;
						break;
					case '/allSubjective':
						//体成分
						_d = 7;
						break;
					case '/primary':
						//首页
						_d = 6;
						break;
					case '/sportInjury':
						//伤病运动员
						_d = 5;
						break;
					case '/bodyComposition':
						//体成分
						_d = 4;
						break;
					case '/allComposition':
						//体成分
						_d = 11;
					case '/phyConstituents':
						//体成分
						_d = 3;
						break;
					case '/allConstituents':
						//体成分
						_d = 12;
						break;
					case '/stamina':
						//体成分
						_d = 2;
						break;
					case '/subjective':
						//体成分
						_d = 1;
						break;
				};
				return _d;
			}
		},
		methods: {
			start: function() {
				if(window.localStorage.getItem('Sport_userType') == '运动员'){
					vm.userjuese = 1;
				}else{
					vm.userjuese = 2;
				}


				vm.ishoutai = (window.localStorage.getItem('Sport_userType') == '超级管理员' || window.localStorage.getItem('Sport_userType') == '系统管理员');
			},
			goUrl: function(url) {
				vm.$router.push({
					path: url
				});
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
