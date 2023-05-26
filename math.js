// //1st pattern
// const add = (a,b) => {
//     return a+b;
// }

// module.exports = add;

// //---------------------------------------
// //2nd pattern
// module.exports = (a,b) => {
//     return a+b;
// }


//-------------------------------------------
//3rd pattern

const add = (a,b) => {
    return a+b;
}

const sub = (a,b) => {
    return a-b;
}

module.exports = {
    add,
    sub,
};
