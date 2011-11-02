
function Aresta( valor, direcionado, vertice, cor )
{
	if ( typeof cor == 'undefined' ) 
	{
		this.cor = "#000000";
	}else
	{
		this.cor = cor;
	}
	this.valor = valor;
	this.direcionado = direcionado;
	this.destino = vertice;
}
