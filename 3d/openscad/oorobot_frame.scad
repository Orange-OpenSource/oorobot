//!OpenSCAD

module left_eye() {
  translate([47, -22, 30]){
    rotate([0, 60, 0]){
      scale([1, 1, 1.4]){
        difference() {
          translate([0, 0, 0]){
            translate([0, 13, 2]){
              pico();
            }
            translate([0, -13, 2]){
              pico();
            }
            translate([30, 13, 2]){
              pico();
            }
            translate([30, -13, 2]){
              pico();
            }
            translate([-4, -17, 0]){
              cube([38, 34, 2], center=false);
            }
            color([0.93,0,0]) {
              translate([14, 14, 0]){
                cube([10, 10, 2], center=false);
                translate([9, 0, 0]){
                  rotate([0, 0, 20]){
                    cube([4, 10, 2], center=false);
                  }
                }
              }
            }
          }

          translate([24, 16, 0]){
            cylinder(r1=1, r2=1, h=2, center=false);
          }
        }
      }
    }
  }
}

module right_eye() {
  translate([47, 22, 30]){
    rotate([0, 60, 0]){
      scale([1, 1, 1.4]){
        difference() {
          translate([0, 0, 0]){
            translate([0, 13, 2]){
              pico();
            }
            translate([0, -13, 2]){
              pico();
            }
            translate([30, 13, 2]){
              pico();
            }
            translate([30, -13, 2]){
              pico();
            }
            translate([-4, -17, 0]){
              cube([38, 34, 2], center=false);
            }
            color([0.93,0,0]) {
              translate([14, -24, 0]){
                cube([10, 10, 2], center=false);
                translate([5.5, 0, 0]){
                  rotate([0, 0, 340]){
                    cube([4, 10, 2], center=false);
                  }
                }
              }
            }
          }

          translate([24, -16, 0]){
            cylinder(r1=1, r2=1, h=2, center=false);
          }
        }
      }
    }
  }
}

module screen_support() {
  translate([-5, 0, 0]){
    union(){
      translate([-4.5, 0, 0]){
        rotate([0, 353, 0]){
          translate([0, -37.5, 0]){
            translate([-2, -4.5, screen_height]){
              hull(){
                cube([35.5, 8, 1], center=false);
                translate([0, 0, -10]){
                  cube([35.5, 1, 1], center=false);
                }
              }
            }
            translate([0, 0, screen_height]){
              translate([0, 0, 1]){
                pico();
              }
              translate([31, 0, 1]){
                pico();
              }
            }
          }
        }
      }
      translate([-4.5, 0, 0]){
        rotate([0, 353, 0]){
          translate([0, 37.5, 0]){
            translate([-2, -4.5, screen_height]){
              hull(){
                cube([35.5, 8, 1], center=false);
                translate([0, 8, -10]){
                  cube([35.5, 1, 1], center=false);
                }
              }
            }
            translate([0, 0, screen_height]){
              translate([0, 0, 1]){
                pico();
              }
              translate([31, 0, 1]){
                pico();
              }
            }
          }
        }
      }
    }
  }
}

module keyboard_support() {
  translate([-86, 0, 3]){
    translate([0, -25.5, 0]){
      translate([0, 0, height]){
        pico();
      }
      hull(){
        translate([-3, -3, height]){
          cube([6, 6, 1], center=false);
        }
        translate([0, -18.5, 0]){
          cube([6, 6, 1], center=false);
        }
      }
    }
    translate([0, 25.5, 0]){
      translate([0, 0, height]){
        pico();
      }
      hull(){
        translate([-3, -3, height]){
          cube([6, 6, 1], center=false);
        }
        translate([0, 12.5, 0]){
          cube([6, 6, 1], center=false);
        }
      }
    }
    translate([75, -25.5, 0]){
      translate([0, 0, height]){
        pico();
      }
      cylinder(r1=4, r2=2.5, h=height, center=false);
    }
    translate([75, 25.5, 0]){
      translate([0, 0, height]){
        pico();
      }
      cylinder(r1=4, r2=2.5, h=height, center=false);
    }
  }
}

module arduino_support() {
  translate([-82, 0, 2]){
    translate([0, -24, 0]){
      color([1,0.8,0]) {
        pico();
      }
    }
    translate([0, 25, 0]){
      pico();
    }
    translate([52, -19, 0]){
      color([1,0.8,0]) {
        pico();
      }
    }
    translate([52, 9, 0]){
      pico();
    }
  }
}

