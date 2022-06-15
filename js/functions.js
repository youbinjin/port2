/* *******************************************************
 * filename : functions.js
 * description : 전체적으로 사용되는 JS
******************************************************** */

/* ************************
  * 브라우저를 체크할때 사용하는 함수
  * return browser(브라우저name)
  ************************ */
function detectBrowser () {
	var agent = navigator.userAgent.toLowerCase(); 
	var browser; 
	
	if ( (agent.indexOf('msie') > -1) || (agent.indexOf('trident') > -1) || (agent.indexOf('edge') > -1) ) { 
		browser = 'ie'
	}else if(agent.indexOf('firefox') > -1) { 
		browser = 'firefox' 
	}else if(agent.indexOf('opr') > -1) { 
		browser = 'opera' 
	}else if(agent.indexOf('chrome') > -1) { 
		browser = 'chrome' 
	}else if(agent.indexOf('safari') > -1) { 
		browser = 'safari'
	}

	return browser;
}

 /* ************************
  * IE 버전을 체크할때 사용하는 함수
  * return : IE 아닐때 false / IE 일때 9,10,11,"edge"
  ************************ */
function ieVersionCheck () {
	var word; 
	var version = "N/A"; 
	var agent = navigator.userAgent.toLowerCase(); 
	var name = navigator.appName; 

	// IE old version ( IE 10 or Lower ) 
	if ( name == "Microsoft Internet Explorer" ) word = "msie "; 
	else { 
		// IE 11 
		if ( agent.search("trident") > -1 ) word = "trident/.*rv:"; 
		// Microsoft Edge  
		else if ( agent.search("edge/") > -1 ) word = "edge/"; 
	} 
	var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" ); 
	if (  reg.exec( agent ) != null  ) version = RegExp.$1 + RegExp.$2; 
	
	if ( version !="NaN" && version < 12 ) {
		return parseInt (version)
	}else if ( word === "edge/" ) {
		return	 false;
	}else {
		return false;
	}
}

 /* ************************
  * OS 체크 함수
  * android/ios 체크할때 사용
  ************************ */
function detectOS(){
    var agent = navigator.userAgent.toLowerCase(); 
	var osCheck; 

    if ( agent.indexOf('android') > -1) {
        return "android";
    } else if ( agent.indexOf("iphone") > -1|| agent.indexOf("ipad") > -1|| agent.indexOf("ipod") > -1 || agent.indexOf("macintosh") > -1 ) {
        return "ios";
    } else {
        return "other";
    }

	return osCheck;
}

 /* ************************
  * 모바일 체크 함수
  * return : 모바일 true / PC false
  * Ipad Safari userAgent 변경으로 인해 if문 추가 (2020-07-17)
  * Mac Os - Big Sur, Safari(14.0) Macintosh 로 체크되어 mobile로 분류되는 이슈로 가로사이즈 조건문 추가(2021-06-15)
  ************************ */
