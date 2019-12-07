//server stuff
const express = require('express');
const bodyParser = require('body-parser');
let app = express();
var port = process.env.PORT || 3000
app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
//






////////////////////////////////////////////////
/*
	Database connection to a mySQL database
*/

const mysql = require('mysql');  //mysql node driver

if(process.env.JAWSDB_URL)
{
	var connection = mysql.createConnection(process.env.JAWSDB_URL)
}

else
{
	var connection /*This variable will be used in every query*/ = mysql.createConnection({	
		host: 'localhost',
		user: 'root',
		password: 'password',
		database: 'CUThere',
	})
}

connection.connect() 

////////////////////////////////////////////////



function clear(string)
{
    for(i = 0; i < string.length; i++)
    {
        if(string.charAt(i) == "'")
        {
			string = string.substr(0,i) + '`' + string.substr(i+1)
        }
    }
    return string
}





app.use(express.static('public')) // forces external files to be inside /public


////////////////////////////////////////////////
/*
	request to home page
*/
app.get('/',function(req,res)
{
	connection.query('select * from eventDetails', function(err,rows)
	{
			if(err)
				throw err
			else
			res.render('home', { stringifedObject : JSON.stringify(rows)})
				//console.log(rows[0])
	})
})

app.get('/home',function(req,res)
{
	connection.query('select * from eventDetails', function(err,rows)
	{
			if(err)
				throw err
			else
			res.render('home', { stringifedObject : JSON.stringify(rows)})
				
	})
})
////////////////////////////////////////////////


////////////////////////////////////////////////

app.get('/events',function(req,res)
{
	connection.query('select * from eventDetails', function(err,rows)
	{
			if(err) throw err
			else res.render('events', { stringifedObject : JSON.stringify(rows)})
				
	})
})

////////////////////////////////////////////////


////////////////////////////////////////////////
/*
	request to application html
*/
app.get('/application',function(req,res)
{
	connection.query('select organizerId, organizerPassword from organizers',function(err,rows){
		if(err)throw err
		else res.render('application', { stringifedObject : JSON.stringify(rows)})
	})
})

app.get('/submitted',function(req,res)
{
	res.render('submitted')
})


app.post('/application/done',function(req, res){

	var address = req.body.Address
	const lng = req.body.lng
	const lat = req.body.lat
	var eventName = req.body.eventName
	const timeStart = req.body.timeStart + ':00'
	const timeEnd = req.body.timeEnd + ':00'
	const date = req.body.Date
	const description = req.body.description
	var eventID_ = Math.floor(Math.random()*100000+1)
	var eventID = eventID_.toString()
	var randomIndex = Math.floor(Math.random() * 6)
	var OrganizerID = req.body.orgID

	//console.log(randomIndex)

	var dbQuery = "INSERT INTO eventDetails (eventID, organizerID, eventName, dateOfEvent, timeStart, timeEnd, eventDescription, address, lat, lng)" +
	' VALUES (' +eventID+","+ OrganizerID +",'"+ clear(eventName) + "','" + date + "','" + timeStart+ "','" + timeEnd +"','" + clear(description) + "','" + clear(address) + "'," + lat + "," + lng +");"

	connection.query(dbQuery, function(err,rows)
	{
		if(err)
			throw(err)
	
	})
	res.render('submitted')
	res.end() 
})
////////////////////////////////////////////////





////////////////////////////////////////////////
/*
	request to images
*/
app.get('/cutherelogo',function(req,res)
{
	res.sendFile(__dirname + '/public/images/cutherelogo.png')
})

app.get('/koelbel',function(req,res)
{
	res.sendFile(__dirname + '/public/images/koelbel.png')
})

app.get('/ticket',function(req,res)
{
	res.sendFile(__dirname + '/public/images/ticket.png')
})

app.get('/umc',function(req,res)
{
	res.sendFile(__dirname + '/public/images/umc.png')
})

app.get('/eccr',function(req,res)
{
	res.sendFile(__dirname + '/public/images/eccr.png')
})

app.get('/university_logo',function(req,res)
{
	res.sendFile(__dirname + '/public/images/university_logo.png')
})

app.get('/duane',function(req,res)
{
	res.sendFile(__dirname + '/public/images/duane.png')
})

app.get('/farrand',function(req,res)
{
	res.sendFile(__dirname + '/public/images/farrand.png')
})

app.get('/hellems',function(req,res)
{
	res.sendFile(__dirname + '/public/images/hellems.png')
})

app.get('/humanities',function(req,res)
{
	res.sendFile(__dirname + '/public/images/humanities.png')
})

app.get('/math',function(req,res)
{
	res.sendFile(__dirname + '/public/images/math.png')
})

app.get('/norlin',function(req,res)
{
	res.sendFile(__dirname + '/public/images/norlin.png')
})

app.get('/rec',function(req,res)
{
	res.sendFile(__dirname + '/public/images/rec.png')
})
////////////////////////////////////////////////'
app.listen(port)
console.log('Server is being hosted on port 3000')