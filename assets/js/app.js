jQuery(document).ready(function($) {
	// notas de rodapé
	var html = $('html')
	var corpo = $('body');
	var btRodape = $('button.botao-rodape');
	var notasRodape = $('.nota-rodape');

	var transitionendPrefixed = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';
	notasRodape.each(function(index, el) {
		$(el).prepend('\
			<button class=\'fechar\' title=\'Fechar nota de rodapé\'>\
			</button>');

		$(el).find('.fechar').on('click', function(event) {
			$(el).addClass('easing-saida');
			notasRodape.removeClass('visivel');
			btRodape.removeClass('ativado');
			rodapeAtual = 0;
		});

		$(el).on(transitionendPrefixed, function(event) {
			if (!$(this).hasClass('visivel')) {
				$(this).removeClass('db easing-saida');
			}
		});
	});


	var rodapeAtual = 0;

	btRodape.on('click', function(event) {
		var thisNumero = parseInt($(this).attr('data-numero'));
		if (thisNumero !== rodapeAtual) {
			var thisTop = $(this).offset().top;
			var thisLeft = $(this).offset().left;
			var thisHeight = $(this).outerHeight();
			notasRodape.filter('[data-numero=\''+rodapeAtual+'\']').addClass('easing-saida');
			notasRodape.removeClass('visivel');
			var notaRevelar = notasRodape.filter('[data-numero=\'' + thisNumero + '\']');
			notaRevelar.addClass('db');
			notaRevelar.css({
				'top': '',
				'left': ''
			});

			var topNota = (function(){
				var topCalculado = thisTop - notaRevelar.outerHeight();
				if (topCalculado > 0) {
					notaRevelar.removeClass('origem-top');
					return thisTop - notaRevelar.outerHeight();
				} else{
					notaRevelar.addClass('origem-top');
					return thisTop + thisHeight;
				}
			})();

			var leftNota = (function(){
				var leftCalculado = thisLeft - notaRevelar.outerWidth()/2;
				if (leftCalculado < 0) {
					return 0;
				} else if(leftCalculado + notaRevelar.outerWidth() > corpo.width() ){
					return corpo.width() - notaRevelar.outerWidth();
				} else{
					return leftCalculado;
				}
			})();
			btRodape.removeClass('ativado');
			$(this).addClass('ativado');
			notaRevelar.css({
				'top': topNota,
				'left': leftNota
			}).addClass('visivel');


			if (topNota < html.scrollTop()) {
				html.animate({'scrollTop' : topNota}, 200);
			}

			rodapeAtual = thisNumero;
		}
	});
});	