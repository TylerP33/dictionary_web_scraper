$(function() {

$(".nav-bar").click(function(e) {
	$(".fa-times").toggle("slow");
	$(".anchor").toggle("slow");
	if ($("#nav-bar-wrapper").find("i") ) {
		$(".fa-bars").toggle("slow");
	}
});



});