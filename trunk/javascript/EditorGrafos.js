
/* Declaração de variaveis */
var canvas = document.getElementById( "canvas" );
var contexto = canvas.getContext( "2d" );
var posXY = document.getElementById( "posXY" );
var xCanvas = 0;
var yCanvas = 0;
var larguraCanvas = 1000;
var alturaCanvas = 500;
var acao;
var actNode = null;
var vertice = new Array();
var acoes = { "mover":0, "inserirVertice":1, "deletarVertice":2, "inserirAresta":3, "deletarAresta":4 };	
	
/* Referencia aos botões */
var criarVerticeButton = document.getElementById( "criaVertice" );
var deletarVertice = document.getElementById( "deleteVertice" );
var criarArestaButton = document.getElementById("ligaVertice");
var moverButton = document.getElementById("mover");

/* Constantes */
const descCanvasX = 10;
const descCanvasY = 128;

/* Escutas de eventos */
window.addEventListener( 'load', atualizarCanvas, false );
window.addEventListener( 'load', mouseMove, false );

criarVerticeButton.addEventListener( 'click', inserirVertice, false );
criarArestaButton.addEventListener( 'click', inserirAresta, false );
moverButton.addEventListener( 'click', mover, false );

canvas.addEventListener( 'click', mouseClick, false );
canvas.addEventListener( 'mousemove', mouseMove, false );
window.addEventListener( 'mousedown', onMouseDown, false);
window.addEventListener( 'mouseup', onMouseUp, false);

function desenhar_aresta( ox, oy, dx, dy )
{
	var disx = ox - dx;
	var disy = oy - dy;
	if( disx >= 0 && disy >= 0 )
	{
		if( Math.abs( disx ) >= Math.abs( disy ) )
		{
			disy = -disy/disx;
			disx = -1;
					
		} 
		else 
		{
			disx = -disx/disy;
			disy = -1;	
		}
	} 
	else if( disx >= 0 && disy <= 0 )
	{
		if( Math.abs( disx ) >= Math.abs( disy ) )
		{
			disy = -disy/disx;
			disx = -1;
					
		} 
		else 
		{
			disx = disx/disy;
			disy = 1;	
		}				
	}
	else if( disx <= 0 && disy >= 0 )
	{
		if( Math.abs( disx ) >= Math.abs( disy ) )
		{
			disy = disy/disx;
			disx = 1;
					
		} 
		else 
		{
			disx = -disx/disy;
			disy = -1;	
		}
	}
	else
	{
		if( Math.abs( disx ) >= Math.abs( disy ) )
		{
			disy = disy/disx;
			disx = 1;
					
		} 
		else 
		{
			disx = disx/disy;
			disy = 1;	
		}
	}
	
	contexto.beginPath();
	contexto.lineWidth = 3;
	contexto.moveTo(ox - 10, oy - 102);
	contexto.lineTo(dx - 10 - disx*29, dy - 102 - disy*29);
	contexto.stroke();
	contexto.closePath();

	contexto.beginPath();
	contexto.lineWidth = 15;
	contexto.moveTo(dx - 10 - disx*30, dy - 102 - disy*30);
	contexto.lineTo(dx - 10 - disx*27, dy - 102 - disy*27);
	contexto.stroke();
	contexto.closePath();

	contexto.beginPath();
	contexto.lineWidth = 12;
	contexto.moveTo(dx - 10 - disx*28, dy - 102 - disy*28);
	contexto.lineTo(dx - 10 - disx*24, dy - 102 - disy*24);
	contexto.stroke();
	contexto.closePath();			

	contexto.beginPath();
	contexto.lineWidth = 9;
	contexto.moveTo(dx - 10 - disx*25, dy - 102 - disy*25);
	contexto.lineTo(dx - 10 - disx*21, dy - 102 - disy*21);
	contexto.stroke();
	contexto.closePath();
	
	contexto.beginPath();
	contexto.lineWidth = 6;
	contexto.moveTo(dx - 10 - disx*22, dy - 102 - disy*22);
	contexto.lineTo(dx - 10 - disx*18, dy - 102 - disy*18);
	contexto.stroke();
	contexto.closePath();

	contexto.beginPath();
	contexto.lineWidth = 3;
	contexto.moveTo(dx - 10 - disx*19, dy - 102 - disy*19);
	contexto.lineTo(dx - 10 - disx*10, dy - 102 - disy*10);
	contexto.stroke();
	contexto.closePath();

}

function atualizarCanvas( e ) 
{				
	desenharFundoCanvas();	
	
	var numVertices = vertice.length;
	var i = 0;
	for( i = 0; i < numVertices; i++ )
	{
		desenharVertice( vertice[i] );	

		// reposiciona o ponteiro do desenho de volta ao vertice inicial
		contexto.moveTo( vertice[i].x - descCanvasX, vertice[i].y - descCanvasY );
		
		var numArestas = vertice[i].aresta.length;
		var j;
		for( j = 0; j < numArestas; j++ )
		{
			desenhar_aresta( vertice[i].x, vertice[i].y, vertice[i].aresta[j].x, vertice[i].aresta[j].y );
		}
		contexto.beginPath();
		contexto.fillStyle = "FFFFFF";	
		var ajusteX = 11 + vertice[i].valor.length * 3;	//configurar ajustes de forma correta (número com mais de um dígito )
		contexto.fillText( vertice[i].valor, vertice[i].x - ajusteX, vertice[i].y + 4 - descCanvasY );
		contexto.closePath();
	}
}

