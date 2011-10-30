
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
var actGrafo = null;
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
var ler = document.getElementById("ler");
var criarGrafoButton = document.getElementById( "criaGrafo" );
var deletarGrafoButton = document.getElementById( "deletaGrafo" );
var selecionarGrafoButton = document.getElementById( "selecionarGrafo" );
var moverGrafoButton = document.getElementById("moverGrafo");

/* Constantes */
const descCanvasX = canvas.offsetLeft;
const descCanvasY = canvas.offsetTop;

/* Escutas de eventos */
window.addEventListener( 'load', atualizarCanvas, false );
window.addEventListener( 'load', mouseMove, false );

criarVerticeButton.addEventListener( 'click', inserirVertice, false );
criarArestaButton.addEventListener( 'click', inserirAresta, false );
deletarVertice.addEventListener('click', removerVertice, false);
moverButton.addEventListener( 'click', mover, false );
salvar.addEventListener( 'click', salvarGrafo, false );
ler.addEventListener( 'click', lerGrafo, false );

criarGrafoButton.addEventListener( 'click', inserirGrafo, false );
deletarGrafoButton.addEventListener('click', removerGrafo, false);
moverGrafoButton.addEventListener( 'click', moverGrafo, false );


canvas.addEventListener( 'click', mouseClick, false );
canvas.addEventListener( 'mousemove', mouseMove, false );
window.addEventListener( 'mousedown', onMouseDown, false);
window.addEventListener( 'mouseup', onMouseUp, false);


function desenhar_aresta(ox, oy, dx, dy, valor )
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
	
	contexto.strokeStyle = "000000";	
	
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
			// reposiciona o ponteiro do desenho de volta ao vertice inicial
			contexto.moveTo( grafos[ig].vertice[i].x - descCanvasX, grafos[ig].vertice[i].y - descCanvasY );
			
			var numArestas = grafos[ig].vertice[i].aresta.length;
			var j;
			for( j = 0; j < numArestas; j++ )
			{
				desenhar_aresta(grafos[ig].vertice[i].x, grafos[ig].vertice[i].y, grafos[ig].vertice[i].aresta[j].destino.x, grafos[ig].vertice[i].aresta[j].destino.y, grafos[ig].vertice[i].aresta[j].valor);
			}
			
			desenharVertice(grafos[ig].cor, grafos[ig].vertice[i]);	
		}
	}
}

function desenharVertice( cor,  v )
{
	contexto.beginPath();
	contexto.fillStyle = "#000000";
	contexto.strokeStyle = cor;
	var piRadiando = (Math.PI/180);
	var raio = 20;
	contexto.arc( v.x - descCanvasX, v.y - descCanvasY, raio, piRadiando*0, piRadiando*360, false ); 
	contexto.fill();
	contexto.stroke();
	contexto.closePath();
		
	contexto.fillStyle = "#FFFFFF";	
	contexto.textBaseline = "middle";
	contexto.textAlign = "center";
	contexto.fillText( v.valor, v.x - descCanvasX, v.y - descCanvasY );
	
}


function desenharFundoCanvas()
{

	contexto.fillStyle = "#aaaaaa";
	contexto.fillRect( xCanvas, yCanvas, larguraCanvas, alturaCanvas);		
	contexto.lineWidth = 3;
	contexto.font = "12px serif";
		
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
	actGrafo = new Grafo(nome, cor);
	grafos[grafos.length] = actGrafo;
}

function moverGrafo()
{
	actGrafo = null;
	acao = acoes.moverGrafo;
}

function selecionarGrafo()
{
	acao = acoes.selecionarGrafo;
}

function removerGrafo()
{
	//acao = acoes.deletarGrafo;
	var nome = window.prompt( "Digite o nome do grafo que voce deseja remover.", "" );
	for(var ig = 0; ig < grafos.length; ig++){
		if(grafos[ig].nome == nome){
			grafos.splice(ig, 1);
		}
	}
	atualizarCanvas();
}

