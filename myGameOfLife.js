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
  imprimirTablero();
  detener();
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


function imprimirTablero() {
  var ctx;
  this.canvas=document.getElementById('tabla');
  if(canvas.getContext){
    ctx=this.canvas.getContext('2d');
  }
  for (var x = 0; x < this.tablero.length; x++) {
    for (var y = 0; y < this.tablero[x].length; y++) {
      if (this.tablero[x][y]==1) {
        ctx.fillStyle="#2c3e50";
      } else{
        ctx.fillStyle="white";
      }
      ctx.fillRect(y*5,x*5,5,5);
    }
  }
}

function init(){
  this.height=50;
  this.width=50;
  this.velocidad=400;
  crearTablero(this.height,this.width);
  llenarPistola();
  this.btnPistola = document.getElementById("pistola");
  this.btnIniciar = document.getElementById("iniciar");
  this.btnAleatorio = document.getElementById("aleatorio");
  this.btnDetener = document.getElementById("detener");
  this.btnAcelerar = document.getElementById("acelerar");
  this.btnRalentizar = document.getElementById("ralentizar");
  this.lblVelocidad = document.getElementById("velocidad")
}

function correr(){
  this.intervalID = setInterval(function(){
    imprimirTablero();
    sigTurno();
  },this.velocidad);

  this.lblVelocidad.innerHTML=this.velocidad/1000;
  this.btnDetener.disabled=false;
  this.btnAcelerar.disabled=false;
  this.btnRalentizar.disabled=false;
  this.btnAleatorio.disabled=true;
  this.btnPistola.disabled=true;
  this.btnIniciar.disabled=true;
}

function detener() {
  clearInterval(this.intervalID);
  this.btnDetener.disabled=true;
  this.btnAcelerar.disabled=true;
  this.btnRalentizar.disabled=true;
  this.btnAleatorio.disabled=false;
  this.btnPistola.disabled=false;
  this.btnIniciar.disabled=false;
}

function acelerar(){
  detener();
  if (this.velocidad>=50) {
    this.velocidad/=2;
  }
  correr();
};

function ralentizar(){
  detener();
  if (this.velocidad<2000) {
    this.velocidad*=2;
  }
  correr();
}

function llenarPistola(){
  for (var x = 0; x < this.tablero.length; x++) {
    for (var y = 0; y < this.tablero[x].length; y++) {
      tablero[x][y]=0;
    }
  }
  this.tablero[0][24]=1;
  this.tablero[1][22]=1;
  this.tablero[1][24]=1;
  this.tablero[2][12]=1;
  this.tablero[2][13]=1;
  this.tablero[2][20]=1;
  this.tablero[2][21]=1;
  this.tablero[2][34]=1;
  this.tablero[2][35]=1;
  this.tablero[3][11]=1;
  this.tablero[3][15]=1;
  this.tablero[3][20]=1;
  this.tablero[3][21]=1;
  this.tablero[3][34]=1;
  this.tablero[3][35]=1;
  this.tablero[4][0]=1;
  this.tablero[4][1]=1;
  this.tablero[4][10]=1;
  this.tablero[4][16]=1;
  this.tablero[4][20]=1;
  this.tablero[4][21]=1;
  this.tablero[5][0]=1;
  this.tablero[5][1]=1;
  this.tablero[5][10]=1;
  this.tablero[5][14]=1;
  this.tablero[5][16]=1;
  this.tablero[5][17]=1;
  this.tablero[5][22]=1;
  this.tablero[5][24]=1;
  this.tablero[6][10]=1;
  this.tablero[6][16]=1;
  this.tablero[6][24]=1;
  this.tablero[7][11]=1;
  this.tablero[7][15]=1;
  this.tablero[8][12]=1;
  this.tablero[8][13]=1;
  imprimirTablero();
}

function agregarFila(){
  this.canvas.height += 5;
  this.tablero.push(new Array(this.tablero[0].length));
  imprimirTablero();
}

function eliminarFila(){
  if (this.canvas.height > 5) {
    this.canvas.height -= 5;
    this.tablero.pop();
    imprimirTablero();
  }
}

function agregarColumna(){
  this.canvas.width += 5;
  for (var x = 0; x < this.tablero.length; x++) {
    this.tablero[x].push(0);
  }
  imprimirTablero();
}

function eliminarColumna(){
  if (this.canvas.width > 5) {
    this.canvas.width -= 5;
    for (var x = 0; x < this.tablero.length; x++) {
      this.tablero[x].pop();
    }
    imprimirTablero();
  }
}
