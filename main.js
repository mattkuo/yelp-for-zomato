(function() {
	// var $ratingBox = $('.res-rating');

	function acquireRating(name, address, resultCallback) {
		var parameters = {
			term: name,
			location: address,
			limit: 1
		};

		var request = $.get('http://api.yelp.com/v2/search'+$.param(parameters));

		request.success(function(result) {
			resultCallback(result.businesses[0]);
		});

		request.error(function(result) {
			console.log(result);
		});
	}

	$(function() {
		address = $('.res-main-address-text')
			.clone()
			.children()
			.remove()
			.end()
			.text()
			.trim();
	});

})();
