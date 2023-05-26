(function(){
    const superhero = "Ironman";
console.log(superhero);
})();

(function(){
    const superhero = "Batman";
console.log(superhero);
})();

/*EACH FUNCTION GETS ITS OWN SCOPE...Immediately Invoked Function Expression*/


/*----------------------------------------------------------------------------------*/


/*Module Wrapper*/

(function(message){
    const superhero = "Ironman";
console.log(message,superhero);
})("Hello");

(function(message){
    const superhero = "Batman";
console.log(message,superhero);
})("Hey");