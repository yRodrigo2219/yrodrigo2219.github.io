(function(){
    const root = document.getElementById('root');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.cursor = 'pointer';

    const img = document.createElement("img");
    img.src = "wip_logo.png";

    canvas.width = root.clientWidth;
    canvas.height = root.clientHeight;
    root.appendChild(canvas);

    function randColor(){
        return `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
    }

    function randVel(max){
        return Math.round(Math.random()*max)+1;
    }

    const state = {
        color: 'yellow',
        balls: []
    }

    canvas.addEventListener('mousedown', e =>{
        if(e.button === 0){
            state.color = randColor();
            for(let i = 0; i < 10; i++){
                createBall(e.layerX, e.layerY);
            }
        }
    });

    function createBall(x, y){
        const ball = {
            x: x,
            y: y,
            speed: randVel(6),
            color: state.color,
            dir: Math.PI * 2 * Math.random()
        }

        state.balls.push(ball);
    }

    function updatePos( ball ){
        var dx = ball.x + ball.speed * Math.cos(ball.dir);
        var dy = ball.y + ball.speed * Math.sin(ball.dir);

        if (dx < 0 || dx > canvas.width || dy < 0 || dy > canvas.height) {
            ball.speed += ball.speed == 7 ? 0 : 1;
            ball.dir = Math.PI * 2 * Math.random();
        } else {
            ball.x = dx;
            ball.y = dy;
        }

    }

    function drawBalls(){
        state.balls.map( ball =>{
            ctx.beginPath();
            ctx.fillStyle = ball.color;
            ctx.moveTo(ball.x, ball.y);
            ctx.arc(ball.x, ball.y, 3, 0, Math.PI*2, true);
            ctx.fill();

            updatePos(ball);
        });
    }

    function update(){
        if(canvas.width !== root.clientWidth || canvas.height !== root.clientHeight){
            // Clears the canvas!
            canvas.width = root.clientWidth;
            canvas.height = root.clientHeight;
        }

        const w = canvas.width;
        const h = canvas.height;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(0, 0, w, h);
        
        var wI, hI;

        if(h < w){
            hI = h/3;
            wI = Math.round(hI * 1.128409090909091);   
        }else{
            wI = w/3;
            hI = Math.round(wI / 1.128409090909091);   
        }

        drawBalls();
        
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(w/2 - 7*wI/6, h/2 + 35*hI/48);
        ctx.lineTo(w/2 - wI/9, h/2 - 7*hI/6);
        ctx.lineTo(w/2 + 14*wI/17, h/2 + 35*hI/48);
        ctx.lineTo(w/2 - 7*wI/6, h/2 + 35*hI/48);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = state.color;

        ctx.beginPath();
        ctx.moveTo(w/2 - wI, h/2 + 5*hI/8);
        ctx.lineTo(w/2 - wI/9, h/2 - hI);
        ctx.lineTo(w/2 + 2*wI/3, h/2 + 5*hI/8);
        ctx.lineTo(w/2 - wI, h/2 + 5*hI/8);
        ctx.fill();

        ctx.drawImage(img, w/2 - wI/2, h/2 - hI/2, wI, hI);
        
        requestAnimationFrame(update);
    }

    update();
})();
