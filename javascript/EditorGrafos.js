
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
var grafos = new Array();
var acoes = { "mover":0, "inserirVertice":1, "deletarVertice":2, "inserirAresta":3, "deletarAresta":4, "moverGrafo":5,  "deletarGrafo": 6};
var padraoValorVertice = /[0-9]?[0-9]?[0-9]/;


/* Referencia aos botões */
var criarVerticeButton = document.getElementById( "criaVertice" );
var deletarVertice = document.getElementById( "deletaVertice" );
var criarArestaButton = document.getElementById("ligaVertice");
var moverButton = document.getElementById("mover");
var salvar = document.getElementById("salvar");
var criarGrafoButton = document.getElementById( "criaGrafo" );
var deletarGrafoButton = document.getElementById( "deletaGrafo" );
var moverGrafoButton = document.getElementById("moverGrafo");

/* Constantes */
const descCanvasX = 10;
const descCanvasY = 128;

/* Escutas de eventos */
window.addEventListener( 'load', atualizarCanvas, false );
window.addEventListener( 'load', mouseMove, false );

criarVerticeButton.addEventListener( 'click', inserirVertice, false );
criarArestaButton.addEventListener( 'click', inserirAresta, false );
deletarVertice.addEventListener('click', removerVertice, false);
moverButton.addEventListener( 'click', mover, false );
salvar.addEventListener( 'click', salvarGrafo, false );

criarGrafoButton.addEventListener( 'click', inserirGrafo, false );
deletarGrafoButton.addEventListener('click', removerGrafo, false);
moverGrafoButton.addEventListener( 'click', moverGrafo, false );


canvas.addEventListener( 'click', mouseClick, false );
canvas.addEventListener( 'mousemove', mouseMove, false );
window.addEventListener( 'mousedown', onMouseDown, false);
window.addEventListener( 'mouseup', onMouseUp, false);


function desenhar_aresta(cor, ox, oy, dx, dy, valor )
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
	
	contexto.fillStyle = cor;	
	
	contexto.beginPath();
	contexto.lineWidth = 3;
	contexto.moveTo(ox - descCanvasX, oy - descCanvasY);
	contexto.lineTo(dx - descCanvasX - disx*29, dy - descCanvasY - disy*29);
	contexto.stroke();
	contexto.closePath();

	contexto.beginPath();
	contexto.lineWidth = 15;
	contexto.moveTo(dx - descCanvasX - disx*30, dy - descCanvasY - disy*30);
	contexto.lineTo(dx - descCanvasX - disx*27, dy - descCanvasY - disy*27);
	contexto.stroke();
	contexto.closePath();

	contexto.beginPath();
	contexto.lineWidth = 12;
	contexto.moveTo(dx - descCanvasX - disx*28, dy - descCanvasY - disy*28);
	contexto.lineTo(dx - descCanvasX - disx*24, dy - descCanvasY - disy*24);
	contexto.stroke();
	contexto.closePath();			

	contexto.beginPath();
	contexto.lineWidth = 9;
	contexto.moveTo(dx - descCanvasX - disx*25, dy - descCanvasY - disy*25);
	contexto.lineTo(dx - descCanvasX - disx*21, dy - descCanvasY - disy*21);
	contexto.stroke();
	contexto.closePath();
	
	contexto.beginPath();
	contexto.lineWidth = 6;
	contexto.moveTo(dx - descCanvasX - disx*22, dy - descCanvasY - disy*22);
	contexto.lineTo(dx - descCanvasX - disx*18, dy - descCanvasY - disy*18);
	contexto.stroke();
	contexto.closePath();

	contexto.beginPath();
	contexto.lineWidth = 3;
	contexto.moveTo(dx - descCanvasX - disx*19, dy - descCanvasY - disy*19);
	contexto.lineTo(dx - descCanvasX - disx*10, dy - descCanvasY - disy*10);
	contexto.stroke();
	contexto.closePath();
	
	contexto.beginPath();
	contexto.fillStyle = "8b4726";	
	contexto.fillText( valor, dx - descCanvasX - disx*33, dy - descCanvasY - disy*33 - 15);
	contexto.closePath();

}

