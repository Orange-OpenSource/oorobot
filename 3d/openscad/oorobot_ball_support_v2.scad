//!OpenSCAD

module ball_support() {
  translate([0, 0, 0]){
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

ball_support();