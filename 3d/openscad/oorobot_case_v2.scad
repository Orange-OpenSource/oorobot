//!OpenSCAD

module remove_material() {
  translate([0, 0, 0]){
    translate([28, 0, -28]){
      scale([1, 2.4, 1]){
        cylinder(r1=14, r2=14, h=4, center=true);
      }
    }
    _side_remove();
    mirror([0,1,0]){
      _side_remove();
    }
  }
}

module battery_case() {
  translate([(arduino_pos - 11), 0, 10]){
    color([1,0.8,0]) {
      cube([18, 93, 60], center=true);
    }
    translate([-14, 0, 0]){
      cube([10, 80, 60], center=true);
    }
  }
}

module _side_remove() {
  difference() {
    translate([10, -40, 0]){
      rotate([90, 0, 0]){
        scale([2, 1, 1]){
          color([1,0.8,0]) {
            cylinder(r1=28, r2=20, h=12, center=true);
          }
        }
      }
    }

    translate([axe_pos, -43, 7.5]){
      rotate([90, 0, 0]){
        color([1,0.8,0]) {
          cylinder(r1=12, r2=20, h=6, center=true);
        }
      }
    }
  }
}

module front_form(with_back) {
  translate([-70, 47, 0]){
    difference() {
      scale([0.4, 1, 1]){
        rotate([90, 0, 0]){
          difference() {
            cylinder(r1=30, r2=30, h=2, center=true);

            translate([15, 0, 0]){
              cube([30, 60, 2], center=true);
            }
          }
          translate([15, 0, 0]){
            cube([30, 60, 2], center=true);
          }
          translate([0, -15, 0]){
            cube([60, 30, 2], center=true);
          }
        }
      }

    }
  }
}

