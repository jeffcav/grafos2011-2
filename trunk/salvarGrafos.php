<?php
	$nomeArquivo = $_POST[ 'nomeArquivo' ];
	$xml = $_POST[ 'conjuntoGrafos' ];
	$nomeArquivoXML = $nomeArquivo . ".xml";
	$fp = fopen( "backup/" . $nomeArquivoXML, 'w' );
	
	if( !$fp )
	{		
		echo "Falha ao abrir o arquivo " . $nomeArquivoXML;
		exit;
	}

	fwrite( $fp, $xml );
	fclose( $fp );	
	
	echo "Arquivo salvo com sucesso";
?>
