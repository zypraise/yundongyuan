<template>
	<div>
		<section class="shengli-main">
			<div class="body-item" style="overflow-x: hidden;">
				<div class="title" style="min-width: 852px;">
					<div style="float: right;"></div>
					<ul class="title-tab">
						<li class="item" v-on:click="backWorkout('1,1')">基础体能</li>
						<li class="item" v-on:click="backWorkout('1,2')">板块体能</li>
						<li class="item" v-on:click="backWorkout('1,3')">稳定和均衡</li>
						<li class="item " v-on:click="backWorkout('2,0')">专项体能</li>
						<li class="item current">排名</li>
					</ul>
				</div>
				<section>
					<div class="table-box">
						<table>
							<thead>
								<tr>
									<th rowspan="2" style="min-width: 80px;max-width: 80px;width: 80px;left:0px;z-index: 100;">序号</th>
									<th rowspan="2" style="min-width: 110px;max-width: 110px;width: 110px;left:93px;z-index: 100;">测试时间</th>
									<th rowspan="2" style="min-width: 180px;max-width: 180px;width: 180px;left:216px;z-index: 100;">运动员</th>
									<!-- <th rowspan="2">输送单位（省区市/解放军）</th> -->
									<th rowspan="2">参赛项目</th>
									<th rowspan="2">参赛主项</th>
									<th rowspan="2">年龄</th>
									<th rowspan="2">性别</th>
									<th rowspan="2"></th>
									<th rowspan="2">身高（cm）</th>
									<th rowspan="2">体重（kg）</th>
									<th colspan="2">二选一</th>
									<th rowspan="2">坐位体前屈（cm）</th>
									<th rowspan="2">30米冲刺（s）</th>
									<th rowspan="2">垂直纵跳（cm）</th>
									<th rowspan="2">深蹲最大力量（kg）</th>
									<th rowspan="2">深蹲最大力量/体重</th>
									<th rowspan="2">卧推最大力量（kg）</th>
									<th rowspan="2">卧推最大力量/体重</th>
									<th rowspan="2">引体向上（次）</th>
									<th rowspan="2">腹肌耐力（s）</th>
									<th rowspan="2">背肌耐力（s）</th>
									<th colspan="2">二选一</th>
									<th rowspan="2">总分</th>
									<th rowspan="2">排名</th>
								</tr>
								<tr>
									<th>BMI</th>
									<th>体脂百分比（%）</th>
									<th>3千米（min`s）</th>
									<th>2000m测试仪（min's）</th>
								</tr>
							</thead>
							<tbody v-for="(item,index) in list">
								<tr>
									<th rowspan="2" style="min-width: 80px;max-width: 80px;width: 80px;left:0px;z-index: 100;">{{index+1}}</th>
									<th rowspan="2" style="min-width: 110px;max-width: 110px;width: 110px;left:93px;z-index: 100;">{{item.Testdate}}</th>
									<th rowspan="2" style="min-width: 180px;max-width: 180px;width: 180px;left:216px;z-index: 100;">{{item.SportName}}</th>
									<!-- <td rowspan="2"></td> -->
									<td rowspan="2">{{item.TrainName}}</td>
									<td rowspan="2">{{item.TrainSecName}}</td>
									<td rowspan="2">{{item.Age}}</td>
									<td rowspan="2">{{item.Sex}}</td>
									
									<td>原始数据</td>
									<td>{{item.Height}}</td>
									<td>{{item.Weight}}</td>
									<td colspan="2">{{item.BMIFatToOneScore}}</td>
									<td>{{item.SitForward}}</td>
									<td>{{item.ThirtyMeterDash}}</td>
									<td>{{item.VerticalJump}}</td>
									<td>{{item.SquatMaxStrength}}</td>
									<td>{{item.RelativeSquatMaxStrength}}</td>
									<td>{{item.LyingPushMaxStrength}}</td>
									<td>{{item.RelativeLyingPushMaxStrength}}</td>
									<td>{{item.PullUp}}</td>
									<td>{{item.AbdominalEndurance}}</td>
									<td>{{item.BackMuscleEndurance}}</td>
									<td colspan="2">{{item.ThreeTwoKmToOneScore}}</td>
									<td>{{item.Score}}</td>
									<td>-</td>
								</tr>
								<tr>
									<td>得分</td>
									<td>-</td><!-- Height -->
									<td>-</td>
									<td colspan="2">{{item.BMIFatToOneScoreRank}}</td>
									<td>{{item.SitForwardRank}}</td>
									<td>{{item.ThirtyMeterDashRank}}</td>
									<td>{{item.VerticalJumpRank}}</td>
									<td>-</td>
									<td>{{item.RelativeSquatMaxStrengthRank}}</td>
									<td>-</td>
									<td>{{item.RelativeLyingPushMaxStrengthRank}}</td>
									<td>{{item.PullUpRank}}</td>
									<td>{{item.AbdominalEnduranceRank}}</td>
									<td>{{item.BackMuscleEnduranceRank}}</td>
									<td colspan="2">{{item.ThreeTwoKmToOneScoreRank}}</td>
									<td>{{item.RankingScore}}</td>
									<td>{{item.Ranking}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
			</div>
		</section>
		<div class="mask" v-if="daochu">
			<div class="daochu-mask">
				<div class="title">
					<img class="close-img" src="../../assets/imgs/close.png" v-on:click="daochu = false">
					<span>选择导出项</span>
					<input v-if="daochuNum == 1" style="margin: 17px 6px 0px 20px;vertical-align:  top;" value="1" type="checkbox"
					 name="alldaochu" v-model="allDaoChu">
					<span>全选/全不选</span>
				</div>
				<div v-if="daochuNum == 1" class="daochu-table">
					<div style="line-height: 40px;float: left;width: 50%;" v-for="item in sportList"><input style="margin-left: 6px;" :value="item.FullName" type="checkbox" name="user" v-model="userXuanZe" />{{item.FullName}}</div>
				</div>
				
				<div v-if="daochuNum == 1" class="but-box">
					<button v-on:click="mytableExcel('daochu')">确认</button><button v-on:click="daochu = false">取消</button>
				</div>
				<div style="height:0px;overflow: hidden;">
					<table id="daochu" style="margin-bottom: 50px;">
						<thead>
							<tr>
								<th rowspan="2">序号</th>
								<th rowspan="2">姓名</th>
								<!-- <th rowspan="2">输送单位（省区市/解放军）</th> -->
								<th rowspan="2">参赛项目</th>
								<th rowspan="2">参赛主项</th>
								<th rowspan="2">年龄</th>
								<th rowspan="2">性别</th>
								<th rowspan="2"></th>
								<th rowspan="2">身高（cm）</th>
								<th rowspan="2">体重（kg）</th>
								<th colspan="2">二选一</th>
								<th rowspan="2">坐位体前屈（cm）</th>
								<th rowspan="2">30米冲刺（s）</th>
								<th rowspan="2">垂直纵跳（cm）</th>
								<th rowspan="2">深蹲最大力量（kg）</th>
								<th rowspan="2">深蹲最大力量/体重</th>
								<th rowspan="2">卧推最大力量（kg）</th>
								<th rowspan="2">卧推最大力量/体重</th>
								<th rowspan="2">引体向上（次）</th>
								<th rowspan="2">腹肌耐力（s）</th>
								<th rowspan="2">背肌耐力（s）</th>
								<th colspan="2">二选一</th>
								<th rowspan="2">总分</th>
								<th rowspan="2">排名</th>
							</tr>
							<tr>
								<th>BMI</th>
								<th>体脂百分比（%）</th>
								<th>3千米（min`s）</th>
								<th>2000m测试仪（min's）</th>
							</tr>
						</thead>
						<tbody v-for="(item,index) in list">
							<tr>
								<td rowspan="2">{{index+1}}</td>
								<td rowspan="2">{{item.SportName}}</td>
								<!-- <td rowspan="2"></td> -->
								<td rowspan="2">{{item.TrainName}}</td>
								<td rowspan="2">{{item.TrainSecName}}</td>
								<td rowspan="2">{{item.Age}}</td>
								<td rowspan="2">{{item.Sex}}</td>
								
								<td>原始数据</td>
								<td>{{item.Height}}</td>
								<td>{{item.Weight}}</td>
								<td colspan="2">{{item.BMIFatToOneScore}}</td>
								<td>{{item.SitForward}}</td>
								<td>{{item.ThirtyMeterDash}}</td>
								<td>{{item.VerticalJump}}</td>
								<td>{{item.SquatMaxStrength}}</td>
								<td>{{item.RelativeSquatMaxStrength}}</td>
								<td>{{item.LyingPushMaxStrength}}</td>
								<td>{{item.RelativeLyingPushMaxStrength}}</td>
								<td>{{item.PullUp}}</td>
								<td>{{item.AbdominalEndurance}}</td>
								<td>{{item.BackMuscleEndurance}}</td>
								<td colspan="2">{{item.ThreeTwoKmToOneScore}}</td>
								<td>{{item.Score}}</td>
								<td>-</td>
							</tr>
							<tr>
								<td>得分</td>
								<td>-</td><!-- Height -->
								<td>-</td>
								<td colspan="2">{{item.BMIFatToOneScoreRank}}</td>
								<td>{{item.SitForwardRank}}</td>
								<td>{{item.ThirtyMeterDashRank}}</td>
								<td>{{item.VerticalJumpRank}}</td>
								<td>-</td>
								<td>{{item.RelativeSquatMaxStrengthRank}}</td>
								<td>-</td>
								<td>{{item.RelativeLyingPushMaxStrengthRank}}</td>
								<td>{{item.PullUpRank}}</td>
								<td>{{item.AbdominalEnduranceRank}}</td>
								<td>{{item.BackMuscleEnduranceRank}}</td>
								<td colspan="2">{{item.ThreeTwoKmToOneScoreRank}}</td>
								<td>{{item.RankingScore}}</td>
								<td>{{item.Ranking}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	var vm;
	export default {
		props: ["daochu", "isGetList", "zhuanxiangList", "trainFirse", "trainId", "sportList", "userXuanZe", "sportIndex",
			"sex", "plistType"
		],
		data: function() {
			return {
				daochuNum: 1,
				allDaoChu: ['1'],
				list:[],
			}
		},
		components: {},
		watch: {
			isGetList: function(newVal, oldVal) {
				vm.start()
			},
			allDaoChu: function(newVal, oldVal) {
				debugger
				if(newVal.length > 0) {
					vm.userXuanZe = [...vm.sportList]
				} else {
					vm.userXuanZe = [];
				}
			},
		},
		computed: {},
		methods: {
			start: function() {
				myPublic.tableHeader('#table-header');
				vm.sport = vm.sportIndex;
				vm.getinfo();
			},
			mytableExcel: function(id) {
				myPublic.tableExcel(id);
			},
			getinfo:function(){
				var _d = '';
				_d += 'trainId=' + (vm.trainFirse !== '' ? vm.zhuanxiangList[vm.trainFirse].Id : "");
				_d += '&trainSecId=' + vm.trainId;
				_d += '&sex=' + vm.sex;
				_d += '&sportuserid=' + (vm.sport === '' ? '' : vm.sportList[vm.sport].UserId);
				_d += '&starttime=' + document.getElementById('starttime').value + '&endtime=' + document.getElementById('endtime')
					.value;
				vm.$http.get(myPublic.publicUrl + '/API/Test/GetAllBasicPhysicalSortList?' + _d, {
					headers: {
						token: window.localStorage.getItem('Sport_Access_Token')
					}
				}).then(function(result) {
					if(result.body.StateCode == 0) {
						vm.list = result.body.Data;
						
					} else {
						vm.$router.push({
							path: '/login'
						})
					}
				}).catch(function(error) {
					console.log(error)
				})
			},
			backWorkout: function(num) {
				window.bus.$emit('workout', num);
			},
		},
		beforeCreate: function() {
			vm = this
		},
		beforeDestroy: function() {},
		mounted: function() {
			vm.start();
			vm.getOnr = {};
			window.onresize = function() {
				clearTimeout(vm.getOnr);
				vm.getOnr = setTimeout(function() {
					vm.start()
				}, 200)
			}
		}
	}
</script>
