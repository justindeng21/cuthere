var orgID
var button = document.getElementById("my_submit_button")
var eventName = document.getElementById('eventTitle')
var eventStart = document.getElementById('timeStart')
var eventEnd = document.getElementById('timeEnd')
var date = document.getElementById('date')
var addy = document.getElementById('address_result_id')
var loginInfo = JSON.parse(query)
console.table(loginInfo)

$(window).on('load',function(){
	$('#login').modal('show');
});





$(document).ready(function(){
	$('#password_organizer').keypress(function(e){
		if(e.keyCode==13)
		$('#loginButton').click();
	})
	$('#id_organizer').keypress(function(e){
		if(e.keyCode==13)
		$('#loginButton').click();
	})
	$('#login').modal({
		backdrop: 'static',
		keyboard: false
	})
    $('#eventTitle').change(function(e){
		if(eventName.value != '' && eventStart.value != '' && eventEnd.value != '' && date.value != '' && addy.value != '')
			button.disabled = false
	})
	$('#timeStart').change(function(e){
		if(eventName.value != '' && eventStart.value != '' && eventEnd.value != '' && date.value != '' && addy.value != '')
			button.disabled = false
	})
	$('#timeEnd').change(function(e){
		if(eventName.value != '' && eventStart.value != '' && eventEnd.value != '' && date.value != '' && addy.value != '')
			button.disabled = false
	})
	$('#date').change(function(e){
		if(eventName.value != '' && eventStart.value != '' && eventEnd.value != '' && date.value != '' && addy.value != '')
			button.disabled = false
	})
	$('#des').change(function(e){
		if(eventName.value != '' && eventStart.value != '' && eventEnd.value != '' && date.value != '' && addy.value != '')
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
			return
		}
	}
	alert('Login Information is incorrect')
	return
}


var map; //will be used foor map object
var map_marker=[]; //will be used to mark points on map for that search result
var geocodejs; //will be used to have human readable location results


var CU_Boulder_Bounds = { //bounds of cu boulder
north: 40.020,
south: 39.999,
west: -105.320,
east:  -105.210,
};

var boulder = {lat:40.015,lng:-105.270};//will be used for starting refrance location


function initmap(){
  var options={
  zoom:13,
  center:boulder,
  
  styles: [{"featureType":"all","elementType":"geometry","stylers":[{"color":"#202c3e"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"gamma":0.01},{"lightness":20},{"weight":"1.39"},{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"weight":"0.96"},{"saturation":"9"},{"visibility":"on"},{"color":"#000000"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":30},{"saturation":"9"},{"color":"#29446b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"saturation":20}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":20},{"saturation":-20}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":10},{"saturation":-30}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#193a55"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"saturation":25},{"lightness":25},{"weight":"0.01"}]},{"featureType":"water","elementType":"all","stylers":[{"lightness":-20}]}]
 }
 var bounds_auto=new 
 google.maps.LatLngBounds(new google.maps.LatLng(40.020,-105.320),
 new google.maps.LatLng(39.999,-105.210));
 var optinoauto={
  componentRestrictions: {country: "us"},
   //bounds: bounds_auto,
   //strictBounds: true
}
	//var init_lat=$(.'longitude_result').val() //get the lat result and set to our initia
	//var 
	map = new google.maps.Map(document.getElementById('map'),options); //set the map
	geocodejs=new google.maps.Geocoder();
	var input=document.getElementById('search_location'); //auto complete
	var autocomplete=new google.maps.places.Autocomplete(input,optinoauto);
	//document.getElementById('search_button').addEventListener("click",findlat_alt());

}
var address
var lat
var lng
//document.getElementById('search_button').second.addEventListener("click",findlat_alt());
function findlat_alt(){
	console.log('hello')
	address=""
	lat=""
	alt=""
	const button_search=document.getElementById('search_button');
	
		button_search.addEventListener('click',delete_marker());
	
	
	//var location='777 broadway'
	//console.log(location)
   var location = document.getElementById('search_location').value;
   console.log(location);
   var params ={
      address:location,
      key:'AIzaSyCLX8GxL_S3NmXNLcQdXtcvTkhjmeBhivk'
    }
    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{params})
    .then(function(response){
    	console.log(response);
    	address=response.data.results[0].formatted_address;
    	lat=response.data.results[0].geometry.location.lat;
    	lng=response.data.results[0].geometry.location.lng;
    	make_marker(lat,lng);
    	document.getElementById('address_result_id').value=address;
    	document.getElementById("latitude_result_id").value=lat;
		document.getElementById('longitude_result_id').value=lng;
		document.getElementById('org_id').value=orgID
if(eventName.value != '' && eventStart != '' && eventEnd != '' && date != '' && addy != '')
{
	button.disabled = false
}

    })
    .catch(function(error){
    	console.log(error);
    });
}

function make_marker(lat1,lng1){
	
	var temp_location_loc={lat:lat1,lng:lng1}

	var zoom = map.getZoom()

	if(zoom == 16)
	{
		
	}

    markerWidth = (zoom/8)*20
    markerHeight = (zoom/8)*20

	var temp_location = new google.maps.Marker({
		position: temp_location_loc,
		map: map,
		icon: '/ticket',
		animation: google.maps.Animation.DROP
	}); 
	map.setCenter(new google.maps.LatLng(lat1,lng1))
	map_marker.push(temp_location)
	smoothZoom(map,16,zoom)

	temp_location.setIcon({
		url:temp_location.icon,
		scaledSize: new google.maps.Size(markerWidth, markerHeight)
	})
	
}
function delete_marker(lat2,lng2){
	var i;
	for(i=0; i<map_marker.length; i++){
		map_marker[i].setMap(null);
	}
}

$(document).ready(function(){
    $('#search_location').keypress(function(e){
      if(e.keyCode==13)
      $('#search_button').click();
    });
});
	

function smoothZoom (map, max, cnt) {
    if (cnt >= max) {
        return;
    }
    else {
        z = google.maps.event.addListener(map, 'zoom_changed', function(event){
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt + 1);
        });
        setTimeout(function(){map.setZoom(cnt)}, 100); // 80ms is what I found to work well on my system -- it might not work well on all systems
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
