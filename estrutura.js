var grafos = new Array();
var numVertices = 0;

function novo_vertice(nome){
	this.nome=nome;
	this.linkpara = new Array();
	this.numlinks = 0;
}

function inserir_link(){
	var origem = document.getElementById("linkvertice1text").value;
	var destino = document.getElementById("linkvertice2text").value;
	var i_link = grafos[origem].numlinks;
	
	grafos[origem].linkpara[i_link] = grafos[destino];
	grafos[origem].numlinks++;
	
	atualizar_status();
}

function inserir_vertice(){
	grafos[numVertices] = new novo_vertice(numVertices);
	numVertices++;
	
	atualizar_status();
}

function atualizar_status(){
	document.getElementById("statusdiv").innerHTML = "";
	var i = 0;
	for(i=0; i < numVertices; i++){
		document.getElementById("statusdiv").innerHTML += grafos[i].nome;
		var j;
		for(j=0; j < grafos[i].numlinks; j++){
			document.getElementById("statusdiv").innerHTML += " -> " + grafos[i].linkpara[j].nome;
		}
		document.getElementById("statusdiv").innerHTML += "<br />";
	}
		
}

function remover_vertice(){
	var vertice = document.getElementById("verticedeletetext").value;

	/*remover os links que chegam no vertice a ser deletado*/	
	for(v in grafos){
		
	}

	/*remover os links que partem do vertice a ser deletado*/
	var numlinks = 	grafos[vertice].numlinks;
	grafos[vertice].linkpara.splice(0, numlinks); //provavelmente desnecessário
	grafos.splice(vertice, 1);

	atualizar_status();
}

function remover_link(){
	var origem = document.getElementById("linkdelete1text").value;
	var destino = document.getElementById("linkdelete2text").value;
	
	var i=0;
	var linksarray = grafos[origem].linkpara;
	for(i=0; i < grafos[origem].numlinks; i++){
		if(linksarray[i].nome == destino){
			linksarray.splice(i, 1);
			grafos[origem].numlinks--;
			i--;
		}
	}
	
	atualizar_status();
}
