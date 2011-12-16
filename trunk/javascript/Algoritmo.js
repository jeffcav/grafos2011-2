/** @brief Busca em profundidade
*
* Esta função implementa o agorítimo de busca em profundidadde em um determinado grafo
*
* @param[in] verticeOrigem vertice de onde começa a busca
* @param[in] verticeDestino vertice a ser procurado
*
* @return 
*
* @remarks Essa função não pode ser chamada antes de configBuscaProfundidade.
*/
function buscaProfundidade( verticeOrigem, verticeDestino )
{	
	var corOriginal = "#000000";
	var corDestino = "#FF2400";
	var corCaminho = "#009900";
	var pilha = new Array();
	var arrayVertices = new Array();
			
	pilha.push( verticeOrigem );

	(function esperar() {

		if(pilha.length > 0) {

			{
				var tempVertice = pilha.pop();
				tempVertice.cor = corDestino;

				arrayVertices.push( tempVertice );

				if( tempVertice == verticeDestino )
				{
					atualizarCanvas();			
					return;
				}
			
				var conjAresta = tempVertice.aresta;
				for( var i in conjAresta )
				{
					var tempAresta = conjAresta[i];			
					var verticeVizinho = tempAresta.destino;
					if( verticeVizinho.cor == corOriginal )
					{
						pilha.push( verticeVizinho );
					}
				}	
		
				tempVertice.cor = corCaminho;

				atualizarCanvas();
				setTimeout( esperar , 500 );		
		
			}
		}

		
	})();
	
/*
	while( pilha.length > 0 )
	{
		var tempVertice = pilha.pop();
		tempVertice.cor = corDestino;

		if( tempVertice == verticeDestino )
		{			
			break;
		}
			
		var conjAresta = tempVertice.aresta;
		for( var i in conjAresta )
		{
			var tempAresta = conjAresta[i];			
			var verticeVizinho = tempAresta.destino;
			if( verticeVizinho.cor == corOriginal )
			{
				pilha.push( verticeVizinho );
			}
		}	
		
		tempVertice.cor = corCaminho;
		//atualizarCanvas();
		timeout+=1000;
		setTimeout( atualizarCanvas , timeout );		
		
	}*/
	
		
}

/** @brief Busca em Largura
*
* Esta função implementa o agorítimo de busca em largura em um determinado grafo
*
* @param[in] verticeOrigem vertice de onde começa a busca
* @param[in] verticeDestino vertice a ser procurado
*
* @return 
*
* @remarks Essa função não pode ser chamada antes de configBuscaProfundidade.
*/

function buscaLargura( verticeOrigem, verticeDestino )
{
	var corOriginal = "#000000";
	var corDestino = "#FF2400";
	var corCaminho = "#009900";
	var fila = new Array();
			
	fila.push( verticeOrigem );

	(function esperar() {

		if( fila.length > 0 )
		{
			var tempVertice = fila.shift();
			tempVertice.cor = corDestino;

			if( tempVertice == verticeDestino )
			{	
				atualizarCanvas();		
				return;
			}
			
			var conjAresta = tempVertice.aresta;
			for( var i in conjAresta )
			{
				var tempAresta = conjAresta[i];			
				var verticeVizinho = tempAresta.destino;
				if( verticeVizinho.cor == corOriginal )
				{
					fila.push( verticeVizinho );
				}
			}	
		
			tempVertice.cor = corCaminho;
			atualizarCanvas();
			setTimeout( esperar , 500 );
						
		}

	})();

	/*while( fila.length > 0 )
	{
		var tempVertice = fila.shift();
		tempVertice.cor = corDestino;

		if( tempVertice == verticeDestino )
		{			
			break;
		}
			
		var conjAresta = tempVertice.aresta;
		for( var i in conjAresta )
		{
			var tempAresta = conjAresta[i];			
			var verticeVizinho = tempAresta.destino;
			if( verticeVizinho.cor == corOriginal )
			{
				fila.push( verticeVizinho );
			}
		}	
		
		tempVertice.cor = corCaminho;
						
	}*/

	
}

/** @brief Ordenação Topológica
*
* Esta função implementa o agorítimo de Ordenação Topológica em um determinado grafo
*
* @param[in] conjVertice vetor contendo um conjunto de vétices
*
* @return 
*
* @remarks Essa função não pode ser chamada antes de configOrdenacaoTopologica.
*/

