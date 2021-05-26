<template>
	<div>
		<div class="edit-mask" v-if="isEdit">
			<div class="is-edit">
				<div class="header">评价<img v-on:click="isEdit = false" style="width: 20px;height: 20px;vertical-align: top;float: right;margin-top: 2px;cursor: pointer;"
					 src="../../assets/imgs/close.png" /></div>
				<div class="body">
					<div v-if="Eid == ''" style="font-size: 16px;border: 1px solid #ccc;border-radius: 4px;height: 278px;padding: 10px;">{{text}}</div>
					<textarea v-else v-model="text" style="width: calc(100% - 20px);font-size: 16px;border: 1px solid #ccc;border-radius: 4px;height: 278px;padding: 10px;resize: none;outline: none;"></textarea>
				</div>
				<div v-if="Eid !== ''" class="edit-mask-but">
					<button v-on:click="save()">保存</button>
					<button v-on:click="quxiao()">取消</button>
				</div>
			</div>
		</div>
		<table>
			<thead>
				<tr>
					<th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;z-index: 100;" @click="sortbut('Testdate')">测试时间<img
								 :src="sort('Testdate')" /></th>
					<th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;z-index: 100;" @click="sortbut('SportName')">运动员<img
								 :src="sort('SportName')" /></th>
					<th>运动项目</th>
					<th>参赛主项</th>
					<th>年龄</th>
					<th>性别</th>
					<th @click="sortbut('Leukocyte')">白细胞<img :src="sort('Leukocyte')" /></th>
					<th @click="sortbut('Erythrocyte')">红细胞<img :src="sort('Erythrocyte')" /></th>
					<th @click="sortbut('Hemoglobin')">血红蛋白<img :src="sort('Hemoglobin')" /></th>
					<th @click="sortbut('Hematocrit')">血球压积<img :src="sort('Hematocrit')" /></th>
					<th @click="sortbut('Lymphocyte')">淋巴细胞<img :src="sort('Lymphocyte')" /></th>
					<th @click="sortbut('Neutrophils')">中性粒细胞<img :src="sort('Neutrophils')" /></th>
					<th @click="sortbut('BloodUrea')">血尿素<img :src="sort('BloodUrea')" /></th>
					<th @click="sortbut('CreatineKinase')">肌酸激酶<img :src="sort('CreatineKinase')" /></th>
					<th @click="sortbut('Cortisol')">皮质醇<img :src="sort('Cortisol')" /></th>
					<th @click="sortbut('Testosterone')">睾酮<img :src="sort('Testosterone')" /></th>
					<th>睾酮/皮质醇</th>
					<th>评价</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in phyConstituentsList">
					<th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;">{{item.Testdate}}</th>
					<th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;">{{item.SportName}}</th>
					<td>{{item.TrainName}}</td>
					<td>{{item.TrainSecName}}</td>
					<td>{{item.Age?item.Age:'-'}}</td>
					<td>{{item.Sex}}</td>

					<td>{{item.Leukocyte}}<span :class="{'jing2':item.Leukocyte<4,'jing3':item.Leukocyte>11}"></span></td>
					<td>{{item.Erythrocyte}}<span :class="{'jing2':item.Erythrocyte<4,'jing3':item.Erythrocyte>5.6}"></span></td>
					<!--血红蛋白-->
					<td v-if="item.Sex == '男'">{{item.Hemoglobin}}<span :class="{'jing2':item.Hemoglobin<120,'jing3':item.Hemoglobin>160}"></span></td>
					<td v-else>{{item.Hemoglobin}}<span :class="{'jing2':item.Hemoglobin<110,'jing3':item.Hemoglobin>150}"></span></td>
					<!--红细胞压积-->
					<td>{{item.Hematocrit}}<span :class="{'jing2':item.Hematocrit<0.32,'jing3':item.Hematocrit>0.54}"></span></td>
					<!--淋巴-->
					<td>{{item.Lymphocyte}}<span :class="{'jing2':item.Lymphocyte<0.8,'jing3':item.Lymphocyte>3.5}"></span></td>
					<!--中性白细胞-->
					<td>{{item.Neutrophils}}<span :class="{'jing2':item.Neutrophils<1.8,'jing3':item.Neutrophils>6.3}"></span></td>
					<!--血尿素-->
					<td>{{item.BloodUrea}}<span :class="{'jing2':item.BloodUrea<4,'jing3':item.BloodUrea>7}"></span></td>
					<!--肌酸激酶-->
					<td v-if="item.Sex == '男'">{{item.CreatineKinase}}<span :class="{'jing2':item.CreatineKinase<10,'jing3':item.CreatineKinase>300}"></span></td>
					<td v-else>{{item.CreatineKinase}}<span :class="{'jing2':item.CreatineKinase<4,'jing3':item.CreatineKinase>200}"></span></td>
					<!--皮质醇-->
					<td>{{item.Cortisol}}<span :class="{'jing2':item.Cortisol<6,'jing3':item.Cortisol>26}"></span></td>
					<!--睾酮-->
					<td v-if="item.Sex == '男'">{{item.Testosterone}}<span :class="{'jing2':item.Testosterone<270,'jing3':item.Testosterone>1000}"></span></td>
					<td v-else>{{item.Testosterone}}<span :class="{'jing2':item.Testosterone<10,'jing3':item.Testosterone>100}"></span></td>

					<td v-if="item.Cortisol > 0" :style="{'color':(item.Cortisol<1?'#ba2538':'inherit')}">{{(item.Testosterone/item.Cortisol).toFixed(2)}}</td>
					<td v-else style="color: #ba2538;">0</td>

					<td>
						<span v-if="item.EvaluationContent" style="color: #007AFF;cursor: pointer;" v-on:click="setText(item.EvaluationContent)">详情</span>
						<span v-else style="color: #ba2538;cursor: pointer;" v-on:click="setText(item.EvaluationContent,item.EId,index)">编写评价</span>
					</td>
				</tr>
			</tbody>
		</table>

	</div>
</template>

<script>
	var vm;
	import {
		sortimg
	} from '../../components/sort.js';
	export default {
		props: ['phyConstituentsList', 'sortlist'],
		data: function() {
			return {
				text: '',
				Eid: '',
				Eindex: '',
				isEdit: false
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
			setText: function(text, id, index) {
				vm.text = text;
				vm.Eid = id ? id : '';
				vm.Eindex = index ? index : '';
				vm.isEdit = true;
			},
			quxiao: function() {
				vm.isEdit = false;
				vm.text = '';
				vm.Eid = '';
			},
			save: function() {
				vm.$http.post(myPublic.publicUrl + '/API/Test/SavePeriodicEvaluation?' + 'id=' + vm.Eid + '&content=' + vm.text, {})
					.then(function(result) {
						if (result.body.StateCode == 0) {
							window.myPublic.alertResult(result.body.Message);
							vm.phyConstituentsList[vm.Eindex].EvaluationContent = vm.text;
							vm.quxiao()
						} else {}
					}).catch(function(error) {});
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
