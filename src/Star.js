export default class Star{

    constructor(parent) {
        this.parent = parent;


        this.x = Math.random() * this.parent.canvas.width;
        this.y = Math.random() * this.parent.canvas.height;

        this.vx = (this.parent.options.velocity - (Math.random() * 0.5));
        this.vy = (this.parent.options.velocity - (Math.random() * 0.5));

        this.radius = this.parent.options.starRandomWidth ? (Math.random() * this.parent.options.starWidth) : this.parent.options.star.width;
    };
    draw(){
        this.parent.ctx.beginPath();
        this.parent.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.parent.ctx.closePath();
        this.parent.ctx.fill();
    }
    updatePosition(){

        if (this.y < 0 || this.y > this.parent.canvas.height) {
            this.vx = this.vx;
            this.vy = - this.vy;
        } else if (this.x < 0 || this.x > this.parent.canvas.width) {
            this.vx = - this.vx;
            this.vy = this.vy;
        }

        this.x += this.vx;
        this.y += this.vy;
    }

}

