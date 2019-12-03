console.log('heyooooo');
var accommodationArray = [
  {
    ref: 'a1',
    name: 'hilton hotel',
    image: 'images/hilton.jpg',
    type: 'hotel',
    description: 'Sleek rooms, gorgeous views, the perfect location - have it all at Hilton Auckland. Our waterfront hotel has sundecks, private balconies and walls of windows for views of the harbour you won\'t find anywhere else. We\'re a quick walk from the central business district and Quay Street restaurants, shops and nightlife. Our 24-hour concierge team is happy to set up sightseeing tours during your stay.',
    location: 'auckland',
    // longAndLat : {lat : ,lng : },
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
    description: '',
    location: '',
    // longAndLat : {lat : ,lng : },
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
    description: '',
    location: '',
    // longAndLat : {lat : ,lng : },
    minPeople: 2,
    maxPeople: 4,
    price: 90,
    minStay: 3,
    maxStay: 10
  },
  {
    ref: 'a4',
    name: 'is a house',
    image: 'images/house.jpg',
    type: 'house',
    description: '',
    location: '',
    // longAndLat : {lat : ,lng : },
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
      + '<div class="col-5 p-0">'
        + '<img id="' + accommodationArray[j].ref + '"class="array-img" src="'
        + accommodationArray[j].image + '"alt="image"/>'
      + '</div>'
      + '<div class="col-7 p-0">'
        + '<div class="card-block pr-0">'
          + '<p class="card-title m-0">' + accommodationArray[j].name + '</p>'
          + '<p class="card-title m-0">$' + accommodationArray[j].price + ' per night</p>'
          + '<a href="#" class="btn btn-sm btn-primary border-0 m-0">Read More</a>'
        + '</div>'
      + '</div>'
    + '</div>'
  + '</div>';
openModal();
}
//----------------------end display array-------------------------//
//----------------------filter tool-------------------------//
document.getElementById('calcDate').addEventListener('click', function(){
  people = document.getElementById('people').value;
  var checkboxArray = document.querySelectorAll('input[type=checkbox]:checked');
  console.log(checkboxArray);
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
//----------------------end filter tool-------------------------//
//----------------------display modal-------------------------//
function openModal(){
  $('.array-img').on('click', function(){
      console.log(this.id);
      document.getElementById('navDetails').innerHTML = ' '
      document.getElementById('bookBtn').addEventListener('click', function(){
        //scroll to confirm section goes here
      });
    for (var i = 0; i < accommodationArray.length; i++) {
      if (this.id === accommodationArray[i].ref) {
        console.log(foodSum);
        console.log(days);
        var totalPrice = (accommodationArray[i].price + foodSum) * days;
        document.getElementById('navDetails').innerHTML =
        '<img id="' + accommodationArray[i].ref + '"class="modal-img" src="'
        + accommodationArray[i].image + '"alt="image"/>'
        document.getElementById('modalDetails').innerHTML =
        '<p class="mb-0" id="modalTitle">' + accommodationArray[i].name + '</p>'
        + '<p class="modal-location-text">' + accommodationArray[i].location + '</p>'
        + '<p>$' + accommodationArray[i].price + ' per night</p>'
        + '<p>' + accommodationArray[i].description + '</p>'
        + '<p>$' + totalPrice + ' total</p>'
      }
    }
    $('.my-modal').show();
    $('#arraySection').hide();
  });
}

$('.closeBar').on('click', function(){
  $('.my-modal').hide();
  $('#arraySection').show();
});
//--------------------end display modal-------------------------//
//--------------------confirm booking-------------------------//
