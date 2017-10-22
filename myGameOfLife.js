// creacion de tablero
function crearTablero(height, width){
  this.tablero = new Array(height);
  for (var x = 0; x < this.tablero.length; x++) {
    this.tablero[x] = new Array(width);
  }
}


// llenado aleatorio del tablero
function llenarTablero(){
  for (var x = 0; x < this.tablero.length; x++) {
    for (var y = 0; y < this.tablero[x].length; y++) {
      this.tablero[x][y]= Math.round(Math.random()); //llenando los vectores con 0 y 1
    }
  }
}


// en esta funcion se determina la vida de las celulas en el siguiente turno
sigTurno = function() {
  //se crea un tablero auxiliar del mismo tamaño para ir guardando ahi los resultados para el siguiente turno
  var auxTablero = new Array(this.tablero.length);
  for (var i = 0; i < this.tablero.length; i++) {
    auxTablero[i] = new Array(this.tablero[i].length);
  }

  //se empieza a recorrer el tablero para contar los vecinos
  for (var x = 0; x < this.tablero.length; x++) {
    for (var y = 0; y < this.tablero[x].length; y++) {
      var vecinos = 0;
      //se cuentan los vecinos con dos ciclos para recorrer de -1 a 1 en ambos ejes
      for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
          //cuando se valida a la misma celula no se agregan vecinos aunque su valor sea 1
          if ( dx == 0 && dy == 0){}
          //de otra manera a todos los demas si, mientras existan en el tablero(no sean indefinidos) y su valor sea de 1
          else if (typeof this.tablero[x+dx] !== 'undefined' && typeof this.tablero[x+dx][y+dy] !== 'undefined' && this.tablero[x+dx][y+dy]==1) {
            vecinos++;
          }
        }
      }

      //aquí se evalua el numero de vecinos con las reglas existentes
      var vida = this.tablero[x][y];
      if (vecinos==3) {
        vida=1;
      } else if (vida==1&&vecinos==2) {
        vida=1;
      } else{
        vida=0;
      }
      //se llena la célula del tablero auxiliar con el resultado
      auxTablero[x][y] = vida;
    }
  }
  //se regresa el valor del tablero auxiliar
  this.tablero=auxTablero.slice();
}


function imprimirTablero(ctx) {
  for (var x = 0; x < this.tablero.length; x++) {
    for (var y = 0; y < this.tablero[x].length; y++) {
      if (this.tablero[x][y]==1) {
        ctx.fillStyle="black";
      } else{
        ctx.fillStyle="gray";
      }
      ctx.fillRect(y*5,x*5,5,5);
    }
  }
}

function init(){
  var height=50;
  var width=50;
  crearTablero(height,width);
  llenarTablero();
  var ctx;
  var canvas=document.getElementById('tabla');
  if(canvas.getContext){
    ctx=canvas.getContext('2d');
  }else{
    return 1;
  }
  setInterval(function(){
    imprimirTablero(ctx, this.tablero);
    sigTurno(this.tablero);
  },250);
}
