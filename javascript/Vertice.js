
function Vertice( valor, x, y, cor )
{
	if ( typeof cor == 'undefined' ) 
	{
		this.cor = "#000000";
	}else
	{
		this.cor = cor;
	}
	this.valor = valor;
	this.x = x;
	this.y = y;
	this.aresta = new Array();
	this.dist = null;
	
}
