<template>
	<div>
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
        <th @click="sortbut('Usg')">尿比重<img :src="sort('Usg')" /></th>
        <th @click="sortbut('Ph')">PH<img :src="sort('PH')" /></th>
        <th @click="sortbut('PRO')">尿蛋白PRO<img :src="sort('PRO')" /></th>
        <th @click="sortbut('NIT')">尿亚硝酸盐NIT<img :src="sort('NIT')" /></th>
        <th @click="sortbut('BLO')">尿隐血BLO<img :src="sort('BLO')" /></th>
        <th @click="sortbut('WBC')">白细胞WBC<img :src="sort('WBC')" /></th>
        <th @click="sortbut('GLU')">尿糖GLU<img :src="sort('GLU')" /></th>
        <th @click="sortbut('BIL')">尿胆红素BIL<img :src="sort('BIL')" /></th>
        <th @click="sortbut('KET')">尿酮体KET<img :src="sort('KET')" /></th>
        <th @click="sortbut('URO')">尿胆原URO<img :src="sort('URO')" /></th>
        <th>结果分析参考</th>
        <th>补液建议</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in urineList">
        <th style="min-width: 130px;max-width: 130px;width: 130px;left:0px;">{{item.Testdate}}</th>
        <th style="min-width: 130px;max-width: 130px;width: 130px;left:143px;">{{item.SportName}}</th>
        <td>{{item.TrainName}}</td>
        <td>{{item.TrainSecName}}</td>
        <td>{{item.Age?item.Age:'-'}}</td>
        <td>{{item.Sex}}</td>
        <td>{{item.Usg}}</td>
        <td>{{item.PH}}</td>
        <td>{{item.PRO}}</td>
        <td>{{item.NIT}}</td>
        <td>{{item.BLO}}BLO</td>
        <td>{{item.WBC}}</td>
        <td>{{item.GLU}}</td>
        <td>{{item.BIL}}</td>
        <td>{{item.KET}}</td>
        <td>{{item.URO}}</td>
        <td style="overflow: initial;white-space: initial;"><div class="advice" style="width: 200px;">{{item.ResultsAnalysis}}</div></td>
        <td style="overflow: initial;white-space: initial;"><div class="advice">{{item.Advice}}</div></td>
      </tr>
      </tbody>
    </table>
	</div>
</template>

<script>
import {
  sortimg
} from '../../components/sort.js';

  var vm;
	export default {
		props: ['urineList', 'sortlist'],
		data: function() {
			return {
			  list: []
			}
		},
		watch: {},
		//计算属性
		computed: {},
		methods: {
		  start: function(){
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
        window.bus.$emit('sortUrine', l);
      },
		},
		beforeCreate: function() {
			vm = this;
		},
		mounted: function() {
			vm.start();
		}
	}
</script>
