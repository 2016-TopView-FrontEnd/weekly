var colorBase = ['red', 'orange', 'yellow', 'green', 'blue', 'purple','black'];

var card = '';

for(var i = 0; i < colorBase.length; i++){
  card += '<ul class="swatches '+ colorBase[i] +'">';
  for(var j = 0; j < 21; j++){
    card += '<li></li>';
  }
  card += '</ul>';
}

document.body.innerHTML += card;