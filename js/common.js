/* *******************************************************
 * filename : common.js
 * description : 전체적으로 사용되는 JS
******************************************************** */

var laptopWidth = 1366;
var tabletWidth = 1024; // 헤더가 변경되는 시점
var mobileWidth = 800;

$(window).load(function  () {
	// toAnchorParameter("anchor");	/* 주소~?anchor=content  */ 
});

$(window).load(function  () {
	// toAnchorParameter("anchor");	/* 주소~?anchor=content  */ 
	/* ************************
	* Func : Waypoint.js
	* Waypoint.js, isMobile () 필요
	************************ */
	if ($.exists('[data-scroll]')) {
		if ( isMobile() ) {
			startOffset = "100%";
		}else {
			startOffset = "90%";
		}
		$("[data-scroll]").waypoint(function(){
			$(this).addClass("animated");
		}, { 
			offset: startOffset
		});
	}
});

$(document).ready(function  () {
	/* ************************
	* Func : 브라우저 체크 및 기기체크
	* isMobile() 필요
	************************ */
	checkOsBrowser();
	$(window).on('resize', checkOsBrowser);
	function checkOsBrowser () {
		if ( isMobile() ) {
			$("body").removeClass("is-pc").addClass("is-mobile").addClass(detectOS()+"-os");
		}else {
			$("body").removeClass("is-mobile").addClass("is-pc").addClass(detectBrowser()+"-browser");
		}
	}
	/* ************************
	* Func : 스킵네비게이션 영문번역
	************************ */
	if ( $("html").attr("lang") != "ko" ) {
		$(".cm-accessibility a").text("Skip to content");
	}

	/* ************************
	* Func : 웹접근성 키보드이용시
	************************ */
	if ( detectBrowser() !== "ie" && !isMobile() ) {
		mouseCheck();
	}
	function mouseCheck () {
		$("body").mousemove(function(event) { 
			$(this).addClass("mouse");
		});
		$("body").on("keydown touchstart",function(event) { 
			$(this).removeClass("mouse");
		});
	}
	

	/* ************************
	* 풀페이지 높이지정
	************************ */
	if ($.exists('.full-section')) {
		mainVisualHeight();
		$(window).on('resize', mainVisualHeight);

		function mainVisualHeight () {
			var visual_height = getWindowHeight();	
			$(".full-section").height(visual_height);
		}
	}

	/* ************************
	* index, about 버튼 클릭 이벤트
	************************ */
	var pageState = false;
	var $pageOpenbtn = $(".page-open-btn");
	
	$(".page-open-btn").click(function  () {
		if ( ! pageState ) {
			var activePage = $(this).attr('data-page');
			//console.log(activePage);
			$('.open-page').each(function(){
				if($(this).attr('data-page')==activePage){
					$(this).addClass('open');
				}
			});
			if ( $pageOpenbtn.data("event") === "toggle") {
				$pageOpenbtn.addClass("active");
			}
			$("body").css({'height':$(window).height(), 'overflow':'hidden'});
			$("html").css({'overflow-y':'hidden'});

		}else {
			page_close();
		}
		if ( $(this).data("event") === "toggle") {
			pageState = !pageState;
		}
	});
	// Close Button
	$(".page-close-btn").click(function  () {
		pageState = !pageState;
		page_close();
	});
	function page_close () {
		$(".open-page").removeClass("open");
		$pageOpenbtn.removeClass("active");
		$("body").css({'height':'auto', 'overflow':'auto'});
		$("html").css({'overflow-y':'auto'});
	}


	/* ************************
	* index 페이지 마우스 오버 시 이미지 변경
	************************ */
	$("#indexCon .list-link li a").on("mouseenter",function  () {
		var activeLink = $(this).parent().attr('data-num');
		$("#indexCon .list-link li").removeClass("active");
		$(this).parent().addClass("active");
		$('#indexCon .img-list li').removeClass("active");
		$('#indexCon .img-list li').each(function(){
			if($(this).attr('data-num')==activeLink){
				$(this).addClass('active');
			}
		});
	});


	/* ************************
	* Func : 익스플로러 엣지 전환 소스
	************************ */
	if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
		window.location = 'microsoft-edge:' + window.location;
		setTimeout(function() {
			top.window.open('about:blank','_self').close(); 
			top.window.opener=self;
			top.self.close();
		},1);
	}


});

