const express = require('express');
const bodyParser = require("body-parser")
const request = require('request')
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
// To use the CSS and images and extenal things we use below command
app.use(express.static("public"));


app.get('/',function(req,res)
{
    res.sendFile(__dirname + "/signup.html");
    
    // res.send('Server is running good');
});


app.post('/',function(req,res)
{
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    // console.log(firstName , lastName , email);
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/20b2ae5b38";
    const options = {
        method: "POST",
        auth: "ankit3:2d6de544f395cb013f89b37b1869dbe0-us21"
    }
    const request = https.request(url, options , function(response)
    {

        if(response.statusCode===200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",function(data)
        {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});


app.post('/failure',function(req,res)
{
    res.redirect("/");
})

// -d '{"name":"","contact":{"company":"","address1":"","address2":"","city":"","state":"","zip":"","country":"","phone":""},"permission_reminder":"","use_archive_bar":false,"campaign_defaults":{"from_name":"","from_email":"","subject":"","language":""},"notify_on_subscribe":"","notify_on_unsubscribe":"","email_type_option":false,"double_optin":false,"marketing_permissions":false}'


app.listen(process.env.PORT || 3000,function()
{
    console.log('Server has started');
});




//API key
// 7c45e2ec7f769bc908273749d533be69-us21
//2d6de544f395cb013f89b37b1869dbe0-us21

//Audience id
//20b2ae5b38.