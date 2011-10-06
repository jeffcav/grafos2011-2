
/* Declaração de variaveis */
var contexto = document.getElementById( "canvas" ).getContext( "2d" );
var acao;
var vertice = new Array();
var enumAcao = { "inserirVertice":0, "deletarVertice":1 };	
	
/* Referencia aos botões */
var criarVerticeButton = document.getElementById( "criaVertice" );

/* Escutas de eventos */
window.addEventListener( 'load', atualizarCanvas, false );
criarVerticeButton.addEventListener( 'click', inserirVertice, false );

function atualizarCanvas()
{		
		
	contexto.fillStyle = "aaaaaa";
	contexto.fillRect( 0, 0, 500, 500 );		
	contexto.lineWidth = 5;
	contexto.font = "12px serif";
	
	contexto.fill();
	contexto.stroke();	

	var numVertices = vertice.length;
	var i = 0;
	for( i = 0; i < numVertices; i++ )
	{
		contexto.beginPath();
		contexto.fillStyle = "000000";
		contexto.arc( vertice[i].x - 10, vertice[i].y - 102, 20, (Math.PI/180)*0, (Math.PI/180)*360, false ); 
		contexto.fill();
		contexto.moveTo( vertice[i].x - 10, vertice[i].y - 102 );
		
		/*var numArestas = vertice[i].length;
		var j;
		for( j = 0; j < numArestas; j++ )
		{
			context.lineTo( vertice[vertice[i].linkpara[j].nome].posx - 10, vertice[vertice[i].linkpara[j].nome].posy - 102);
			context.moveTo(vertice[i].posx - 10, vertice[i].posy - 102);
			context.stroke();			
		}
		*/

		context.fillStyle = "FFFFFF";
		context.fillText( vertice[i].valor, vertice[i].x - 13, vertice[i].y - 97 );
		context.closePath();			
	}
}

function inserirVertice()
{

}	


