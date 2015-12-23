/* global oauthSignature */
(function() {

	function acquireRating(name, address, cb) {

		var params = {
			term: name,
			location: address,
			limit: 1,
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
			'https://api.yelp.com/v2/search',
			params,
			consumerSecret,
			tokenSecret,
			{ encodeSignature: false}
		);

		$.ajax({
			type: 'GET',
			url: 'https://api.yelp.com/v2/search',
			data: params,
			success: function(results) {
        console.log(results);
				cb(results.businesses[0]);
			}
		});

	}

	function addYelpRating() {
		var address = _getOwnText($('.res-main-address-text')),
				restaurantName = $('.res-name span[itemprop=name]').text().trim();
    var starRating = _createStarRating();
		acquireRating(restaurantName, address, function(result) {
			var $ratingBox = $('.res-rating');
      var stars = starRating(result.rating);
			$ratingBox.append(stars);
		});
	}

  function _createStarRating() {
    var containerA;
    var getDiv = function(rating) {
      if (containerA == undefined) {
        var containerA = document.createElement('a');
        containerA.classList.add('yelp-rating');
        containerA.setAttribute('data-rating', rating);

        for (var i = 1; i <= 5; i++) {
          var star = document.createElement('i');
          star.innerHTML = '★';
          star.classList.add('star-' + i);
          containerA.appendChild(star);
        }
      }

      var container = containerA.cloneNode(true);
      return container;
    };

    return getDiv;
  }

	function _getOwnText($obj) {
		return $obj.clone().children().remove().end().text().trim();
	}

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
