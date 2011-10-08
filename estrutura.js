var grafos = new Array();
var numVertices = 0;
var action = 0;
var actNode = null;

window.addEventListener("load", atualizar_status, false);
window.addEventListener("dblclick", onMouseDblClick, false);
window.addEventListener("mousedown", onMouseDown, false);
window.addEventListener("mouseup", onMouseUp, false);
window.addEventListener("mousemove", onMouseMove, false);

function novo_vertice(nome, x, y){
	this.nome=nome;
	this.linkpara = new Array();
	this.numlinks = 0;
	this.posx = x;
	this.posy = y;
}

function onMouseDblClick(e){ // o ideal seria que o inserir vertices chamasse essa função que 
	if( e.clientX > 10 && e.clientX < 510 && e.clientY < 602 && e.clientY > 102 ){
		if(action == 1){ //inserir
			grafos[numVertices] = new novo_vertice(numVertices, e.clientX, e.clientY);
			numVertices++;
			action = 0;
			atualizar_status();
		}else if(action == 2){ //remover
			for(j=0; j < numVertices; j++){
				if( e.clientX > grafos[j].posx - 20 && e.clientX < grafos[j].posx + 20 && e.clientY > grafos[j].posy - 20 && e.clientY < grafos[j].posy + 20 ){
					//numVertices--;
					action = 0;
					grafos[j].nome = "apagado";
					atualizar_status();
				}	
			}
		}
	}
}

function onMouseDown(e){ // o ideal seria que o inserir vertices chamasse essa função que 
	if( e.clientX > 10 && e.clientX < 510 && e.clientY < 602 && e.clientY > 102 ){
		if(action == 0){ //inserir
			for(j=0; j < numVertices; j++){
				if( e.clientX > grafos[j].posx - 20 && e.clientX < grafos[j].posx + 20 && e.clientY > grafos[j].posy - 20 && e.clientY < grafos[j].posy + 20 ){
					actNode = j;
				}	
			}
		}
		if( action == 3){ //criar link
			for(j=0; j < numVertices; j++){
				if( e.clientX > grafos[j].posx - 20 && e.clientX < grafos[j].posx + 20 && e.clientY > grafos[j].posy - 20 && e.clientY < grafos[j].posy + 20 ){
					actNode = j;
				}	
			}
		}
	}
}

function onMouseMove(e){ // o ideal seria que o inserir vertices chamasse essa função que 
	if(action == 0 && actNode != null ){
		grafos[actNode].posx = e.clientX;
		grafos[actNode].posy = e.clientY;
		atualizar_status();
	}else if(action == 3 && actNode != null ){
		atualizar_status();
		var context = document.getElementById("area").getContext("2d");
		context.beginPath();
		context.moveTo(grafos[actNode].posx - 10, grafos[actNode].posy - 102);
		context.lineTo(e.clientX - 10, e.clientY - 102);
		context.stroke();
		context.closePath();
		
		
	}
}

function onMouseUp(e){ // o ideal seria que o inserir vertices chamasse essa função que 
	if(action == 0 && actNode != null ){
		actNode = null;
	}else if(action == 3 && actNode != null ){
		var origem = actNode;
		for(j=0; j < numVertices; j++){
			if( e.clientX > grafos[j].posx - 20 && e.clientX < grafos[j].posx + 20 && e.clientY > grafos[j].posy - 20 && e.clientY < grafos[j].posy + 20 ){
					var destino = j;
					var i_link = grafos[origem].numlinks;
					grafos[origem].linkpara[i_link] = grafos[destino];
					grafos[origem].numlinks++;
					atualizar_status();
			}	
		}
		action = 0;
		actNode = null;		
		
	}
}



function inserir_link(){
	action = 3;
}



function inserir_vertice(){
	action = 1;
}

