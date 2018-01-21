$(window).scroll(() => { //controls the complex features of the parallax effect
	let h = $(window).height(); //finds height of window so annimations stay responsive

	$('#overlay')[0].style.width = "0px" //closes overlay if you scroll when it is open
	$('#caption1')[0].style.right = "0%"; //sets title to original spot
	setTimeout(() => {$('#caption1')[0].style.transition ="0.1s"}, 700);
  
  $('#caption1').css('opacity', Math.max(1 - $(window).scrollTop() / 275, 0)); //fades title on scroll

  $('#daizzyDescrip').css('top', Math.max(0 - $(window).scrollTop() / (h / 90), -110) + "px");

  $('#backImg2').css('background-position-y', Math.min(Math.max((h / 3.5) - $(window).scrollTop() / (h / 200), -154), 114) + "px");
	$('#caption2').css('top', Math.min(Math.max(0 + $(window).scrollTop() / (h / 170), 175), 295) + "px"); //Use Math.max to set minimum limit
  
  $('#daizzyDescrip2').css('top', Math.min(Math.max((h / -12) - $(window).scrollTop() / (h / 90), -254), -145) + "px");

  $('#backImg3').css('background-position-y', Math.min(Math.max((h / -10) + $(window).scrollTop() / (h / 55), 4.5), 71.5) + "px");
  $('#caption3').css('top', Math.min(Math.max((h / 1.5) - $(window).scrollTop() / (h / 233), -120), 132) + "px");
  
  $('#daizzyDescrip3').css('top', Math.min(Math.max(-485 + $(window).scrollTop() / 8, -336), -255) + "px"); //Use Math.min to set maximum limit

  $('#backImg4').css('background-position-x', Math.min(Math.max(-210 + $(window).scrollTop() / (h / 65), -72), -0.5) + "px");
  $('#daizzyDescrip4').css('top', Math.min(Math.max(-1200 + $(window).scrollTop() / 2.3, -508), -254) + "px");
});

window.matchMedia("(max-height: 1370px)").addListener((changed) => {
	if(changed.matches){
		console.log("hi");
  	$('#daizzyDescrip').css('top', 0 - $(window).scrollTop() / 200 + "%");
	}
})

$('#menuIcon').click(() => {
	$('#overlay')[0].style.width = "30%";
	$('#caption1')[0].style.right = "15%";
	$('#caption1')[0].style.transition ="0.7s";
})

$('#closeBtn').click(() => {
	$('#overlay')[0].style.width = "0px";
	$('#caption1')[0].style.right = "0%";
})

function linkScroller(x) {
	if(x === 1){
		$('html,body').animate({scrollTop: $('#link1').offset().top - 175}, 500);
	}else if (x === 2){
		$('html,body').animate({scrollTop: $('#link2').offset().top - 280}, 500);
	}else if (x === 3){
		$('html,body').animate({scrollTop: $('#link3').offset().top - 325}, 500);
	}else if (x === 4){
		$('html,body').animate({scrollTop: $('#link4').offset().top - 0}, 500);
	}
}