function salvarGrafo()
{
	var nomeArquivo;
	var xmlhttp;
	var xmlGrafos;	

	/* Obtem um nome para o arquivo */
	nomeArquivo = window.prompt( "Digite um nome para o arquivo.", "defaultGrafo" );

	/* Abre conexão com servidor */
	xmlhttp = new XMLHttpRequest(); 
	xmlhttp.open( "POST", "../salvarGrafos.php", true );
	xmlhttp.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );	// Setando Content-type
	
	/* Monta o arquivo xml a ser enviado */
	xmlGrafos = "<?xml version='1.0'?>";
	xmlGrafos += "\n<GRAFOS>";
	for( var i = 0; i < grafos.length; i++ )
	{		
		xmlGrafos += "\n<GRAFO>";
		xmlGrafos += "\n\t<NOME>" + grafos[i].nome + "</NOME>";
		xmlGrafos += "\n\t<COR>" + grafos[i].cor + "</COR>";
		var tempVertice = grafos[i].vertice;
		for( var j = 0; j < tempVertice.length; j++ )
		{
			xmlGrafos += "\n\t<VERTICE>";
			xmlGrafos += "\n\t\t<VALOR>" + tempVertice[j].valor + "</VALOR>";
			xmlGrafos += "\n\t\t<X>" + tempVertice[j].x + "</X>";
			xmlGrafos += "\n\t\t<Y>" + tempVertice[j].y + "</Y>";
			var tempAresta = tempVertice[j].aresta;
			for( var k = 0; k < tempAresta.length; k++ )
			{
				xmlGrafos += "\n\t\t<ARESTA>";
				xmlGrafos += "\n\t\t\t<VALOR>" + tempAresta[k].valor + "</VALOR>";
				xmlGrafos += "\n\t\t\t<DIRECIONADO>" + tempAresta[k].direcionado + "</DIRECIONADO>";
				xmlGrafos += "\n\t\t\t<DESTINO>";
				var tempVerticeDestino = tempAresta[k].destino;
				xmlGrafos += "\n\t\t\t\t<VERTICEI>";
				xmlGrafos += "\n\t\t\t\t\t<VALORI>" + tempVerticeDestino.valor + "</VALORI>"
				xmlGrafos += "\n\t\t\t\t</VERTICEI>";
				xmlGrafos += "\n\t\t\t</DESTINO>";
				xmlGrafos += "\n\t\t</ARESTA>";
			}		
			xmlGrafos += "\n\t</VERTICE>";
		}					
		xmlGrafos += "\n</GRAFO>";		
	}
	xmlGrafos += "\n</GRAFOS>";

	/* Envia requisição via método POST */
	xmlhttp.send( "nomeArquivo=" + nomeArquivo + "&conjuntoGrafos=" + xmlGrafos );

	xmlhttp.onreadystatechange = function()
    {
		if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 )
		{
			//xmlhttp.responseText;
			var resposta = xmlhttp.responseText;
			window.alert( resposta );
		}
    }

	window.open( "../downloadArquivo.php?download=1&nomeArquivo=" + nomeArquivo );	
}

function lerGrafo()
{
	var nomeArquivo;
	var xmlhttp;
	
	/* Limpa o estado atual */
	grafos = new Array();

	/* Obtem um nome para o arquivo */
	nomeArquivo = window.prompt( "Digite um nome para o arquivo.", "defaultGrafo" );

	/* Abre conexão com servidor */
	xmlhttp = new XMLHttpRequest(); 
	xmlhttp.open( "GET", "../downloadArquivo.php?nomeArquivo=" + nomeArquivo + "&download=0", true );
	//xmlhttp.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );	// Setando Content-type

	xmlhttp.send();

	xmlhttp.onreadystatechange = function()
    {
		if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 )
		{
			/* Recupera os vértices */					
			var tempGrafo = xmlhttp.responseXML.documentElement.getElementsByTagName("GRAFO");	
			for( var i = 0; i < tempGrafo.length; i++ )
			{				
				var tempNome = tempGrafo[i].getElementsByTagName("NOME")[0].firstChild.nodeValue;
				var tempCor = tempGrafo[i].getElementsByTagName("COR")[0].firstChild.nodeValue;
				var grafo = new Grafo( tempNome, tempCor ); 
				grafos.push( grafo );
					
				var tempVertice = tempGrafo[i].getElementsByTagName("VERTICE");
				for( var j = 0; j < tempVertice.length; j++ )
				{
				
					var tempValor = tempVertice[j].getElementsByTagName("VALOR")[0].firstChild.nodeValue;
					var tempX = parseInt( tempVertice[j].getElementsByTagName("X")[0].firstChild.nodeValue );
					var tempY = parseInt( tempVertice[j].getElementsByTagName("Y")[0].firstChild.nodeValue );
					grafo.vertice.push( new Vertice( tempValor, tempX, tempY) );
						
				}
				
			}

			/* Recupera as arestas */		
			for( var i = 0; i < tempGrafo.length; i++ )
			{											
				var tempNome = tempGrafo[i].getElementsByTagName("NOME")[0].firstChild.nodeValue;
				var tempVertice = tempGrafo[i].getElementsByTagName("VERTICE");
				for( var j = 0; j < tempVertice.length; j++ )
				{
					var tempValor = tempVertice[j].getElementsByTagName("VALOR")[0].firstChild.nodeValue;
					var verticeOrigem = achaVerticePorValor( tempNome, tempValor );
					var tempAresta = tempVertice[j].getElementsByTagName("ARESTA");															
					for( var k = 0; k < tempAresta.length; k++ )
					{
						var tempValorAresta = tempAresta[k].getElementsByTagName("VALOR")[0].firstChild.nodeValue;
						var tempValorVerticeDestino = tempAresta[k].getElementsByTagName("VALORI")[0].firstChild.nodeValue;
						var tempDirecionado = parseInt( tempAresta[k].getElementsByTagName("DIRECIONADO")[0].firstChild.nodeValue );
						var verticeDestino = achaVerticePorValor( tempNome, tempValorVerticeDestino );
						var novaAresta = new Aresta( tempValorAresta, tempDirecionado, verticeDestino );
						verticeOrigem.aresta.push( novaAresta );
					}
																		
				}
				
			}		
			
			atualizarCanvas();				
		}
    }
}

