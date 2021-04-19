(function() {
	/*
	 * 用于记录日期，显示的时候，根据dateObj中的日期的年月显示
	 */
	var dateObj = (function() {
		var _date = new Date(); // 默认为当前系统时间
		return {
			getDate: function() {
				return _date;
			},
			setDate: function(date) {
				_date = date;
			}
		};
	})();
	var _myDate = {
		init: function(obj, fun) {
			// 设置calendar div中的html部分
			renderHtml(obj);
			// 表格中显示日期
			showCalendarData();
			_myDate.thisFun = fun;
			_myDate.thisObj = obj;
			document.body.addEventListener('click', _myDate.close);
		},
		close: function() {
			if (_myDate.thisObj.style.display == 'block') {
				_myDate.thisObj.innerHTML = '';
				_myDate.thisObj.style.display = 'none';
				document.body.removeEventListener('click', _myDate.close);
			}
		},
		/**
		 * 点击上个月图标触发
		 */
		toPrevMonth: function() {
			var date = dateObj.getDate();
			dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
			showCalendarData();
		},
		toPrevYear: function() {
			var date = dateObj.getDate();
			dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 12, 1));
			showCalendarData();
		},
		/**
		 * 点击下个月图标触发
		 */
		toNextMonth: function() {
			var date = dateObj.getDate();
			dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
			showCalendarData();
		},
		toNextYear: function() {
			var date = dateObj.getDate();
			dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 12, 1));
			showCalendarData();
		},
		butDay: function(e) {
			_myDate.thisFun(e.getAttribute('data'));
			_myDate.close();
		},
		getFocus: function(e, fun) {
			for (var i = 0; i < document.getElementsByClassName('calendar').length; i++) {
				document.getElementsByClassName('calendar')[i].innerHTML = '';
				document.getElementsByClassName('calendar')[i].style.display = 'none';
			}
			_myDate.holdBubble();
			if (e.value) {
				dateObj.setDate(new Date(e.value.substr(0, 4), e.value.substr(5, 2) - 1, 1));
			}
			if (e.nextElementSibling.style.display == 'none' || e.nextElementSibling.style.display == '') {

				e.nextElementSibling.style.display = 'block';
				var val = e;
				if (!e.nextElementSibling.innerHTML) {
					myDate.init(e.nextElementSibling, function(val) {
						e.value = val.substr(0, 4) + "-" + val.substr(4, 2) + "-" + val.substr(6, 2);
						try {
							fun();
						} catch (e) {
							//TODO handle the exception
						}
					});
				}
			} else {
				e.nextElementSibling.innerHTML = '';
				e.nextElementSibling.style.display = 'none';
				document.body.removeEventListener('click', myDate.close);
			}
		},
		//阻止事件冒泡
		holdBubble: function(e) {
			var evt = e ? e : window.event;
			if (evt.stopPropagation) { //W3C 
				evt.stopPropagation();
			} else { //IE      
				evt.cancelBubble = true;
			}
		}
	};


	/**
	 * 表格中显示数据，并设置类名
	 */
	function showCalendarData() {
		var _year = dateObj.getDate().getFullYear();
		var _month = dateObj.getDate().getMonth() + 1;
		var _dateStr = getDateStr(dateObj.getDate());

		// 设置顶部标题栏中的 年、月信息
		var calendarTitle = document.getElementById("calendarTitle");
		var titleStr = _dateStr.substr(0, 4) + "年" + _dateStr.substr(4, 2) + "月";
		calendarTitle.innerText = titleStr;

		// 设置表格中的日期数据
		var _table = document.getElementById("calendarTable");
		var _tds = _table.getElementsByTagName("td");
		var _firstDay = new Date(_year, _month - 1, 1); // 当前月第一天
		for (var i = 0; i < _tds.length; i++) {
			var _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay());
			var _thisDayStr = getDateStr(_thisDay);
			_tds[i].innerText = _thisDay.getDate();
			//_tds[i].data = _thisDayStr;
			_tds[i].setAttribute('data', _thisDayStr);
			if (_thisDayStr == getDateStr(new Date())) { // 当前天
				_tds[i].className = 'currentDay';
			} else if (_thisDayStr.substr(0, 6) == getDateStr(_firstDay).substr(0, 6)) {
				_tds[i].className = 'currentMonth'; // 当前月
			} else { // 其他月
				_tds[i].className = 'otherMonth';
			}
		}
	}
	/**
	 * 日期转化为字符串， 4位年+2位月+2位日
	 */
	function getDateStr(date) {
		var _year = date.getFullYear();
		var _month = date.getMonth() + 1; // 月从0开始计数
		var _d = date.getDate();

		_month = (_month > 9) ? ("" + _month) : ("0" + _month);
		_d = (_d > 9) ? ("" + _d) : ("0" + _d);
		return _year + _month + _d;
	}

	function renderHtml(obj) {

		var calendar = obj;
		var titleBox = document.createElement("div"); // 标题盒子 设置上一月 下一月 标题
		var bodyBox = document.createElement("div"); // 表格区 显示数据

		// 设置标题盒子中的html
		titleBox.className = 'calendar-title-box';
		titleBox.innerHTML = "<span class='prev-month' onclick='myDate.toPrevMonth()'></span>" +
		"<span class='prev-year' onclick='myDate.toPrevYear()'></span>" +
			"<span class='calendar-title' id='calendarTitle'></span>" +
			"<span class='next-year' onclick='myDate.toNextYear()'></span>" +
			"<span class='next-month' onclick='myDate.toNextMonth()'></span>";
		calendar.appendChild(titleBox); // 添加到calendar div中

		// 设置表格区的html结构
		bodyBox.className = 'calendar-body-box';
		var _headHtml = "<tr>" +
			"<th>日</th>" +
			"<th>一</th>" +
			"<th>二</th>" +
			"<th>三</th>" +
			"<th>四</th>" +
			"<th>五</th>" +
			"<th>六</th>" +
			"</tr>";
		var _bodyHtml = "";

		// 一个月最多31天，所以一个月最多占6行表格
		for (var i = 0; i < 6; i++) {
			_bodyHtml += "<tr>" +
				"<td onclick='myDate.butDay(this)'></td>" +
				"<td onclick='myDate.butDay(this)'></td>" +
				"<td onclick='myDate.butDay(this)'></td>" +
				"<td onclick='myDate.butDay(this)'></td>" +
				"<td onclick='myDate.butDay(this)'></td>" +
				"<td onclick='myDate.butDay(this)'></td>" +
				"<td onclick='myDate.butDay(this)'></td>" +
				"</tr>";
		}
		bodyBox.innerHTML = "<table id='calendarTable' class='calendar-table'>" +
			_headHtml + _bodyHtml +
			"</table>";
		// 添加到calendar div中
		calendar.appendChild(bodyBox);

	}

	window.myDate = _myDate;
})()
