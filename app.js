const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){

res.sendFile(__dirname+ "/index.html");

});

app.post("/", function(req, res){

//res.body.cityName
  //console.log(req.body.cityName);

  // CANNOT HAVE res.send MORE THAN ONCE
  // We can use Multiple res.write
  const query = req.body.cityName;
  const apiKey = "b6cb3321f17fefe65c707cb195f253ee";
  const unit = "metric";
  // url is coming from postman app url
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query +"&appid="+apiKey+"&units="+ unit;

  // https with a callback method
  https.get(url, function(response){
    console.log(response);

    response.on("data", function(data){
    console.log(data);
      // Changing data to a string
    const weatherData = JSON.parse(data);
    //console.log(weatherData);
    //
    // const object = {
    //   name: "Andy",
    //   favouriteFood: "bread"
    // }
    // console.log(object);
    // get the temperature
    const temp  = weatherData.main.temp;
    const weatherDescription  = weatherData.weather[0].description;
     console.log(temp);
     console.log(weatherDescription);

     const icon = weatherData.weather[0].icon;
     //console.log(icon);
     const imageUrl = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
     res.write("<p>The current weather description "+ weatherDescription+ "</p>");
     res.write("<h1>The temperature in Paris is: "+ temp + " degree celcius</h1>");
     res.write("<img src="+ imageUrl + ">");
     res.send();
    })
  });
})
//





app.listen(3000, function(){
  console.log("running on port 3000");
})
