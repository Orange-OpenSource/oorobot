//!OpenSCAD

module bottom() {
  {
    $fn=100;    //set sides to 100
    difference() {
      color([1,0.8,0]) {
        translate([0, 0, 12.5]){
          difference() {
            cube([23, 23, 23.5], center=true);

            translate([9, 9, -12.5]){
              cylinder(r1=1, r2=1, h=5, center=false);
            }
            translate([-9, 9, -12.5]){
              cylinder(r1=1, r2=1, h=5, center=false);
            }
            translate([9, -9, -12.5]){
              cylinder(r1=1, r2=1, h=5, center=false);
            }
            translate([-9, -9, -12.5]){
              cylinder(r1=1, r2=1, h=5, center=false);
            }
          }
        }
        translate([0, 0, 23.5]){
          difference() {
            cube([35, 7, 1.5], center=true);

            translate([15, 0, -0.75]){
              cylinder(r1=1.25, r2=1.25, h=1.5, center=false);
            }
            translate([-15, 0, -0.75]){
              cylinder(r1=1.25, r2=1.25, h=1.5, center=false);
            }
          }
        }
      }

      color([1,0.8,0]) {
        rotate([0, 0, 45]){
          cube([16.2, 16.2, 14], center=true);
        }
      }
    }
  }
}

module top2() {
  {
    $fn=100;    //set sides to 100
    difference() {
      union(){
        translate([0, 0, 0.5]){
          difference() {
            cube([23, 23, 1], center=true);

            translate([9, 9, -0.5]){
              cylinder(r1=1.25, r2=1.25, h=1, center=false);
            }
            translate([-9, 9, -0.5]){
              cylinder(r1=1.25, r2=1.25, h=1, center=false);
            }
            translate([-9, -9, -0.5]){
              cylinder(r1=1.25, r2=1.25, h=1, center=false);
            }
            translate([9, -9, -0.5]){
              cylinder(r1=1.25, r2=1.25, h=1, center=false);
            }
          }
        }
        difference() {
          sphere(r=9.4);

          translate([-10, -10, 0]){
            cube([20, 20, 10], center=false);
          }
          translate([-10, -10, -14]){
            cube([20, 20, 10], center=false);
          }
        }
      }

      sphere(r=8.6);
    }
  }
}

mirror([0,0,1]){
  translate([0, 30, -24.2]){
    bottom();
  }
  translate([0, 0, -1]){
    top2();
  }
}