function achaVerticePorValor( nomeGrafo, valorVertice )
{
	for( var i = 0; i < grafos.length; i++ )
	{
		for( var j = 0; j < grafos[i].vertice.length; j++ )
		{
			if( grafos[i].nome == nomeGrafo && grafos[i].vertice[j].valor == valorVertice )
			{
				return grafos[i].vertice[j];
			}
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
			
		case acoes.selecionarGrafo:
			if(grafos.length > 0)
			{
				actGrafo = grafoSobMouse(e);
			}
			break;
		
		}
	}
}

function inserirVerticeAuxiliar(e){
	if(grafos.length > 0){
		var valor, indiceVertice, tamVertice = vertice.length, nomeEncontrado = true;

		while( nomeEncontrado == true )
		{
			var valor = window.prompt( "Digite um valor valido para o vertice", "" );
			if(actGrafo != null ) var mygrafo = window.prompt( "Digite em qual grafo", actGrafo.nome );
			else var mygrafo = window.prompt( "Digite em qual grafo", "Nao definido" );
			
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
		for(ig = 0; ig <= grafos.length; ig++)
		{
			if(grafos[ig].nome == mygrafo)
			{
				break;
			}
		}
		if(ig < grafos.length)
		{
			tam = grafos[ig].vertice.length;
			grafos[ig].vertice[ tam ] = new Vertice( valor, e.pageX, e.pageY );
		}
	}
}


function removerVerticeAuxiliar(e){
	var myGrafo = grafoSobMouse(e);
	var indiceVerticeADeletar = indiceNoSobMouse(e);
	var verticeADeletar = myGrafo.vertice[indiceVerticeADeletar];
	var numLinks = verticeADeletar.aresta.length;
	
	/*remover os links que chegam ao vertice a ser deletado*/
	removerLinksPara(verticeADeletar, myGrafo);

	/*remover os links que partem do vertice a ser deletado*/
	verticeADeletar.aresta.splice(0, numLinks);
	
	/*remover vertice da estrutura*/
	myGrafo.vertice.splice(indiceVerticeADeletar, 1);
}

function removerLinksPara(verticeADeletar, myGrafo){
	var verticeTemp, arestasTemp, indiceVertices, indiceArestas;
	
	for(indiceVertices = 0; indiceVertices < myGrafo.vertice.length; indiceVertices++){
		verticeTemp = myGrafo.vertice[indiceVertices];
		arestasTemp = verticeTemp.aresta;

		for(indiceArestas = 0; indiceArestas < arestasTemp.length; indiceArestas++){
			if(arestasTemp[indiceArestas].destino == verticeADeletar){
				arestasTemp.splice(indiceArestas, 1);
			}
		}
	}
}

var iniX, iniY;

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
			actGrafo = grafoSobMouse(e);
			break;
		
		case acoes.moverGrafo:
			actGrafo = grafoSobMouse(e);
			iniX = e.pageX;
			iniY = e.pageY;
			break;
		}
	}
}

