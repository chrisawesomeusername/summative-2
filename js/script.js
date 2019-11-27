console.log('heyooooo');
var accommodationArray = [
  {
    ref: 101,
    name: '',
    image: 'images/hilton.jpg',
    type: 'hotel',
    minPeople: 1,
    maxPeople: 2,
    price: 157,
    minStay: 1,
    maxStay: 5,
  },
  {
    ref: 102,
    type: 'hostel',
    minPeople: 1,
    maxPeople: 1,
    price: 30,
    minStay: 1,
    maxStay: 10
  },
  {
    ref: 103,
    type: 'motel',
    minPeople: 2,
    maxPeople: 4,
    price: 90,
    minStay: 3,
    maxStay: 10
  },
  {
    ref: 104,
    type: 'house',
    minPeople: 1,
    maxPeople: 4,
    price: 240,
    minStay: 2,
    maxStay: 15
  },
]


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
  var days   = (end - start)/1000/60/60/24;
  //amount of days selected
  console.log(days);
  return days;
}
// $('#calcDate').click(function(){
//   dateDiff();
// });
//----------------------end date picker-----------------------//
//----------------------display array-------------------------//
function myArray(){
  document.getElementById('arraySection').innerHTML = '';
  for (var i = 0; i < accommodationArray.length; i++) {
    console.log(accommodationArray.length);
    if (parseInt(people) >= accommodationArray[i].maxPeople) {

    }
    displayArray(i);
  }

};
myArray();

function displayArray(j){
  document.getElementById('arraySection').innerHTML
  += '<div class="card p-2 mb-2">'
    + '<div class="row">'
      + '<div class="col-5 p-0">'
        + '<img class="rounded arrayImg" src="' + accommodationArray[j].image + '"alt="image"/>'
      + '</div>'
      + '<div class="col-7 p-0">'
        + '<div class="card-block px-3">'
          + '<p class="card-title">' + accommodationArray[j].ref + '</p>'
          + '<p class="card-title">$' + accommodationArray[j].price + ' per night</p>'
          + '<p class="card-text">test</p>'
          + '<a href="#" class="btn btn-sm btn-primary border-0">Read More</a>'
          + '</div>'
        + '</div>'
      + '</div>'
    + '</div>'

};

document.getElementById('calcDate').addEventListener('click',function(){
  var people = document.getElementById('people').value;
  var days = dateDiff();
  console.log(people);
  console.log(days);
  document.getElementById('arraySection').innerHTML = '';
  for (var i = 0; i < accommodationArray.length; i++) {
    console.log(accommodationArray.length);
    if ((parseInt(people) >= accommodationArray[i].minPeople)
    && (parseInt(people) <= accommodationArray[i].maxPeople)
    && (days >= accommodationArray[i].minStay)
    && (days <= accommodationArray[i].maxStay)){
      displayArray(i);
    }
  }
});
