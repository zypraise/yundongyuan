<template>
	<div>
		<section class="shengli-main">
			<div class="body-item" style="overflow-x: hidden;">
				<div class="title" style="min-width: 852px;">
					<div style="float: right;">
						<!-- <img src="../../assets/imgs/wen.png" style="width:  20px;height:  20px;vertical-align:  top;margin: 18px 10px;cursor: pointer;"
						 v-on:click="showPingFen = !showPingFen" /> --><img v-on:click="workoutAdd()" class="workout-add" src="../../assets/imgs/add.png"></div>
					<ul class="title-tab">
						<li class="item" v-on:click="backWorkout('1,1')">基础体能</li>
						<li class="item" v-on:click="backWorkout('1,2')">板块体能</li>
						<li class="item" v-on:click="backWorkout('1,3')">稳定和均衡</li>
						<li class="item current">专项体能</li>
						<li class="item" v-if="userType == '超级管理员'" v-on:click="backWorkout('3,0')">排名</li>
						<!--<li class="item" v-on:click="backWorkout('3,0')">雷达图</li>-->
					</ul>
				</div>
				<section>
					<div class="table-box">
						<div v-if="sport === ''" style="line-height: 500px;text-align: center;color: #999999;font-size: 20px;">选择一位运动员</div>
						<table v-show="sport !== ''" style="margin-bottom: 50px;">
							<thead>
								<tr>
									<th style="min-width: 100px;">时间</th>
									<th v-for="(item,index) in staminaName">{{item}}</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in staminaList">
									<td>{{item.TestDate}}</td>
									<td v-for="val in item.valueList">{{val}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="list-footer">
						<div class="list-page">
							<div v-on:click="pageNum = 1">首页</div>
							<div v-on:click="pageNum = pageNum-1">上一页</div>
							<div v-for="i in pageslist" :class="{'current':pageNum == i}" v-on:click="pageNum = i">{{i}}</div>
							<div v-on:click="pageNum = pageNum+1">下一页</div>
							<div v-on:click="pageNum = pages">尾页</div>
							<span>到第</span>
							<input type="text" v-model="tpageNum" />
							<span>页</span>
							<div v-on:click="pageNum = tpageNum">跳转</div>
						</div>
						<div class="list-footer-common">共{{total}}条/{{pages}}页</div>
					</div>
				</section>
			</div>
			<div v-show="sport !== ''" class="body-item" style="overflow-x: hidden;margin-top: 30px;margin-bottom: 30px;">
				<div class="title" style="min-width: 852px;">
					线图
				</div>
				<section>
					<div id="biao" style="width: 100%;height: 500px;overflow: hidden;"></div>
				</section>
			</div>
		</section>
		<!-- <section class="ping-fen" :style="{'display':(showPingFen?'none':'block')}">
			<ping-fen v-bind:show-ping-fen="showPingFen"></ping-fen>
		</section> -->
	</div>
</template>

<script>
	var vm;
	// import pingFen from '../../components/pingFen.vue';
	export default {
		props: ["isGetList", "sportList", "sportIndex"],
		data: function() {
			return {
				pages: 0,
				pageslist: [],
				total: 0,
				pageNum: 1,
				tpageNum: '', //跳转页码
				limit: 9999,
				userType:'',
				getOnr: {},
				staminaList: [],
				staminaName: [],
				staminaDate: [],
				sport: undefined,
				showPingFen: true
			}
		},
		//公共模板
		components: {
			// pingFen: pingFen
		},
		watch: {
			pageNum: function(newVal, oldVal) {
				if(newVal == 0) {
					vm.pageNum = oldVal;
					return
				} else if(newVal > vm.pages) {
					vm.pageNum = oldVal;
					return
				}
				vm.getList()
			},
			isGetList: function(newVal, oldVal) {
				vm.start()
			}
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				myPublic.tableHeader('.table-box');
				vm.userType = window.localStorage.getItem('Sport_userType');
				window.bus.$on('pingfen', function(val) {
					vm.showPingFen = val;
				});
				vm.sport = vm.sportIndex;
				vm.getList();
			},
			getList: function() {
				var _d = '';
				_d += 'sportuserid=' + (vm.sport === '' ? '' : vm.sportList[vm.sport].UserId);
				_d += '&starttime=' + document.getElementById('starttime').value + '&endtime=' + document.getElementById('endtime')
					.value + '&pagesize=' + vm.limit + '&pageindex=' + vm.pageNum;

				vm.$http.get(myPublic.publicUrl + '/API/PcTest/GetAllTrainResult?' + _d, {
					headers: {
						token: window.localStorage.getItem('Sport_Access_Token')
					}
				}).then(function(result) {
					if(result.body.StateCode == 0) {
						var _staminaName = [];
						var _staminaDate = [];
						var _l = [];
						var _staminaList = [];
						
						if(result.body.Data) {
							vm.pages = Math.ceil(result.body.Data.totalCount / vm.limit);
							vm.total = result.body.Data.totalCount;
							vm.setPageList();
						
							for(var i = 0; i < result.body.Data.length; i++) {
								if(_staminaName.indexOf(result.body.Data[i].TypeName) < 0) {
									_staminaName.push(result.body.Data[i].TypeName);
								}
								if(_staminaDate.indexOf(result.body.Data[i].TestDate) < 0) {
									_staminaDate.push(result.body.Data[i].TestDate);
									_l.push([result.body.Data[i].Value]);
								} else {
									_l[_staminaDate.indexOf(result.body.Data[i].TestDate)].push(result.body.Data[i].Value);
								}
							}
							for(var i = 0; i < _staminaDate.length; i++) {
								_staminaList.push({
									TestDate: _staminaDate[i],
									valueList: _l[i]
								})
							}

						}
						vm.staminaName = _staminaName;
						vm.staminaDate = _staminaDate;
						vm.staminaList = _staminaList;
						vm.$nextTick(function() {
							vm.setBiao(myPublic.copys(vm.staminaDate), myPublic.copys(vm.staminaList));
						})
					}
				}).catch(function(error) {
					console.log(error);
				});

			},
			setBiao: function(_dateList, _list) {
				var _series = []
				var _val = [];
				for(var i = 0; i < vm.staminaName.length; i++) {
					_val = [];
					for(var j = 0; j < _dateList.length; j++) {
						_val.push(_list[j].valueList[i]);
					}
					_series.push({
						name: vm.staminaName[i],
						type: 'line',
						data: _val
					});
				}
				document.getElementById('biao').setAttribute("_echarts_instance_", "");
				document.getElementById('biao').innerHTML = '';
				// 基于准备好的dom，初始化echarts实例
				var myChart = echarts.init(document.getElementById('biao'));

				// 指定图表的配置项和数据
				var option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend: {
						data: vm.staminaName
					},
					grid: {
						left: '10px',
						right: '50px',
						bottom: '10px',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: _dateList
					},
					yAxis: {
						type: 'value',
						axisLabel: {
							formatter: '{value}'
						}

					},
					series: _series
				};

				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);

			},
			backWorkout: function(num) {
				window.bus.$emit('workout', num);
			},
			workoutAdd: function() {
				vm.$router.push({
					path: '/workoutAdd'
				});
			},
			setPageList: function() {
				vm.pageslist = [];
				if(vm.pages > 4) {
					if(vm.pageNum < 3) {
						vm.pageslist = [1, 2, 3, 4]
					} else if(vm.pageNum > vm.pages - 2) {
						for(var i = 3; i >= 0; i -= 1) {
							vm.pageslist.push(vm.pages - i)
						}
					} else {
						for(var i = -2; i <= 2; i += 1) {
							vm.pageslist.push(vm.pageNum + i)
						}
					}
				} else {
					for(var i = 1; i <= vm.pages; i += 1) {
						vm.pageslist.push(i)
					}
				}
			}
		},
		beforeCreate: function() {
			vm = this;
		},
		beforeDestroy: function() {
			window.bus.$off('pingfen');
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