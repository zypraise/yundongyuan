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
				<li class="item" v-on:click="setChildNum(3)">训练负荷</li>
			</ul>
		</div>
		<section>
			<div class="table-box">
				<table>
					<thead>
						<tr>
							<th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;z-index: 100;">测试时间<img @click="sortbut('DateSign')"
								 :src="sort('DateSign')" /></th>
							<th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;z-index: 100;">运动员<img @click="sortbut('SportName')"
								 :src="sort('SportName')" /></th>
							<th>运动项目</th>
							<th>参赛主项</th>
							<th>年龄</th>
							<th>性别</th>
							<th>晨脉</th>
							<th>体重</th>
							<th>睡眠时间</th>
							<th>睡眠质量</th>
							<th>饮食欲望</th>
							<th>肌肉酸痛</th>
							<th>伤病疼痛</th>
							<th>自我训练状态</th>
							<th>RPE</th>
							<th>训练负荷</th>
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
							<td>-</td>
							<td>{{item.Sex}}</td>

							<td>{{item.MorPulse}}</td>
							<td>{{item.Weight}}</td>
							<td><span v-if="item.SleepDuration>=8" class="shuiping1"></span><span v-if="item.SleepDuration>=5 && item.SleepDuration<=7"
								 class="shuiping2"></span><span v-if="item.SleepDuration>=0 && item.SleepDuration<=4" class="shuiping3"></span>{{item.SleepDuration}}</td>
							<td><span v-if="item.SleepQuality>=8" class="shuiping1"></span><span v-if="item.SleepQuality>=5 && item.SleepQuality<=7"
								 class="shuiping2"></span><span v-if="item.SleepQuality>=0 && item.SleepQuality<=4" class="shuiping3"></span>{{item.SleepQuality}}</td>
							<td><span v-if="item.Desire>=8" class="shuiping1"></span><span v-if="item.Desire>=5 && item.Desire<=7" class="shuiping2"></span><span
								 v-if="item.Desire>=0 && item.Desire<=4" class="shuiping3"></span>{{item.Desire}}</td>
							<td><span v-if="item.SorenessLevel>=0 && item.SorenessLevel<=4" class="shuiping1"></span><span v-if="item.SorenessLevel>=5 && item.SorenessLevel<=7"
								 class="shuiping2"></span><span v-if="item.SorenessLevel>=8" class="shuiping3"></span>{{item.SorenessLevel}}</td>
							<td><span v-if="item.FatigueLevel>=0 && item.FatigueLevel<=4" class="shuiping1"></span><span v-if="item.FatigueLevel>=5 && item.FatigueLevel<=7"
								 class="shuiping2"></span><span v-if="item.FatigueLevel>=8" class="shuiping3"></span>{{item.FatigueLevel}}</td>
							<td><span v-if="item.TrainStatus>=8" class="shuiping1"></span><span v-if="item.TrainStatus>=5 && item.TrainStatus<=7"
								 class="shuiping2"></span><span v-if="item.TrainStatus>=0 && item.TrainStatus<=4" class="shuiping3"></span>{{item.TrainStatus}}</td>
							<td><span v-if="item.Fatigue>=0 && item.Fatigue<=4" class="shuiping1"></span><span v-if="item.Fatigue>=5 && item.Fatigue<=7"
								 class="shuiping2"></span><span v-if="item.Fatigue>=8" class="shuiping3"></span>{{item.Fatigue}}</td>
							<td>{{item.TrainIntensity}}</td>
							<td v-if="item.Evaluate"><span v-if="item.Evaluate>=8" class="shuiping1"></span><span v-if="item.Evaluate>=5 && item.Evaluate<=7"
								 class="shuiping2"></span><span v-if="item.Evaluate>=0 && item.Evaluate<=4" class="shuiping3"></span>{{item.Evaluate}}</td>
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
				myPublic.tableHeader('.table-box')
			},
			sort: function(res){
				return sortimg(res,vm.sortlist);
			},
			setText: function(text) {
				vm.text = text;
				vm.isEdit = true;
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
			setChildNum: function(num) {
				window.bus.$emit('childNum', num)
			},
			showPingFen: function() {
				window.bus.$emit('pingfen', false)
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
