/*To call contents of add.js , another module*/
const add = require ('./add');


/*Hello world program in Node js*/
console.log('Hello from Index.js');

const sum = add(1,2);
const sum2 = add(4,5);
console.log(sum);
console.log(sum2);


/*SUPERMAN & BATMAN*/
require("./batman");
require("./superman");


/*super-hero*/
// console.log("----------------------------")
// const superhero = require('./Super-hero');
// console.log(superhero.getname());
// superhero.setname("superman");
// console.log(superhero.getname());


// const newsuperhero = require('./Super-hero');
// console.log(newsuperhero.getname());
/* It should fetch batman but it will print superman, module cacheing*/

/*Same thing in caching*/
const superhero = require('./Super-hero');

const batman = new superhero("Baaaatman");
console.log(batman.getname());
batman.setname("Bruce Wayne");
console.log(batman.getname());

const superman = new superhero("Supeeeerman");
console.log(superman.getname());


//--------------------------------------------------------------
//add.js

console.log("--------------------------------------------------------------------");
// const add1 = require('./math');
// console.log(add1(2,3));

const math = require('./math');
console.log(math.add(2,3));
console.log(math.sub(2,3));


/*-----------------------------------------------------*/
//Importing JSON
console.log("-------Importing json------");
const data = require("./data.json");
console.log(data);
console.log(data.name);
console.log(data.address);
console.log(data.address.city);


//------------------------------------------------------------------
//path module
console.log("Path Module");

const path= require("node:path");
//It can be also written as below
//const path= require("path");

const { CLIENT_RENEG_LIMIT } = require('node:tls');
console.log(__filename);
console.log(__dirname);

console.log(path.basename(__filename));
console.log(path.basename(__dirname));

console.log(path.extname(__filename));
console.log(path.extname(__dirname));

console.log(path.parse(__filename));
console.log(path.format(path.parse(__filename)));

console.log(path.isAbsolute(__filename));
console.log(path.isAbsolute("./data.json"));

console.log(path.join("folder1","folder2","index.html"));
console.log(path.join("/folder1","folder2","index.html"));
console.log(path.join("/folder1","//folder2","index.html"));
console.log(path.join("/folder1","//folder2","../index.html"));
console.log(path.join(__dirname,"data.json"));


console.log(path.resolve("folder1","folder2","index.html"));
console.log(path.resolve("/folder1","folder2","index.html"));
console.log(path.resolve("/folder1","//folder2","index.html"));
console.log(path.resolve("/folder1","//folder2","../index.html"));
console.log(path.resolve(__dirname,"data.json"));


/*-----------------------------------------------------*/
//Callbacks
console.log("-------callbacks------");

function greet(name) {
    console.log(`Hello ${name}`);
}

function greetlisha(greetfn) {
    const name = "Lisha";
    greetfn(name);
}

greetlisha(greet);


/*-----------------------------------------------------*/
//Events
console.log("-------Events------");

const EventEmitter = require("node:events")

const emitter = new EventEmitter()
emitter.on("order-pizza", (size,topping) => {
    console.log(`Order received! Baking a ${size} pizza with ${topping}`)
});

emitter.on("order-pizza", (size) => {
    if(size === "large"){
        console.log("Serving Complimentary Drink");
    }
    
});

console.log("Hello, Prints on the first line");
emitter.emit("order-pizza", "large", "paneer");



//------------------------------------------------------
//-------Pizza-shop-----drink-machine-------------------------------
console.log("-----------------------------------");
const pizzashop = require("./pizza-shop");
const drinkmachine = require("./drink-machine");

const Pizzashop = new pizzashop();
const Drinkmachine = new drinkmachine();
Pizzashop.on("order", (sizee, topping) => {
    console.log(`Order received! Baking a ${sizee} pizza with ${topping}`);
    Drinkmachine.servedrink(sizee);
});
Pizzashop.order("large","mushroom");
Pizzashop.displayordernum();


//-----------------BUFFER-------------------------------------
console.log("____________________________________________________")
console.log("BUFFER");

const buffer = new Buffer.from("Lisha","utf-8");
console.log(buffer.toString());
console.log(buffer);
console.log(buffer.toJSON());


//-----------------FS MODULE-------------------------------------
console.log("____________________________________________________")
console.log("FS MODULE");

const fs = require("node:fs");

console.log('First');
const fileContents = fs.readFileSync("./file.txt","utf-8");
console.log(fileContents);

console.log('Second');
fs.readFile("./file.txt","utf-8", (error,data) => {
    if(error){
        console.log(error);
    }else {
        console.log(data);
    }

});

console.log("Third");

fs.writeFileSync("./greet.txt","Hello World!");  //This will create a new file
fs.writeFile("./greet.txt","Hello Lisha!!!!", { flag: "a" }, (err) => {   //It will update greet file, flag will append both contents
    if(err) {
        console.log(err);
    } else {
        console.log("File Written");
    }
});



//-----------------FS Promise MODULE-------------------------------------
console.log("____________________________________________________")
console.log("FS Promise MODULE");

const fs1 = require("node:fs/promises")

// console.log("First");
// fs1.readFile("file.txt","utf-8")
//  .then((data) => console.log(data)) //when promise resolves successfully
//  .catch((error) => console.log(error)); //to catch error

// console.log("Second");

//same function can be written using async and await

async function readFile() {
    try {
        const data = await fs.readFile("file.txt", "utf-8");
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}


// //-----------------Streams-------------------------------------
// console.log("____________________________________________________")
// console.log("Streams");

// const fs2 = require("node:fs");

// const readablestream = fs2.createReadStream("./file.txt",{
//     encoding: "utf-8",
//     highWaterMark: 2, //To send data chunks in 2 bytes --> he ll o 
// });

// const writeablestream = fs2.createWriteStream("./file2.txt");   //copies file1 data to file2

// readablestream.on("data", (chunk) => {
//     console.log(chunk);
//     writeablestream.write(chunk);
// });


//-----------------Pipes-------------------------------------
console.log("____________________________________________________")
console.log("Pipes");

const fs2 = require("node:fs");
const zlib = require("node:zlib"); //Importing zlib module, provides compression

const gzip = zlib.createGzip()

const readablestream = fs2.createReadStream("./file.txt",{
    encoding: "utf-8",
    highWaterMark: 2, //To send data chunks in 2 bytes --> he ll o 
});


readablestream.pipe(gzip).pipe(fs2.WriteStream("./file2.txt.gz")) //new file will b created
//const writeablestream = fs2.createWriteStream("./file2.txt");
//readablestream.pipe(writeablestream);




//this above code can b wriiten in single line instead of the long code written in stream
//Pipe is used to connect readable stream and writeable stream


















