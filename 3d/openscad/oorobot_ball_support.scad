//!OpenSCAD

module bottom() {
  height = 28;
  {
    $fn=100;    //set sides to 100
    difference() {
      translate([0, 0, (height / 2)]){
        cube([23, 23, height], center=true);
      }

      translate([0, 0, height]){
        rotate([0, 0, 45]){
          cube([16.5, 16.5, 16.5], center=true);
        }
        translate([9, 9, -5]){
          cylinder(r1=1, r2=1, h=5, center=false);
        }
        translate([9, -9, -5]){
          cylinder(r1=1, r2=1, h=5, center=false);
        }
        translate([-9, 9, -5]){
          cylinder(r1=1, r2=1, h=5, center=false);
        }
        translate([-9, -9, -5]){
          cylinder(r1=1, r2=1, h=5, center=false);
        }
      }
    }
    translate([0, 0, 0.75]){
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

translate([0, 30, 0]){
  bottom();
}
mirror([0,0,1]){
  translate([0, 0, -1]){
    top2();
  }
}