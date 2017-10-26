//!OpenSCAD

module wheel(thickness) {
  union(){
    translate([0, 0, (0 - thickness)]){
      color([0.2,0.6,0.6]) {
        difference() {
          cylinder(r1=4, r2=6, h=9, center=false);

          translate([0, 0, 1]){
            difference() {
              cylinder(r1=2.5, r2=2.5, h=8, center=false);

              translate([1.5, -7, 0]){
                cube([5, 10, 7], center=false);
              }
              translate([-6.5, -7, 0]){
                cube([5, 10, 7], center=false);
              }
            }
          }
        }
      }
    }
    difference() {
      {
        $fn=200;    //set sides to 200
        cylinder(r1=45, r2=45, h=thickness, center=false);
      }

      {
        $fn=100;    //set sides to 100
        cylinder(r1=41, r2=41, h=thickness, center=false);
      }
      difference() {
        cylinder(r1=22, r2=24, h=thickness, center=false);

        translate([0, 0, 0]){
          cylinder(r1=16, r2=14, h=thickness, center=false);
        }
      }
      translate([0, 0, 0.5]){
        difference() {
          {
            $fn=200;    //set sides to 200
            cylinder(r1=46, r2=46, h=(thickness - 1), center=false);
          }

          {
            $fn=200;    //set sides to 200
            cylinder(r1=44.4, r2=44.4, h=(thickness - 1), center=false);
          }
        }
      }
      translate([0, 0, 2]){
        cylinder(r1=2.5, r2=2.5, h=9, center=false);
      }
    }
    difference() {
      union(){
        translate([0, 0, (0 - 2)]){
          intersection() {
            difference() {
              cylinder(r1=22, r2=24, h=2, center=false);

              translate([0, 0, 0]){
                cylinder(r1=16, r2=14, h=2, center=false);
              }
            }

            for (i = [0 : abs(60) : 360]) {
              rotate([0, 0, i]){
                translate([0, -3, 0]){
                  cube([42, 6, thickness], center=false);
                }
              }
            }

          }
        }
        for (i = [0 : abs(60) : 360]) {
          rotate([0, 0, i]){
            translate([2, -3, 0]){
              cube([42, 6, thickness], center=false);
            }
          }
        }

      }

      translate([0, 0, (thickness - 3)]){
        color([1,0.8,0]) {
          difference() {
            cylinder(r1=22, r2=24, h=3, center=false);

            translate([0, 0, 0]){
              cylinder(r1=16, r2=14, h=3, center=false);
            }
          }
        }
      }
      cylinder(r1=2.5, r2=2.5, h=8, center=false);
    }
  }
}

module ball_support() {
  translate([0, 60, 0]){
    difference() {
      translate([0, 0, 0]){
        cylinder(r1=9.5, r2=9.5, h=15, center=true);
      }

      union(){
        sphere(r=8.5);
        translate([0, 0, 4.25]){
          cylinder(r1=8.5, r2=8.5, h=8.5, center=true);
        }
      }
      translate([0, 0, (-8.5 + 1)]){
        color([0.6,0.6,0]) {
          cylinder(r1=9.5, r2=9.5, h=4, center=true);
        }
      }
    }
    translate([0, 0, (8.5 - 2)]){
      difference() {
        cube([8, 30, 2], center=true);

        cylinder(r1=8.5, r2=8.5, h=2, center=true);
        translate([0, 12, 0]){
          cylinder(r1=1.3, r2=1.3, h=2, center=true);
        }
        translate([0, -12, 0]){
          cylinder(r1=1.3, r2=1.3, h=2, center=true);
        }
      }
    }
  }
}

wheel(4.5);