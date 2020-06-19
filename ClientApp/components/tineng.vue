<template>

	<div class="body-item">
		<div class="title">
			<div>基础体能参考标准</div>
		</div>
		<section>
			<div class="table-box" style="height: 708px !important">
				<table>
					<tr>
						<th rowspan="3">评分</th>
						<th rowspan="2" colspan="2">BMI</th>
						<th rowspan="3">坐位体前屈cm</th>
						<th rowspan="3">30m冲刺s</th>
						<th rowspan="2"colspan="2">垂直纵跳 cm</th>
						<th rowspan="3">深蹲相对力量</th>
						<th rowspan="3">卧推相对力量</th>
						<th rowspan="2" colspan="2">引体向上次</th>
						<th rowspan="3">腹肌耐力s</th>
						<th rowspan="3">背肌耐力s</th>
						<th colspan="4">二选一</th>
					</tr>
					<tr>
						<th colspan="2">3000m  min's</th>
						<th colspan="2">2000m测功仪 min's</th>
					</tr>
					<tr>
						<th>男子</th>
						<th>女子</th>
						<th>男子</th>
						<th>女子</th>
						<th>男子</th>
						<th>女子</th>
						<th>男子</th>
						<th>女子</th>
						<th>男子</th>
						<th>女子</th>
					</tr>
					<tr>
						<td>10</td>
						<td>＜18</td>
						<td>＜20</td>
						<td>≥40</td>
						<td>≤4.5</td>
						<td>≥55</td>
						<td>≥50</td>
						<td>＞1.2</td>
						<td>＞1.2</td>
						<td>≥40</td>
						<td>≥35</td>
						<td>≥120</td>
						<td>≥120</td>
						<td>≤11:00</td>
						<td>≤11:30</td>
						<td>≤8:00</td>
						<td>≤9:00</td>
					</tr>
					<tr>
						<td>9</td>
						<td>18.0-18.3</td>
						<td>20.0-20.3</td>
						<td>39</td>
						<td>4.6</td>
						<td>54</td>
						<td>49</td>
						<td>-</td>
						<td>-</td>
						<td>39</td>
						<td>34</td>
						<td>115-119</td>
						<td>115-119</td>
						<td>11:01-11:30</td>
						<td>11:31-12:00</td>
						<td>8:01-8:30</td>
						<td>9:01-9:30</td>
					</tr>
					<tr>
						<td>8</td>
						<td>18.4-18.7</td>
						<td>20.4-20.7</td>
						<td>38</td>
						<td>4.7</td>
						<td>53</td>
						<td>48</td>
						<td>1.1</td>
						<td>1.1</td>
						<td>38</td>
						<td>33</td>
						<td>110-114</td>
						<td>110-114</td>
						<td>11:31-12:00</td>
						<td>12:01-12:30</td>
						<td>8:31-9:00</td>
						<td>9:31-10:00</td>
					</tr>
					<tr>
						<td>7</td>
						<td>18.8-19.1</td>
						<td>20.8-21.1</td>
						<td>37</td>
						<td>4.8</td>
						<td>52</td>
						<td>47</td>
						<td>-</td>
						<td>-</td>
						<td>37</td>
						<td>32</td>
						<td>105-109</td>
						<td>105-109</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
					</tr>
					<tr>
						<td>6</td>
						<td>19.2-19.5</td>
						<td>21.2-21.5</td>
						<td>36</td>
						<td>4.9</td>
						<td>51</td>
						<td>46</td>
						<td>-</td>
						<td>-</td>
						<td>36</td>
						<td>31</td>
						<td>100-104</td>
						<td>100-104</td>
						<td>12:01-12:30</td>
						<td>12:31-13:00</td>
						<td>9:01-9:30</td>
						<td>10:01-10:30</td>
					</tr>
					<tr>
						<td>5</td>
						<td>19.6-19.9</td>
						<td>21.6-21.9</td>
						<td>35</td>
						<td>5.0</td>
						<td>50</td>
						<td>45</td>
						<td>1.0</td>
						<td>1.0</td>
						<td>35</td>
						<td>30</td>
						<td>90-99</td>
						<td>90-99</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
					</tr>
					<tr>
						<td>4</td>
						<td>20.0-20.3</td>
						<td>22.0-22.3</td>
						<td>34</td>
						<td>5.1</td>
						<td>47-49</td>
						<td>42-44</td>
						<td>-</td>
						<td>-</td>
						<td>31-34</td>
						<td>26-29</td>
						<td>80-89</td>
						<td>80-89</td>
						<td>12:31-13:00</td>
						<td>13:01-13:30</td>
						<td>9:31-10:00</td>
						<td>10:31-11:00</td>
					</tr>
					<tr>
						<td>3</td>
						<td>20.4-20.7</td>
						<td>22.4-22.7</td>
						<td>31-33</td>
						<td>5.2</td>
						<td>43-46</td>
						<td>38-41</td>
						<td>0.9</td>
						<td>0.9</td>
						<td>27-30</td>
						<td>22-25</td>
						<td>70-79</td>
						<td>70-79</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
						<td>-</td>
					</tr>
					<tr>
						<td>2</td>
						<td>20.8-21.1</td>
						<td>22.8-23.1</td>
						<td>28-30</td>
						<td>-</td>
						<td>39-42</td>
						<td>34-37</td>
						<td>0.8</td>
						<td>0.8</td>
						<td>23-26</td>
						<td>18-21</td>
						<td>60-69</td>
						<td>60-69</td>
						<td>13:01-13:30</td>
						<td>13:31-14:00</td>
						<td>10:01-10:30</td>
						<td>11:01-11:30</td>
					</tr>
					<tr>
						<td>1</td>
						<td>21.2-22.0</td>
						<td>23.2-24.0</td>
						<td>25-27</td>
						<td>-</td>
						<td>35-38</td>
						<td>30-33</td>
						<td>0.7</td>
						<td>0.7</td>
						<td>18-22</td>
						<td>13-17</td>
						<td>30-59</td>
						<td>30-59</td>
						<td>13:31-14:00</td>
						<td>14:01-14:30</td>
						<td>10:31-11:00</td>
						<td>11:31-12:00</td>
					</tr>
					<tr>
						<td>0</td>
						<td>＞22</td>
						<td>＞24</td>
						<td>＜25</td>
						<td>＞5.2</td>
						<td>＜35</td>
						<td>＜30</td>
						<td>≤0.6</td>
						<td>≤0.6</td>
						<td>＜18</td>
						<td>＜13</td>
						<td>＜30</td>
						<td>＜30</td>
						<td>＞14:00</td>
						<td>＞14:30</td>
						<td>＞11:00</td>
						<td>＞12:00</td>
					</tr>
				</table>
			</div>
		</section>
	</div>
</template>

<script>
	var vm;
	export default {
		data: function() {
			return {}
		},
		//计算属性
		computed: {},
		methods: {
			start: function() {}
		},
		beforeCreate: function() {
			vm = this;
		},
		mounted: function() {
			vm.start();
		}
	}
</script>