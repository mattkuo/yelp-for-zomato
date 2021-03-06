/* global oauthSignature */
(function() {

	function acquireRating(phone, cb) {

		var params = {
			phone: phone,
			limit: 5,
			oauth_consumer_key: 'WY4Tg4568H1-rentOE5hmQ',
			oauth_token: 'Ua_W7GZogS6oFUePDR6LCGaILp5Ld7Vm',
			oauth_signature_method: 'HMAC-SHA1',
			oauth_timestamp: new Date().getTime(),
			oauth_nonce: _createNonce()
		}

		var consumerSecret = 'bd1r1BZHG9Uved8RUgyhc6wxuuk',
				tokenSecret = 'rxTXis-pgki7uSiff9GFfbU2ZjU';

		params.oauth_signature = oauthSignature.generate(
			'GET',
			'https://api.yelp.com/v2/phone_search',
			params,
			consumerSecret,
			tokenSecret,
			{ encodeSignature: false}
		);

		$.ajax({
			type: 'GET',
			url: 'https://api.yelp.com/v2/phone_search',
			data: params,
			success: function(results) {
				cb(results.businesses[0]);
			}
		});

	}

	function addYelpRating() {
    var starRating = _createStarRating();
    var phone = $('.res-tel span.tel').text();

		acquireRating(phone, function(result) {
			var $ratingBox = $('.res-rating');
      var stars = starRating(result.rating, result.url, result.review_count);
			$ratingBox.append(stars);
		});
	}

  // Returns a function which returns a DOM element container with stars
  function _createStarRating() {
    var containerA;
    var getDiv = function(rating, url, numRatings) {
      if (containerA == undefined) {
        var containerA = document.createElement('a');
        containerA.classList.add('yelp-rating');

        containerA.target = '_blank';

        for (var i = 1; i <= 5; i++) {
          var star = document.createElement('i');
          star.innerHTML = '★';
          star.classList.add('star-' + i);
          containerA.appendChild(star);
        }

        var tooltip = document.createElement('span');
        tooltip.innerHTML = 'Click to see ratings on Yelp.com';
        tooltip.classList.add('yelp-tooltip');
        containerA.appendChild(tooltip);
      }

      var container = containerA.cloneNode(true);

      // Set restaurant specific setting here
      container.setAttribute('data-rating', rating);
      container.setAttribute('href', url);
      var span = document.createElement('span');
      span.innerHTML = numRatings;
      span.classList.add('yelp-num-ratings');

      container.appendChild(span);

      return container;
    };

    return getDiv;
  }

  // Create nonce for oauth
	function _createNonce() {
		var text = '';
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i = 0; i < 32; i++ ) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return text;
	}

	$(function() {
		addYelpRating();
	});

})();
