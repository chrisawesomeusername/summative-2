console.log('heyooooo');
var accomodationArray = [
  {
    ref: 101,
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


  document.getElementById("dateResult").value = days ;
  return;
}


$('#calcDate').click(function(){
  dateDiff();
});
