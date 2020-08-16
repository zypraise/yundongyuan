<template>
	<div id="trainingPlan">
		<div class="edit-mask" v-if="isEdit">
			<div class="is-edit">
				<div class="header">评价<img v-on:click="isEdit = false" style="width: 20px;height: 20px;vertical-align: top;float: right;margin-top: 2px;cursor: pointer;"
					 src="../../assets/imgs/close.png" /></div>
				<div class="body">
					{{text}}
				</div>
			</div>
		</div>
		<header-component></header-component>
		<section class="content">
			<top-menu></top-menu>
			<div class="index-content">
				<div style="margin-right:20px;margin-bottom:20px; float:right;">
					<section class='mydate-box'>
						<input class='form_datetime' onclick='myDate.getFocus(this)' id='starttime' readonly='readonly' type='text'>
						<section id="starttime-section" tabindex='0' class='calendar' onclick="myDate.holdBubble()"></section>
					</section>
					<span>-</span>
					<section class='mydate-box'>
						<input class='form_datetime' onclick='myDate.getFocus(this)' id='endtime' readonly='readonly' type='text'>
						<section id="endtime-section" style="right:20px;" tabindex='0' class='calendar' onclick="myDate.holdBubble()"></section>
					</section>
					<button class="daochu" v-on:click="getList()">查询</button>
				</div>
				<div style="clear: both;"></div>

				<section class="shengli-main" style="width:100%">
					<div class="body-item">
						<section>
							<div class="table-box">
								<table style="margin-bottom: 50px;">
									<thead>
										<tr>
											<th style="min-width: 100px;">测试时间</th>
											<th style="min-width: 100px;">运动员</th>
											<th style="min-width: 100px;">运动项目</th>
											<th style="min-width: 100px;">参赛主项</th>
											<th style="min-width: 100px;">专项训练</th>
											<th style="min-width: 100px;">体能训练</th>
											<th style="min-width: 100px;">康复训练</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(item,index) in list">
											<td>{{item.PlanDate}}</td>
											<td>{{list[index].UserName}}</td>
											<td>{{list[index].TrainName}}</td>
											<td>{{list[index].TrainSecName}}</span></td>
											<td>
												<span v-if="item.SpecialTrainContent" style="color: #007AFF;cursor: pointer;" v-on:click="setText(item.SpecialTrainContent)">详情</span>
												<span v-else style="color: #999999;">详情</span>
											</td>
											<td>
												<span v-if="item.PhysicalTrainContent" style="color: #007AFF;cursor: pointer;" v-on:click="setText(item.PhysicalTrainContent)">详情</span>
												<span v-else style="color: #999999;">详情</span>
											</td>
											<td>
												<span v-if="item.RecoveryTrainContent" style="color: #007AFF;cursor: pointer;" v-on:click="setText(item.RecoveryTrainContent)">详情</span>
												<span v-else style="color: #999999;">详情</span>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</section>
					</div>
				</section>
			</div>
		</section>
	</div>
</template>
<script>
	var vm;
	import header from '../../components/header.vue';
	import topMenu from '../../components/menu.vue';
	import '../../assets/styles/trainingPlan.css';

	export default {
		//变量
		data: function() {
			return {
				list: [],
				text: '',
				isEdit: false,
			}
		},
		//公共模板
		components: {
			headerComponent: header,
			topMenu: topMenu
		},
		watch: {},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				myPublic.tableHeader(".table-box");
				document.getElementById('starttime').value = myPublic.dateForFormat(myPublic.getAddMonthDate(null, -2),
					'yyyy-MM-dd');
				document.getElementById('endtime').value = myPublic.dateForFormat(null, 'yyyy-MM-dd');
				vm.setTimeInp();
				vm.getList();


			},
			getList: function() {
				var _d = '';
				_d += 'trainId=' + '';
				_d += '&trainSecId=' + '';
				_d += '&sex=' + '';
				_d += '&sportuserid=' + JSON.parse(window.localStorage.getItem('user')).Id;
				_d += '&starttime=' + document.getElementById('starttime').value + '&endtime=' + document.getElementById('endtime')
					.value +
					'&pagesize=9999&pageindex=1';
				vm.$http.post(myPublic.publicUrl + '/API/TrainPlan/TrainPlanList?' + _d, {})
					.then(function(result) {
						if (result.body.StateCode == 0) {
							vm.list = result.body.Data ? result.body.Data : [];
						} else {
							vm.$router.push({
								path: '/login'
							});
						}
						resolve();

					}).catch(function(error) {
						console.log(error);
					});

			},
			setTimeInp: function() {
				document.getElementById('starttime-section').addEventListener('blur', function() {
					var _date1 = document.getElementById('starttime').value;
					var _date2 = document.getElementById('endtime').value;
					var isDate = _date1.split('-')[0] * 10000 + _date1.split('-')[1] * 100 + _date1.split('-')[2] * 1 <= _date2.split(
						'-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if (_date2 == '' || isDate) {
						return;
					}
					myPublic.alertMy('开始时间不能大于结束时间');
					document.getElementById('starttime').value = document.getElementById('endtime').value;
				});
				document.getElementById('endtime-section').addEventListener('blur', function() {
					var _date1 = document.getElementById('starttime').value;
					var _date2 = document.getElementById('endtime').value;
					var _thisDate = myPublic.dateForFormat(null, 'yyyy-MM-dd');
					var _isDate = _thisDate.split('-')[0] * 10000 + _thisDate.split('-')[1] * 100 + _thisDate.split('-')[2] * 1 <
						_date2.split('-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if (_isDate) {
						document.getElementById('endtime').value = _thisDate;
						return;
					}
					var isDate = _date1.split('-')[0] * 10000 + _date1.split('-')[1] * 100 + _date1.split('-')[2] * 1 <= _date2.split(
						'-')[0] * 10000 + _date2.split('-')[1] * 100 + _date2.split('-')[2] * 1;
					if (_date1 == '' || isDate) {
						return;
					}
					myPublic.alertMy('开始时间不能大于结束时间');
					document.getElementById('endtime').value = document.getElementById('starttime').value;
				});
			},
			setText: function(text) {
				vm.text = text;
				vm.isEdit = true;
			}
		},
		beforeCreate: function() {
			vm = this;
		},
		beforeDestroy: function() {},
		mounted: function() {
			vm.start();
		}
	}
</script>
