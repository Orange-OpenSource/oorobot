//!OpenSCAD

module roue(epaisseur) {
  union(){
    translate([0, 0, 1]){
      difference() {
        cylinder(r1=6, r2=6, h=9, center=false);

        difference() {
          cylinder(r1=2.5, r2=2.5, h=9, center=false);

          translate([1.5, -7, 0]){
            cube([5, 10, 7], center=false);
          }
          translate([-6.5, -7, 0]){
            cube([5, 10, 7], center=false);
          }
        }
      }
    }
    difference() {
      {
        $fn=200;    //set sides to 200
        cylinder(r1=45, r2=45, h=epaisseur, center=false);
      }

      for (i = [0 : abs(90) : 360]) {
        rotate([0, 0, i]){
          translate([24, 0, 0]){
            cylinder(r1=16, r2=16, h=epaisseur, center=false);
          }
        }
      }

      for (i = [0 : abs(90) : 360]) {
        rotate([0, 0, (i + 45)]){
          translate([35, 0, 0]){
            cylinder(r1=6, r2=6, h=epaisseur, center=false);
          }
        }
      }

      translate([0, 0, 0.5]){
        difference() {
          {
            $fn=200;    //set sides to 200
            cylinder(r1=46, r2=46, h=(epaisseur - 1), center=false);
          }

          {
            $fn=200;    //set sides to 200
            cylinder(r1=44.4, r2=44.4, h=(epaisseur - 1), center=false);
          }
        }
      }
      translate([0, 0, 2]){
        cylinder(r1=2.5, r2=2.5, h=9, center=false);
      }
    }
  }
}

roue(4.5);
screen_height = 35;
