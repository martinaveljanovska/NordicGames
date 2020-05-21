$(".inplayer-paywall-logout").parent().hide();
paywall.on("authenticated", function () {
	$(".inplayer-paywall-login").parent().hide();
	$(".inplayer-paywall-logout").parent().show();
});

paywall.on("logout", function () {
	location.reload();
});

paywall.on("inject", function () {
	$(".inplayer-paywall").addClass("responsive-iframe");
});