function desenharVertice( v )
{
	contexto.beginPath();
	contexto.fillStyle = "000000";
	var piRadiando = (Math.PI/180);
	var raio = 20;
	contexto.arc( v.x - descCanvasX, v.y - descCanvasY, raio, piRadiando*0, piRadiando*360, false ); 
	contexto.fill();
	contexto.stroke();
	contexto.closePath();
			
}


function desenharFundoCanvas()
{

	contexto.fillStyle = "aaaaaa";
	contexto.fillRect( xCanvas, yCanvas, larguraCanvas, alturaCanvas);		
	contexto.lineWidth = 3;
	contexto.font = "12px serif";
	
	contexto.fill();
	contexto.stroke();	
}

function inserirVertice()
{
	acao = acoes.inserirVertice;
}

function inserirAresta(){
	acao = acoes.inserirAresta;
}

function mover(){
	acao = acoes.move;
}

function mouseClick( e )
{
	if( e.clientX > descCanvasX && e.clientX < (larguraCanvas+descCanvasX) && e.clientY < (alturaCanvas+descCanvasY) && e.clientY > descCanvasY )
	{

		switch( acao )
		{	
		case acoes.inserirVertice:
			var tamVertice = vertice.length;
			var valor = window.prompt( "Digite o valor do vertice", "" );	// checar se valor é válido e se já existe
			vertice[ tamVertice ] = new Vertice( valor, e.clientX, e.clientY );			
			atualizarCanvas();
			//acao = acoes.move;
			break;

		case acoes.deletarVertice: 		
			break;	

		case acoes.deletarAresta:
			break;
		
		}
	}
}

function onMouseDown( e )
{
	var numVertices = vertice.length;
	if( e.clientX > descCanvasX && e.clientX < (larguraCanvas+descCanvasX) && e.clientY < (alturaCanvas+descCanvasY) && e.clientY > descCanvasY )
	{

		switch( acao )
		{
		case acoes.move:
			for( j=0; j < numVertices; j++ )
			{
				if( e.clientX > vertice[j].x - 25 && e.clientX < vertice[j].x + 20 && e.clientY > vertice[j].y - 20 && e.clientY < vertice[j].y + 20 )
				{
					actNode = j;
				}	
			}
			break;

		case acoes.inserirAresta:
			for( j=0; j < numVertices; j++ )
			{
				if( e.clientX > vertice[j].x - 25 && e.clientX < vertice[j].x + 20 && e.clientY > vertice[j].y - 20 && e.clientY < vertice[j].y + 20 )
				{
					actNode = j;
				}	
			}			
			break;
		
		}
	}
}

function mouseMove( e )
{
	posXY.innerHTML = 'Pos X = ' + e.clientX + "<br />";	
	posXY.innerHTML += 'Pos Y = ' + e.clientY + "<br />";
	if( e.clientX > descCanvasX && e.clientX < (larguraCanvas+descCanvasX) && e.clientY < (alturaCanvas+descCanvasY) && e.clientY > descCanvasY )
	{

		switch( acao )
		{
		case acoes.move:
			if(actNode != null)
			{
				vertice[actNode].x = e.clientX;
				vertice[actNode].y = e.clientY;
				atualizarCanvas();
			}
			break;

		case acoes.inserirAresta:
			if(actNode != null)
			{
				contexto.beginPath();
				contexto.moveTo(vertice[actNode].x - descCanvasX, vertice[actNode].y - descCanvasY);
				contexto.lineTo(e.clientX - 10, e.clientY - 102);
				contexto.stroke();
				contexto.closePath();
				atualizarCanvas();			
			}
			break;
		
		}
	}
}

function onMouseUp(e){ // o ideal seria que o inserir vertices chamasse essa função que 
	
	if( e.clientX > descCanvasX && e.clientX < (larguraCanvas+descCanvasX) && e.clientY < (alturaCanvas+descCanvasY) && e.clientY > descCanvasY )
	{

		switch( acao )
		{
		case acoes.move:
			if(actNode != null)
			{
				actNode = null;
			}
			atualizarCanvas();
			break;

		case acoes.inserirAresta:
			if( actNode != null )
			{
				var origem = actNode;
				var numVertices = vertice.length;
				for( j=0; j < numVertices; j++ )
				{
					if( e.clientX > vertice[j].x - 25 && e.clientX < vertice[j].x + 20 && e.clientY > vertice[j].y - 20 && e.clientY < vertice[j].y + 20 )
					{
						var destino = j;
						var i_link = vertice[origem].aresta.length;
						vertice[origem].aresta[i_link] = vertice[destino];
						atualizarCanvas();
					}	
				}
				atualizarCanvas();
				actNode = null;				
			}
			break;
		
		}
	}
}