function ordenacaoTopologica( conjVertice )
{
	var vetorGrau = new Array();	// guarda o grau de cada nó.
	var fila = new Array();	// fila que auxilia no algoritimo.
	var vetorOrdTop = new Array();	// vetor resultante com a ordem topologica final.

	for( var i in conjVertice ) // zera o vetorGrau
	{
		var vertice = conjVertice[ i ];
		vetorGrau[ vertice.valor ] = 0;
	}

	for( var i in conjVertice ) // calcula o grau para cada nó
	{
		var vertice = conjVertice[ i ];		
		for( var j in vertice.aresta )
		{
			var aresta = vertice.aresta[ j ];
			var verticeAdjacente = aresta.destino;
			vetorGrau[ verticeAdjacente.valor ] += 1;
		}
	}

	for( var i in conjVertice ) // procura o nós fontes
	{
		var vertice = conjVertice[ i ];
		if( vetorGrau[ vertice.valor ] == 0 )
		{
			fila.push( vertice );
		}
	}

	var i = 0;
	while( fila.length > 0 ) 
	{
		var vertice = fila.shift();
		vetorOrdTop.push( vertice );
		for( var j in vertice.aresta )
		{
			var aresta = vertice.aresta[ j ];
			var verticeAdjacente = aresta.destino;
			vetorGrau[ verticeAdjacente.valor ] -= 1;
			if( vetorGrau[ verticeAdjacente.valor ] == 0 ) // o vértice virou fonte ?
			{
				fila.push( verticeAdjacente );
			}
		}
	}

	var ordemSaida = "";
	while( vetorOrdTop.length > 0 ) // debug
	{		
		var vertice = vetorOrdTop.shift(); 
		ordemSaida = ordemSaida + vertice.valor + " , ";
		//console.log( vertice.valor );
	}

	window.alert( "Vetor saída: " + ordemSaida );

}

function mesclar(grafo1, grafo2)
{
	for( var i in  grafo1.vertice )
	{
		for( var j in grafo2.vertice )
		{
			if(grafo1.vertice[i].valor == grafo2.vertice[j].valor)
			{
				mesclarArestas(grafo1.vertice[i], grafo2.vertice[j], grafo1);
				grafo2.vertice[j].x = null; 
			}
		}
	}
	for( var j in grafo2.vertice )
	{
		if(grafo2.vertice[j].x != null)
		{
			var tam = grafo1.vertice.length;
			grafo1.vertice[ grafo2.vertice[j].valor] = grafo2.vertice[j];
		}
	}
	for(var i in grafo2.vertice)
	{
		for( j in grafo2.vertice[i].aresta)
		{
			if(grafo2.vertice[i].aresta[j].destino.x == null){
				grafo2.vertice[i].aresta[j].destino = grafo1.vertice[grafo2.vertice[i].aresta[j].destino.valor];
			}
		}
	}

}

function mesclarArestas(vertice1, vertice2, grafo1)
{
	for(var i in vertice2.aresta)
	{
		if(typeof grafo1.vertice[vertice2.aresta[i].destino.valor] != 'undefined')
		{
			var tam = vertice1.aresta.length;
			vertice1.aresta[tam] = new Aresta(vertice2.aresta[i].valor, vertice2.aresta[i].direcionado, grafo1.vertice[vertice2.aresta[i].destino.valor]);
			vertice2.aresta[i].valor = null; 
		}
	}
	for(var j = 0; j < vertice2.aresta.length; j++)
	{
		if(vertice2.aresta[j].valor != null)
		{
			var tam = vertice1.aresta.length;
			vertice1.aresta[tam] = vertice2.aresta[j];
		}
	}
	
}


function Ligacao(origem, aresta) // estrutura que guarda as ligaçoes do grafo pra ser usada em algorimtos
{
	this.origem = origem;
	this.aresta = aresta;
}

function ordenar(ligacoes) //por enquanto é um isertion sort, mas depois eu coloco um algoritmo melhor
{
	for(var j = 1; j < ligacoes.length; j++) 
	{
		var key = ligacoes[j];
		var i = j - 1;
		while(i >= 0 && ligacoes[i].aresta.valor > key.aresta.valor) 
		{
			ligacoes[i+1] = ligacoes[i];
			i--;
		}
	 
		ligacoes[i+1] = key;
	}
}

function arvoreMinimaKruskal(grafo)
{
	var ligacoes = new Array();
	var i, j, k;
	
	for(i in grafo.vertice)
	{
		for(j in grafo.vertice[i].aresta)
		{
			if( grafo.vertice[i].valor < grafo.vertice[i].aresta[j].destino.valor )
				ligacoes[ligacoes.length] = new Ligacao(grafo.vertice[i], grafo.vertice[i].aresta[j]);
		}
	}
	
	ordenar(ligacoes);
	
	var raiz = new Array();
	for(i in grafo.vertice)
	{
		raiz[grafo.vertice[i].valor] = grafo.vertice[i].valor;
	}
	var NLA = 0;
	i = 0;
	while(NLA < (grafo.vertice.length - 1) && i < ligacoes.length)
	{
		var lig = ligacoes[i];
		i++;
		var vi = lig.origem.valor;
		var vj = lig.aresta.destino.valor;
		if(raiz[vi] != raiz[vj])
		{
			for( j in raiz)
			{
				if(raiz[j] == raiz[vj] && j != vj )
				{
					raiz[j] = raiz[vi];
				}
			}
			raiz[vj] = raiz[vi];
			lig.aresta.cor = 'D2691E';
			NLA++
			//sleep(1000);
			atualizarCanvas();
			//window.alert("aresta entre: " + vi +  " e " + vj +  " pintada: " + raiz[1] + " " + raiz[2] + " " + raiz[3] + " " + raiz[4] + " " + raiz[5] + " " + raiz[6] + " ." );
		}
	}
}

