
/* Declaração de variaveis */
var canvas = document.getElementById( "canvas" );
var contexto = canvas.getContext( "2d" );
var posXY = document.getElementById( "posXY" );
var scale = 1; // proporção para o zoom
var xCanvas = 0;
var yCanvas = 0;
var larguraCanvas = 1000;
var alturaCanvas = 500;
var acao;
var raio = 20;
var actNode = null;
var actGrafo = null;
var vertice = new Array();
var grafos = new Array();
var acoes = { "mover":0, "inserirVertice":1, "deletarVertice":2, "inserirAresta":3, "deletarAresta":4, "moverGrafo":5,  "deletarGrafo": 6, "deletarArestaIncompleto" : 7};
var padraoValorVertice = /[0-9]?[0-9]?[0-9]/;


/* Referencia aos botões */
var criarVerticeButton = document.getElementById( "criaVertice" );
var deletarVertice = document.getElementById( "deletaVertice" );
var criarArestaButton = document.getElementById("ligaVertice");
var deletarArestaButton = document.getElementById("deletaAresta");
var moverButton = document.getElementById("mover");
var salvar = document.getElementById("salvar");
var ler = document.getElementById("ler");
var criarGrafoButton = document.getElementById( "criaGrafo" );
var deletarGrafoButton = document.getElementById( "deletaGrafo" );
var selecionarGrafoButton = document.getElementById( "selecionarGrafo" );
var moverGrafoButton = document.getElementById("moverGrafo");
var zoomInButton = document.getElementById("zoomIn");
var zoomOutButton = document.getElementById("zoomOut");
var mergeButton = document.getElementById("merge");
var bProfundidade = document.getElementById("bProfundidade");
var bLargura = document.getElementById("bLargura");

/* Constantes */
const descCanvasX = canvas.offsetLeft;
const descCanvasY = canvas.offsetTop;

/* Escutas de eventos */
window.addEventListener( 'load', atualizarCanvas, false );
window.addEventListener( 'load', mouseMove, false );
criarVerticeButton.addEventListener( 'click', inserirVertice, false );
deletarArestaButton.addEventListener('click', removerAresta, false);
criarArestaButton.addEventListener( 'click', inserirAresta, false );
deletarVertice.addEventListener('click', removerVertice, false);
moverButton.addEventListener( 'click', mover, false );
salvar.addEventListener( 'click', salvarGrafo, false );
ler.addEventListener( 'click', lerGrafo, false );
criarGrafoButton.addEventListener( 'click', inserirGrafo, false );
deletarGrafoButton.addEventListener('click', removerGrafo, false);
selecionarGrafoButton.addEventListener('click', seleGrafo, false);
moverGrafoButton.addEventListener( 'click', moverGrafo, false );
zoomInButton.addEventListener('click', menosZoom, false);
zoomOutButton.addEventListener('click', maisZoom, false);
mergeButton.addEventListener('click', mesclarGrafo, false);
bProfundidade.addEventListener('click', configBuscaProfundidade, false);
bLargura.addEventListener('click', configBuscaLargura, false);
canvas.addEventListener( 'click', mouseClick, false );
canvas.addEventListener( 'mousemove', mouseMove, false );
canvas.addEventListener( 'mousedown', onMouseDown, false);
canvas.addEventListener( 'mouseup', onMouseUp, false);


function desenharAresta( verticeOrigem, verticeDestino, aresta )
{
	var ox = verticeOrigem.x;
	var oy = verticeOrigem.y;
	var dx = verticeDestino.x;
	var dy = verticeDestino.y;
	var valor = aresta.valor;	

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
	
	contexto.strokeStyle = aresta.cor;	
	
	contexto.beginPath();
	contexto.lineWidth = 3;
	contexto.moveTo(ox, oy);
	contexto.lineTo(dx - disx*29, dy - disy*29);
	contexto.stroke();
	contexto.closePath();

	contexto.beginPath();
	contexto.lineWidth = 15;
	contexto.moveTo(dx - disx*30, dy - disy*30);
	contexto.lineTo(dx - disx*27, dy - disy*27);
	contexto.stroke();
	contexto.closePath();

	contexto.beginPath();
	contexto.lineWidth = 12;
	contexto.moveTo(dx - disx*28, dy - disy*28);
	contexto.lineTo(dx - disx*24, dy - disy*24);
	contexto.stroke();
	contexto.closePath();			

	contexto.beginPath();
	contexto.lineWidth = 9;
	contexto.moveTo(dx - disx*25, dy - disy*25);
	contexto.lineTo(dx - disx*21, dy - disy*21);
	contexto.stroke();
	contexto.closePath();
	
	contexto.beginPath();
	contexto.lineWidth = 6;
	contexto.moveTo(dx - disx*22, dy - disy*22);
	contexto.lineTo(dx - disx*18, dy - disy*18);
	contexto.stroke();
	contexto.closePath();

	contexto.beginPath();
	contexto.lineWidth = 3;
	contexto.moveTo(dx - disx*19, dy - disy*19);
	contexto.lineTo(dx - disx*10, dy - disy*10);
	contexto.stroke();
	contexto.closePath();
	
	contexto.beginPath();
	contexto.fillStyle = aresta.cor;	
	contexto.fillText( valor, dx - disx*33, dy - disy*33 - 15);
	contexto.closePath();

}

