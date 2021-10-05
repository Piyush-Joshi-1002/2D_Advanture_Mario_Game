
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var grass = new Image();
var grass_X= 1;
grass.src = "hero/Tiles/images/grasslend_01.png";
var cloud_cord = [
    {"x":400,"y":0,"w":142,"h":92},
    {"x":c.width+100,"y":50,"w":142,"h":92}
];
var cloud = new Image();
cloud.src = "hero/Tiles/images/cloudSprites1.png";
var grass_cordinate = [
    {"x":c.width+100,"y":c.height-120,"w":128,"h":77},
    {"x":200,"y":100,"w":122,"h":77}
] ;
cloud_X = 1;
// for fire boxs
var distroyer = [
    {"X":495 , "Y":40,"w":50,"h":64},
    {"X":840 , "Y":300,"w":50,"h":50},
    {"X":840 , "Y":00,"w":110,"h":50},
    {"X":45 , "Y":40,"w":50,"h":64},
    {"X":245 , "Y":-10,"w":50,"h":64}
    
    ];
var BG_srroleX = 1;
var x = 340, y = 290 , w =50, h=64 ;
var find_key = 0;
for(var i = 0 ; i < 4 ;i++)
{
    var newentery = {"X":x , "Y":y,"w":w,"h":h};
    distroyer.push(newentery);
    x+=150;
}
x = 890;
y = 290;
for(i=0;i<8;i++)
{
    var newentery ={"X" :x,"Y" : y,"w" : w,"h":h};
    distroyer.push(newentery);
    y-=30;
}
var distroyer_img = new Image();
var D_imgX = 1;
var portal = new Image();
portal.src = "hero/Tiles/images/Portal.png"
var Thunder = new Image();
Thunder.src = "hero/Tiles/images/Thunder.png";
var key = new Image();
key.src = "hero/Tiles/images/Golden_Key.png";
var D_imgY = 1;
distroyer_img.src = "hero/Tiles/images/destroyer.png";
//end fire boxs;
var img = new Image();
img.src = "hero/images/walk.png";
var image_X = 1;
var image_Y = 1; 
var img_positionX = 82;
var img_positionY  = 300;
var width = 64;
var height = 64;
var jump_delay = 0;
var speed = 5;
var bg= new Image();
bg.src = "hero/bg.png";
var temp_positionY;
var validation = 0,chq_jump = 0,chqDir = 0;
var platformTile = new Image();
platformTile.src = "wintertileset/png/Tiles/1.png";
var key_Condition = 0,Running_interval;
var Jump_flag = 0;
var set_int;
var active_key = "none";
var active_Jump = "none";

