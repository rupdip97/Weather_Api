require('dotenv').config()
const path =require('path')

const express = require("express");
const app = express();
const ejs = require("ejs")

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));

app.set('view engine', 'ejs')

app.use('/',express.static('public'));
//app.use('/', express.static(path.join(__dirname, 'public')));
const https = require("https");


app.get("/",function(req,res){
    res.render('home')
});

app.get('/contact', function(req,res){
    res.render('contact')
});

app.get('/about', function(req,res){
    res.render('about')
});

app.post("/",function(postreq,postres){
    console.log(postreq.body)
    var cityName = postreq.body.City;
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + process.env.API_KEY;

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
 //         postres.write("<h1>"+weatherData.name+" has "+weatherData.weather[0].description+" weather with temperature of "+weatherData.main.temp+" degree celcius</h1>");
            var aboutWeather = weatherData.name+" has "+weatherData.weather[0].description+" weather with temperature of "+weatherData.main.temp+" degree celcius";
            var imageLink = "https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            var date1 = new Date(weatherData.sys.sunrise * 1000)
            var date2 = new Date(weatherData.sys.sunset * 1000)

            var sunriseTime = date1.toLocaleTimeString()
            var sunsetTime = date2.toLocaleTimeString()
            var description = weatherData.weather[0].description;
            var temp = weatherData.main.temp
            var maxTemp = weatherData.main.temp_max
            var minTemp = weatherData.main.temp_min
            var feelLike = weatherData.main.feels_like
            var city = weatherData.name
            var humidity = weatherData.main.humidity
            var windspeeed =  weatherData.wind.speed
            var country = weatherData.sys.country

 //         postres.write("<img src=" + imageLink+">");
 //         postres.send();

            postres.render('results', {
                weatherImage: imageLink,
                cityName: city,
                desc: description,
                sunrise: sunriseTime,
                sunset: sunsetTime,
                temperature: temp,
                maxtemperature: maxTemp,
                minTemperature: minTemp,
                realFeel: feelLike,
                humidity: humidity,
                wind: windspeeed,
                countryCode: country
            })
        });
    });

});







app.listen(process.env.PORT || 3000,function(req,res){
    console.log("Server is up");
});