function arvoreMinimaPrim(grafo)
{
	var ligacoes = new Array();	
	for(var i in grafo.vertice)
	{
		for(var j in grafo.vertice[i].aresta)
		{
				ligacoes[ligacoes.length] = new Ligacao(grafo.vertice[i], grafo.vertice[i].aresta[j]);
		}
		break;
	}
	ordenar(ligacoes);
	var NLA = 0;
	var raiz = new Array();
	for(var i in grafo.vertice)
	{
		raiz[i] = 0;
	}
	var i = 0;
	while(NLA < (grafo.vertice.length - 1) && i < ligacoes.length)
	{
		lig = ligacoes[i];
		i++;
		var k =  lig.aresta.destino.valor;
		if(raiz[k] == 0)
		{
			NLA++;
			lig.aresta.cor = 'D2691E';
			for(var j in lig.aresta.destino.aresta)
			{
				if(lig.aresta.destino.aresta[j].destino == lig.origem)
					lig.aresta.destino.aresta[j].cor = 'D2691E';
			}
			raiz[k] = 1;
			
			for(var j in grafo.vertice[k].aresta)
			{
					ligacoes[ligacoes.length] = new Ligacao(grafo.vertice[k], grafo.vertice[k].aresta[j]);
			}
			atualizarCanvas();
			
			ordenar(ligacoes);
			
		}
	}
}

function caminhoMinimoDjikstra(grafo, node)
{
	//window.alert( grafo.nome + " " + node.valor);
	var dist = new Array();
	var pred = new Array();
	var expl = new Array();
	
	for(var i in grafo.vertice)
	{
		dist[i] = 9999;
		pred[i] = -1;
		expl[i] = 0;
	}
	dist[node.valor] = 0;
	//sleep(1000);
	atualizarCanvas();
	pred[node.valor] = 0;
	node.dist = 0;
	
	var todosExplorados = false;
	while(!todosExplorados)
	{
		var w = null;
		for(var i in grafo.vertice)
		{
			if(expl[i] == 0)
			{
				if( w == null ) 
				{
					w = i;
				}
				else
				{
					if(dist[w] > dist[i])
					{
						w = i;
					}
					
				}
			}
		}
		if( w == null )
		{
			todosExplorados = true;
		}
		else
		{
			expl[w] = 1;
			for(var i in grafo.vertice[w].aresta)
			{
				
				var u = grafo.vertice[w].aresta[i].destino.valor;
				if(expl[u] == 0)
				{
					var peso = new Number(grafo.vertice[w].aresta[i].valor);
					if(dist[u] > dist[w] + peso )
					{
						dist[u] = dist[w] + peso;
						grafo.vertice[u].dist = dist[u];
						//sleep(1000);
						atualizarCanvas();
						pred[u] = w;
					}
				}
			}
		}
	}
	
}

function caminhoMinimoBellmanFord(grafo, node)
{
	//window.alert( grafo.nome + " " + node.valor);
	var dist = new Array();
	var pred = new Array();
	
	for(var i in grafo.vertice)
	{
		dist[i] = 9999;
		pred[i] = -1;
	}
	dist[node.valor] = 0;
	pred[node.valor] = 0;
	node.dist = 0;
	
	var ligacoes = new Array();	
	
	for(var i in grafo.vertice)
	{
		for(var j in grafo.vertice[i].aresta)
		{
				ligacoes[ligacoes.length] = new Ligacao(grafo.vertice[i], grafo.vertice[i].aresta[j]);
		}
	}
	var trocou;
	for(var i in grafo.vertice)
	{
		trocou = false;
		for(var j in ligacoes)
		{
			var destino = ligacoes[j].aresta.destino.valor;
			var origem = ligacoes[j].origem.valor;
			var peso = new Number(ligacoes[j].aresta.valor);	
			if(dist[destino] > dist[origem] + peso)
			{
				dist[destino] = dist[origem] + peso;
				grafo.vertice[destino].dist  = dist[destino];
				trocou = true;
			}
		}
		if(!trocou) break;
	}	
}

function colorir(grafo, v){
	var indiceNo = indiceVerticePorValor(grafo, v.valor);
	if(colorido[indiceNo] != 1){
		coresVertices[indiceNo] = retornaCor(grafo, v);
		
		colorido[indiceNo] = 1;
		
		for(var i in v.aresta){
			colorir(grafo, v.aresta[i].destino);
		}
	}
}

function sleep( milliseconds ) 
{
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}



