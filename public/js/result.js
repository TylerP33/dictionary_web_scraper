$(function() {

// jQuery navbar
$(".nav-bar").click(function(e) {
	$(".fa-times").toggle("slow");
	$(".anchor").toggle("slow");
	if ($("#nav-bar-wrapper").find("i") ) {
		$(".fa-bars").toggle("slow");
	}
});

// add slide in text for searched words
$("ol").show("slide", { direction: "left" }, 1000);

});