module front() {
  translate([0, 0, 0]){
    union(){
      front_form(null);
      mirror([0,1,0]){
        front_form(null);
      }
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

module pen_spport() {
  translate([axe_pos, 0, 0]){
    difference() {
      union(){
        cylinder(r1=(pen_raduis + 1), r2=(pen_raduis + 1), h=60, center=true);
        translate([0, 0, -23]){
          cylinder(r1=(pen_raduis + 5), r2=(pen_raduis + 1), h=10, center=true);
        }
      }

      cylinder(r1=pen_raduis, r2=pen_raduis, h=60, center=true);
      translate([0, (pen_raduis * 2), -7]){
        sphere(r=(pen_raduis * 1.5));
      }
      translate([0, (pen_raduis * -2), -8]){
        sphere(r=(pen_raduis * 1.5));
      }
    }
  }
}

module case() {
  difference() {
    translate([0, 0, 0]){
      cube([140, 96, 60], center=true);
      front();
    }

    translate([axe_pos, 0, 0]){
      cylinder(r1=pen_raduis, r2=6, h=60, center=true);
    }
    battery_case();
    translate([axe_pos, -40, -7]){
      my_28BYJ();
    }
    translate([axe_pos, 40, -7]){
      my_28BYJ();
    }
    color([0.2,0.6,0.6]) {
      translate([68, 0, 12]){
        rotate([0, 340, 0]){
          cube([30, 90, 70], center=true);
        }
      }
      translate([74, 0, 7]){
        rotate([0, 340, 0]){
          cube([30, 96, 70], center=true);
        }
      }
    }
    translate([0, 0, 2]){
      cube([140, 68, 60], center=true);
    }
    translate([eyes_pos, 0, 10]){
      translate([-20, 0, 0]){
        cube([32, 92, 60], center=true);
      }
    }
    screen_support(false);
    keyboard_support(false);
    side_holes();
    mirror([0,1,0]){
      side_holes();
    }
    bottom_holes();
    mirror([0,1,0]){
      bottom_holes();
    }
    top_holes();
    mirror([0,1,0]){
      top_holes();
    }
    translate([-70, 48, 15]){
      rotate([90, 0, 0]){
        cylinder(r1=4, r2=4, h=4, center=true);
      }
    }
    mirror([0,1,0]){
      translate([-70, 48, 15]){
        rotate([90, 0, 0]){
          cylinder(r1=4, r2=4, h=4, center=true);
        }
      }
    }
  }
}

module left_eye(z_diif) {
  rotate([0, 0, 0]){
    translate([-2, 28, 10]){
      translate([4, 0, z_diif]){
        eye_support(true);
      }
      difference() {
        translate([0, 0, -10]){
          translate([0, -15, -15]){
            cube([4, 7, 24], center=true);
          }
          translate([0, 15, 1]){
            cube([4, 7, 58], center=true);
          }
        }

        translate([4, 0, z_diif]){
          eye_support(false);
        }
      }
      translate([0, 0, -34]){
        cube([4, 36, 8], center=true);
      }
    }
  }
}

module pico(screw) {
  difference() {
    cylinder(r1=3.5, r2=2, h=6, center=false);

    if (screw != false) {
      translate([0, 0, 1]){
        cylinder(r1=1, r2=1, h=5, center=false);
      }
    }

  }
}

module bottom_holes() {
  translate([0, 0, 0]){
    _bottom_holes_1();
    mirror([1,0,0]){
      _bottom_holes_1();
    }
  }
}

module eye_support(screw) {
  rotate([0, 270, 0]){
    rotate([0, 0, 90]){
      translate([-15, 0, 0]){
        translate([0, 13, 2]){
          pico(screw);
        }
        translate([0, -13, 2]){
        }
        translate([30, 13, 2]){
          pico(screw);
        }
        translate([30, -13, 2]){
          pico(screw);
        }
      }
    }
  }
}

module _bottom_holes_1() {
  union(){
    translate([-52, 12, -30]){
      cylinder(r1=0.9, r2=0.9, h=8, center=false);
    }
    translate([-66, 44, -30]){
      cylinder(r1=0.9, r2=0.9, h=8, center=false);
    }
  }
}

module keyboard_support(screw) {
  translate([51, -37.5, 2]){
    rotate([0, 340, 0]){
      rotate([90, 0, 0]){
        rotate([0, 90, 0]){
          translate([0, 0, 0]){
            translate([0, -25.5, 0]){
              translate([0, 0, 0]){
                pico(screw);
              }
            }
            translate([0, 25.5, 0]){
              translate([0, 0, 0]){
                pico(screw);
              }
            }
            translate([75, -25.5, 0]){
              translate([0, 0, 0]){
                pico(screw);
              }
            }
            translate([75, 25.5, 0]){
              translate([0, 0, 0]){
                pico(screw);
              }
            }
          }
        }
      }
    }
  }
}

module side_holes() {
  translate([(eyes_pos - 2), 46, 28]){
    rotate([90, 0, 0]){
      cylinder(r1=1, r2=1, h=5, center=true);
    }
    translate([-10, 0, -56]){
      rotate([90, 0, 0]){
        cylinder(r1=1, r2=1, h=5, center=true);
      }
    }
  }
}

module screen_support(screw) {
  translate([29, 0, -10]){
    mirror([1,0,0]){
      translate([-5, 0, 0]){
        union(){
          translate([-4.5, 0, 0]){
            rotate([0, 353, 0]){
              translate([0, -37.5, 0]){
                translate([0, 0, screen_height]){
                  translate([0, 0, 1]){
                    pico(screw);
                  }
                  translate([31, 0, 1]){
                    pico(screw);
                  }
                }
              }
            }
          }
          translate([-4.5, 0, 0]){
            rotate([0, 353, 0]){
              translate([0, 37.5, 0]){
                translate([0, 0, screen_height]){
                  translate([0, 0, 1]){
                    pico(screw);
                  }
                  translate([31, 0, 1]){
                    pico(screw);
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

module top_holes() {
  translate([0, 0, 0]){
    translate([(eyes_pos - 2), 45, 25]){
      cylinder(r1=1, r2=1, h=5, center=false);
    }
    translate([(arduino_pos + 2), 45, 25]){
      cylinder(r1=1, r2=1, h=5, center=false);
    }
    translate([7, 45, 25]){
      cylinder(r1=1, r2=1, h=5, center=false);
    }
  }
}

module arduino_support(screw) {
  translate([arduino_pos, 0, 0]){
    _arduino_picos(true);
    difference() {
      union(){
        cube([4, 50, 60], center=true);
        translate([0, 0, 27]){
          cube([4, 68, 6], center=true);
        }
      }

      _arduino_picos(false);
      translate([0, 30, 0]){
        scale([1, 0.8, 1]){
          rotate([0, 90, 0]){
            cylinder(r1=26, r2=26, h=4, center=true);
          }
        }
      }
      translate([0, -30, 0]){
        scale([1, 0.8, 1]){
          rotate([0, 90, 0]){
            cylinder(r1=26, r2=26, h=4, center=true);
          }
        }
      }
    }
  }
}

module wheel(thickness) {
  union(){
    translate([0, 0, (0 - thickness)]){
      difference() {
        cylinder(r1=3, r2=6, h=9, center=false);

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
            translate([0, -3, 0]){
              cube([42, 6, thickness], center=false);
            }
          }
        }

      }

      translate([0, 0, (thickness - 3)]){
        difference() {
          cylinder(r1=22, r2=24, h=3, center=false);

          translate([0, 0, 0]){
            cylinder(r1=16, r2=14, h=3, center=false);
          }
        }
      }
      cylinder(r1=2.5, r2=2.5, h=8, center=false);
    }
  }
}

module my_28BYJ() {
  color([0.8,0,0]) {
    translate([0, 10, 14.2]){
      rotate([0, 270, 90]){
        union(){
          cylinder(r1=14.2, r2=14.2, h=40, center=false);
          translate([0, -8.5, 0]){
            cube([13, 17, 40], center=false);
          }
          translate([0, 17.5, 0]){
            cylinder(r1=1.5, r2=1.5, h=40, center=false);
          }
          translate([0, -17.5, 0]){
            cylinder(r1=1.5, r2=1.5, h=40, center=false);
          }
          translate([13, 0, 10]){
            cylinder(r1=8.5, r2=8.5, h=40, center=true);
          }
        }
      }
    }
  }
}

module _arduino_picos(screw) {
  translate([-4, 0, -53]){
    rotate([0, 90, 0]){
      translate([-82, 0, 2]){
        translate([0, -24, 0]){
          color([1,0.8,0]) {
            pico(screw);
          }
        }
        translate([0, 25, 0]){
          pico(screw);
        }
        translate([52, -19, 0]){
          color([1,0.8,0]) {
            pico(screw);
          }
        }
        translate([52, 9, 0]){
          pico(screw);
        }
      }
    }
  }
}

screen_height = 35;
min_materail = true;
axe_pos = 0;
arduino_pos = axe_pos - 34;
pen_raduis = 7;
eyes_pos = arduino_pos + -20;

translate([0, 0, 0]){
  difference() {
    // arduino support
    translate([0, 0, 0]){
      arduino_support(true);
      difference() {
        translate([eyes_pos, 0, 0]){
          left_eye(0);
          mirror([0,1,0]){
            left_eye(-6);
          }
        }

        top_holes();
        mirror([0,1,0]){
          top_holes();
        }
      }
      keyboard_support(true);
      screen_support(true);
      pen_spport();
      case();
    }

    if (min_materail) {
      remove_material();
    }

  }
}