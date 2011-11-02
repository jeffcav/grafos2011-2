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

