
/* Declaração de variaveis */
var canvas = document.getElementById( "canvas" );
var contexto = canvas.getContext( "2d" );
var posXY = document.getElementById( "posXY" );
var xCanvas = 0;
var yCanvas = 0;
var larguraCanvas = 500;
var alturaCanvas = 500;
var acao;
var vertice = new Array();
var acoes = { "inserirVertice":0, "deletarVertice":1, "inserirAresta":2, "deletarAresta":3 };	
	
/* Referencia aos botões */
var criarVerticeButton = document.getElementById( "criaVertice" );
var deletarVertice = document.getElementById( "deleteVertice" );

/* Constantes */
const descCanvasX = 10;
const descCanvasY = 83;

/* Escutas de eventos */
window.addEventListener( 'load', atualizarCanvas, false );
window.addEventListener( 'load', exibirPosMouse, false );

criarVerticeButton.addEventListener( 'click', inserirVertice, false );

canvas.addEventListener( 'click', verificarAcao, false );
canvas.addEventListener( 'mousemove', exibirPosMouse, false );

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
			desenharAresta( vertice[i], j );
		}		
		
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
	contexto.fillStyle = "FFFFFF";	
	var ajusteX = 13;	//configurar ajustes de forma correta (número com mais de um dígito )
	var ajusteY = 80;
	contexto.fillText( v.valor, v.x - ajusteX, v.y - ajusteY );
	contexto.closePath();
			
}

function desenharAresta( v, indiceAresta )
{
	var verticeDestino = v[i].aresta[ indiceAresta ];
	contexto.lineTo( verticeDestino.x - descCanvasX, verticeDestino.y - descCanvasY );
	contexto.moveTo( v[i].x - descCanvasX, v[i].y - descCanvasY );
	contexto.stroke();			
}

function desenharFundoCanvas()
{

	contexto.fillStyle = "aaaaaa";
	contexto.fillRect( xCanvas, yCanvas, alturaCanvas, larguraCanvas );		
	contexto.lineWidth = 5;
	contexto.font = "12px serif";
	
	contexto.fill();
	contexto.stroke();	
}

function inserirVertice()
{
	acao = acoes.inserirVertice;
}

function verificarAcao( e )
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
			break;

		case acoes.deletarVertice: 		
			break;	

		case acoes.inserirAresta:
			break;

		case acoes.deletarAresta:
			break;
		
		}
	}
}

function exibirPosMouse( e )
{
	posXY.innerHTML = 'Pos X = ' + e.clientX + "<br />";	
	posXY.innerHTML += 'Pos Y = ' + e.clientY + "<br />";
}