function atualizarCanvas( e ) 
{				
	desenharFundoCanvas();	
	
	for(var ig = 0; ig < grafos.length; ig++ ){
		var numVertices = grafos[ig].vertice.length;
		var i = 0;
		for(  i in grafos[ig].vertice  )
		{
			// reposiciona o ponteiro do desenho de volta ao vertice inicial
			contexto.moveTo( grafos[ig].vertice[i].x, grafos[ig].vertice[i].y );
			
			var numArestas = grafos[ig].vertice[i].aresta.length;
			var j;
			for( j = 0; j < numArestas; j++ )
			{
				desenharAresta( grafos[ig].vertice[i], grafos[ig].vertice[i].aresta[j].destino, grafos[ig].vertice[i].aresta[j] );
			}
			
			desenharVertice(grafos[ig].cor, grafos[ig].vertice[i]);	
		}
	}
}

function desenharVertice( corGrafo,  v )
{
	contexto.beginPath();
	contexto.fillStyle = v.cor;
	contexto.strokeStyle = corGrafo;
	var piRadiando = (Math.PI/180);
	contexto.arc( v.x, v.y, raio, piRadiando*0, piRadiando*360, false ); 
	contexto.fill();
	contexto.stroke();
	contexto.closePath();
		
	contexto.fillStyle = "#FFFFFF";	
	contexto.textBaseline = "middle";
	contexto.textAlign = "center";
	contexto.fillText( v.valor, v.x, v.y );
	
}


function desenharFundoCanvas()
{

	contexto.fillStyle = "#aaaaaa";
	contexto.fillRect( xCanvas, yCanvas, larguraCanvas/scale, alturaCanvas/scale );		
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

function removerAresta(){
	acao = acoes.deletarAresta;
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

function seleGrafo()
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
		xmlGrafos += "\n\t<CORGRAFO>" + grafos[i].cor + "</CORGRAFO>";
		var tempVertice = grafos[i].vertice;
		for( var j = 0; j < tempVertice.length; j++ )
		{
			xmlGrafos += "\n\t<VERTICE>";
			xmlGrafos += "\n\t\t<VALOR>" + tempVertice[j].valor + "</VALOR>";
			xmlGrafos += "\n\t\t<CORVERTICE>" + tempVertice[j].cor + "</CORVERTICE>";
			xmlGrafos += "\n\t\t<X>" + tempVertice[j].x + "</X>";
			xmlGrafos += "\n\t\t<Y>" + tempVertice[j].y + "</Y>";
			var tempAresta = tempVertice[j].aresta;
			for( var k = 0; k < tempAresta.length; k++ )
			{
				xmlGrafos += "\n\t\t<ARESTA>";
				xmlGrafos += "\n\t\t\t<VALOR>" + tempAresta[k].valor + "</VALOR>";
				xmlGrafos += "\n\t\t\t<CORARESTA>" + tempAresta[k].cor + "</CORARESTA>";
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
				var tempCor = tempGrafo[i].getElementsByTagName("CORGRAFO")[0].firstChild.nodeValue;
				var grafo = new Grafo( tempNome, tempCor ); 
				grafos.push( grafo );
					
				var tempVertice = tempGrafo[i].getElementsByTagName("VERTICE");
				for( var j = 0; j < tempVertice.length; j++ )
				{
				
					var tempValor = tempVertice[j].getElementsByTagName("VALOR")[0].firstChild.nodeValue;
					var tempCorVertice = tempVertice[j].getElementsByTagName("CORVERTICE")[0].firstChild.nodeValue;
					var tempX = parseInt( tempVertice[j].getElementsByTagName("X")[0].firstChild.nodeValue );
					var tempY = parseInt( tempVertice[j].getElementsByTagName("Y")[0].firstChild.nodeValue );
					grafo.vertice.push( new Vertice( tempValor, tempX, tempY, tempCorVertice) );
						
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
						var tempCorAresta = tempAresta[k].getElementsByTagName("CORARESTA")[0].firstChild.nodeValue;
						var tempDirecionado = parseInt( tempAresta[k].getElementsByTagName("DIRECIONADO")[0].firstChild.nodeValue );
						var verticeDestino = achaVerticePorValor( tempNome, tempValorVerticeDestino );
						var novaAresta = new Aresta( tempValorAresta, tempDirecionado, verticeDestino, tempCorAresta );
						verticeOrigem.aresta.push( novaAresta );
					}
																		
				}
				
			}		
			
			atualizarCanvas();				
		}
    }
}

