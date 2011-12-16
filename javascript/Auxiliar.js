function gerarCores(){
	var coresAux = new Array();
	for(var r=0; r<=5; r++){
		for(var g=0; g<=5; g++){
			for(var b=0; b<=5; b++){
				if(r != g && r != b && g != b){ //não é a maneira mais eficiente de se fazer essa verificação
					var hex = "";
					var r1 = parseInt(r*51).toString(16);
					var g1 = parseInt(g*51).toString(16);
					var b1 = parseInt(b*51).toString(16);
					
					hex += (r1.length < 2) ? "0" + r1 : r1;
					hex += (g1.length < 2) ? "0" + g1 : g1;
					hex += (b1.length < 2) ? "0" + b1 : b1;
					
					coresAux.push(hex);
				}
			}
		}
	}
	
	
	/*Embaralhar as cores*/
	var numeroDeCores = coresAux.length;
	var iC, indiceRemov;
	for(ic = 0; ic < numeroDeCores; ic++){
		indiceRemov = Math.floor(Math.random()*(numeroDeCores+1));
		cores.push(coresAux[indiceRemov]);
		coresAux.splice(indiceRemov, 1);
	}
	
}

function retornaCor(grafo, v){
	var coresUsadas = new Array();
	
	/*Encontrar as cores dos vértices próximos e que estão ligados a ele*/
	
	/*Ligacoes que chegam*/
	for(var i in grafo.vertice){
		for(var j = 0; j < grafo.vertice[i].aresta.length; j++){
			if(grafo.vertice[i].aresta[j].destino.valor == v.valor){
				if(coresVertices[i] != undefined){
					coresUsadas.push(indiceCorPorValor(coresVertices[i]));
				}
			}
		}
	}
	
	/*ligacoes que saem*/
	for(var i in v.aresta){
		var indiceVerticeDestino = indiceVerticePorValor(grafo, v.aresta[i].destino.valor);
		if(coresVertices[indiceVerticeDestino] != undefined){
			coresUsadas.push(indiceCorPorValor(coresVertices[indiceVerticeDestino]));
		}
	}
	
	/*Encontrando uma cor que possa ser usada*/
	var corPodeSerUsada;
	for(var i=0; i < cores.length; i++){
		corPodeSerUsada = true;
		for(var j=0; j<=coresUsadas.length; j++){
			if(coresUsadas[j] == i)
				corPodeSerUsada = false;
		}
		
		if(corPodeSerUsada == true){
			return cores[i];
		}
	}
	
	return undefined;
}

function indiceCorPorValor(cor){
	for(var i=0; i < cores.length; i++){
		if(cores[i] == cor){
			return i;
		}
	}
}
