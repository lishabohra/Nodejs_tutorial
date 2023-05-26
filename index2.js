//--------------30. Creating a Node Server----------------------------------------
console.log("____________________________________________________")
console.log("Creating a Node Server");

const http = require("node:http");
const server = http.createServer((req,res) => {
    res.writeHead(200);
    res.end("Hello World!!");

})

server.listen(3000, () => {
    console.log("Server Running on port 3000");
});                  //This 3000 is port number like house number in an aprtment




//--------------31. JSON Response----------------------------------------
console.log("____________________________________________________")
console.log("JSON Response");

const https = require("node:http");
const server1 = https.createServer((req,res) => {

    const superhero = {
        "firstname":"Lisha",
        "lastname" : "Bohra"

    };
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(superhero));

})

server1.listen(3001, () => {
    console.log("Server Running on port 3001");
}); 




//--------------33. HTML Response----------------------------------------
console.log("____________________________________________________")
console.log("HTML Response");

const https1 = require("node:http");
const fs = require("node:fs");

const server2 = https1.createServer((req,res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    //fs.createReadStream("./index.html").pipe(res);
    const html= fs.readFileSync("./index.html","utf-8");
    //res.end("<h1>Hello World!</h1>");
    res.end(html);

})
server2.listen(3002, () => {
    console.log("Server Running on port 3002");
}); 


//--------------34. HTML Template----------------------------------------
console.log("____________________________________________________")
console.log("HTML Template");

const https3 = require("node:http");
const fs3 = require("node:fs");

const server3 = https3.createServer((req,res) => {
    const name = "lisha";
    res.writeHead(200, {"Content-Type": "text/html"});
    let html  = fs3.readFileSync("./index.html","utf-8");
    html = html.replace("{{name}}", name);
    res.end(html);

});
server3.listen(3003, () => {
    console.log("Server Running on port 3003");
}); 


//--------------35. HTML Routing----------------------------------------
console.log("____________________________________________________")
console.log("HTML Routing");

const https5 = require("node:http");
const fs5 = require("node:fs");

const server5 = https5.createServer((req,res) => {
    if (req.url === "/"){
        res.writeHead(200, {"Content-Type":"text/plain"});
        res.end("Home Page");
    }else if(req.url === "/about"){
        res.writeHead(200, {"Content-Type":"text/plain"});
        res.end("About Page");
    }else if(req.url === "/api"){ 
        res.writeHead(200, {"Content-Type":"application/json"});
        res.end(
            JSON.stringify({
                firstname:"Lisha",
                lastname:"Bohra",
            })
        );

    }else{
        res.writeHead(404);
        res.end("Page not found");
    }

});
server5.listen(3005, () => {
    console.log("Server Running on port 3005");
}); 


//39.------ Libuv's Threadpool---------
//To measure the time

//exp1

const crypto = require("node:crypto");

const start = Date.now();
crypto.pbkdf2Sync("password","salt",100000,512,"sha512");
console.log("Hash: ",Date.now() - start);    //output - 1909 ....2nd op double 1757 can b any num

//exp2

//const crypto = require("node:crypto");
const MAX_CALLS = 2;  //Try putting diff nums 1, 2, 3...

const start1 = Date.now();
for (let i=0;i<MAX_CALLS;i++){
    crypto.pbkdf2("password","salt",100000,512,"sha512",()=>{
        console.log(`Hash: ${i+1}`,Date.now()-start1);
    });
}



//40. Thread pool size----------

//const crypto = require("node:crypto");
process.env.UV_THREADPOOL_SIZE=5;
const MAX_CALLS1 = 5;  //Try putting diff nums 4,5...A threadpool size is 4 it has 4 threads

const start2 = Date.now();
for (let i=0;i<MAX_CALLS1;i++){
    crypto.pbkdf2("password","salt",100000,512,"sha512",()=>{
        console.log(`Hash: ${i+1}`,Date.now()-start2);
    });
}

