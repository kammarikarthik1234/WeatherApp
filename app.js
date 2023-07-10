const { response } = require("express");
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");
const port=process.env.port || 3000;
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{  res.render("index");
});
    app.post("/",(req,res)=>{
    const query=req.body.cityName;
    const apiKey="a50c6141033f2dbf096d481c2f10fc63";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
    https.get(url,(response)=>{
        console.log(response.statusCode);
      response.on("data",(data)=>{
        // console.log(data); data recieved in hexadecimal format
        //converting data to JSON format by JSON.parse();
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const wD=weatherData.weather[0].description;
        const icon="http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
        // console.log(weatherData.weather[0].description);
        res.write(" <p>The weather is currently "+wD+"</p>");
        res.write("<h1>The temperature in "+query+ " is "+ temp+" degree celcius.</h1>");
        res.write("<img src="+ icon +">");
        res.send();
      })

    })
})
   

app.listen(port,function(){
    console.log("Server is running at port no.3000");
});
