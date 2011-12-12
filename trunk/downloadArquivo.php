<?php
	$nomeArquivo = $_GET[ 'nomeArquivo' ];
	$download = $_GET['download'];
        $nomeArquivoXML = "backup/" . $nomeArquivo . ".xml";

	if( $download  )
	{ 	
		 // Configuramos os headers que seirão enviados para o browser 
	        header('Content-Description: File Transfer');
        	header('Content-Disposition: attachment; filename="'. basename($nomeArquivoXML) .'"');
	        header('Content-Type: application/octet-stream');
        	header('Content-Transfer-Encoding: binary');
	        header('Content-Length: ' . filesize($nomeArquivoXML));
        	header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
	        header('Pragma: public');
        	header('Expires: 0');
	}else
	{
		 header('Content-Type: text/xml');

	}

        // Envia o arquivo para o cliente 
        readfile($nomeArquivoXML);

?>
