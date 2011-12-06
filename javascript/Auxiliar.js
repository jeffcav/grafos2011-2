function gerarCores(){
	for(var r=0; r<=5; r++){
		for(var g=0; g<=5; g++){
			for(var b=0; b<=5; b++){
				if(r != g && r != b && g != b){ //não é a maneira mais eficiente de se fazer essa verificação
					var hex = "";
					hex += parseInt(r).toString(16);
					hex += parseInt(g).toString(16);
					hex += parseInt(b).toString(16);
					
					cores.push(hex);
				}
			}
		}
	}
}

function retornaCor(grafo, v){
	var coresUsadas = new Array();
	
	/*Encontrar as cores dos vértices próximos e que estão ligados a ele*/
	
	/*Ligacoes que chegam*/
	for(var i = 0; i < grafo.vertice.length; i++){
		for(var j in vertice.aresta){
			if(grafo.vertice[i].aresta[j].destino.valor == v.valor){
				if(coresVertices[i] != 'undefined'){
					coresUsadas.push(indiceCorPorValor(coresVertices[i]));
				}
			}
		}
	}
	
	/*ligacoes que saem*/
	for(var i in v.aresta){
		var indiceVerticeDestino = indiceVerticePorValor(grafo, v.aresta[i].valor);
		if(coresVertices[indiceVerticeDestino] != undefined){
			coresUsadas.push(indiceCorPorValor(coresVertices[indiceVerticeDestino]));
		}
	}
	
	/*Encontrando uma cor que possa ser usada*/
	var corPodeSerUsada;
	for(var i=0; i < cores.length; i++){
		corPodeSerUsada = true;
		for(var j=0; j<coresUsadas.length; j++){
			if(coresUsadas[j] == i)
				corPodeSerUsada = false;
		}
		
		if(corPodeSerUsada == true){
			return cores[i];
		}
	}
	
	return 'undefined';
}

function indiceCorPorValor(cor){
	for(var i=0; i < cores.length; i++){
		if(cores[i] == cor){
			return i;
		}
	}
}
