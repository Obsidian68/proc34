const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var monkey;
var rope;
var finsih;
var bg;
var bg_img;
var cut_btn;
var monkey_img;
var monkey_con;

function preload() {

  monkey_img = loadImage('monkey.jpg');
  bg_img = loadImage('jungle.jpg');
  cut_button = loadImage('cut_button.png');
  
}

function setup() {
  
  createCanvas(400,400);

  cut_btn = createImg(cut_button);
  cut_btn.position(20,30);
  cut_btn.size(50,50);
  cut_btn.mouseClicked(drop);

  engine = Engine.create();
  world = engine.world;

  rope = new Rope(8,{x:40,y:30});
  finsih = new Ground(200,400,600,20);

  monkey = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,monkey);

  monkey_con = new Link(rope,monkey);

  monkey = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,monkey);
}


function draw() 
{
  background(51);

  Engine.update(engine);

  push();
  imageMode(CENTER);
  if(monkey!=null){
    image(monkey_img,monkey.position.x,monkey.position.y,70,70);
  }
  pop();
  
  rope.show();
  finish.show();
}

function drop()
{
  rope.break();
  monkey_con.detach();
  monkey_con = null; 

  drawSprites();

  if(collide(monkey,finish)==true)
  {
    text("You Won !!",200, 200)
  }
}

if(monkey!=null && monkey.position.y>=390)
{
  monkey=null;  
 }
 
 function collide(body,body)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,body.position.x,body.position.y);
          if(d<=80)
            {
              World.remove(engine.world,monkey);
               monkey = null;
               return true; 
            }
            else{
              return false;
            }
         }
}
