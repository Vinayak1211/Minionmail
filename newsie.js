const express=require("express");
const app=express();
const parser=require("body-parser");
const https=require("https");
const client = require("@mailchimp/mailchimp_marketing");

// const reqiest=require("request");
const { error } = require("console");
app.use(express.static("heyy"));
app.use(parser.urlencoded({extended:true}));
app.listen(process.env.PORT||3000,function(){
    console.log("Server is running on port 3000");
});
app.get("/",function(req,res){
    res.sendFile(__dirname+"/newsie.html");
});
app.post("/",function(req,res){
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const email=req.body.email;
    console.log(firstname);
    client.setConfig({
      apiKey: "afda629d197413703cd181adb97de848-us10",
      server: "us10",
    });
    const run = async () => {
      try{
      const response = await client.lists.addListMember("911d0a89d7", {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                    

                }

            }
            
     );
    res.sendFile(__dirname+"/success.html");
          }
           catch(error){
            res.sendFile(__dirname+"/fail.html");
           }
       
    };
    run();
    
    
        
  
   
});
app.post("/fail",function(res,resp){
  resp.redirect("/");
})