function isMobile(){
	var UserAgent = navigator.userAgent;
	if (UserAgent.match(/iPhone|iPad|iPad|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
	{
		return true;
	}else{
		// Ipad Safari Browser
		if ( detectIpad() ) {
			return true;
		}else {
			return false;
		} 
	}
}
function detectIpad() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	// Lying iOS13 iPad
	if (userAgent.match(/Macintosh/i) !== null && getWindowWidth () < 1025 ) {
		// need to distinguish between Macbook and iPad
		var canvas = document.createElement("canvas");
		if (canvas !== null) {
			var context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
			if (context) {
				var info = context.getExtension("WEBGL_debug_renderer_info");
				if (info) {
					var renderer = context.getParameter(info.UNMASKED_RENDERER_WEBGL);
					if (renderer.indexOf("Apple") !== -1)
					return true;
				}
			}
		}
	}
	return false;
}


 /* ************************
  * 브라우저의 가로값, 세로값 측정 함수
  * return 가로값/세로값
  ************************ */
/* 임의의 영역을 만들어 스크롤바 크기 측정 */ 
function getScrollBarWidth(){
	if($(document).height() > $(window).height()){
		$('body').append('<div id="fakescrollbar" style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"></div>');
		fakeScrollBar = $('#fakescrollbar');
		fakeScrollBar.append('<div style="height:100px;">&nbsp;</div>');
		var w1 = fakeScrollBar.find('div').innerWidth();
		fakeScrollBar.css('overflow-y', 'scroll');
		var w2 = $('#fakescrollbar').find('div').html('html is required to init new width.').innerWidth();
		fakeScrollBar.remove();
		return (w1-w2);
	}
	return 0;
}
/* 브라우저 가로, 세로크기 측정 */ 
function getWindowWidth () {
	return $(window).outerWidth() + getScrollBarWidth() ;
}
function getWindowHeight () {
	return $(window).height() ;
}

 /* ************************
  * 브라우저의 스크롤바의 수직 위치 측정 함수
  * return 스크롤바 위치 값
  ************************ */
function getScrollTop () {
	return $(window).scrollTop();
}

 /* ************************
  * 브라우저의 스크롤을 이동시키는 함수
  * @param top : 이동지점
  * @param speed : 이동속도
  ************************ */
function moveScrollTop (top, speed) {
	$("html, body").animate({scrollTop:top}, speed ,"easeInOutExpo");
}

 /* ************************
  * object toggleClass 함수
  * @param object : 적용되야할 선택자
  * @param className : toggleClass Name
  ************************ */
/* addClass Active */
function addClassName (object, className) {
	$(object).addClass(className);
}
function removeClassName (object, className) {
	$(object).removeClass(className);
}

/* ************************
  * 갯수체크 함수
  * @param selector : 선택자
  * 1개이상 있으면 return true
  ************************ */
$.exists = function(selector) {
	return ($(selector).length > 0);
}


/* ************************
  * PHP 주소 Parameter
  * @param strParamName : 가져올 파라미터값
  ************************ */
/* PHP Get Parameter  */
function getParameter(strParamName){
	var arrResult = null;
	if(strParamName){
		 arrResult = location.search.match(new RegExp("[&?]" + strParamName + "=(.*?)(&|$)"));
	}
	return arrResult && arrResult[1] ? arrResult[1] : null;
}
function toAnchorParameter (anchor) {
	if ( getParameter(anchor) ) {
		var anchorConTop = $("#"+getParameter(anchor)+"").offset().top;
		var headerHeight = $("#header").height();
		moveScrollTop(anchorConTop-headerHeight, 500);
	}
}


/* ************************
  * object의 offset 체크 함수
  *  @param object : 선택자
  * return : offset.top 값
  ************************ */
function checkOffset (object) {
	return $(object).offset().top;
}

/* ************************
  * 상단에 fixed를 되고있는 object의 높이값 체크 함수
  * return : top-fixed 되고있는 높이의 total값
  ************************ */
function checkFixedHeight () {
	var fixedTotalHeight = null;
	for (var i=0; i<$(".top-fixed").length; i++) {
		var fixedTotalHeight = fixedTotalHeight + $(".top-fixed").eq(i).outerHeight();
	}
	return fixedTotalHeight;
}

/* ************************
  * event 최적화(requestAnimationFrame)
  ************************ */
function toFit(cb, _ref) {
	var _ref$dismissCondition = _ref.dismissCondition,
		dismissCondition = _ref$dismissCondition === void 0 ? function () {
		return false;
	} : _ref$dismissCondition,
	  _ref$triggerCondition = _ref.triggerCondition,
	  triggerCondition = _ref$triggerCondition === void 0 ? function () {
	return true;
	} : _ref$triggerCondition;

		if (!cb) {
			throw Error('Invalid required arguments');
		}

		var tick = false;
		return function () {
		//  console.log('scroll call')
		if (tick) {
			return;
		}

		tick = true;
		return requestAnimationFrame(function () {
			if (dismissCondition()) {
				tick = false;
				return;
			}

			if (triggerCondition()) {
				//console.log('real call')
				tick = false;
				return cb();
			}
		});
	};
}