function achaVerticePorValor( nomeGrafo, valorVertice )	// deve ser trocado por um vetor de chave por valor
{
	for( var i = 0; i < grafos.length; i++ )
	{
		for( var j in grafos[i].vertice )
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
		removerArestaAuxiliar(e);
		acao = acoes.deletarArestaIncompleto;
		break;
		
	case acoes.deletarArestaIncompleto:
		removerArestaAuxiliar(e);
		acao = acoes.deletarAresta;
		atualizarCanvas();
		break;
	
	case acoes.selecionarGrafo:
		if(grafos.length > 0)
		{
			actGrafo = grafoSobMouse(e);
		}
		break;
	
	}
	
}

function inserirVerticeAuxiliar(e){
	if(grafos.length > 0){
		var valor, ig, indiceVertice, tamVertice = vertice.length, nomeEncontrado = true;

		while( nomeEncontrado == true )
		{
			var valor = window.prompt( "Digite um valor valido para o vertice", "" );
			if(actGrafo != null ) var mygrafo = window.prompt( "Digite em qual grafo", actGrafo.nome );
			else var mygrafo = window.prompt( "Digite em qual grafo", "Nao definido" );
			
			for(ig = 0; ig <= grafos.length; ig++)
			{
				if(grafos[ig].nome == mygrafo)
				{
					break;
				}
			}
			
			if( padraoValorVertice.test(valor) == true){
				nomeEncontrado = false;
				for(indiceVertice in grafos[ig].vertice){
					if(grafos[ig].vertice[indiceVertice].valor == valor){
						nomeEncontrado = true;
						window.alert("ja existe um vertice com esse valor!")
					}
				}
			}
		}
		if(ig < grafos.length)
		{
			grafos[ig].vertice[ valor ] = new Vertice( valor, getMouseX(e)/scale, getMouseY(e)/scale );
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
	delete(myGrafo.vertice[indiceVerticeADeletar]);
}

function removerLinksPara(verticeADeletar, myGrafo){
	var verticeTemp, arestasTemp, indiceVertices, indiceArestas;
	
	for(indiceVertices in  myGrafo.vertice ){
		verticeTemp = myGrafo.vertice[indiceVertices];
		arestasTemp = verticeTemp.aresta;

		for(indiceArestas = 0; indiceArestas < arestasTemp.length; indiceArestas++){
			if(arestasTemp[indiceArestas].destino == verticeADeletar){
				arestasTemp.splice(indiceArestas, 1);
			}
		}
	}
}

function removerArestaAuxiliar(e){
	if(acao == acoes.deletarAresta){
		grafoVerticeOrigem = grafoSobMouse(e); //Declarando como global
		verticeOrigem = NoSobMouse(e); //declarando como global
	}
	else{
		var grafoVerticeDestino = grafoSobMouse(e);
		var verticeDestino = NoSobMouse(e);;
		if(grafoVerticeOrigem != grafoVerticeDestino){
			return;
		}
		
		for(iAresta in verticeOrigem.aresta){
			if(verticeOrigem.aresta[iAresta].destino == verticeDestino ){
				verticeOrigem.aresta.splice(iAresta, 1);
				break;
			}
		}
	}
	
	
}

var iniX, iniY;

function onMouseDown( e )
{
	var numVertices = vertice.length;
		
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
		iniX = (getMouseX(e)+xCanvas)/scale;
		iniY = (getMouseY(e)+yCanvas)/scale;
		break;
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
	posXY.innerHTML += 'Pos X = ' + getMouseX(e) + "<br />";	
	posXY.innerHTML += 'Pos Y = ' + getMouseY(e) + "<br />";
	
	switch( acao )
	{
	case acoes.move:
		if(actNode != null)
		{
			actNode.x = (getMouseX(e)+xCanvas)/scale;
			actNode.y = (getMouseY(e)+yCanvas)/scale;
			atualizarCanvas();
		}
		break;

	case acoes.inserirAresta:
		if(actNode != null)
		{
			atualizarCanvas();
			contexto.beginPath();
			contexto.strokeStyle = "000000";
			contexto.moveTo( actNode.x, actNode.y );
			contexto.lineTo( (getMouseX(e)+xCanvas)/scale, (getMouseY(e) +xCanvas)/scale );
			contexto.stroke();
			contexto.closePath();
						
		}
		break;
	
	case acoes.moverGrafo:
		if( actGrafo != null )
		{
			var x = iniX - (getMouseX(e)+xCanvas)/scale;
			var y = iniY - (getMouseY(e)+yCanvas)/scale;
			iniX = (getMouseX(e)+xCanvas)/scale;
			iniY = (getMouseY(e)+yCanvas)/scale;
			for( var i in  actGrafo.vertice ){
				actGrafo.vertice[i].x -= x;
				actGrafo.vertice[i].y -= y;
			}
			atualizarCanvas();
		}
		break;
	}
}

function onMouseUp(e)  // o ideal seria que o inserir vertices chamasse essa função que 
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

function grafoSobMouse(e){
	var gSelecionado = -1, indice, ig;
	for(ig = 0; ig < grafos.length; ig++ ){
		for( indice in grafos[ig].vertice )
		{
			if( Math.pow( (getMouseX(e)+xCanvas)/scale - grafos[ig].vertice[indice].x, 2) + Math.pow( (getMouseY(e)+yCanvas)/scale - grafos[ig].vertice[indice].y, 2) <= Math.pow(raio, 2) )
			{
				gSelecionado = grafos[ig];
				break;
			}
	
		}
	}
	return gSelecionado;
}

function NoSobMouse(e){
	var NoSelecionado = null, indice, ig;
	for(ig = 0; ig < grafos.length; ig++ ){
		for( indice in grafos[ig].vertice )
		{
			if( Math.pow( (getMouseX(e)+xCanvas)/scale - grafos[ig].vertice[indice].x, 2) + Math.pow( (getMouseY(e)+yCanvas)/scale - grafos[ig].vertice[indice].y, 2) <= Math.pow(raio, 2) )
			{
				NoSelecionado = grafos[ig].vertice[indice];
				break;
			}
	
		}
	}
	return NoSelecionado;
}

function indiceNoSobMouse(e){
	var indiceNoSelecionado = -1, indice, ig;
	for(ig = 0; ig < grafos.length; ig++ ){
		for( indice in grafos[ig].vertice)
		{
			if( Math.pow( (getMouseX(e)+xCanvas)/scale - grafos[ig].vertice[indice].x, 2) + Math.pow( (getMouseY(e)+yCanvas)/scale - grafos[ig].vertice[indice].y, 2) <= Math.pow(raio, 2) )
			{
				indiceNoSelecionado = indice;
				break;
			}	
		}
	}
	return indiceNoSelecionado;
}

/* Função que calcula o scale utilizado em desenharFundoCanvars para implementa o zoom in e o zoom out */
canvas.onmousewheel = function (event)
{
    var mousex = getMouseX(event);
    var mousey = getMouseY(event);
    var wheel = event.wheelDelta/120;//n or -n

	
    var zoom = 1 + wheel/16;

    contexto.scale(zoom,zoom);

    scale *= zoom;

	atualizarCanvas();
}

function maisZoom( e )
{
	var zoom = 1.05; // 1 + 0,05

	contexto.scale(zoom,zoom);

    scale *= zoom;

	atualizarCanvas();
}

function menosZoom( e )
{
	var zoom = 0.95; // 1 - 0,05

	contexto.scale(zoom,zoom);

    scale *= zoom;

	atualizarCanvas();
}

function getMouseX( e )
{
	return e.pageX - descCanvasX;
}

function getMouseY( e )
{
	return e.pageY - descCanvasY;
}

/* Interface para os algorítimos */

function configBuscaProfundidade(e)
{	
	var verticeOrigem = achaVerticePorValor( actGrafo.nome, prompt( "Digite a origem:" ) );
	var verticeDestino = achaVerticePorValor( actGrafo.nome, prompt( "Digite o destino:" ) );
	buscaProfundidade( verticeOrigem, verticeDestino );
}

function configBuscaLargura(e)
{	
	var verticeOrigem = achaVerticePorValor( actGrafo.nome, prompt( "Digite a origem:" ) );
	var verticeDestino = achaVerticePorValor( actGrafo.nome, prompt( "Digite o destino:" ) );
	buscaLargura( verticeOrigem, verticeDestino );
}


function mesclarGrafo(){
	var nome1 = window.prompt( "Digite o nome do primeiro grafo", "" );
	var nome2 = window.prompt( "Digite o nome do segundo grafo", "" );
	var grafo1;
	var grafo2;
	for(var ig = 0; ig < grafos.length; ig++){
		if(grafos[ig].nome == nome1){
			grafo1 = grafos[ig];
		}
		if(grafos[ig].nome == nome2){
			grafo2 = grafos[ig];
			grafos.splice(ig, 1);
		}
	}
	mesclar(grafo1, grafo2);
	atualizarCanvas();	
}
