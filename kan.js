;var kan{
	addWindowFun : function  (fun) {
			var oldonload = window.onload;
			if (typeof oldonload != 'function') {
				window.onload = fun;
			}
			else{
				oldonload();
				fun();
			}
		},
	doMove : function  ( obj, attr, step, target, time,callback ) {
		
		step = parseInt(getStyle( obj, attr )) < target ? step : -step;
		
		clearInterval( obj.timer );
		
		obj.timer = setInterval(function () {
			
			var newpos = parseInt(getStyle( obj, attr )) + step;
			
			if ( newpos > target && step > 0 ||  newpos < target && step < 0  ) {
				newpos = target;
			}
			
			obj.style[attr] = newpos + 'px';
			
			if ( newpos == target ) {
				clearInterval( obj.timer );
				if (callback) {
					callback();
				}
			}
			
		}, time);
	},
	getStyle : function  ( obj, attr ) { return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr]; 
	},
	getElementsByClassName : function (node,classname){
		if (node.getElementsByClassName) {
			return node.getElementsByClassName(classname);
		}
		else{
			var results = new Array();
			var elems = node.getElementsByTagName('*');
			for (var i = 0; i < elems.length; i++) {
				if(elems[i].className.indexOf(classname) !=-1){
					results[results.length]=elems[i];
				}
			};
			return results;
		}
	},
	addClassName : function (obj,className){
			var objClassName = obj.className;
			if (objClassName=='') {
				obj.className = className;
			}
			else{
				if(objClassName.indexOf(className) != -1){

				}
				else{
					obj.className = objClassName+' '+className;
				}

			}
	},
	removeClassName : function (obj,className){
			var objClassName = obj.className;
			 if (objClassName!='') {
			 	var arrClassName = objClassName.split(' ');
			 		for (var i = 0; i < arrClassName.length; i++) {
			 			if( arrClassName[i] == className ){
			 				arrClassName.splice(i,1);
			 				i--;
			 			}
			 		};
			 	obj.className = arrClassName.join(' ');
			 }
	},
	timeCountDown : function (oSetTime){
			var oNewdate = new Date();
			var CountDown =Math.floor((oNewdate-oSetTime)/1000);
			return ( Math.floor( CountDown/86400 )+'天'+Math.floor( CountDown%86400/3600 )+'时'+Math.floor( CountDown%86400%3600/60 )+'分'+Math.floor( CountDown%60 )+'秒');
	},
	fnTime : function  () {
		
			var myTime = new Date();
			var iYear = myTime.getFullYear();
			var iMonth = myTime.getMonth()+1;
			var iDate = myTime.getDate();
			var iWeek = myTime.getDay();
			var iHours = myTime.getHours();
			var iMin = myTime.getMinutes();
			var iSec = myTime.getSeconds();
			var str = '';
			
			if( iWeek === 0 ) iWeek = '星期日';
			if( iWeek === 1 ) iWeek = '星期一';
			if( iWeek === 2 ) iWeek = '星期二';
			if( iWeek === 3 ) iWeek = '星期三';
			if( iWeek === 4 ) iWeek = '星期四';
			if( iWeek === 5 ) iWeek = '星期五';
			if( iWeek === 6 ) iWeek = '星期六';
			
			str = iYear+ '年' +iMonth+'月'+iDate+'日 '+iWeek+' '+ toTwo(iHours)+' : '+ toTwo(iMin)+' : '+ toTwo(iSec);
	},		
	drag : function (obj){
		obj.onmousedown = function(ev){
			var ev = ev || event;
			var offsetPosx = ev.clientX - this.offsetLeft;
			var offsetPosy = ev.clientY - this.offsetTop;
			if ( obj.setCapture ) {
					obj.setCapture();//解决IE
				}
			document.onmousemove = function(ev){
				var ev = ev || event;
				obj.style.left = ev.clientX-offsetPosx +'px';
				obj.style.top = ev.clientY-offsetPosy +'px';
				return false;
			}
			document.onmouseup = function(){
				document.onmousemove =document.onmouseup= null;
				if (obj.releaseCapture) {
					obj.releaseCapture();
				}
			}
			return false;
	 }
	},
	setCookie : function (key,value,time,codeFun){
			var oDate = new Date();
			oDate.setDate(oDate.getDate()+time);
			oDate.toGMTString();
			document.cookie = key+'='+codeFun(value)+';expires='+oDate;
	},
	getCookie : function (key,decodeFun){
			var cookie = document.cookie;
			var cookieArry = cookie.split('; ');
			for (var i = 0; i < cookieArry.length; i++) {
				var cookieKey = cookieArry[i].split('=');
				if(cookieKey[0] == key){
					return decodeFun(cookieKey[1]);
				}
				
			};
	},
	removeCookie : function (key){
		setCookie(key,'',-1,0);
	},
	setOpacity : function (obj,speed,target,time,endfun){
			var alpha = parseInt(getStyle(obj,'opacity')*100);
			speed = alpha<target? speed : -speed;
			clearInterval(obj.alphatimer);
			obj.alphatimer = setInterval(function(){
				alpha+=speed;
			if ( (alpha>=target&&speed>0) || (alpha<=target&&speed<0) ) {
				alpha=target;
				clearInterval(obj.alphatimer);
				if (endfun) {
					endfun();
				}
			}
				
				
			},time);
	}
	fu,nction setAttr(obj,attr,speed,target,time,endfun){
			var iCur =0;
			if (attr=='opacity') {iCur = parseInt(getStyle(obj,attr))*100;}
			else{iCur = parseInt(getStyle(obj,attr));}
			speed = iCur<target? speed : -speed;

			clearInterval(obj.timer);
			obj.timer = setInterval(function(){
				iCur+=speed;
			if ( (iCur>=target&&speed>0) || (iCur<=target&&speed<0) ) {
				iCur=target;
				clearInterval(obj.timer);
				if (endfun) {
					endfun();
				}
			}	
				if (attr=='opacity'){
				obj.style.filter='alpha(opacity='+iCur+')';
				obj.style.opacity = iCur/100;}
				else{obj.style[attr] = iCur+'px';}
				
			},time);
	},
	showDown : function (obj,json,time,endfun){
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){
			var iStop = true;
			for (var attr in json) {
				var iCur =0;
				if (attr=='opacity') {iCur = parseInt(parseFloat( getStyle(obj,attr) )*100);}
				else{iCur = parseInt(getStyle(obj,attr));}
				speed = (json[attr] - iCur)/8;
				speed = speed>0? Math.ceil(speed) : Math.floor(speed);

				if ( json[attr] != iCur ) {
					iStop =false;
				}
				
				if (attr=='opacity'){
				obj.style.filter='alpha(opacity='+(iCur+speed)+')';
				obj.style.opacity = (iCur+speed)/100;}
				else{obj.style[attr] = (iCur+speed)+'px';}
			};
			if (iStop) {
					clearInterval(obj.timer);
					if (endfun) {
						endfun();
					}};
					
			},time);
	},
	 moveFlex : function (obj,json,time,endfun){
			if (obj.timer) {clearInterval(obj.timer);}
			var speed = 0;
			obj.timer = setInterval(function(){
			var iStop = true;
			for (var attr in json) {
				var iCur =0;
				if (attr=='opacity') {iCur = parseInt(parseFloat( getStyle(obj,attr) )*100);}
				else{iCur = parseInt( getStyle(obj,attr) );}
				speed += (json[attr] - iCur)/5;
				speed*=0.7;

				if ( Math.abs(json[attr]-iCur)>=1 ||  Math.abs(speed>=1)) {
					iStop =false;
				}
				
				if (attr=='opacity'){
				obj.style.filter='alpha(opacity='+(iCur+speed)+')';
				obj.style.opacity = (iCur+speed)/100;}
				else{obj.style[attr] = (iCur+speed)+'px';}
			};
			if (iStop) {
					clearInterval(obj.timer);
					if (endfun) {
						endfun();
					}};
					
			},time);
	},
	miaovDoMoveFlex : function (obj, oTarget, fnCallBack, fnDuring)
	{
		var bStop=true;
		var attr='';
		var speed=0;
		var cur=0;
		
		for(attr in oTarget)
		{
			if(!obj.oSpeed)obj.oSpeed={};
			if(!obj.oSpeed[attr])obj.oSpeed[attr]=0;
			cur=css(obj, attr);
			if(Math.abs(oTarget[attr]-cur)>=1 || Math.abs(obj.oSpeed[attr])>=1)
			{
				bStop=false;
				
				obj.oSpeed[attr]+=(oTarget[attr]-cur)/5;
				obj.oSpeed[attr]*=0.7;
				
				css(obj, attr, cur+obj.oSpeed[attr]);
			}
		}
		
		if(fnDuring)fnDuring.call(obj);
		
		if(bStop)
		{
			clearInterval(obj.timer);
			obj.timer=null;
			
			if(fnCallBack)fnCallBack.call(obj);
		}
	},
};
