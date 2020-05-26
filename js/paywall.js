
var packages = ['102357'];
const service_url = "https://services.inplayer.com";

// CREATE PACKAGE ASSET
function createItemElement(assetId, assetPhoto, assetTitle) {
	var output =
		`<div class="package-item"><div class="content" style="background-image:url(${assetPhoto})"><a href="./item.html?id=${assetId}" class="overlay-link"></a></div><div class="item-label"><div class="name">${assetTitle}</div></div></div>`;
	return output;
}

$(function () {
	$("#preview-item").html(`<div class="inplayer-paywall" id="inplayer-${getParameterByName("id")}"></div>`);


	// fetch package
	const fetchPackage = (packageId) => {
		$.get(
			`${service_url}/items/packages/${packageId}/items?limit=100`, resp => {
				let output = '';
				let activeAssetId = getParameterByName("id");

				for (item of resp.collection) {
					let assetId = item.id,
						assetPhoto = item.metahash.paywall_cover_photo,
						assetTitle = item.metahash.preview_title,
						assetDesc = item.metahash.preview_description;


					output += createItemElement(assetId, assetPhoto, assetTitle, assetDesc);
					document.getElementById(`package-${packageId}`).innerHTML = output;
				}
			}
		);
	};

	packages.map((packageId) => fetchPackage(packageId));

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

})