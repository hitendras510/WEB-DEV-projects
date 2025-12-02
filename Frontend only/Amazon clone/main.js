const imgs = document.querySelectorAll('.header-slider ul img');
const prev_btn = document.querySelector(".control-prev");
const next_btn = document.querySelector(".control-next");


let n = 1; //n will decide image number ,at 0 first image will be shown


function changeSlide(){
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.display = 'none'; //none img will be displayed at starting 
    }
    imgs[n].style.display = 'block'; //it will display n images
}
changeSlide();


// to change value of n with button(prev,next)
prev_btn.addEventListener('click', (e)=>{
    if(n > 0){
        n--;
    }else{
        n = imgs.length - 1;
    }
    changeSlide();
})
next_btn.addEventListener('click', (e)=>{
    if (n > imgs.length - 1) {
      n++;
    } else {
      n = 0;
    }
    changeSlide();
})

//for product slider - scroll using mouse wheel
const scrollContainer = document.querySelectorAll('.products');
for(const item of scrollContainer){
    item.addEventListener('wheel', (e)=>{
        e.preventDefault();
        item.scrollLeft += e.deltaY;
    })
}