window.onload = function()
{
    
    platform();
    clear_cloud();
    ctx.drawImage(bg,0,0,c.width,c.height);
   cloud_Draw();
    ctx.drawImage(grass,grass_X,1,grass_cordinate[0].w,grass_cordinate[0].h,grass_cordinate[0].x,grass_cordinate[0].y,grass_cordinate[0].w,grass_cordinate[0].h);
    ctx.drawImage(img,image_X,image_Y,width,height,img_positionX,img_positionY,width,height);
    var tempX = image_X, tempY = image_Y;
    var flag_of_Jump= 0;
    document.addEventListener("keydown" , function(e)
     {
        if(e.keyCode == 39)
        {
            chqDir = 0;
            img.src = "hero/images/walk.png"; 
            active_key = "right";

        }
        if(e.keyCode == 37)
        {
            img.src = "hero/images/walkBack.png";
            chqDir = 1;
            active_key = "left";
        }
        if(e.keyCode == 38 )
        {
                active_Jump = "true";
                speed = 8;
                image_X =1;
        }
    });
    document.addEventListener("keyup" , function(e){
        if(e.keyCode == 37 || e.keyCode == 39)
        {
            active_key = "none";
            clearInterval(Running_interval);
        }
        speed = 5;
        image_X = tempX;
        image_Y = tempY;
        ctx.clearRect(img_positionX,img_positionY,width,height);
        clear_cloud();
        ctx.drawImage(bg,0,0,c.width,c.height);
        platform();
       cloud_Draw()
        ctx.drawImage(grass,grass_X,1,grass_cordinate[0].w,grass_cordinate[0].h,grass_cordinate[0].x,grass_cordinate[0].y,grass_cordinate[0].w,grass_cordinate[0].h);
        ctx.drawImage(img,image_X,image_Y,width,height,img_positionX,img_positionY,width,height);
        
    });
    var count = 0;
    setInterval(update_Static,300)
    function update_Static()
    {
        ctx.clearRect(grass_cordinate[0].x,grass_cordinate[0].y,grass_cordinate[0].w,grass_cordinate[0].h);
        ctx.clearRect(img_positionX,img_positionY,width,height);
        clear_cloud();
        ctx.drawImage(bg,0,0,c.width,c.height);
        cloud_Draw();
        grass_X+=128;
        if(grass_X>=512)
        {
            grass_X = 1;
        }
        cloud_X += 142;
        if(cloud_X >950)
        {
            cloud_X = 1;
        }
        platform();
       cloud_Draw();
        ctx.drawImage(grass,grass_X,1,grass_cordinate[0].w,grass_cordinate[0].h,grass_cordinate[0].x,grass_cordinate[0].y,grass_cordinate[0].w,grass_cordinate[0].h);
        ctx.drawImage(img,image_X,image_Y,width,height,img_positionX,img_positionY,width,height);
       
    }
    set_int = setInterval(update_player_position,50);
    function update_player_position()
    {
        Jump_flag = 0;
        validat();
        var temp_positionY = img_positionY;
        if(active_key != "none" )
        {
            if(key_Condition != 1)
                ctx.clearRect(img_positionX,img_positionY,width,height);
            if( active_key == "right" && validation == 0 )
            {
                img_positionX += speed;
            }
            else if( active_key == "left" && validation == 0)
            {
                img_positionX -= speed;
            }
            
            if(key_Condition != 1)
            {
                image_X += 64;
                if(image_X >571)
                {
                    image_X = tempX;
                }
                clear_cloud();
                ctx.drawImage(bg,0,0,c.width,c.height);
                platform(); 
                cloud_Draw();
                ctx.drawImage(grass,grass_X,1,grass_cordinate[0].w,grass_cordinate[0].h,grass_cordinate[0].x,grass_cordinate[0].y,grass_cordinate[0].w,grass_cordinate[0].h);
                ctx.drawImage(img,image_X,image_Y,width,height,img_positionX,img_positionY,width,height);
                 
            }
        }
        if(active_Jump == "true" && key_Condition == 0)
        {
            chq_jump = 1;
            key_Condition = 1;
            flag_of_Jump = 1;
            image_X =1;
            image_Y = 1;
            var for_Jump = setInterval(function()
            {
                ctx.clearRect(img_positionX,img_positionY,width,height);
                if(chqDir == 0)
                    img.src = "hero/images/Jump.png";
                else
                    img.src = "hero/images/JumpBack.png";
                if(img_positionY < temp_positionY-100)
                {
                    flag_of_Jump = 0;
                }
                if(flag_of_Jump ==1)
                {
                    img_positionY-=15;
                }
                else if(flag_of_Jump == 0 && validation == 0)
                {
                   img_positionY +=15;

                }
                jump_delay++;
                if(jump_delay == 2)
                {
                    image_X += width;
                    if(image_X > 390)
                    {
                        image_X = 1;
                    }
                    jump_delay = 0;
                }
                if( validation == 1 )
                {
                    flag  = 0;
                    chq_jump = 0;
                    jump_delay = 0;
                    flag_of_Jump = 0;
                    active_Jump = "none";
                    key_Condition = 0;
                    speed = 10;
                    temp_positionY = img_positionY;
                    clearInterval(for_Jump);
                    if(chqDir == 0)
                        img.src = "hero/images/walk.png";
                    else
                        img.src = "hero/images/walkBack.png";
                    image_X = 1;
                    image_Y = 1;
                }
                clear_cloud();
                ctx.drawImage(bg,0,0,c.width,c.height);
                platform();
               cloud_Draw();
                ctx.drawImage(grass,grass_X,1,grass_cordinate[0].w,grass_cordinate[0].h,grass_cordinate[0].x,grass_cordinate[0].y,grass_cordinate[0].w,grass_cordinate[0].h);
                ctx.drawImage(img,image_X,image_Y,width,height,img_positionX,img_positionY,width,height);
                 
            }
            ,50)
        }
    }
    

}
var info = document.getElementById("info");
var platformPosition = [
    {"x" :0,"y" : 354,"w" : 50,"h":50,"img":2}
    
]
x = 0, y = 354,w = 50,h=50;
var newentery;
for(i = 0; i<19;i++)
{ 
    newentery = {"x" :x+50,"y" : 354,"w" : 50,"h":50,"img":2};
    x = x+50;
    platformPosition.push(newentery);
}
for(i = 0; i<37;i++)
{ 
    newentery = {"x" :x+50,"y" : 354,"w" : 50,"h":50,"img":19};
    x = x+50;
    platformPosition.push(newentery);
}
x = c.width;
var ty = y;
y = c.height-95;
for(i=0;i<5;i++)
{
    
    newentery = {"x" :x,"y" : y,"w" : 50,"h":50,"img":5};
    info.innerHTML+= y;
    y = y-50;
    platformPosition.push(newentery);
}
newentery = {"x" :x,"y" : y,"w" : 50,"h":50,"img":2};
info.innerHTML+= y;
platformPosition.push(newentery);
x = 150;
y = ty-50;
newentery ={"x" :x,"y" : y,"w" : w,"h":h,"img":2};
platformPosition.push(newentery);
x += 50;