function desenhar_aresta(ox, oy, dx, dy){
	var context = document.getElementById("area").getContext("2d");
	var disx = ox - dx;
	var disy = oy - dy;
	if(disx >= 0 && disy >= 0){
		if(Math.abs(disx) >= Math.abs(disy)){
			disy = -disy/disx;
			disx = -1;
					
		} else {
			disx = -disx/disy;
			disy = -1;	
		}
	} else if(disx >= 0 && disy <= 0){
		if(Math.abs(disx) >= Math.abs(disy)){
			disy = -disy/disx;
			disx = -1;
					
		} else {
			disx = disx/disy;
			disy = 1;	
		}				
	}else if(disx <= 0 && disy >= 0){
		if(Math.abs(disx) >= Math.abs(disy)){
			disy = disy/disx;
			disx = 1;
					
		} else {
			disx = -disx/disy;
			disy = -1;	
		}
	}else{
		if(Math.abs(disx) >= Math.abs(disy)){
			disy = disy/disx;
			disx = 1;
					
		} else {
			disx = disx/disy;
			disy = 1;	
		}
	}
	
	context.beginPath();
	context.lineWidth = 3;
	context.moveTo(ox - 10, oy - 102);
	context.lineTo(dx - 10 - disx*29, dy - 102 - disy*29);
	context.stroke();
	context.closePath();

	context.beginPath();
	context.lineWidth = 15;
	context.moveTo(dx - 10 - disx*30, dy - 102 - disy*30);
	context.lineTo(dx - 10 - disx*27, dy - 102 - disy*27);
	context.stroke();
	context.closePath();

	context.beginPath();
	context.lineWidth = 12;
	context.moveTo(dx - 10 - disx*28, dy - 102 - disy*28);
	context.lineTo(dx - 10 - disx*24, dy - 102 - disy*24);
	context.stroke();
	context.closePath();			

	context.beginPath();
	context.lineWidth = 9;
	context.moveTo(dx - 10 - disx*25, dy - 102 - disy*25);
	context.lineTo(dx - 10 - disx*21, dy - 102 - disy*21);
	context.stroke();
	context.closePath();
	
	context.beginPath();
	context.lineWidth = 6;
	context.moveTo(dx - 10 - disx*22, dy - 102 - disy*22);
	context.lineTo(dx - 10 - disx*18, dy - 102 - disy*18);
	context.stroke();
	context.closePath();

	context.beginPath();
	context.lineWidth = 3;
	context.moveTo(dx - 10 - disx*19, dy - 102 - disy*19);
	context.lineTo(dx - 10 - disx*10, dy - 102 - disy*10);
	context.stroke();
	context.closePath();

}

function atualizar_status(){
	//document.getElementById("statusdiv").innerHTML = "";
	var context = document.getElementById("area").getContext("2d");
	context.fillStyle = "aaaaaa";
	context.fillRect( 0, 0, 500, 500);
	//context.lineWidth = 5;
	context.font = "12px serif";
	var i = 0;
	for(i=0; i < numVertices; i++){
		//document.getElementById("statusdiv").innerHTML += grafos[i].nome + ", " + grafos[i].posx + ", " + grafos[i].posy;
		context.beginPath();
		context.lineWidth = 3;
		context.fillStyle = "000000";
		context.arc(grafos[i].posx - 10, grafos[i].posy - 102, 20, (Math.PI/180)*0, (Math.PI/180)*360, false); //
		context.fill();
		context.stroke()
		context.closePath();

		var j;
		for(j=0; j < grafos[i].numlinks; j++){
			desenhar_aresta(grafos[i].posx, grafos[i].posy, grafos[grafos[i].linkpara[j].nome].posx, grafos[grafos[i].linkpara[j].nome].posy);
				
		}

		context.beginPath();
		context.fillStyle = "FFFFFF";
		context.fillText(grafos[i].nome, grafos[i].posx - 13, grafos[i].posy - 97);
		context.closePath();
		//document.getElementById("statusdiv").innerHTML += "<br />";
	}
	;
		
}
function deletar_vertice(){
	action = 2;
}
function remover_vertice(){
	action = 2;
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
