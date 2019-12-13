var map //the map
var events = JSON.parse(eventString)// use to access events
console.table(events)
var eventMarkers = [] //event markers array



var buildingMarkers = [] //building markers array

var state = 'events'
var initialization = true
var CU_Boulder_Bounds = {
north: 40.020,
south: 39.999,
west: -105.320,
east:  -105.210,
}

//constructor for lat_lng object
function lat_lng(lat,lng)
{
    this.lat = lat
    this.lng = lng
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
] //postions for building

var university = {lat:40.007581,lng:-105.2659417}


var logo = {lat:40.009581,lng:-105.2659417}



function initMap(){

    map = new google.maps.Map(document.getElementById('map'),{
        zoom:10,
        center: university,
        disableDefaultUI:true,
        restriction:{
            latLngBounds: CU_Boulder_Bounds,
            strictBounds: false,
            },
            styles: [{"featureType":"all","elementType":"geometry","stylers":[{"color":"#202c3e"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"gamma":0.01},{"lightness":20},{"weight":"1.39"},{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"weight":"0.96"},{"saturation":"9"},{"visibility":"on"},{"color":"#000000"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":30},{"saturation":"9"},{"color":"#29446b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"saturation":20}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":20},{"saturation":-20}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":10},{"saturation":-30}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#193a55"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"saturation":25},{"lightness":25},{"weight":"0.01"}]},{"featureType":"water","elementType":"all","stylers":[{"lightness":-20}]}]
            //styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"landscape","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.terrain","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"labels.text.stroke","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.school","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#230d00"},{"lightness":17},{"visibility":"off"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"off"}]}]
    })

    createEventMarkers()


    var LOGO = new google.maps.Marker({
        position: logo,
        map: map,
        title: 'uni_logo',
        icon: '/university_logo',
    });
    
    google.maps.event.addListener(map, 'zoom_changed', function() {
        var zoom = map.getZoom();
        MarkersZoomFunction(zoom)
    });

    var zoom = map.getZoom()
    MarkersZoomFunction(zoom)
    map.setZoom(16)
    initialization = false


}



function createEventMarkers()
{
    var location
    for(i = 0; i < events.length; i++)
    {
        
        var coordinates = new lat_lng(events[i].lat, events[i].lng)
        var marker = new google.maps.Marker({
            map: map,
            position: coordinates,
            icon: '/ticket',
            animation: google.maps.Animation.DROP,
        });
        processEventTime(events[i])
        processEventDate(events[i])
        createEventInfoWindow(marker,events[i])
        eventMarkers.push(marker)
    }
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
    var month, day, year
    year = event.dateOfEvent[2]+event.dateOfEvent[3]
    if(event.dateOfEvent[5] == '0') month =  event.dateOfEvent[6]
    else month = event.dateOfEvent[5]  + event.dateOfEvent[6]
    if(event.dateOfEvent[8] == '0') day = event.dateOfEvent[9]
    else day = event.dateOfEvent[8] +event.dateOfEvent[9] 
    event.dateOfEvent = month + '/' + day + '/' + year
}



function MarkersZoomFunction(zoom)
{
    markerWidth = (zoom/7)*20
    markerHeight = (zoom/7)*20

    if(state == 'events')
    for(i = 0; i < eventMarkers.length; i++)
    {
        if(zoom < 15 && eventMarkers[i].getVisible() == true)
        {
            eventMarkers[i].setVisible(false)
        }
        if(zoom >= 15 && eventMarkers[i].getVisible() == false)
        {
            eventMarkers[i].setVisible(true)
        }
        eventMarkers[i].setIcon({
            url: '/ticket',
            scaledSize: new google.maps.Size(markerWidth, markerHeight)
        });
    }
}



function toggleVisibility()
{
    var zoom = map.getZoom()
    markerWidth = (zoom/7)*20
    markerHeight = (zoom/7)*20
    if(eventMarkers[0].getVisible() == true && zoom > 14)
    {
        for(i = 0; i < eventMarkers.length; i++)
        {
            eventMarkers[i].setVisible(false);
        }

        state = 'buildings'
        
    }
    else if(zoom > 14)
    {
        for(i = 0; i < eventMarkers.length; i++)
        {
            eventMarkers[i].setVisible(true);
            eventMarkers[i].setAnimation(google.maps.Animation.DROP)
        }
        state = 'events'
    }
    return
}

function createEventInfoWindow(marker,event)
{
    marker.addListener('click', function()
    {
        document.getElementById('eventTitle').innerHTML = event.eventName  
        document.getElementById('eventDescription').innerHTML  = event.eventDescription
        document.getElementById('date').innerHTML = event.dateOfEvent + ', ' + event.timeStart + ' - ' + event.timeEnd
        document.getElementById('address').innerHTML = event.address



        $(document).ready(function()
        {
            $("#eventWindow").modal('show');
        });
    });
}





//////////////////////////////////// Nav Bar
function openNav() 
{
    document.getElementById("mySidenav").style.width = "250px"
}

function closeNav()
{
    document.getElementById("mySidenav").style.width = "0px"
}