function atualizarCanvas( e ) 
{				
	desenharFundoCanvas();	
	
	for(var ig = 0; ig < grafos.length; ig++ ){
		var numVertices = grafos[ig].vertice.length;
		var i = 0;
		for( i = 0; i < numVertices; i++ )
		{
			desenharVertice(grafos[ig].cor, grafos[ig].vertice[i]);	

			// reposiciona o ponteiro do desenho de volta ao vertice inicial
			contexto.moveTo( grafos[ig].vertice[i].x - descCanvasX, grafos[ig].vertice[i].y - descCanvasY );
			
			var numArestas = grafos[ig].vertice[i].aresta.length;
			var j;
			for( j = 0; j < numArestas; j++ )
			{
				desenhar_aresta(grafos[ig].cor, grafos[ig].vertice[i].x, grafos[ig].vertice[i].y, grafos[ig].vertice[i].aresta[j].destino.x, grafos[ig].vertice[i].aresta[j].destino.y, grafos[ig].vertice[i].aresta[j].valor);
			}
			contexto.beginPath();
			contexto.fillStyle = "FFFFFF";	
			var ajusteX = 11 + grafos[ig].vertice[i].valor.length * 3;	//configurar ajustes de forma correta (número com mais de um dígito )
			contexto.fillText( grafos[ig].vertice[i].valor, grafos[ig].vertice[i].x - ajusteX, grafos[ig].vertice[i].y + 4 - descCanvasY );
			contexto.closePath();
		}
	}
}

function desenharVertice(cor,  v )
{
	contexto.beginPath();
	contexto.fillStyle = "000000";
	contexto.strokeStyle = cor;
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

function inserirAresta()
{
	acao = acoes.inserirAresta;
}

function removerVertice()
{
	acao = acoes.deletarVertice;
}

function mover()
{
	acao = acoes.move;
}

function inserirGrafo()
{
	var nome = window.prompt( "Digite o nome do grafo que voce deseja criar.", "" );
	var cor = window.prompt( "Digite a cor do grafo que voce deseja criar.", "000000" );
	grafos[grafos.length] = new Grafo(nome, cor);
}

function moverGrafo()
{
	acao = acores.moverGrafo;
}

function removerGrafo()
{
	acao = acoes.deletarGrafo;
}



function salvarGrafo()
{
	var xmlhttp = new XMLHttpRequest(); // Função Personalizada
	xmlhttp.open( "POST", "http://localhost/salvarGrafos.php", true );
	xmlhttp.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );	// Setando Content-type
	xmlhttp.send( "g1=5" );

	xmlhttp.onreadystatechange = function()
    {
		if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 )
		{
			var resposta = xmlhttp.responseText;
			console.log( resposta );
		}
    }
	
}

function mouseClick( e )
{
	if( mouseNoCanvas(e) )
	{

		switch( acao )
		{	
		case acoes.inserirVertice:
			inserirVerticeAuxiliar(e)			
			atualizarCanvas();
			break;

		case acoes.deletarVertice:
			removerVerticeAuxiliar(e);
			atualizarCanvas();
			break;	

		case acoes.deletarAresta:
			break;
		
		}
	}
}

function inserirVerticeAuxiliar(e){
	if(grafos.length > 0){
		var valor, indiceVertice, tamVertice = vertice.length, nomeEncontrado = true;

		while( nomeEncontrado == true ){
			var valor = window.prompt( "Digite um valor valido para o vertice", "" );
			var mygrafo = window.prompt( "Digite em qual grafo", grafos[0].nome );
			
			if( padraoValorVertice.test(valor) == true){
				
				nomeEncontrado = false;
				for(indiceVertice = 0; indiceVertice < vertice.length; indiceVertice++){
					if(vertice[indiceVertice].valor == valor){
						nomeEncontrado = true;
					}
				}
			}
		}

		valor = padraoValorVertice.exec(valor);	
		var ig;
		for(ig = 0; ig <= grafos.length; ig++){
			if(grafos[ig].nome == mygrafo) break;
		}
		if(ig < grafos.length){
			tam = grafos[ig].vertice.length;
			grafos[ig].vertice[ tam ] = new Vertice( valor, e.clientX, e.clientY );
		}
	}
}


