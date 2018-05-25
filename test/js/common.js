$(function(){

	
	/* 返回顶部 */
	function backTop() {

		// 生成元素
		var eleA = $('<a/>').attr({'class': 'backtop'});
		$('body').append(eleA);

		// 滚动监听
		$(window).scroll(function() {
			if($(this).scrollTop() > parseFloat($(window).height()/2)) {

				// 返回顶部按钮加active
				$('.backtop').fadeIn();

				// 返回顶部按钮定位
				$('.backtop').css('right', parseFloat(($(window).width() - $('.container').width())/2 - $('.backtop').width()));
			}
		});

		// 回到顶部
		$('.backtop').click(function() {
			$('body, html').animate({scrollTop: 0}, 600);
		});
	}
	backTop();

});