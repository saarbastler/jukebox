include <raspberrypi.scad>

module taster()
{
  color("darkgrey")
  {
    translate([-4, 0,0]) cube([8, 4, 8]);
  
    translate([0, 4,4])  rotate([-90,0,0]) cylinder(d=3, h=9);
  }
}

module ioBoard()
{
  translate([0,0,-12-1.6])
  {
    color("gold") difference()
    {
      hull()
      {
        translate([-(65-6)/2,-(30-6)/2,0]) cylinder(r=3, h=1.6 );
        translate([-(65-6)/2, (30-6)/2,0]) cylinder(r=3, h=1.6 );
        translate([ (65-6)/2,-(30-6)/2,0]) cylinder(r=3, h=1.6 );
        translate([ (65-6)/2, (30-6)/2,0]) cylinder(r=3, h=1.6 );
      }
      
      translate([-65/2+3.5,-23/2,-1]) cylinder(d=2.75, h=3);
      translate([-65/2+3.5, 23/2,-1]) cylinder(d=2.75, h=3);
      translate([65/2-3.5,-23/2,-1]) cylinder(d=2.75, h=3);
      translate([65/2-3.5, 23/2,-1]) cylinder(d=2.75, h=3);
    }
    
    translate([-10.8,-10,1.6]) rotate([0,0,180]) taster();
    translate([    0,-10,1.6]) rotate([0,0,180]) taster();
    translate([ 10.8,-10,1.6]) rotate([0,0,180]) taster();
    
    color("lightgrey") 
    {
      translate([-21.6-8.5/2,-22.5,1.6]) cube([8.5, 19, 6]);
      translate([ 21.6-8.5/2,-22.5,1.6]) cube([8.5, 19, 6]);
    }
    
    translate([3.5-65/2+29-10*2.54,30/2-3.5-2.54,13.6-8.2])
      color("darkgrey") cube([2.54*20,5.08,8.2]);

    translate([3.5-65/2+29-10*2.54,30/2-3.5-2.54,1.4])
      header(20,2);
  }
}

wand= 1.6;
bhoehe = 14;
wx= 71;
wy= 30;
hoehe= 32;
spiel= .2;

module grundform(h)
{
  hull()
  {
    translate([-wx/2-wand/2, -wy/2-wand/2,-wand/2]) sphere(d=wand);
    translate([ wx/2+wand/2, -wy/2-wand/2,-wand/2]) sphere(d=wand);
    translate([-wx/2-wand/2,  wy/2+wand/2,-wand/2]) sphere(d=wand);
    translate([ wx/2+wand/2,  wy/2+wand/2,-wand/2]) sphere(d=wand);
  }

  hull()
  {
    translate([-wx/2-wand/2, -wy/2-wand/2, -wand/2]) cylinder(d=wand, h=h);
    translate([ wx/2+wand/2, -wy/2-wand/2, -wand/2]) cylinder(d=wand, h=h);
  }

  hull()
  {
    translate([-wx/2-wand/2,  wy/2+wand/2, -wand/2]) cylinder(d=wand, h=h);
    translate([ wx/2+wand/2,  wy/2+wand/2, -wand/2]) cylinder(d=wand, h=h);
  }

  hull()
  {
    translate([-wx/2-wand/2, -wy/2-wand/2, -wand/2]) cylinder(d=wand, h=h);
    translate([-wx/2-wand/2,  wy/2+wand/2, -wand/2]) cylinder(d=wand, h=h);
  }

  hull()
  {
    translate([ wx/2+wand/2, -wy/2-wand/2, -wand/2]) cylinder(d=wand, h=h);
    translate([ wx/2+wand/2,  wy/2+wand/2, -wand/2]) cylinder(d=wand, h=h);
  }
}

module fuehrung()
{
  translate([-wx/2,   8.75,-wand/2]) cube([4.5,2,hoehe]);
  translate([-wx/2,   10  ,-wand/2]) cube([2.5,5,hoehe]);
  translate([-wx/2,  -1   ,-wand/2]) cube([4.5,2,hoehe]);
  translate([-wx/2,  -2.5 ,-wand/2]) cube([2.5,2,hoehe]);
  translate([-wx/2, -13   ,-wand/2]) cube([4.5,2,hoehe]);
  translate([-wx/2, -15   ,-wand/2]) cube([2.5,2,hoehe]);
}

module boden()
{
  difference()
  {
    grundform(hoehe);

    translate([-65/2+2, -hoehe/2-wand-1, 2]) cube([65-4, 3*wand, 40]);
    
    translate([-10.8,7.1,-3]) cylinder(d=4,h=10);
    translate([    0,7.1,-3]) cylinder(d=4,h=10);
    translate([ 10.8,7.1,-3]) cylinder(d=4,h=10);
    
    translate([-21.6-5, 4,-3]) cube([10, 8, 10]);
    translate([ 21.6-5, 4,-3]) cube([10, 8, 10]);
    
    translate([-65/2-6+54,-8,-3]) cube([12,9,10]);
  }

  fuehrung();
  mirror([1,0,0]) fuehrung();
}

module deckel()
{
  grundform(wand/2);
  
  translate([spiel-65/2+2, wy/2, 0]) cube([65-4-2*spiel, wand, 3]);
  
  translate([spiel-wx/2, spiel+2.5,0]) cube([2,8.5-2*spiel,5]);
  translate([spiel-wx/2, spiel-8.75,0]) cube([2,7.75-2*spiel,5]);

  translate([wx/2-2-spiel, spiel+2.5,0]) cube([2,8.5-2*spiel,5]);
  translate([wx/2-2-spiel, spiel-8.75,0]) cube([2,7.75-2*spiel,5]);
  
  translate([-wx/2+2.5+spiel, -wy/2+spiel,0]) difference()
  {
    cube([wx-5-2*spiel,2,5]);
    
    translate([6,-1,2]) cube([wx-12-5-2*spiel,6,4]);
  }
}

*#translate([-65/2-2.5, -2, 20]) cube([2.5,1,1]);

*deckel();
color("blue") boden();
color("blue") translate([0,0,hoehe-wand/2]) rotate([180,0,0]) deckel();

translate([0,-1,15]) rotate([90,0,0])
{
  speakerPhat();
  zero(1);
  ioBoard();
}

*surface(file = "Speaker_pHAT.png");
