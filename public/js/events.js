console.log(JSON.parse(eventString));

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }




//document.getElementById('')


// Script for event cards

  var event = JSON.parse(eventString);
  var numEvents = event.length;




for (var i = 0; i < numEvents; i++){
  processEventTime(event[i])
  processEventDate(event[i])
  var card = document.createElement("div");
  card.className = "card";

  var text =
                '<img src="../images/cu.png" alt="Event Image" style="width:100%">' +
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
  
  document.getElementById('start').innerHTML = event[id].timeStart
  document.getElementById('stop').innerHTML = event[id].timeEnd
  document.getElementById('date').innerHTML = event[id].dateOfEvent
  document.getElementById('eventDescription').innerHTML = event[id].eventDescription
  document.getElementById('address').innerHTML = event[id].address
  document.getElementById('eventTitle').innerHTML = event[id].eventName
    $(document).ready(function()
    {
        $("#eventWindow").modal('show');
    });
}











// '<div class="modal fade" id="eventWindow" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">' +
//     '<div class="modal-dialog" role="document">' +
//       '<div class="modal-content">' +
//         '<div class="modal-header">' +
//           '<h5 class="modal-title" id="eventTitle"></h5>' +
//           '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
//             '<span aria-hidden="true">&times;</span>' +
//           '</button>' +
//         '</div>' +
//         '<div class="modal-body">' +
//           '<p id='eventDescription'></p>' +
//           '<p id='date'></p>' +
//           '<p id='start'></p>' +
//           '<p id='stop'></p>' +
//         '</div>' +
//         '<div class="modal-footer">' +
//           '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
//         '</div>' +
//       '</div>' +
//     '</div>' +
//   '</div>';


// // Trigger/Open The Modal
// '<button id="myBtn">Open Modal</button>' +
//
// // The Modal
// '<div id="myModal" class="modal">' +
//
// // Modal content
// '<div class="modal-content">' +
// '<span class="close">&times;</span>' +
// '<p>Some text in the Modal..</p>' +
// '</div>' +
//
// '</div>';