//自定义全局变量
(function () {
	const myPublic = {
		// publicUrl:'http://www.cissatmes.com',
		// publicUrl:'http://www.sport.uare.vip',
		publicUrl:'http://localhost:80',
		setTitle: function(title) {
			document.title = title;
		},
		tableHeader:function(id){
			var tableCont = document.querySelector(id)
			  function scrollHandle (e){
			    console.log(this)
			    var scrollTop = this.scrollTop;
			    this.querySelector('thead').style.transform = 'translateY(' + scrollTop +'px)';
			  }
			  tableCont.addEventListener('scroll',scrollHandle)
		},
		//获取第几周
		getWeek:function(dt){
            let d1 = new Date(dt);
            let d2 = new Date(dt);
            d2.setMonth(0);
            d2.setDate(1);
            let rq = d1-d2;
            let days = Math.ceil(rq/(24*60*60*1000));
            let num = Math.ceil(days/7);
            return num-(0-1);
        },
		copys:function(obj){
			var a = JSON.stringify(obj);
			return JSON.parse(a);
		},
		//阻止事件冒泡
		holdBubble: function(e) {
			var evt = e ? e : window.event;
			if(evt.stopPropagation) { //W3C 
				evt.stopPropagation();
			} else { //IE      
				evt.cancelBubble = true;
			}
		},
		/**
		 * 
		 * @param {Date} date 时间对象 
		 * @param {Object} 变化月
		 */
		getAddMonthDate:function(d,num){
			var _date = d ? d : new Date();
			var n = _date.getMonth()+1;
			if((n + num)==0){
				_date.setYear(_date.getFullYear()-1);
				_date.setMonth(11);
			}else if((n + num)<0){
				_date.setYear(_date.getFullYear()-1);
				_date.setMonth(11+(n + num));
			}else{
				_date.setMonth((n + num)-1);
			}
			return new Date(_date.getTime());
		},
		/**
		 * 
		 * @param {Date} date 时间对象 
		 * @param {Object} 变化天数
		 */
		getAddDayDate:function(d,num){
			var _date = d ? d : new Date();
			return new Date(_date.getTime()+num*(60*60*24*1000));
		},
		/**
		 * 转换时间格式
		 * @param {Date} date 时间对象 
		 * @param {Object} str 时间格式
		 */
		dateForFormat: function(d, str) {
			var _date = d ? d : new Date();
			var _str = str;
			var Week = ['日', '一', '二', '三', '四', '五', '六'];
			_str = _str.replace('yyyy', _date.getFullYear());
			_str = _str.replace('MM', (_date.getMonth() + 1 < 10 ? '0' + (_date.getMonth() + 1) : _date.getMonth() + 1));
			_str = _str.replace('dd', _date.getDate() < 10 ? "0" + _date.getDate() : _date.getDate());
			_str = _str.replace('D', Week[_date.getDay()]);
			_str = _str.replace('hh', _date.getHours() < 10 ? "0" + _date.getHours() : _date.getHours());
			_str = _str.replace('mm', _date.getMinutes() < 10 ? "0" + _date.getMinutes() : _date.getMinutes());
			_str = _str.replace('ss', _date.getSeconds() < 10 ? "0" + _date.getSeconds() : _date.getSeconds());
			return _str;
		},
		getTerminal:function(){
			var u = navigator.userAgent;
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if(isAndroid){
				return 'android';
			}else if(isiOS){
				return 'ios';
			}else{
				return 'web';
			}
		},
		//弹出操作结果
		alertResult: function(text) {
			var result = document.createElement('div');
			result.setAttribute('id','result');
			result.innerHTML = text;
			document.body.appendChild(result);
			setTimeout(function() {
				document.getElementById('result').classList.add('remove');
			}, 1500);
			setTimeout(function() {
				document.getElementById('result').parentNode.removeChild(document.getElementById('result'));
			}, 1600);
		},
		//弹出框
		alertMy: function(text) {
			var _html = "<div><div class='title'>" + text + "</div><div class='confirm-box'><button class='z-yes' onclick='myPublic.yes()'>确认</button></div></div>"
			var result = document.createElement('div');
			result.setAttribute('id','validate');
			result.innerHTML = _html;
			document.body.appendChild(result);
			myPublic.yes = function() {
				document.body.removeChild(document.getElementById('validate'));
			};
		},
		getHeight:function(){
			return window.screen.height;
		}
	}
	window.myPublic = myPublic;
})();