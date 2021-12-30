var nowDay = moment()
$('#nowDay').text(nowDay.format('dddd MMM Do, YY'))

var nowTime = moment()
$('#nowTime').text(nowTime.format('h:mm a'))

const store = window.localStorage;

const container = $(".container");