y = y-100;
tY = y;
newentery ={"x" :x,"y" : y,"w" : w,"h":h,"img":2};
platformPosition.push(newentery);
y = 50;
x = c.width;
for( i = 0; i<5 ; i++)
{
    x-=50;
    newentery ={"x" :x,"y" : y,"w" : w,"h":h,"img":2};
    platformPosition.push(newentery);
}
x = 0;
y = tY-100;
for(i=0;i<3;i++)
{
    
    newentery ={"x" :x,"y" : y,"w" : w,"h":h,"img":2};
    platformPosition.push(newentery);
    
    x+=50;
}

var img_temp=14;
y -=50;
for(i=0;i<3;i++)
{
    x+=50;
    newentery ={"x" :x,"y" : y,"w" : w,"h":h,"img":img_temp};
    img_temp++;
    platformPosition.push(newentery);
}
x+=200;
y+=50;
newentery ={"x" :x,"y" : y,"w" : w,"h":h,"img":2};
platformPosition.push(newentery);

function validat()
{
    var flag = 0;
    var Run_Condition = 0;
    //info.innerHTML = "validat Call" + key_Condition;
    var forTile = 0;
    info.innerHTML = 1;
    
    for(i=0;platformPosition[i];i++)
    {
        if((img_positionX+5>=platformPosition[i].x-40 && img_positionX-5<=platformPosition[i].x+20) && (img_positionY >=platformPosition[i].y-50) && (img_positionY <=platformPosition[i].y+20))
        {
            forTile  = 1
            break;
        }
    }
    if(forTile == 0 && key_Condition == 0)
    {

        validation = 1;
        ctx.clearRect(img_positionX,img_positionY,width,height);
        ctx.drawImage(bg,0,0,c.width,c.height);
        platform()
        active_Jump = "none";
        img_positionY +=10; ctx.drawImage(grass,grass_X,1,grass_cordinate[0].w,grass_cordinate[0].h,grass_cordinate[0].x,grass_cordinate[0].y,grass_cordinate[0].w,grass_cordinate[0].h);
        ctx.drawImage(img,image_X,image_Y,width,height,img_positionX,img_positionY,width,height);
    }
    for(i = 0; platformPosition[i];i++)
    {
        if((img_positionX+5 >=platformPosition[i].x-35 && img_positionX-5<=platformPosition[i].x+20) && (img_positionY+5 >=platformPosition[i].y-40 && img_positionY-5<=platformPosition[i].y+25 ))
        {
            if(img_positionY+5 >=platformPosition[i].y-40 && img_positionY-5<=platformPosition[i].y-35)
            {
                img_positionY = platformPosition[i].y-50;
                flag = 1;
            }
            else if(img_positionY+5 >=platformPosition[i].y+25 && img_positionY-5<=platformPosition[i].y+50)
            {
                img_positionY = platformPosition[i].y+60;
                flag = 1;
            }
            else if(img_positionX+5 >=platformPosition[i].x-35 && img_positionX-5<=platformPosition[i].x)
            {
                img_positionX = platformPosition[i].x-45;
                BG_srroleX = 0;
                Run_Condition = 1;
            }
            else if(img_positionX+5 >=platformPosition[i].x && img_positionX-5<=platformPosition[i].x+20)
            {
                img_positionX = platformPosition[i].x+30;
                BG_srroleX = 0;
                Run_Condition = 1;
            }
            break;
        }
    }
    if(flag == 1)
    {
        validation = 1;
    }
    else if(img_positionX  >= c.width-50  )
    {
        validation = 1;
        img_positionX -= 1;
    }
    else if (img_positionX <= 0)
    {
        validation = 1;
        img_positionX += 1;
    }
    else 
    {
        validation = 0;
    }
    if(img_positionX >=420 )
    {
        img_positionX = 418;
        BG_srroleX =10;
    }
    else if(img_positionX <=80)
    {
        img_positionX = 82;
        BG_srroleX = 10;
    }
    else if(Run_Condition == 0)
    {
        BG_srroleX = 2;
    }
 
}
function platform()
{   var i; 
    for(i=0; platformPosition[i];i++)
    {
        if(active_key == "right")
        {
            platformPosition[i].x -=BG_srroleX;
        }
        else if(active_key == "left")
        {
            platformPosition[i].x +=BG_srroleX;
        }
       platformTile.src = "wintertileset/png/Tiles/"+platformPosition[i].img+".png";
       ctx.drawImage(platformTile,platformPosition[i].x,platformPosition[i].y,platformPosition[i].w,platformPosition[i].h);
      
    }
    for(i=0;grass_cordinate[i];i++)
    {
        if(active_key == "right")
        {
            grass_cordinate[i].x -=BG_srroleX;
        }
        else if(active_key == "left")
        {
            grass_cordinate[i].x +=BG_srroleX;
        }
    }
    for(i = 3; distroyer[i+8];i++)
    {
        
        if(active_key == "right")
        {
            distroyer[i].X -=BG_srroleX;
        }
        else if(active_key == "left")
        {
            distroyer[i].X +=BG_srroleX;
        }
        distroyer_img.src = "hero/Tiles/images/destroyer.png";
        ctx.drawImage(distroyer_img,1,1,64,64,distroyer[i].X,distroyer[i].Y,distroyer[i].w,distroyer[i].h);   
        if((img_positionX+5 >=distroyer[i].X-25 && img_positionX-5<=distroyer[i].X+25) && (img_positionY+5 >=distroyer[i].Y-20 && img_positionY-5<=distroyer[i].Y+25 ))
        {
            window.alert("GameOver");
            window.location.reload();
        }
    }
    while(distroyer[i])
    {
        
        if(active_key == "right")
        {
            distroyer[i].X -=BG_srroleX;
        }
        else if(active_key == "left")
        {
            distroyer[i].X +=BG_srroleX;
        }
        distroyer_img.src = "hero/Tiles/images/destroyer.png";
        ctx.drawImage(distroyer_img,140,1,64,64,distroyer[i].X,distroyer[i].Y,distroyer[i].w,distroyer[i].h);   
         if((img_positionX+5 >=distroyer[i].X-10 && img_positionX-5<=distroyer[i].X+25) && (img_positionY+5 >=distroyer[i].Y-20 && img_positionY-5<=distroyer[i].Y+25 ))
        {
            window.alert("GameOver");
            window.location.reload();
        }
        i++;
    }
    if(find_key == 0)
    {
        
        if(active_key == "right")
        {
            distroyer[0].X -=BG_srroleX;
        }
        else if(active_key == "left")
        {
            distroyer[0].X +=BG_srroleX;
        }
        if((img_positionX+5 >=distroyer[0].X-25 && img_positionX-5<=distroyer[0].X+25) && (img_positionY+5 >=distroyer[0].Y-20 && img_positionY-5<=distroyer[0].Y+25 ))
        {
            
            window.alert("GameOver");
            window.location.reload();
        }
        ctx.drawImage(Thunder,1,1,64,64,distroyer[0].X,distroyer[0].Y+20,distroyer[0].w,distroyer[0].h-20);   
    }
    if((img_positionX+5 >=distroyer[1].X-25 && img_positionX-5<=distroyer[1].X+25) && (img_positionY+5 >=distroyer[1].Y-20 && img_positionY-5<=distroyer[1].Y+25 ))
    {
        find_key = 1;
    }
    else if(find_key == 0)
    {
        if(active_key == "right")
        {
            distroyer[1].X -=BG_srroleX;
        }
        else if(active_key == "left")
        {
            distroyer[1].X +=BG_srroleX;
        }
        ctx.drawImage(key,1,1,64,64,distroyer[1].X,distroyer[1].Y+8,distroyer[1].w,distroyer[1].h);   
    }
 
}
function clear_cloud()
{
 
    for(i=0;cloud_cord[i];i++)
    {
       ctx.clearRect(cloud_cord[i].x,cloud_cord[i].y,cloud_cord[i].w,cloud_cord[i].h); 
    }   
}
function cloud_Draw()
{
    /*for(i=0;cloud_cord[i];i++)
    {
        ctx.drawImage(cloud,cloud_X,1,cloud_cord[i].w,cloud_cord[i].h,cloud_cord[i].x,cloud_cord[i].y,cloud_cord[i].w,cloud_cord[i].h);
    }*/
}