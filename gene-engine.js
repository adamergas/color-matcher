var par1 = {};
var par2 = {};
var environ = {};
var children = [];

$(document).ready(function() {
  $("#generate_environment").on("click", function(){ genEnviron() });
  $("#random_parents").on("click", function(){ randPar() });
  $("#generate_offspring").on("click", function(){ genOff() });
  $("#select_new").on("click", function(){ selectNewPar() });
});

function genEnviron(){
  const re = rand(),
        ge = rand(),
        be = rand();

  environ = { r: re,
              g: ge,
              b: be,
              color: `#${re.toString(16)}${ge.toString(16)}${be.toString(16)}`}
  $('body').css('background-color', environ.color);
}

function randPar() {
  const r1 = rand(),
        r2 = rand(),
        g1 = rand(),
        g2 = rand(),
        b1 = rand(),
        b2 = rand();

  par1 = {  r: r1,
            g: g1,
            b: b1,
            color: `#${r1.toString(16)}${g1.toString(16)}${b1.toString(16)}`}
  par2 = {  r: r2,
            g: g2,
            b: b2,
            color: `#${r2.toString(16)}${g2.toString(16)}${b2.toString(16)}`}

  $("#parent1").css('background-color', par1.color);
  $("#parent2").css('background-color', par2.color);
}

function genOff(){
  children = [];
  for(let i = 1; i < 9; i++){
    createChild();
    $(`#child${i}`).css('background-color', children[i-1].color );
  }
}

function createChild(){
  let child = { r: mutator(Math.floor(Math.random() * (par1.r -par2.r) + par2.r)),
                g: mutator(Math.floor(Math.random() * (par1.g -par2.g) + par2.g)),
                b: mutator(Math.floor(Math.random() * (par1.b -par2.b) + par2.b)),
              };
  child['color'] = `#${child.r.toString(16)}${child.g.toString(16)}${child.b.toString(16)}`;
  children.push(child);
}

function selectNewPar() {
  //select the most fit individuals from the children array
  children = children.map(function(c){
    c['health'] = Math.abs(c.r - environ.r) + Math.abs(c.g - environ.g) + Math.abs(c.b - environ.b);
    return c;
  }).sort(function(a, b){
    return a.health - b.health;
  });

  par1 = children[0];
  par2 = children[1];
  $("#parent1").css('background-color', par1.color);
  $("#parent2").css('background-color', par2.color);
}

function mutator(val){
  if(mutate()){
    switch( Math.floor(Math.random() * 10)){
      case 0: return 0;
      case 1: case 2: return Math.round(val * 1.2);
      case 3:case 4: return Math.round(val * 1.1);
      case 5: case 6: return Math.round(val * 0.9);
      case 7: case 8: return Math.round(val * 0.8);
      case 9: return 255;
      default: return val;
    }
  }
  else{ return val; }
}

function mutate(){
  return 0 == Math.floor(Math.random() * 10);
}

function rand() {
  return Math.floor(Math.random() * 256);
}
