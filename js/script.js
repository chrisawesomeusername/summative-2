console.log('heyooooo');

var myKey = JSON.parse(apiKey);//convert json data into js object
var map;//declaring map variable at the start of js to show it is a global variable

//creating a script element dynamically to use the API key securely from the seperate JSON file
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=' + myKey[0].key + '&callback=initMap';
document.getElementsByTagName('body')[0].appendChild(script);

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

var accommodationArray = [
  {
    ref: 'a1',
    name: 'hilton hotel',
    image: 'images/hilton.jpg',
    type: 'hotel',
    description: 'Sleek rooms, gorgeous views, the perfect location - have it all at Hilton Auckland. Our waterfront hotel has sundecks, private balconies and walls of windows for views of the harbour you won\'t find anywhere else. We\'re a quick walk from the central business district and Quay Street restaurants, shops and nightlife. Our 24-hour concierge team is happy to set up sightseeing tours during your stay.',
    location: 'auckland',
    longAndLat : {lat : -36.8395244 ,lng : 174.7636173 },
    minPeople: 1,
    maxPeople: 2,
    price: 157,
    minStay: 1,
    maxStay: 5,
  },
  {
    ref: 'a2',
    name: 'nomads hostel',
    image: 'images/nomads.jpg',
    type: 'hostel',
    description: 'Our Auckland Backpackers is within a 10-minute walk from Spark Arena, The Sky Tower and Viaduct Harbour. Britomart Train Station is an easy 5-minute walk from the hostel and Queen Street is just around the corner.This beautiful historic hostel in Auckland is jam-packed with all the latest mod cons a backpacker needs in a hostel and more. Facilities at Nomads Auckland include 24 hour reception, free tea and coffee, free wifi*, free luggage storage*, a sauna, a travel desk, lockers in all rooms, and a rooftop kitchen with panoramic views of the city and harbor. There’s a large communal lounge with a TV (DVD’s are available from reception), plenty of bean bags to chill out in, board games, a book exchange and vending machines for drinks and snacks!',
    location: 'auckland',
    longAndLat : {lat : -36.845971 ,lng : 174.7651853},
    minPeople: 1,
    maxPeople: 1,
    price: 30,
    minStay: 1,
    maxStay: 10
  },
  {
    ref: 'a3',
    name: 'waikanae beach motel',
    image: 'images/waikanae-beach.jpg',
    type: 'motel',
    description: 'Terry and Marg Candy, your friendly owner/operators, have lived in Gisborne for many years and have an extensive local knowledge at your service.Our motel is located across the road from beautiful Waikanae Beach and is walking distance to Gisborne City. Close to restaurants, clubs/cafés, i-SITE and a golf course.We have 15 units of various sizes to suit everyone\'s needs. All units are serviced daily, fully self-contained and are completely smokefree (covered smoking areas available).',
    location: 'waikanae',
    longAndLat : {lat : -40.866245 ,lng : 175.0308821 },
    minPeople: 2,
    maxPeople: 4,
    price: 90,
    minStay: 3,
    maxStay: 10
  },
  {
    ref: 'a4',
    name: 'otaki house',
    image: 'images/otaki-house.jpg',
    type: 'house',
    description: 'A new modern bach in the perfect location, the gateway to the Tararua Forest Park for tramping and day walks. A peaceful, sunny and extremely comfortable fully furnished place to relax in. Come and enjoy a spa under the stars, or read a book in the sun. Cold bubbles on arrival and breakfast provided. A perfect getaway for two, with only the river and native birds to be heard',
    location: 'otaki',
    longAndLat : {lat : -40.7592769,lng : 175.1372467},
    minPeople: 1,
    maxPeople: 4,
    price: 240,
    minStay: 2,
    maxStay: 15
  },
];


var people;
var days;
var foodSum = 0;
//----------------------date picker-----------------------//
$("#startDate").datepicker({
  dateFormat: 'yy-mm-dd',
  changeMonth: true,
  minDate: new Date(),
  maxDate: '+1y',
  onSelect: function(date){
    var selectedDate = new Date(date);
    var msecsInADay = 86400000;
    var stDate = new Date(selectedDate.getTime() + msecsInADay);
//Set Minimum Date of EndDatePicker After Selected Date of StartDatePicker
    $("#endDate").datepicker( "option", "minDate", stDate );
    var enDate = new Date(selectedDate.getTime() + 15 * msecsInADay);
    $("#endDate").datepicker( "option", "maxDate", enDate );
  }
});
$("#endDate").datepicker({
  dateFormat: 'yy-mm-dd',
  changeMonth: true
});
//Find the number of days between dates
function dateDiff() {
  var start = $('#startDate').datepicker('getDate');
  var end = $('#endDate').datepicker('getDate');
  days   = (end - start)/1000/60/60/24;
//amount of days selected
  console.log(days);
  return days;
}
 //----------------------end date picker-----------------------//
//----------------------display array-------------------------//
function myArray(){
  document.getElementById('arraySection').innerHTML = '';
  for (var i = 0; i < accommodationArray.length; i++) {
    console.log(accommodationArray.length);
    console.log(accommodationArray[i].ref);
    if (parseInt(people) >= accommodationArray[i].maxPeople) {
    }
    displayArray(i);
  }
}
myArray();
function displayArray(j){
  document.getElementById('arraySection').innerHTML
  += '<div class="card rounded-0 p-2 mb-2">'
    + '<div class="row m-0">'
      + '<div class="col-5 p-0" id="cardClick">'
        + '<img id="' + accommodationArray[j].ref + '"class="array-img" src="'
        + accommodationArray[j].image + '"alt="image"/>'
      + '</div>'
      + '<div class="col-7 p-0">'
        + '<div class="card-block pr-0">'
          + '<p class="card-title m-0">' + accommodationArray[j].name + '</p>'
          + '<p class="card-title m-0">' + accommodationArray[j].location + '</p>'
          + '<p class="card-title m-0">$' + accommodationArray[j].price + ' per night</p>'
        + '</div>'
      + '</div>'
    + '</div>'
  + '</div>';
openModal();
}
 //----------------------end display array-------------------//
