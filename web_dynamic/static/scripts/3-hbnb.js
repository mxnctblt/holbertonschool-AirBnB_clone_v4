$( document ).ready(() => {
    const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
    $.get(url, function (response) {
	if (response.status === 'OK') {
      	    $('DIV#api_status').addClass('available');
	} else {
      	    $('DIV#api_status').removeClass('available');
    	}
    });
    let x = [];
    let amen = [];
    $("input[type='checkbox']").change(function(){
	if(this.checked){
	    x.push($(this).attr("data-id"));
	    amen.push($(this).attr("data-name"));
	    $(".amenities h4").text(amen);
	}
	else {
	    let index = x.indexOf($(this).attr("data-id"));
	    x.splice(index, 1);
	    amen.splice(index, 1);
	    if (amen.length > 0) {
		$(".amenities h4").text(amen);
	    } else {
		$(".amenities h4").html('&nbsp;');
	    }
	}
    });
    $.ajax({
      url: api + ':5001/api/v1/places_search/',
      type: 'POST',
      data: '{}',
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        $('SECTION.places').append(data.map(place => {
          return `<ARTICLE>
                    <DIV class="title">
                      <H2>${place.name}</H2>
                      <DIV class="price_by_night">
                        ${place.price_by_night}
                      </DIV>
                    </DIV>
                    <DIV class="information">
                      <DIV class="max_guest">
                        <I class="fa fa-users fa-3x" aria-hidden="true"></I>
                        </BR>
                        ${place.max_guest} Guests
                      </DIV>
                      <DIV class="number_rooms">
                        <I class="fa fa-bed fa-3x" aria-hidden="true"></I>
                        </BR>
                        ${place.number_rooms} Bedrooms
                      </DIV>
                      <DIV class="number_bathrooms">
                        <I class="fa fa-bath fa-3x" aria-hidden="true"></I>
                        </BR>
                        ${place.number_bathrooms} Bathrooms
                      </DIV>
                    </DIV>
                    <DIV class="description">
                      ${place.description}
                    </DIV>
                  </ARTICLE>`;
      }));
    }
  });
});
