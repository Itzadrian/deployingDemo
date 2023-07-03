var express      = require("express"),
    nodemailer   = require("nodemailer"),
    app          = express();

//app config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
var PORT = process.env.PORT || 3000;

app.get("/", function(req, res){
    res.render("home");
});
app.post("/", function(req, res){
    console.log(req.body);

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "simeondominic@gmail.com",
            pass: "ksoowzlndvwbcosm"
        }
    })
    var mailOptions = {
        from: req.body.email,
        to: "simeondominic@gmail.com",
        subject: `Message From ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            res.send("error")
            res.redirect("/");
        } else{
            console.log("Email Sent: " + info.response);
            res.send("Email sent");
            res.redirect("/");
        }
    })
})

// app.get("/about", function(req, res){
//     res.render("about")
// })


app.listen(PORT, function(){
    console.log("Server Has Started!");
});