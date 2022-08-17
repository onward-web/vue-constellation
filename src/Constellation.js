import Star from './Star.js'
export default class Constellation{
    constructor($wrap, options ={}) {
        this.$wrap =  $wrap
        this.options = options;
        this.init()
    };
    init(){
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'vue-constellation__canvas';
        this.canvas.style.display = 'block';
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = 0;
        this.canvas.style.top = 0;
        this.canvas.style.pointerEvents = 'none';
        this.$wrap.insertBefore(this.canvas, this.$wrap.firstChild);
        this.ctx = this.canvas.getContext('2d')
        this.styleCanvas()
        this.setInitialPosition()

        this.stars = [];

        this.createStars();
        this.loop();

        this.bind();
    };

    styleCanvas() {

        this.canvas.width = this.options.width;
        this.canvas.height = this.options.height;
        this.ctx.fillStyle = this.options.starColor;
        this.ctx.strokeStyle = this.options.lineColor;
        this.ctx.lineWidth = this.options.lineWidth;
    };
    setInitialPosition() {
        if (!this.options || !this.options.hasOwnProperty('positionX')) {
            this.options.positionX = this.canvas.width * 0.5;
        }
        if (!this.options || !this.options.hasOwnProperty('positionY')) {
            this.options.positionY = this.canvas.height * 0.5;
        }
    };

    createStars() {
        let length = this.options.length,
            star,
            i;

        for (i = 0; i < length; i++) {
            this.stars.push(new Star(this));
            star = this.stars[i];
            star.draw();
        }
    };

    loop(){

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addLine();
        for (let i = 0; i < this.stars.length; i++) {
            //this.stars[i].line();
            this.stars[i].updatePosition();
            this.stars[i].draw();
        }


        window.requestAnimationFrame(this.loop.bind(this))
        /*this.rAF = window.requestAnimationFrame(function () {
            this.loop.bind(this);//(callback, $this);
        });*/
    }


    addLine(){
        let length = this.options.length,
            iStar,
            jStar,
            i,
            j;

        for (i = 0; i < length; i++) {
            for (j = 0; j < length; j++) {
                iStar = this.stars[i];
                jStar = this.stars[j];

                if (
                    (iStar.x - jStar.x) < this.options.distance &&
                    (iStar.y - jStar.y) < this.options.distance &&
                    (iStar.x - jStar.x) > - this.options.distance &&
                    (iStar.y - jStar.y) > - this.options.distance
                ) {
                    if (
                        (iStar.x - this.options.positionX) < this.options.radius &&
                        (iStar.y - this.options.positionY) < this.options.radius &&
                        (iStar.x - this.options.positionX) > - this.options.radius &&
                        (iStar.y - this.options.positionY) > - this.options.radius
                    ) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(iStar.x, iStar.y);
                        this.ctx.lineTo(jStar.x, jStar.y);
                        this.ctx.stroke();
                        this.ctx.closePath();
                    }
                }
            }
        }
    }



    bind(){

        document.addEventListener('mousemove', (e) => {
            this.options.positionX = e.pageX - this.canvas.offsetLeft;
            this.options.positionY = e.pageY - this.canvas.offsetTop;

        }, false);

        window.addEventListener('resize', () => {
            window.cancelAnimationFrame(this.rAF);
        })
    }
    unbind(){
        console.log('unbind');
    }

}