function mouseMove( e )
{
	posXY.innerHTML = " ";
	for(var ig = 0; ig < grafos.length; ig++){
		if(grafos[ig] == actGrafo)
		{
			posXY.innerHTML += '<font color=' + grafos[ig].cor + '><u> '+ grafos[ig].nome +' </u></font>';
		}
		else
		{
			posXY.innerHTML += '<font color=' + grafos[ig].cor + '>  '+ grafos[ig].nome +'  </font>';
		}
	}
	posXY.innerHTML += "<br />";
	posXY.innerHTML += 'Pos X = ' + e.pageX + "<br />";	
	posXY.innerHTML += 'Pos Y = ' + e.pageY + "<br />";
	if( mouseNoCanvas(e) )
	{
		switch( acao )
		{
		case acoes.move:
			if(actNode != null)
			{
				actNode.x = e.pageX;
				actNode.y = e.pageY;
				atualizarCanvas();
			}
			break;

		case acoes.inserirAresta:
			if(actNode != null)
			{
				atualizarCanvas();
				contexto.beginPath();
				contexto.strokeStyle = "000000";
				contexto.moveTo(actNode.x - descCanvasX, actNode.y - descCanvasY);
				contexto.lineTo(e.pageX - descCanvasX, e.pageY - descCanvasY);
				contexto.stroke();
				contexto.closePath();
							
			}
			break;
		
		case acoes.moverGrafo:
			if(actGrafo != null )
			{
				var x = iniX - e.pageX;
				var y = iniY - e.pageY;
				iniX = e.pageX;
				iniY = e.pageY;
				for(var i = 0; i < actGrafo.vertice.length; i++ ){
					actGrafo.vertice[i].x -= x;
					actGrafo.vertice[i].y -= y;
				}
				atualizarCanvas();
			}
			break;
		}
	}
}

function onMouseUp(e)  // o ideal seria que o inserir vertices chamasse essa função que 
{
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
				var grafoAtual = grafoSobMouse(e);
				if(grafoAtual == actGrafo)
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
				}
				actNode = null;	
				atualizarCanvas();
			}
			break;
		case acoes.moverGrafo:
			if(actGrafo != null)
			{
				actGrafo = null;
			}
			atualizarCanvas();
			break;
		
		}
	}
}

function mouseNoCanvas(e){
	if(e.pageX > descCanvasX && e.pageX < (larguraCanvas+descCanvasX) && e.pageY < (alturaCanvas+descCanvasY) && e.pageY > descCanvasY ){
		return true;
	}
	else{
		return false;
	}
}

function grafoSobMouse(e){
	var gSelecionado = -1, indice, ig;
	for(ig = 0; ig < grafos.length; ig++ ){
		for( indice=0; indice < grafos[ig].vertice.length; indice++ )
		{
			if( e.pageX > grafos[ig].vertice[indice].x - 25 && e.pageX < grafos[ig].vertice[indice].x + 20 && e.pageY > grafos[ig].vertice[indice].y - 20 && e.pageY < grafos[ig].vertice[indice].y + 20 )
			{
				gSelecionado = grafos[ig];
			}	
		}
	}
	return gSelecionado;
}

function NoSobMouse(e){
	var NoSelecionado = null, indice, ig;
	for(ig = 0; ig < grafos.length; ig++ ){
		for( indice=0; indice < grafos[ig].vertice.length; indice++ )
		{
			if( e.pageX > grafos[ig].vertice[indice].x - 25 && e.pageX < grafos[ig].vertice[indice].x + 20 && e.pageY > grafos[ig].vertice[indice].y - 20 && e.pageY < grafos[ig].vertice[indice].y + 20 )
			{
				NoSelecionado = grafos[ig].vertice[indice];
			}	
		}
	}
	return NoSelecionado;
}

function indiceNoSobMouse(e){
	var indiceNoSelecionado = -1, indice, ig;
	for(ig = 0; ig < grafos.length; ig++ ){
		for( indice=0; indice < grafos[ig].vertice.length; indice++ )
		{
			if( e.pageX > grafos[ig].vertice[indice].x - 25 && e.pageX < grafos[ig].vertice[indice].x + 20 && e.pageY > grafos[ig].vertice[indice].y - 20 && e.pageY < grafos[ig].vertice[indice].y + 20 )
			{
				indiceNoSelecionado = indice;
			}	
		}
	}
	return indiceNoSelecionado;
}