function removerVerticeAuxiliar(e){
	var indiceVerticeADeletar = indiceNoSobMouse(e);
	var verticeADeletar = vertice[indiceVerticeADeletar];
	var numLinks = 	verticeADeletar.aresta.length;
	
	/*remover os links que chegam ao vertice a ser deletado*/
	removerLinksPara(verticeADeletar);

	/*remover os links que partem do vertice a ser deletado*/
	verticeADeletar.aresta.splice(0, numLinks);
	
	/*remover vertice da estrutura*/
	vertice.splice(indiceVerticeADeletar, 1);
}

function removerLinksPara(verticeADeletar){
	var verticeTemp, arestasTemp, indiceVertices, indiceArestas;
	
	for(indiceVertices = 0; indiceVertices < vertice.length; indiceVertices++){
		verticeTemp = vertice[indiceVertices];
		arestasTemp = verticeTemp.aresta;

		for(indiceArestas = 0; indiceArestas < arestasTemp.length; indiceArestas++){
			if(arestasTemp[indiceArestas].destino == verticeADeletar){
				arestasTemp.splice(indiceArestas, 1);
			}
		}
	}
}

function onMouseDown( e )
{
	var numVertices = vertice.length;
	if( mouseNoCanvas(e) )
	{

		switch( acao )
		{
		case acoes.move:
			actNode = NoSobMouse(e);
			break;

		case acoes.inserirAresta:
			actNode = NoSobMouse(e);
			break;
		}
	}
}

function mouseMove( e )
{
	posXY.innerHTML = " ";
	for(var ig = 0; ig < grafos.length; ig++){
		posXY.innerHTML += '<font color=' + grafos[ig].cor + '>  '+ grafos[ig].nome +'  </font>';
	}
	posXY.innerHTML += "<br />";
	posXY.innerHTML += 'Pos X = ' + e.clientX + "<br />";	
	posXY.innerHTML += 'Pos Y = ' + e.clientY + "<br />";
	if( mouseNoCanvas(e) )
	{

		switch( acao )
		{
		case acoes.move:
			if(actNode != null)
			{
				actNode.x = e.clientX;
				actNode.y = e.clientY;
				atualizarCanvas();
			}
			break;

		case acoes.inserirAresta:
			if(actNode != null)
			{
				contexto.beginPath();
				contexto.moveTo(actNode.x - descCanvasX, actNode.y - descCanvasY);
				contexto.lineTo(e.clientX - descCanvasX, e.clientY - descCanvasY);
				contexto.stroke();
				contexto.closePath();
				atualizarCanvas();			
			}
			break;
		
		}
	}
}

function onMouseUp(e){ // o ideal seria que o inserir vertices chamasse essa função que 
	
	if( mouseNoCanvas(e) )
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
				
				var destino = NoSobMouse(e);
				if(destino == -1){
					atualizarCanvas();
					return;
				}
				
				var i_link = origem.aresta.length;
				var valor = window.prompt( "Digite o peso do link", "" );	// checar se valor é válido e se já existe
				origem.aresta[i_link] = new Aresta(valor, 1, destino);
				atualizarCanvas();
				
				actNode = null;				
			}
			break;
		
		}
	}
}

function mouseNoCanvas(e){
	if(e.clientX > descCanvasX && e.clientX < (larguraCanvas+descCanvasX) && e.clientY < (alturaCanvas+descCanvasY) && e.clientY > descCanvasY ){
		return true;
	}
	else{
		return false;
	}
}

function NoSobMouse(e){
	var NoSelecionado = -1, indice, ig;
	for(ig = 0; ig < grafos.length; ig++ ){
		for( indice=0; indice < grafos[ig].vertice.length; indice++ )
		{
			if( e.clientX > grafos[ig].vertice[indice].x - 25 && e.clientX < grafos[ig].vertice[indice].x + 20 && e.clientY > grafos[ig].vertice[indice].y - 20 && e.clientY < grafos[ig].vertice[indice].y + 20 )
			{
				NoSelecionado = grafos[ig].vertice[indice];
			}	
		}
	}
	return NoSelecionado;
}