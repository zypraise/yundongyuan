<template>
	<div class="body-item">
		<div class="edit-mask" v-if="isEdit">
			<div class="is-edit">
				<div class="header">伤病<img v-on:click="isEdit = false" style="width: 20px;height: 20px;vertical-align: top;float: right;margin-top: 2px;cursor: pointer;"
					 src="../../assets/imgs/close.png" /></div>
				<div class="body">
					<div style="font-size: 16px;border: 1px solid #ccc;border-radius: 4px;height: 278px;padding: 10px;">{{text}}</div>
				</div>
			</div>
		</div>


		<div class="title">
			<div style="float: right;">
				<img src="../../assets/imgs/wen.png" style="width:  20px;height:  20px;vertical-align:  top;margin: 18px 10px;cursor: pointer;"
				 v-on:click="showPingFen()" />
			</div>
			<ul class="title-tab">
				<li class="item current">数据表</li>
				<li class="item" v-on:click="setChildNum(2)">折线图</li>
				<li class="item" v-on:click="setChildNum(3)">主观评价雷达图</li>
				<li class="item" v-on:click="setChildNum(4)">训练负荷</li>
			</ul>
		</div>
		<section>
			<div id="table-header" class="table-box">
				<table>
					<thead>
						<tr>
							<th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;z-index: 100;" @click="sortbut('DateSign')">测试时间<img
								 :src="sort('DateSign')" /></th>
							<th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;z-index: 100;" @click="sortbut('SportName')">运动员<img
								 :src="sort('SportName')" /></th>
							<th>运动项目</th>
							<th>参赛主项</th>
							<th>年龄</th>
							<th>性别</th>
							<th @click="sortbut('MorPulse')">晨脉<img :src="sort('MorPulse')" /></th>
							<th @click="sortbut('Weight')">体重<img :src="sort('Weight')" /></th>
							<th @click="sortbut('SleepDuration')">睡眠时间<img :src="sort('SleepDuration')" /></th>
							<th @click="sortbut('SleepQuality')">睡眠质量<img :src="sort('SleepQuality')" /></th>
							<th @click="sortbut('Desire')">饮食欲望<img :src="sort('Desire')" /></th>
							<th @click="sortbut('SorenessLevel')">肌肉酸痛<img :src="sort('SorenessLevel')" /></th>
							<th @click="sortbut('FatigueLevel')">伤病疼痛<img :src="sort('FatigueLevel')" /></th>
							<th @click="sortbut('TrainStatus')">自我训练状态<img :src="sort('TrainStatus')" /></th>
							<th @click="sortbut('Fatigue')">RPE<img :src="sort('Fatigue')" /></th>
							<th @click="sortbut('TrainIntensity')">训练负荷<img :src="sort('TrainIntensity')" /></th>
							<th>教练评价</th>
							<th>伤病</th>
						</tr>
					</thead>
					<tbody>

						<tr v-for="item in bodyList">
							<th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;">{{item.DateSign}}</th>
							
							<th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;">{{item.SportName}}</th>
							<td>{{item.TrainName}}</td>
							<td>{{item.TrainSecName}}</span></td>
							<td>{{item.Age}}</td>
							<td>{{item.Sex}}</td>
							
							<td>{{item.MorPulse}}</td>
							<td>{{item.Weight}}</td>
							<td><span v-if="item.SleepDuration>=8" class="shuiping1"></span><span v-if="item.SleepDuration>=5 && item.SleepDuration<8"
								 class="shuiping2"></span><span v-if="item.SleepDuration>=0 && item.SleepDuration<5" class="shuiping3"></span>{{parseInt(item.SleepDuration)}}</td>
							<td><span v-if="item.SleepQuality>=8" class="shuiping1"></span><span v-if="item.SleepQuality>=5 && item.SleepQuality<8"
								 class="shuiping2"></span><span v-if="item.SleepQuality>=0 && item.SleepQuality<5" class="shuiping3"></span>{{item.SleepQuality}}</td>
							<td><span v-if="item.Desire>=8" class="shuiping1"></span><span v-if="item.Desire>=5 && item.Desire<8" class="shuiping2"></span><span
								 v-if="item.Desire>=0 && item.Desire<5" class="shuiping3"></span>{{item.Desire}}</td>
							<td><span v-if="item.SorenessLevel>=0 && item.SorenessLevel<5" class="shuiping1"></span><span v-if="item.SorenessLevel>=5 && item.SorenessLevel<8"
								 class="shuiping2"></span><span v-if="item.SorenessLevel>=8" class="shuiping3"></span>{{item.SorenessLevel}}</td>
							<td><span v-if="item.FatigueLevel>=0 && item.FatigueLevel<5" class="shuiping1"></span><span v-if="item.FatigueLevel>=5 && item.FatigueLevel<8"
								 class="shuiping2"></span><span v-if="item.FatigueLevel>=8" class="shuiping3"></span>{{item.FatigueLevel}}</td>
							<td><span v-if="item.TrainStatus>=8" class="shuiping1"></span><span v-if="item.TrainStatus>=5 && item.TrainStatus<8"
								 class="shuiping2"></span><span v-if="item.TrainStatus>=0 && item.TrainStatus<5" class="shuiping3"></span>{{item.TrainStatus}}</td>
							<td><span v-if="item.Fatigue>=0 && item.Fatigue<5" class="shuiping1"></span><span v-if="item.Fatigue>=5 && item.Fatigue<8"
								 class="shuiping2"></span><span v-if="item.Fatigue>=8" class="shuiping3"></span>{{item.Fatigue}}</td>
							<td>{{item.TrainIntensity}}</td>
							<td v-if="item.Evaluate"><span v-if="item.Evaluate>=8" class="shuiping1"></span><span v-if="item.Evaluate>=5 && item.Evaluate<8"
								 class="shuiping2"></span><span v-if="item.Evaluate>=0 && item.Evaluate<5" class="shuiping3"></span>{{item.Evaluate}}</td>
							<td v-else>-</td>
							<td style="color: #007AFF;cursor: pointer;" v-on:click="setText(item.DoctorRecord)">详情</td>
						</tr>
					</tbody>

				</table>
			</div>
		</section>
	</div>
</template>

<script>
	var vm;
	import {
		sortimg
	} from '../../components/sort.js';
	export default {
		props: ['shuaxin', 'bodyList', 'sortlist'],
		data: function() {
			return {
				pingfen: true,
				isEdit: false,
				text: ''

			}
		},
		watch: {
			shuaxin: function() {
				vm.$forceUpdate();
			}
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {
				myPublic.tableHeader('#table-header');
			},
			sort: function(res){
				return sortimg(res,vm.sortlist);
			},
			sortbut: function(res) {
				var l = [...vm.sortlist];
				for (var i = 0; i < l.length; i++) {
					l[i].is = false;
					if (res == l[i].type) {
						l[i].is = true;
						l[i].sort = !l[i].sort;
					}
				}
				window.bus.$emit('sortlist', l);
			},
			setText: function(text) {
				vm.text = text;
				vm.isEdit = true;
			},
			setChildNum: function(num) {
				window.bus.$emit('childNum', num)
			},
			showPingFen: function() {
				vm.pingfen = !vm.pingfen;
				window.bus.$emit('pingfen', vm.pingfen)
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