//----------------------filter tool-------------------------//
document.getElementById('calcDate').addEventListener('click', function(){
  people = document.getElementById('people').value;
  var checkboxArray = document.querySelectorAll('input[type=checkbox]:checked');
  console.log(checkboxArray);
  foodSum = 0;
  var foodValue = 0;
  for (var i = 0; i < checkboxArray.length; i++) {
    foodValue = parseInt(checkboxArray[i].value)
    console.log(foodValue);
    foodSum = foodSum + foodValue;
    console.log(foodSum);
  }
  days = dateDiff();
  console.log(people);
  console.log(days);
  if (people === null || days === 0) {
    $('#resultsSummary').show()
    document.getElementById('resultsSummary').innerHTML = 'Please enter details'
    displayArray(i)
  } else {
    $('#resultsSummary').show()
    document.getElementById('resultsSummary').innerHTML = 'Here are your options for ' + people + ' people and ' + days + ' days.'
  }
  document.getElementById('arraySection').innerHTML = '';
  for (var i = 0; i < accommodationArray.length; i++) {
    // console.log(accommodationArray.length);
    if ((parseInt(people) >= accommodationArray[i].minPeople)
    && (parseInt(people) <= accommodationArray[i].maxPeople)
    && (days >= accommodationArray[i].minStay)
    && (days <= accommodationArray[i].maxStay)){
      displayArray(i);
    }
  }
});
 //----------------------end filter tool-----------------------//
//----------------------display modal-------------------------//
var totalPrice = 0;
var checkboxArray = [];
function openModal(){
  $('.array-img').on('click', function(){
    console.log(this.id);
    $('.my-modal').show();
    $('#arraySection').hide();

    document.getElementById('navDetails').innerHTML = ' '

    for (var i = 0; i < accommodationArray.length; i++) {
      if (this.id === accommodationArray[i].ref) {
        var marker = new google.maps.Marker({
          position: accommodationArray[i].longAndLat,
          map: map,
        });
          map.setZoom(14)
          map.panTo(accommodationArray[i].longAndLat);
        console.log(foodSum);
        console.log(days);


        totalPrice = (accommodationArray[i].price + foodSum) * days;

        document.getElementById('navDetails').innerHTML =
        '<img id="' + accommodationArray[i].ref + '"class="modal-img" src="' + accommodationArray[i].image + '"alt="image"/>'
        document.getElementById('modalDetails').innerHTML =
        '<p class="mb-0" id="modalTitle">' + accommodationArray[i].name + '</p>'
        + '<p class="modal-location-text">' + accommodationArray[i].location + '</p>'
        + '<p>$' + accommodationArray[i].price + ' per night</p>'
        + '<p>' + accommodationArray[i].description + '</p>';
        if (totalPrice > 0 ) {
          document.getElementById('modalDetails').innerHTML +=
          '<p>$' + totalPrice + ' total</p>'
          confirmBooking();
        }
        //---------------------confirm booking--------------------------//
        function confirmBooking(){
          document.getElementById('bookBtn').addEventListener('click', function(){
            var checkboxArray = document.querySelectorAll('input[type=checkbox]:checked');


            for (var i = 0; i < checkboxArray.length; i++) {
              console.log(checkboxArray[i].id);
            }
           console.log(checkboxArray);
            $('.confirm-section').show();
            $('html,body').animate({
              scrollTop: $(".confirm-section").offset().top}, 'fast');

              console.log(days);
              console.log(people);
              console.log(foodSum);
              console.log(totalPrice);


              document.getElementById('confirmResults').innerHTML +=
              '<p class="title-text">' + days + ' days </p>'
              + '<p class="title-text">' + people + ' people</p>'
              for (var i = 0; i < checkboxArray.length; i++) {
                if (foodSum.value < 0) {
                  document.getElementById('confirmResults').innerHTML +=
                  '<p class="title-text">No food selected</p>'
                } else {
                  document.getElementById('confirmResults').innerHTML +=
                  '<p class="title-text">' + checkboxArray[i].id + '</p>'
                  }
                }

              document.getElementById('totalPriceFinal').innerHTML +=
              '<p class="title-text">$' + totalPrice + ' total</p>';
          });
        }
        //--------------------end confirm booking-----------------------//
      }
    }
  });
}
$('.closeBar, #modalLogo').on('click', function(){
  $('.my-modal').hide();
  $('#arraySection').show();
});
$('#finalConfirm').on('click',function(){
  Swal.fire({
    title: 'Booking confirmed!',
    text: 'Your booking number is 4577GHT',
    icon: 'success',
    confirmButtonText: 'Cool'
  })
});

 //--------------------end display modal-------------------------//
//---------------------maps-------------------------------------//
function initMap() {
  map = new google.maps.Map(document.getElementById('navMap'), {
    center: {lat: -41.3052685, lng: 175.7267386},
    zoom: 5
  });
};
//---------------------end maps-------------------------------------//