module pico() {
  difference() {
    cylinder(r1=2.5, r2=2.5, h=6, center=false);

    translate([0, 0, 1]){
      cylinder(r1=1, r2=1, h=5, center=false);
    }
  }
}

module battery_holder() {
  translate([-20, 0, -15]){
    translate([0, 0, 7.5]){
      cube([92, 56, 15], center=true);
    }
    translate([-38, 0, 15]){
      cylinder(r1=screw_hole_radius, r2=1, h=3, center=false);
    }
    translate([38, 0, 15]){
      cylinder(r1=screw_hole_radius, r2=1, h=3, center=false);
    }
  }
}

module ball_catcher_pico() {
  union(){
    translate([0, 15, 0]){
      cylinder(r1=screw_hole_radius, r2=1, h=3, center=false);
    }
    translate([0, -15, 0]){
      cylinder(r1=screw_hole_radius, r2=1, h=3, center=false);
    }
  }
}

module pen_support() {
  difference() {
    union(){
      cylinder(r1=(pen_raduis + 1), r2=(pen_raduis + 1), h=30, center=false);
      cylinder(r1=(pen_raduis + 5), r2=(pen_raduis + 1), h=10, center=false);
    }

    cylinder(r1=pen_raduis, r2=pen_raduis, h=30, center=false);
  }
}

module frame() {
  union(){
    translate([0, 0, 3]){
      difference() {
        translate([-90, (width / -2), -3]){
          union(){
            ground();
            translate([0, (width - 3), 0]){
              side(true);
            }
            side(false);
          }
        }

        translate([axe_pos, (width / -2), 0]){
          my_28BYJ();
        }
        translate([axe_pos, (width / 2), 0]){
          my_28BYJ();
        }
        translate([axe_pos, 0, -3]){
          cylinder(r1=pen_raduis, r2=6, h=10, center=false);
        }
      }
    }
    translate([axe_pos, (width / 1.5), 16]){
      rotate([90, 0, 0]){
      }
    }
    translate([axe_pos, 0, 3]){
      pen_support();
    }
  }
}

module my_28BYJ() {
  translate([0, 10, 14.2]){
    rotate([0, 270, 90]){
      union(){
        cylinder(r1=14.2, r2=14.2, h=20, center=false);
        translate([0, -8.5, 0]){
          cube([25, 17, 17], center=false);
        }
        translate([0, 17.5, 0]){
          cylinder(r1=1.5, r2=1.5, h=20, center=false);
        }
        translate([0, -17.5, 0]){
          cylinder(r1=1.5, r2=1.5, h=20, center=false);
        }
      }
    }
  }
}

module ground() {
  difference() {
    cube([170, width, 3], center=false);

    translate([30, 20, 0]){
      cylinder(r1=15, r2=15, h=3, center=false);
    }
    translate([30, (width - 20), 0]){
      cylinder(r1=15, r2=15, h=3, center=false);
    }
    translate([80, (width / 2), 0]){
      cylinder(r1=15, r2=15, h=3, center=false);
    }
  }
}

module side(mirror2) {
  difference() {
    intersection() {
      cube([170, 3, 40], center=false);

      color([1,0.8,0]) {
        translate([68, 0, -35]){
          rotate([270, 0, 0]){
            {
              $fn=100;    //set sides to 100
              cylinder(r1=110, r2=110, h=3, center=false);
            }
          }
        }
      }

    }

    color([0.4,0.2,0]) {
      translate([0, 2, 12]){
        if (mirror2) {
          translate([80, 1, 0]){
            mirror([1,0,0]){
              rotate([90, 0, 0]){
                // size is multiplied by 0.75 because openScad font sizes are in points, not pixels
                linear_extrude( height=1, twist=0, center=false){
                  text("oorobot", font = "Roboto", size = 22*0.75);
                }

              }
            }
          }
        } else {
          translate([2, -1, 0]){
            rotate([90, 0, 0]){
              // size is multiplied by 0.75 because openScad font sizes are in points, not pixels
              linear_extrude( height=1, twist=0, center=false){
                text("oorobot", font = "Roboto", size = 22*0.75);
              }

            }
          }
        }

      }
    }
  }
}

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

screw_hole_radius = 0.95;
height = 24;
width = 88;
pen_raduis = 7;
axe_pos = 35;
union(){
  difference() {
    frame();

    battery_holder();
    translate([-79, 0, 0]){
      ball_catcher_pico();
    }
  }
  right_eye();
  left_eye();
  screen_support();
  keyboard_support();
  arduino_support();
}
screen_height = 35;
