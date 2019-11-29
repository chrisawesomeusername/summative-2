console.log('heyooooo');
var accommodationArray = [
  {
    ref: 'a1',
    name: 'hilton hotel',
    image: 'images/hilton.jpg',
    type: 'hotel',
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
    minPeople: 1,
    maxPeople: 4,
    price: 240,
    minStay: 2,
    maxStay: 15
  },
];


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
    console.log(accommodationArray[i].ref);
    if (parseInt(people) >= accommodationArray[i].maxPeople) {
    }
    displayArray(i);
  }
}
myArray();


function displayArray(j){
  // var id = 1;
  document.getElementById('arraySection').innerHTML
  += '<div class="card rounded-0 p-2 mb-2">'
    + '<div class="row m-0">'
      + '<div class="col-5 p-0">'
        + '<img id="' + accommodationArray[j].ref + '"class="array-img" src="' + accommodationArray[j].image + '"alt="image"/>'
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
  // id++
  // console.log(id);
  openModal();

}
//----------------------end display array-------------------------//
//----------------------filter tool-------------------------//
document.getElementById('calcDate').addEventListener('click',function(){
  var people = document.getElementById('people').value;
  var days = dateDiff();
  console.log(people);
  console.log(days);
  if (people === null || days === 0) {
    alert ('please enter details')
  } else {
    alert('you have chosen ' + people + ' people ' + 'and ' + days + ' days')
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
// document.getElementById('calcDate').addEventListener('click',function(){
//   for (var i = 0; i < accommodationArray.length; i++) {
//     if (people === undefined && days === undefined){
//     }
//   }
  // console.log('help');
  // alert('enter details');
// });
//----------------------end filter tool-------------------------//
//----------------------display modal-------------------------//
function openModal(){
  $('.array-img').on('click', function(){
      console.log(this.id);
      document.getElementById('navDetails').innerHTML = ' '
    for (var i = 0; i < accommodationArray.length; i++) {
      if (this.id === accommodationArray[i].ref) {
        document.getElementById('navDetails').innerHTML =
        '<img id="' + accommodationArray[i].ref + '"class="modal-img" src="' + accommodationArray[i].image + '"alt="image"/>'
        document.getElementById('modalContentBottom').innerHTML =
        '<p>' + accommodationArray[i].price + '</p>'
      }
    }
      $('.my-modal').show();
  });
}
$('.closeBar').on('click', function(){
  $('.my-modal').hide();
});
//--------------------end display modal-------------------------//
