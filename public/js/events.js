console.log(JSON.parse(eventString));

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

var positions = [
	{lat:40.007992, lng:-105.2674788,name:'duane'},
	{lat:40.0072036, lng:-105.2627826, name:'eccr'},
	{lat:40.0060463, lng:-105.2675692, name:'farrand'},
	{lat:40.0076476,lng:-105.2727598,name:'hellems'},
	{lat:40.0091565, lng:-105.2739175, name:'humanities'},
	{lat:40.0060482, lng:-105.2656576,name:'koelbel'},
	{lat:40.008222, lng:-105.265011,name:'math'},
	{lat:40.008717, lng:-105.270784, name:'norlin'},
	{lat:40.0102234,lng:-105.2693947, name:'rec'},
	{lat:40.0067275,lng:-105.2714839, name:'umc'},
	{lat:40.0043916,lng:-105.2649423,name:'c4c'}
]







var event = JSON.parse(eventString);
var numEvents = event.length;




for (var i = 0; i < numEvents; i++){
	processEventTime(event[i])
	processEventDate(event[i])
	var card = document.createElement("div");
	card.className = "card";
	var img
	var index = -1
	for(var k = 0; k < positions.length; k++)
	{
		if(event[i].lat == positions[k].lat && event[i].lng == positions[k].lng)
			index  = k
	}

	if(index == -1)
		img = 'cu'
	else
		img = positions[index].name


	var text =
					'<img src="' + img +'" alt="Event Image" style="width:100%">' +
					'<div class="container" name="' + i.toString() + '" id="info">' +
					'<h4><b>' + event[i].eventName + '</b></h4>' +
						//'<p>' + event[i].eventDescription + '</p>' +
					'</div>' +
					'<div>' +
					'<button class="btn button5" id="' + i.toString() +  '"onclick="openModal(' +i.toString() +')"> Click for details </button>' +
					'</div>';

	card.innerHTML = text;

	document.getElementById('eventCards').appendChild(card);
	//  console.table(cardArray)

}


function processEventTime(event)
{
    if(event.timeStart[0] == '0') event.timeStart = event.timeStart[1] + ':00 A.M'
    else if(event.timeStart[0] == '1' && event.timeStart[1] == '2') event.timeStart =  '12:00 P.M'
    else if(event.timeStart[0] == '2' && event.timeStart[1] == '4') event.timeStart =  '12:00 A.M'
    else
    {
        var temp = event.timeStart[0] + event.timeStart[1]
        var time = parseInt(temp) - 12
        event.timeStart = time.toString() +':00 P.M' 
    }
    if(event.timeEnd[0] == '0')
    {
        event.timeEnd = event.timeEnd[1] + ':00 A.M'
        return
    }
    else if(event.timeEnd[0] == '1' && event.timeEnd[1] == '2')
    {
        event.timeEnd =  '12:00 P.M'
        return
    }
    else if(event.timeEnd[0] == '2' && event.timeEnd[1] == '4')
    {
        event.timeEnd =  '12:00 A.M'
        return
    }
    else
    {
        var temp = event.timeEnd[0] + event.timeEnd[1]
        var time = parseInt(temp) - 12
        event.timeEnd = time.toString() +':00 P.M'
        return
    }
}

function processEventDate(event)
{
    var month, day
    if(event.dateOfEvent[5] == '0') month =  event.dateOfEvent[6]
    else month = event.dateOfEvent[5]  + event.dateOfEvent[6]
    if(event.dateOfEvent[8] == '0') day = event.dateOfEvent[9]
    else day = event.dateOfEvent[8] +event.dateOfEvent[9] 
    event.dateOfEvent = month + '-' + day + '-2019'
}



function openModal(id) {
	console.table(event[id]);
	
	document.getElementById('eventTitle').innerHTML = event[id].eventName  
	document.getElementById('eventDescription').innerHTML  = event[id].eventDescription
	document.getElementById('date').innerHTML = event[id].dateOfEvent + ' ' + event[id].timeStart + ' - ' + event[id].timeEnd
	document.getElementById('address').innerHTML = event[id].address
	$(document).ready(function()
	{
		$("#eventWindow").modal('show');
	});
}







