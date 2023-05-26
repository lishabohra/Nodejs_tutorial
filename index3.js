// //----41. Network I/O-------
// const https = require("node:https")

// //const crypto = require("node:crypto");
// //process.env.UV_THREADPOOL_SIZE=5;
// const MAX_CALLS1 = 6;  //Try putting diff nums 4,5...A threadpool size is 4 it has 4 threads

// const start = Date.now();
// for (let i=0;i<MAX_CALLS1;i++){
//     https
//        .request("https://www.google.com",(res) => {
//          res.on("data", ()=>{});
//          res.on("end",()=>{
//             console.log(`Request: ${i+1}`,Date.now()-start);
//          });

//        })
//        .end();

//     //crypto.pbkdf2("password","salt",100000,512,"sha512",()=>{
//         //console.log(`Hash: ${i+1}`,Date.now()-start);
//     //});
// }



// //-------43. Microtask queues

// //exp1 op--->
// // console.log 1
// // console.log 2
// // this is process.next 1

// console.log("console.log 1");
// process.nextTick(() => console.log('This is process.next 1'))
// console.log("console.log 2");

// //exp2 op--->
// // This is process.nextTick 1
// // This is Promise.resolve 1
// //Inference ---> All callbacks in nexttick queue are exe before promise queue

// Promise.resolve().then(()=>console.log("This is Promise.resolve 1"));
// process.nextTick(()=>console.log("This is process.nextTick 1"));


// //----exp3-----

// process.nextTick(()=> console.log("This is process.nexttick 1"));
// process.nextTick(()=> {
//     console.log("This is process.nexttick 2");
//     process.nextTick(()=> 
//     console.log("This is inner nexttick inside nexttick")
//     );
// });
// process.nextTick(()=> console.log("This is process.nexttick 3"));


// Promise.resolve().then(()=> console.log("This is Promise.resolve 1"));
// Promise.resolve().then(()=> {
//     console.log("This is Promise.resolve 2");
//     process.nextTick(()=> 
//     console.log("This is inner nexttick inside Promise then block")
//     );
// });
// Promise.resolve().then(()=> console.log("This is Promise.resolve 3"));



//------44. TIMER QUEUE-----
//exp1----------------

// setTimeout(()=>console.log("This is settimeout 1"),0);
// setTimeout(()=>console.log("This is settimeout 2"),0);
// setTimeout(()=>console.log("This is settimeout 3"),0);


// process.nextTick(()=> console.log("This is process.nexttick 1"));
// process.nextTick(()=> {
//     console.log("This is process.nexttick 2");
//     process.nextTick(()=> 
//     console.log("This is inner nexttick inside nexttick")
//     );
// });
// process.nextTick(()=> console.log("This is process.nexttick 3"));


// Promise.resolve().then(()=> console.log("This is Promise.resolve 1"));
// Promise.resolve().then(()=> {
//     console.log("This is Promise.resolve 2");
//     process.nextTick(()=> 
//     console.log("This is inner nexttick inside Promise then block")
//     );
// });
// Promise.resolve().then(()=> console.log("This is Promise.resolve 3"));

//-----exp2---------------------

// setTimeout(()=>console.log("This is settimeout 1"),1000);
// setTimeout(()=>console.log("This is settimeout 2"),500);
// setTimeout(()=>console.log("This is settimeout 3"),0);


//-------------------------------------------------------------------
//-------------45.  I/O Queue----------------------------------------

//-----exp 1---------------------------------------------------------

// const fs=require("fs");

// fs.readFile(__filename,() => {
//     console.log("This is readfile 1");
// });

// process.nextTick(()=> console.log("This is process.nexttick 1"));
// Promise.resolve().then(()=> console.log("This is promise.resolve 1"));

//-----exp 2---------------------------------------------------------
//Here the order of exe can never be guaranteed --> diff op everytime

// const fs=require("fs");
// setTimeout(()=>console.log("This is settimeout 1"), 0);
// fs.readFile(__filename,() => {
//          console.log("This is readfile 1");
//      });


////-----exp 3---------------------------------------------------------
// const fs=require("fs");
// fs.readFile(__filename,() => {
//     console.log("This is readfile 1");
// });
// process.nextTick(()=> console.log("This is process.nexttick 1"));
// Promise.resolve().then(()=> console.log("This is promise.resolve 1"));
// setTimeout(()=>console.log("This is settimeout 1"), 0);

// ////46. I/O Polling------ continued prgm from above-------------------------
// setImmediate(()=>console.log("This is setImmediate1"));


//-----47.Check Queue---------------------------------------- 

// const fs=require("fs");
// fs.readFile(__filename,() => {
//     console.log("This is readfile 1");
//     setImmediate(()=>console.log("This is inner setImmediate1 inside readfile"));
// });
// process.nextTick(()=> console.log("This is process.nexttick 1"));
// Promise.resolve().then(()=> console.log("This is promise.resolve 1"));
// setTimeout(()=>console.log("This is settimeout 1"), 0);

//----------------------------------------------------------------
//------48. Close Queue--------------------------------------------

const fs=require("fs");
const readableStream = fs.createReadStream(__filename);
readableStream.close();

readableStream.on("close",()=>{
    console.log("This is from readablestream close event callback");
});
setImmediate(()=>console.log("This is setImmediate1"));
setTimeout(()=>console.log("This is settimeout 1"), 0);
Promise.resolve().then(()=> console.log("This is promise.resolve 1"));
process.nextTick(()=> console.log("This is process.nexttick 1"));



