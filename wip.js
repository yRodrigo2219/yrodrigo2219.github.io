(function(){
    const root = document.getElementById('root');
    const canvas = document.createElement('canvas');
    canvas.width = root.clientWidth;
    canvas.height = root.clientHeight;
    root.appendChild(canvas);

    canvas.addEventListener("mousedown", (e)=>{
        console.log(e);
    });
})()