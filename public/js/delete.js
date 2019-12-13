

var orgID

var res = query.split('/****/')
var loginInfo = JSON.parse(res[0])
var events = JSON.parse(res[1])

console.table(loginInfo)
console.table(events)

$(window).on('load',function(){
	$('#login').modal('show');
});

$('#login').modal({
    backdrop: 'static',
    keyboard: false
})

var button = document.getElementById("my_submit_button")
var eventID;

$(document).ready(function(){
	$('#password_organizer').keypress(function(e){
		if(e.keyCode==13)
		$('#loginButton').click();
	})
	$('#id_organizer').keypress(function(e){
		if(e.keyCode==13)
		$('#loginButton').click();
    })
    $('#eventID').change(function(){
        eventID = parseInt(document.getElementById('eventID').value)
        for(i = 0; i < events.length; i++)
            if(eventID == events[i].eventID)
                button.disabled = false
	})

})



function verify()
{
	var id_input = document.getElementById('id_organizer').value
	var pass_input = document.getElementById('password_organizer').value
	console.log(id_input,pass_input)
	for(i = 0; i < loginInfo.length; i++)
	{
		if(loginInfo[i].organizerId == id_input && loginInfo[i].organizerPassword == pass_input)
		{
			$('#login').modal('toggle')
            orgID = loginInfo[i].organizerId
            createEventDivs(orgID)
			return
		}
	}
	alert('Login Information is incorrect')
	return
}

function createEventDivs(organizerId)
{
    for(i = 0; i < events.length; i++)
    {
        if(organizerId == events[i].organizerID)
        {
            var card = document.createElement("tr")
            var text = '<td>' + events[i].eventName + '</td>' + '<td>' + events[i].eventID + '</td>' +'<td>' + events[i].address + '</td>'
            card.innerHTML = text
            document.getElementById('events').appendChild(card);
        }
    }
}





function openNav() 
{
    document.getElementById("mySidenav").style.width = "250px"
}

function closeNav()
{
    document.getElementById("mySidenav").style.width = "0px"
}
