const boxesHot = document.querySelectorAll('.hot');
const boxesCold = document.querySelectorAll('.cold');

boxesHot.forEach((box) =>{
    box.addEventListener("click", function(e){
        e.target.style.visibility = "hidden";
    })
})
boxesCold.forEach((box) =>{
    box.addEventListener("click", function(e){
        e.target.style.visibility = "hidden";
    })
})