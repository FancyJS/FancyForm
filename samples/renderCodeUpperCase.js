(function(){
	Fancy.get('pre-id').css('opacity', 0);
	setTimeout(function(){
		var textProperty,
			el = Fancy.get( 'script-id' ),
			styleEl = Fancy.get('style-id');
		
		if( el.dom.innerText ){
			textProperty = 'innerText';
		}
		else if( el.dom.textContent ){
			textProperty = 'textContent';
		}

		var elCode = el.dom[textProperty],
			styleElCode = '';
		
		if( styleEl.dom ){
			styleElCode = styleEl.dom[textProperty];
		}
		
		if( elCode ){
			elCode = elCode.replace('prettyPrint();', '' );
			elCode = elCode.replace(/\t/gi, '    ');
			
			styleElCode = styleElCode.replace(/\t/gi, '    ');
			
			var codeText = [
				"<!DOCTYPE html>\n",
				"<html>\n",
				"<head>\n",
				"    <meta charset=\"utf-8\">\n",
				"    <title>"+document.title+"</title>\n",
				"    <script src=\"jquery/jquery-1.11.0.min.js\"><\/script>\n",
				"    <link rel=\"stylesheet\" href=\"fancyform/fancyform-min.css\">\n",
				"    <script src=\"fancyform/fancyform-min.js\"\>\</script\>\n",
				"</head>\n",
				"\<style\>\n",
				styleElCode,
				"\</style\>\n",
				"<body>\n",
				"\n",
				"<div id=\"form\"></div>\n",
				"<div id=\"form2\"></div>\n",
				"\n",
				"\<script\>\n",
				elCode,
				"\</script\>\n",
				"</body>\n",
				"</html>\n"
			].join('');

			Fancy.get('pre-id').dom[textProperty] = codeText;
		}
		prettyPrint();
		$('#pre-id').fadeTo(500, 1);
	});
})();