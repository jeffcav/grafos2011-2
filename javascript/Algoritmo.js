/** @brief Busca em profundidade
*
* Esta função implementa o agorítimo de busca em profundidadde em um determinado grafo
*
* @param grafo O grafo a ser aplicado o algorítimo
* @param[in] verticeOrigem vertice de onde começa a busca
* @param[in] verticeDestino vertice a ser procurado
*
* @return 
*
* @remarks Essa função não pode ser chamada antes de configBuscaProfundidade.
*/

function buscaProfundidade( verticeOrigem, verticeDestino )
{
	var corOriginal = "#000000"
	var corDestino = "#FF2400";
	var corCaminho = "#009900";
	var pilha = new Array();
			
	pilha.push( verticeOrigem );

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
						
	}

	atualizarCanvas();
}

function mesclar(grafo1, grafo2)
{
	for(var i = 0; i < grafo1.vertice.length; i++)
	{
		for(var j = 0; j < grafo2.vertice.length; j++)
		{
			if(grafo1.vertice[i].valor == grafo2.vertice[j].valor)
			{
				mesclarArestas(grafo1.vertice[i], grafo2.vertice[j], grafo1);
				grafo2.vertice[j].x = null; 
			}
		}
	}
	for(var j = 0; j < grafo2.vertice.length; j++)
	{
		if(grafo2.vertice[j].x != null)
		{
			var tam = grafo1.vertice.length;
			grafo1.vertice[tam] = grafo2.vertice[j];
		}
	}
	for(var i = 0; i < grafo2.vertice.length; i++)
	{
		for(var j = 0; j < grafo2.vertice[i].aresta.length; j++ )
		{
			if(grafo2.vertice[i].aresta[j].destino.x == null){
				for(var k = 0; k < grafo1.vertice.length; k++)
				{
					if(grafo1.vertice[k].valor == grafo2.vertice[i].aresta[j].destino.valor)
					{
						grafo2.vertice[i].aresta[j].destino = grafo1.vertice[k];
					}
				}
			}
		}
	}

}

function mesclarArestas(vertice1, vertice2, grafo1)
{
	for(var i = 0; i < vertice2.aresta.length; i++)
	{
		for(var j = 0; j < grafo1.vertice.length; j++)
		{
			if(vertice2.aresta[i].destino.valor == grafo1.vertice[j].valor  && vertice2.aresta[i].valor != null)
			{
				var tam = vertice1.aresta.length;
				vertice1.aresta[tam] = new Aresta(vertice2.aresta[i].valor, 1, grafo1.vertice[j]);
				vertice2.aresta[i].valor = null; 
			}
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
