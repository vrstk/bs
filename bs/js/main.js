$(document).ready(function () {
	var w = $(window).outerWidth();
	var h = $(window).outerHeight();
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie;
	}
	if (isIE()) {
		$('body').addClass('ie');
	}
	if (isMobile.any()) {
		$('body').addClass('touch');
	}

	ymaps.ready(init);
	function init() {
		// Создание карты.
		var myMap = new ymaps.Map("map", {
			// Координаты центра карты.
			// Порядок по умолчанию: «широта, долгота».
			// Чтобы не определять координаты центра карты вручную,
			// воспользуйтесь инструментом Определение координат.
			controls: [],
			center: [55.748923568988936, 37.7070625],
			// Уровень масштабирования. Допустимые значения:
			// от 0 (весь мир) до 19.
			zoom: 15
		});

		myPlacemark = new ymaps.Placemark([55.748923568988936, 37.7070625], {
			id: '2'
		},
			{
				// Опции.
				hasBalloon: false,
				hideIconOnBalloonOpen: false,
				// Необходимо указать данный тип макета.
				iconLayout: 'default#imageWithContent',
				// Своё изображение иконки метки.
				iconImageHref: 'img/icon/point.png',
				// Размеры метки.
				iconImageSize: [90, 100],
				// Смещение левого верхнего угла иконки относительно
				// её "ножки" (точки привязки).
				iconImageOffset: [-40, -40],
				// Смещение слоя с содержимым относительно слоя с картинкой.
				iconContentOffset: [0, 0],
			});
		myMap.geoObjects.add(myPlacemark);

		// myMap.behaviors.disable('scrollZoom');
	}

	//SLIDERS
	if ($('.mainslider').length > 0) {
		$('.mainslider').slick({
			autoplay: true,
			//infinite: false,
			dots: true,
			arrows: true,
			accessibility: false,
			slidesToShow: 4,
			autoplaySpeed: 3000,
			//asNavFor:'',
			//appendDots:
			//appendArrows:$('.mainslider-arrows .container'),
			nextArrow: '<button type="button" class="slick-next"></button>',
			prevArrow: '<button type="button" class="slick-prev"></button>',
			responsive: [{
				breakpoint: 768,
				settings: {}
			}]
		});
	}


	//SLICK FIX
	if ($('.objects-slider').length > 0) {
		var slider = $('.objects-slider');
		slider.slick({
			//autoplay: true,
			//infinite: false,
			infinite: true,
			dots: true,
			arrows: true,
			accessibility: false,
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplaySpeed: 3000,
			speed: 500,
			waitForAnimate: false,
			//asNavFor:'',
			//appendDots:
			appendDots: $('.objects-controls'),
			appendArrows: $('.objects-controls'),
			nextArrow: '<button type="button" class="slick-next"></button>',
			prevArrow: '<button type="button" class="slick-prev"></button>',
			responsive: [{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}]
		});
		var sltoshow = slider.get(0).slick.options.slidesToShow;
		var all = slider.find('.slick-slide').length;
		var allactive = slider.find('.slick-slide').not('.slick-cloned').length;
		slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			if (nextSlide == 0) {
				var ind = all - allactive;
				if (sltoshow == 1) {
					slider.find('.slick-slide').eq(ind).addClass('active');
				} else {
					sliderfix(slider, ind);
				}
			}
			if (nextSlide == allactive - 1) {
				if (sltoshow == 1) {
					slider.find('.slick-slide').eq(0).addClass('active');
				} else {
					sliderfix(slider, sltoshow - 1);
				}
			}

			//DIRECTION
			if (currentSlide === 0 && nextSlide === slick.$slides.length - 1) {
				direction = 'prev';
			} else if (nextSlide > currentSlide || (currentSlide === (slick.$slides.length - 1) && nextSlide === 0)) {
				direction = 'next';
			} else {
				direction = 'prev';
			}
			//console.log(direction);
		});
		slider.on('afterChange', function (event, slick, currentSlide) {
			slider.find('.slick-slide').removeClass('active');
		});
		function sliderfix(slider, v) {
			for (var i = 0; i < sltoshow; i++) {
				var n = v + i;
				slider.find('.slick-slide').eq(n).addClass('active');
			}
		}


	}

	if ($('.newsmodule-slider').length > 0) {
		$('.newsmodule-slider').slick({
			//autoplay: true,
			//infinite: false,
			fade: true,
			dots: false,
			arrows: false,
			accessibility: false,
			slidesToShow: 1,
			autoplaySpeed: 3000,
			//asNavFor:'',
			//appendDots:
			//appendArrows:$('.mainslider-arrows .container'),
			nextArrow: '<button type="button" class="slick-next fa fa-angle-right"></button>',
			prevArrow: '<button type="button" class="slick-prev fa fa-angle-left"></button>',
			responsive: [{
				breakpoint: 768,
				settings: {}
			}]
		});
		//Опция
		$('.newsmodule-slider').get(0).slick.options.slidesToShow

		$('.newsmodule-items-item').click(function (event) {
			$('.newsmodule-items-item').removeClass('active');
			$(this).addClass('active');
			$('.newsmodule-slider').slick('goTo', $(this).index());
		});
		$('.newsmodule-navigator-info span').eq(1).html($('.newsmodule-items-item').length);

		$('.newsmodule-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			$('.newsmodule-navigator-info span').eq(0).html(nextSlide + 1);
		});
		$('.newsmodule-slider').on('afterChange', function (event, slick, currentSlide) {
			$('.newsmodule-navigator-info span').eq(0).html(currentSlide + 1);
		});
		$('.newsmodule-navigator__arrow.fa-angle-left').click(function (event) {
			$('.newsmodule-slider').slick('slickPrev');
		});
		$('.newsmodule-navigator__arrow.fa-angle-right').click(function (event) {
			$('.newsmodule-slider').slick('slickNext');
		});
	}

	// ============================================================================

	// STO SLIDER
	$('.sto__slider').slick({
		infinite: false,
		dots: true,
		arrows: true,
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [
			{
				breakpoint: 1281,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true
				}
			},
			{
				breakpoint: 993,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true
				}
			}, {
				breakpoint: 769,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
					dots: false,
					appendArrows: $('.sto__arrows')
				}
			}, {
				breakpoint: 681,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: false,
					appendArrows: $('.sto__arrows')
				}
			}
		]
	});

	// PARTNERS SLIDER
	$('.partners__slider').slick({
		infinite: false,
		dots: true,
		arrows: true,
		rows: 2,
		slidesPerRow: 3,
		responsive: [
			{
				breakpoint: 993,
				settings: {
					rows: 3,
					slidesPerRow: 2,
					infinite: true
				}
			}, {
				breakpoint: 769,
				settings: {
					rows: 2,
					slidesPerRow: 1,
					infinite: true,
					dots: false,
					appendArrows: $('.partners__arrows')
				}
			}
		]
	});

	// REVIEWS SLIDER
	$('.reviews__slider').slick({
		infinite: false,
		dots: true,
		arrows: true,
		slidesToShow: 2,
		slidesToScroll: 2,
		responsive: [
			{
				breakpoint: 993,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true
				}
			}, {
				breakpoint: 769,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: false,
					appendArrows: $('.reviews__arrows')
				}
			}
		]
	});

	var sObj = $('.sto__slider .slick-dots');
	var sDots = $('.sto__slider .slick-dots li').length;
	$('.sto__slider .slick-dots li:first-child').html('<span class="dot__num-1">01</span>');
	$('.sto__slider .slick-dots li:last-child').html('<span class="dot__num-2">0' + sDots + '</span>');

	var pObj = $('.partners__slider .slick-dots');
	var pDots = $('.partners__slider .slick-dots li').length;
	$('.partners__slider .slick-dots li:first-child').html('<span class="dot__num-1">01</span>');
	$('.partners__slider .slick-dots li:last-child').html('<span class="dot__num-2">0' + pDots + '</span>');

	var rObj = $('.reviews__slider .slick-dots');
	var rDots = $('.reviews__slider .slick-dots li').length;
	$('.reviews__slider .slick-dots li:first-child').html('<span class="dot__num-1">01</span>');
	$('.reviews__slider .slick-dots li:last-child').html('<span class="dot__num-2">0' + rDots + '</span>');
	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		}
	})
	//FORMS
	function forms() {
		//SELECT
		if ($('select').length > 0) {
			function selectscrolloptions() {
				var scs = 100;
				var mss = 50;
				if (isMobile.any()) {
					scs = 10;
					mss = 1;
				}
				var opt = {
					cursorcolor: "#2078e5",
					cursorwidth: "3px",
					background: "",
					autohidemode: false,
					bouncescroll: false,
					cursorborderradius: "0px",
					scrollspeed: scs,
					mousescrollstep: mss,
					directionlockdeadzone: 0,
					cursorborder: "0px solid #fff",
				};
				return opt;
			}

			function select() {
				$.each($('select'), function (index, val) {
					var ind = index;
					$(this).hide();
					if ($(this).parent('.select-block').length == 0) {
						$(this).wrap("<div class='select-block " + $(this).attr('class') + "-select-block'></div>");
					} else {
						$(this).parent('.select-block').find('.select').remove();
					}
					var milti = '';
					var check = '';
					var sblock = $(this).parent('.select-block');
					var soptions = "<div class='select-options'><div class='select-options-scroll'><div class='select-options-list'>";
					if ($(this).attr('multiple') == 'multiple') {
						milti = 'multiple';
						check = 'check';
					}
					$.each($(this).find('option'), function (index, val) {
						if ($(this).attr('value') != '') {
							soptions = soptions + "<div data-value='" + $(this).attr('value') + "' class='select-options__value_" + ind + " select-options__value value_" + $(this).val() + " " + $(this).attr('class') + " " + check + "'>" + $(this).html() + "</div>";
						} else if ($(this).parent().attr('data-label') == 'on') {
							if (sblock.find('.select__label').length == 0) {
								sblock.prepend('<div class="select__label">' + $(this).html() + '</div>');
							}
						}
					});
					soptions = soptions + "</div></div></div>";
					if ($(this).attr('data-type') == 'search') {
						sblock.append("<div data-type='search' class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" +
							"<div class='select-title'>" +
							"<div class='select-title__arrow ion-ios-arrow-down'></div>" +
							"<input data-value='" + $(this).find('option[selected="selected"]').html() + "' class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "' />" +
							"</div>" +
							soptions +
							"</div>");
						$('.select_' + ind).find('input.select-title__value').jcOnPageFilter({
							parentSectionClass: 'select-options_' + ind,
							parentLookupClass: 'select-options__value_' + ind,
							childBlockClass: 'select-options__value_' + ind
						});
					} else {
						sblock.append("<div class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" +
							"<div class='select-title'>" +
							"<div class='select-title__arrow ion-ios-arrow-down'></div>" +
							"<div class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "'>" + $(this).find('option[selected="selected"]').html() + "</div>" +
							"</div>" +
							soptions +
							"</div>");
					}
					if ($(this).find('option[selected="selected"]').val() != '') {
						sblock.find('.select').addClass('focus');
					}
					if ($(this).attr('data-req') == 'on') {
						$(this).addClass('req');
					}
					$(".select_" + ind + " .select-options-scroll").niceScroll('.select-options-list', selectscrolloptions());
				});
			}
			select();

			$('body').on('keyup', 'input.select-title__value', function () {
				$('.select').not($(this).parents('.select')).removeClass('active').find('.select-options').slideUp(10);
				$(this).parents('.select').addClass('active');
				$(this).parents('.select').find('.select-options').slideDown(10, function () {
					$(this).find(".select-options-scroll").getNiceScroll().resize();
				});
				$(this).parents('.select-block').find('select').val('');
			});
			$('body').on('click', '.select', function () {
				if (!$(this).hasClass('disabled')) {
					$('.select').not(this).removeClass('active').find('.select-options').slideUp(10);
					$(this).toggleClass('active');
					$(this).find('.select-options').slideToggle(50, function () {
						$(this).find(".select-options-scroll").getNiceScroll().resize();
					});

					//	var input=$(this).parent().find('select');
					//removeError(input);

					if ($(this).attr('data-type') == 'search') {
						if (!$(this).hasClass('active')) {
							searchselectreset();
						}
						$(this).find('.select-options__value').show();
					}
				}
			});
			$('body').on('click', '.select-options__value', function () {
				if ($(this).parents('.select').hasClass('multiple')) {
					if ($(this).hasClass('active')) {
						if ($(this).parents('.select').find('.select-title__value span').length > 0) {
							$(this).parents('.select').find('.select-title__value').append('<span data-value="' + $(this).data('value') + '">, ' + $(this).html() + '</span>');
						} else {
							$(this).parents('.select').find('.select-title__value').data('label', $(this).parents('.select').find('.select-title__value').html());
							$(this).parents('.select').find('.select-title__value').html('<span data-value="' + $(this).data('value') + '">' + $(this).html() + '</span>');
						}
						$(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', true);
						$(this).parents('.select').addClass('focus');
					} else {
						$(this).parents('.select').find('.select-title__value').find('span[data-value="' + $(this).data('value') + '"]').remove();
						if ($(this).parents('.select').find('.select-title__value span').length == 0) {
							$(this).parents('.select').find('.select-title__value').html($(this).parents('.select').find('.select-title__value').data('label'));
							$(this).parents('.select').removeClass('focus');
						}
						$(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', false);
					}
					return false;
				}

				if ($(this).parents('.select').attr('data-type') == 'search') {
					$(this).parents('.select').find('.select-title__value').val($(this).html());
					$(this).parents('.select').find('.select-title__value').attr('data-value', $(this).html());
				} else {
					$(this).parents('.select').find('.select-title__value').attr('class', 'select-title__value value_' + $(this).data('value'));
					$(this).parents('.select').find('.select-title__value').html($(this).html());

				}

				$(this).parents('.select-block').find('select').find('option').removeAttr("selected");
				if ($.trim($(this).data('value')) != '') {
					$(this).parents('.select-block').find('select').val($(this).data('value'));
					$(this).parents('.select-block').find('select').find('option[value="' + $(this).data('value') + '"]').attr('selected', 'selected');
				} else {
					$(this).parents('.select-block').find('select').val($(this).html());
					$(this).parents('.select-block').find('select').find('option[value="' + $(this).html() + '"]').attr('selected', 'selected');
				}


				if ($(this).parents('.select-block').find('select').val() != '') {
					$(this).parents('.select-block').find('.select').addClass('focus');
				} else {
					$(this).parents('.select-block').find('.select').removeClass('focus');

					$(this).parents('.select-block').find('.select').removeClass('err');
					$(this).parents('.select-block').parent().removeClass('err');
					$(this).parents('.select-block').removeClass('err').find('.form__error').remove();
				}
				if (!$(this).parents('.select').data('tags') != "") {
					if ($(this).parents('.form-tags').find('.form-tags__item[data-value="' + $(this).data('value') + '"]').length == 0) {
						$(this).parents('.form-tags').find('.form-tags-items').append('<a data-value="' + $(this).data('value') + '" href="" class="form-tags__item">' + $(this).html() + '<span class="fa fa-times"></span></a>');
					}
				}
				$(this).parents('.select-block').find('select').change();

				if ($(this).parents('.select-block').find('select').data('update') == 'on') {
					select();
				}
			});
			$(document).on('click touchstart', function (e) {
				if (!$(e.target).is(".select *") && !$(e.target).is(".select")) {
					$('.select').removeClass('active');
					$('.select-options').slideUp(50, function () { });
					searchselectreset();
				};
			});
			$(document).on('keydown', function (e) {
				if (e.which == 27) {
					$('.select').removeClass('active');
					$('.select-options').slideUp(50, function () { });
					searchselectreset();
				}
			});
		}
		//FIELDS
		$('input,textarea').focus(function () {
			if ($(this).val() == $(this).attr('data-value')) {
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
				if ($(this).attr('data-type') == 'pass') {
					$(this).attr('type', 'password');
				};
				$(this).val('');
			};
			removeError($(this));
		});
		$('input[data-value], textarea[data-value]').each(function () {
			if (this.value == '' || this.value == $(this).attr('data-value')) {
				this.value = $(this).attr('data-value');
				if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
					$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
				}
			}
			if (this.value != $(this).attr('data-value') && this.value != '') {
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
				if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
					$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
				}
			}

			$(this).click(function () {
				if (this.value == $(this).attr('data-value')) {
					if ($(this).attr('data-type') == 'pass') {
						$(this).attr('type', 'password');
					};
					this.value = '';
				};
			});
			$(this).blur(function () {
				if (this.value == '') {
					this.value = $(this).attr('data-value');
					$(this).removeClass('focus');
					$(this).parent().removeClass('focus');
					if ($(this).attr('data-type') == 'pass') {
						$(this).attr('type', 'text');
					};
				};
			});
		});
		$('.form-input__viewpass').click(function (event) {
			if ($(this).hasClass('active')) {
				$(this).parent().find('input').attr('type', 'password');
			} else {
				$(this).parent().find('input').attr('type', 'text');
			}
			$(this).toggleClass('active');
		});

		//$('textarea').autogrow({vertical: true, horizontal: false});


		//MASKS//
		//'+7(999) 999 9999'
		//'+38(999) 999 9999'
		//'+375(99)999-99-99'
		//'a{3,1000}' только буквы минимум 3
		//'9{3,1000}' только цифры минимум 3
		$.each($('input.phone'), function (index, val) {
			$(this).attr('type', 'tel');
			$(this).focus(function () {
				$(this).inputmask('+7(999) 999 9999', {
					clearIncomplete: true, clearMaskOnLostFocus: true,
					"onincomplete": function () { maskclear($(this)); }
				});
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
				$(this).parent().removeClass('err');
				$(this).removeClass('err');
			});
		});
		$('input.phone').focusout(function (event) {
			maskclear($(this));
		});
		$.each($('input.num'), function (index, val) {
			$(this).focus(function () {
				$(this).inputmask('9{1,1000}', { clearIncomplete: true, placeholder: "", clearMaskOnLostFocus: true, "onincomplete": function () { maskclear($(this)); } });
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
				$(this).parent().removeClass('err');
				$(this).removeClass('err');
			});
		});
		$('input.num').focusout(function (event) {
			maskclear($(this));
		});
		//CHECK
		$.each($('.check'), function (index, val) {
			if ($(this).find('input').prop('checked') == true) {
				$(this).addClass('active');
			}
		});
		$('body').off('click', '.check', function (event) { });
		$('body').on('click', '.check', function (event) {
			if (!$(this).hasClass('disable')) {
				var target = $(event.target);
				if (!target.is("a")) {
					$(this).toggleClass('active');
					if ($(this).hasClass('active')) {
						$(this).find('input').prop('checked', true);
					} else {
						$(this).find('input').prop('checked', false);
					}
				}
			}
		});

		//OPTION
		$.each($('.option.active'), function (index, val) {
			$(this).find('input').prop('checked', true);
		});
		$('.option').click(function (event) {
			if (!$(this).hasClass('disable')) {
				if ($(this).hasClass('active') && $(this).hasClass('order')) {
					$(this).toggleClass('orderactive');
				}
				$(this).parents('.options').find('.option').removeClass('active');
				$(this).toggleClass('active');
				$(this).children('input').prop('checked', true);
			}
		});
		//RATING
		$('.rating.edit .star').hover(function () {
			var block = $(this).parents('.rating');
			block.find('.rating__activeline').css({ width: '0%' });
			var ind = $(this).index() + 1;
			var linew = ind / block.find('.star').length * 100;
			setrating(block, linew);
		}, function () {
			var block = $(this).parents('.rating');
			block.find('.star').removeClass('active');
			var ind = block.find('input').val();
			var linew = ind / block.find('.star').length * 100;
			setrating(block, linew);
		});
		$('.rating.edit .star').click(function (event) {
			var block = $(this).parents('.rating');
			var re = $(this).index() + 1;
			block.find('input').val(re);
			var linew = re / block.find('.star').length * 100;
			setrating(block, linew);
		});
		$.each($('.rating'), function (index, val) {
			var ind = $(this).find('input').val();
			var linew = ind / $(this).parent().find('.star').length * 100;
			setrating($(this), linew);
		});
		function setrating(th, val) {
			th.find('.rating__activeline').css({ width: val + '%' });
		}
		//QUANTITY
		$('.quantity__btn').click(function (event) {
			var n = parseInt($(this).parent().find('.quantity__input').val());
			if ($(this).hasClass('dwn')) {
				n = n - 1;
				if (n < 1) { n = 1; }
			} else {
				n = n + 1;
			}
			$(this).parent().find('.quantity__input').val(n);
			return false;
		});
		//RANGE
		if ($("#range").length > 0) {
			$("#range").slider({
				range: true,
				min: 0,
				max: 5000,
				values: [0, 5000],
				slide: function (event, ui) {
					$('#rangefrom').val(ui.values[0]);
					$('#rangeto').val(ui.values[1]);
					$(this).find('.ui-slider-handle').eq(0).html('<span>' + ui.values[0] + '</span>');
					$(this).find('.ui-slider-handle').eq(1).html('<span>' + ui.values[1] + '</span>');
				},
				change: function (event, ui) {
					if (ui.values[0] != $("#range").slider("option", "min") || ui.values[1] != $("#range").slider("option", "max")) {
						$('#range').addClass('act');
					} else {
						$('#range').removeClass('act');
					}
				}
			});
			$('#rangefrom').val($("#range").slider("values", 0));
			$('#rangeto').val($("#range").slider("values", 1));

			$("#range").find('.ui-slider-handle').eq(0).html('<span>' + $("#range").slider("option", "min") + '</span>');
			$("#range").find('.ui-slider-handle').eq(1).html('<span>' + $("#range").slider("option", "max") + '</span>');

			$("#rangefrom").bind("change", function () {
				if ($(this).val() * 1 > $("#range").slider("option", "max") * 1) {
					$(this).val($("#range").slider("option", "max"));
				}
				if ($(this).val() * 1 < $("#range").slider("option", "min") * 1) {
					$(this).val($("#range").slider("option", "min"));
				}
				$("#range").slider("values", 0, $(this).val());
			});
			$("#rangeto").bind("change", function () {
				if ($(this).val() * 1 > $("#range").slider("option", "max") * 1) {
					$(this).val($("#range").slider("option", "max"));
				}
				if ($(this).val() * 1 < $("#range").slider("option", "min") * 1) {
					$(this).val($("#range").slider("option", "min"));
				}
				$("#range").slider("values", 1, $(this).val());
			});
			$("#range").find('.ui-slider-handle').eq(0).addClass('left');
			$("#range").find('.ui-slider-handle').eq(1).addClass('right');
		}
		//ADDFILES
		$('.form-addfile__input').change(function (e) {
			if ($(this).val() != '') {
				var ts = $(this);
				ts.parents('.form-addfile').find('ul.form-addfile-list').html('');
				$.each(e.target.files, function (index, val) {
					if (ts.parents('.form-addfile').find('ul.form-addfile-list>li:contains("' + e.target.files[index].name + '")').length == 0) {
						ts.parents('.form-addfile').find('ul.form-addfile-list').append('<li>' + e.target.files[index].name + '</li>');
					}
				});
			}
		});
	}
	forms();

	function digi(str) {
		var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
		return r;
	}

	//VALIDATE FORMS
	$('form button[type=submit]').click(function () {
		var er = 0;
		var form = $(this).parents('form');
		var ms = form.data('ms');
		$.each(form.find('.req'), function (index, val) {
			er += formValidate($(this));
		});
		if (er == 0) {
			removeFormError(form);
			/*
				var messagehtml='';
			if(form.hasClass('editprofile')){
				var messagehtml='';
			}
			formLoad();
			*/

			//ОПТРАВКА ФОРМЫ
			/*
			function showResponse(html){
				if(!form.hasClass('nomessage')){
					showMessage(messagehtml);
				}
				if(!form.hasClass('noclear')){
					clearForm(form);
				}
			}
			var options={
				success:showResponse
			};
				form.ajaxForm(options);
			
	
			setTimeout(function(){
				if(!form.hasClass('nomessage')){
					//showMessage(messagehtml);
					showMessageByClass(ms);
				}
				if(!form.hasClass('noclear')){
					clearForm(form);
				}
			},0);
	
			return false;
			*/

			if (ms != null && ms != '') {
				showMessageByClass(ms);
				return false;
			}
		} else {
			return false;
		}
	});
	function formValidate(input) {
		var er = 0;
		var form = input.parents('form');
		if (input.attr('name') == 'email' || input.hasClass('email')) {
			if (input.val() != input.attr('data-value')) {
				var em = input.val().replace(" ", "");
				input.val(em);
			}
			if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input.val())) || input.val() == input.attr('data-value')) {
				er++;
				addError(input);
			} else {
				removeError(input);
			}
		} else {
			if (input.val() == '' || input.val() == input.attr('data-value')) {
				er++;
				addError(input);
			} else {
				removeError(input);
			}
		}
		if (input.attr('type') == 'checkbox') {
			if (input.prop('checked') == true) {
				input.removeClass('err').parent().removeClass('err');
			} else {
				er++;
				input.addClass('err').parent().addClass('err');
			}
		}
		if (input.hasClass('name')) {
			if (!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))) {
				er++;
				addError(input);
			}
		}
		if (input.hasClass('pass-2')) {
			if (form.find('.pass-1').val() != form.find('.pass-2').val()) {
				addError(input);
			} else {
				removeError(input);
			}
		}
		return er;
	}
	function formLoad() {
		$('.popup').hide();
		$('.popup-message-body').hide();
		$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
		$('.popup-message').addClass('active').fadeIn(300);
	}
	function showMessageByClass(ms) {
		$('.popup').hide();
		popupOpen('message.' + ms, '');
	}
	function showMessage(html) {
		$('.popup-loading').remove();
		$('.popup-message-body').show().html(html);
	}
	function clearForm(form) {
		$.each(form.find('.input'), function (index, val) {
			$(this).removeClass('focus').val($(this).data('value'));
			$(this).parent().removeClass('focus');
			if ($(this).hasClass('phone')) {
				maskclear($(this));
			}
		});
	}
	function addError(input) {
		input.addClass('err');
		input.parent().addClass('err');
		input.parent().find('.form__error').remove();
		if (input.hasClass('email')) {
			var error = '';
			if (input.val() == '' || input.val() == input.attr('data-value')) {
				error = input.data('error');
			} else {
				error = input.data('error');
			}
			if (error != null) {
				input.parent().append('<div class="form__error">' + error + '</div>');
			}
		} else {
			if (input.data('error') != null && input.parent().find('.form__error').length == 0) {
				input.parent().append('<div class="form__error">' + input.data('error') + '</div>');
			}
		}
		if (input.parents('.select-block').length > 0) {
			input.parents('.select-block').parent().addClass('err');
			input.parents('.select-block').find('.select').addClass('err');
		}
	}
	function addErrorByName(form, input__name, error_text) {
		var input = form.find('[name="' + input__name + '"]');
		input.attr('data-error', error_text);
		addError(input);
	}
	function addFormError(form, error_text) {
		form.find('.form__generalerror').show().html(error_text);
	}
	function removeFormError(form) {
		form.find('.form__generalerror').hide().html('');
	}
	function removeError(input) {
		input.removeClass('err');
		input.parent().removeClass('err');
		input.parent().find('.form__error').remove();

		if (input.parents('.select-block').length > 0) {
			input.parents('.select-block').parent().removeClass('err');
			input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
			//input.parents('.select-block').find('.select-options').hide();
		}
	}
	function removeFormErrors(form) {
		form.find('.err').removeClass('err');
		form.find('.form__error').remove();
	}
	function maskclear(n) {
		if (n.val() == "") {
			n.inputmask('remove');
			n.val(n.attr('data-value'));
			n.removeClass('focus');
			n.parent().removeClass('focus');
		}
	}
	function searchselectreset() {
		$.each($('.select[data-type="search"]'), function (index, val) {
			var block = $(this).parent();
			var select = $(this).parent().find('select');
			if ($(this).find('.select-options__value:visible').length == 1) {
				$(this).addClass('focus');
				$(this).parents('.select-block').find('select').val($('.select-options__value:visible').data('value'));
				$(this).find('.select-title__value').val($('.select-options__value:visible').html());
				$(this).find('.select-title__value').attr('data-value', $('.select-options__value:visible').html());
			} else if (select.val() == '') {
				$(this).removeClass('focus');
				block.find('input.select-title__value').val(select.find('option[selected="selected"]').html());
				block.find('input.select-title__value').attr('data-value', select.find('option[selected="selected"]').html());
			}
		});
	}
	var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
	if (isMobile.any()) { }

	if (location.hash) {
		var hsh = location.hash.replace('#', '');
		if ($('.popup-' + hsh).length > 0) {
			popupOpen(hsh);
		} else if ($('div.' + hsh).length > 0) {
			$('body,html').animate({ scrollTop: $('div.' + hsh).offset().top, }, 500, function () { });
		}
	}
	$('.wrapper').addClass('loaded');

	var act = "click";
	if (isMobile.iOS()) {
		var act = "touchstart";
	}

	$('.header-menu__icon').click(function (event) {
		$(this).toggleClass('active');
		$('.header-menu').toggleClass('active');
		if ($(this).hasClass('active')) {
			$('body').data('scroll', $(window).scrollTop());
		}
		$('body').toggleClass('lock');
		if (!$(this).hasClass('active')) {
			$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	});



	//ZOOM
	if ($('.gallery').length > 0) {
		baguetteBox.run('.gallery', {
			// Custom options
		});
	}
	/*
	CLOUD-ZOOM
	<a rel="position:'right',adjustX:25,adjustY:0,Width: 432" href="img/product/zoom.jpg" class="cloud-zoom product-main-mainimage__item">
		<img class="cloudzoom-gallery" src="img/product/zoom.jpg" alt="" />
	</a>
	*/


	//POPUP
	$('.pl').click(function (event) {
		var pl = $(this).attr('href').replace('#', '');
		var v = $(this).data('vid');
		popupOpen(pl, v);
		return false;
	});
	function popupOpen(pl, v) {
		$('.popup').removeClass('active').hide();
		if (!$('.header-menu').hasClass('active')) {
			$('body').data('scroll', $(window).scrollTop());
		}
		if (!isMobile.any()) {
			$('body').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() }).addClass('lock');
			$('.pdb').css({ paddingRight: $(window).outerWidth() - $('.wrapper').outerWidth() });
		} else {
			setTimeout(function () {
				$('body').addClass('lock');
			}, 300);
		}
		history.pushState('', '', '#' + pl);
		if (v != '' && v != null) {
			$('.popup-' + pl + ' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/' + v + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
		}
		$('.popup-' + pl).fadeIn(300).delay(300).addClass('active');

		if ($('.popup-' + pl).find('.slick-slider').length > 0) {
			$('.popup-' + pl).find('.slick-slider').slick('setPosition');
		}
	}
	function openPopupById(popup_id) {
		$('#' + popup_id).fadeIn(300).delay(300).addClass('active');
	}
	function popupClose() {
		$('.popup').removeClass('active').fadeOut(300);
		if (!$('.header-menu').hasClass('active')) {
			if (!isMobile.any()) {
				setTimeout(function () {
					$('body').css({ paddingRight: 0 });
					$('.pdb').css({ paddingRight: 0 });
				}, 200);
				setTimeout(function () {
					$('body').removeClass('lock');
					$('body,html').scrollTop(parseInt($('body').data('scroll')));
				}, 200);
			} else {
				$('body').removeClass('lock');
				$('body,html').scrollTop(parseInt($('body').data('scroll')));
			}
		}
		$('.popup-video__value').html('');

		history.pushState('', '', window.location.href.split('#')[0]);
	}
	$('.popup-close,.popup__close').click(function (event) {
		popupClose();
		return false;
	});
	$('.popup').click(function (e) {
		if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
			popupClose();
			return false;
		}
	});
	$(document).on('keydown', function (e) {
		if (e.which == 27) {
			popupClose();
		}
	});

	$('.goto').click(function () {
		var el = $(this).attr('href').replace('#', '');
		var offset = 0;
		$('body,html').animate({ scrollTop: $('.' + el).offset().top + offset }, 500, function () { });

		if ($('.header-menu').hasClass('active')) {
			$('.header-menu,.header-menu__icon').removeClass('active');
			$('body').removeClass('lock');
		}
		return false;
	});

	function ibg() {
		$.each($('.ibg'), function (index, val) {
			if ($(this).find('img').length > 0) {
				$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
			}
		});
	}
	ibg();

	//Клик вне области
	$(document).on('click touchstart', function (e) {
		if (!$(e.target).is(".select *")) {
			$('.select').removeClass('active');
		};
	});

	//UP
	$(window).scroll(function () {
		var w = $(window).width();
		if ($(window).scrollTop() > 50) {
			$('#up').fadeIn(300);
		} else {
			$('#up').fadeOut(300);
		}
	});
	$('#up').click(function (event) {
		$('body,html').animate({ scrollTop: 0 }, 300);
	});

	// TABS
	$('body').on('click', '.tab__navitem', function (event) {
		var eq = $(this).index();
		if ($(this).hasClass('parent')) {
			var eq = $(this).parent().index();
		}
		if (!$(this).hasClass('active')) {
			$(this).closest('.tabs').find('.tab__navitem').removeClass('active');
			$(this).addClass('active');
			$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
			if ($(this).closest('.tabs').find('.slick-slider').length > 0) {
				$(this).closest('.tabs').find('.slick-slider').slick('setPosition');
			}
		}
	});
	$.each($('.spoller.active'), function (index, val) {
		$(this).next().show();
	});
	$('body').on('click', '.spoller', function (event) {
		if ($(this).hasClass('mob') && !isMobile.any()) {
			return false;
		}
		if ($(this).hasClass('closeall') && !$(this).hasClass('active')) {
			$.each($(this).closest('.spollers').find('.spoller'), function (index, val) {
				$(this).removeClass('active');
				$(this).next().slideUp(300);
			});
		}
		$(this).toggleClass('active').next().slideToggle(300, function (index, val) {
			if ($(this).parent().find('.slick-slider').length > 0) {
				$(this).parent().find('.slick-slider').slick('setPosition');
			}
		});
		return false;
	});



	function scrolloptions() {
		var scs = 100;
		var mss = 50;
		var bns = false;
		if (isMobile.any()) {
			scs = 10;
			mss = 1;
			bns = true;
		}
		var opt = {
			cursorcolor: "#fff",
			cursorwidth: "4px",
			background: "",
			autohidemode: true,
			cursoropacitymax: 0.4,
			bouncescroll: bns,
			cursorborderradius: "0px",
			scrollspeed: scs,
			mousescrollstep: mss,
			directionlockdeadzone: 0,
			cursorborder: "0px solid #fff",
		};
		return opt;
	}
	function scroll() {
		$('.scroll-body').niceScroll('.scroll-list', scrolloptions());
	}
	if (navigator.appVersion.indexOf("Mac") != -1) {
	} else {
		if ($('.scroll-body').length > 0) { scroll(); }
	}

	/*
	function scrollwhouse(){
			var scs=100;
			var mss=50;
			var bns=false;
		if(isMobile.any()){
			scs=10;
			mss=1;
			bns=true;
		}
		var opt={
			cursorcolor:"#afafaf",
			cursorwidth: "5px",
			background: "",
			autohidemode:false,
			railalign: 'left',
			cursoropacitymax: 1,
			bouncescroll:bns,
			cursorborderradius: "0px",
			scrollspeed:scs,
			mousescrollstep:mss,
			directionlockdeadzone:0,
			cursorborder: "0px solid #fff",
		};
		return opt;
	}
	$('.whouse-content-body').niceScroll('.whouse-content-scroll',scrollwhouse());
	$('.whouse-content-body').scroll(function(event) {
			var s=$(this).scrollTop();
			var r=Math.abs($(this).outerHeight()-$('.whouse-content-scroll').outerHeight());
			var p=s/r*100;
		$('.whouse-content__shadow').css({opacity:1-1/100*p});
	});
	*/


	if ($('.t,.tip').length > 0) {
		tip();
	}
	function tip() {
		$('.t,.tip').webuiPopover({
			placement: 'top',
			trigger: 'hover',
			backdrop: false,
			//selector:true,
			animation: 'fade',
			dismissible: true,
			padding: false,
			//hideEmpty: true
			onShow: function ($element) { },
			onHide: function ($element) { },
		}).on('show.webui.popover hide.webui.popover', function (e) {
			$(this).toggleClass('active');
		});
	}

	// BURGER
	function burgerMenu() {
		$('.header__burger').click(function (event) {
			$('.header__burger, .header__menu').toggleClass('active');
			$('body').toggleClass('lock');
		});

		$('.header__link').click(function (event) {
			$('.header__burger, .header__menu').toggleClass('active');
			$('body').toggleClass('lock');
			$('.header__burger, .header__menu').removeClass('active');
			$('body').removeClass('lock');
		});
	}
	burgerMenu();

	// SMOOTH SCROLLING
	$('.header__link').on('click', function (e) {
		$('html,body').stop().animate({ scrollTop: $(this.hash).offset().top }, 1000);
		e.preventDefault();
	});

	// PARALLAX
	if ($('.main__body,.sale__block').length > 0) {
		parImg();
	}
	function parImg() {
		$('.main__body').parallax({
			scalarX: 5.0,
			scalarY: 0.0
		});
		$('.sale__block').parallax();
	}

	// ANIMATE NUMBERS
	function mainFooterCount() {
		$('.num-1').animateNumber(
			{
				number: 64,
				numberStep: function (now, tween) {
					var floored_number = Math.floor(now),
						target = $(tween.elem);

					target.html(floored_number + '');
				}
			},
			{
				easing: 'swing',
				duration: 1800
			});

		$('.num-2').animateNumber(
			{
				number: 38,
				numberStep: function (now, tween) {
					var floored_number = Math.floor(now),
						target = $(tween.elem);

					target.html(floored_number + '');
				}
			},
			{
				easing: 'swing',
				duration: 1800
			});

		$('.num-3').animateNumber(
			{
				number: 10,
				numberStep: function (now, tween) {
					var floored_number = Math.floor(now),
						target = $(tween.elem);

					target.html(floored_number + '');
				}
			},
			{
				easing: 'swing',
				duration: 1800
			});
	}
	mainFooterCount();

	function conditionsCount() {
		var isDone = false;

		var targetNum = $('.conditions__count');
		var targetNumPos = targetNum.offset().top;
		var winHeight = $(window).height();
		var scrollToElem = targetNumPos - winHeight;

		$(window).scroll(function () {
			var winScrollTop = $(this).scrollTop();
			if (winScrollTop > scrollToElem) {
				// Сработает, когда экран достигнет элемента в переменной target

				if (!isDone) {
					// Ваша ф-ция которая что то делает, отработает 1 раз и все

					var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ', 3, '');
					var decimal_places = 0;
					var decimal_factor = decimal_places === 0 ? 1 : Math.pow(10, decimal_places);

					$('.num-4').animateNumber({
						number: 100000,
						numberStep: comma_separator_number_step
					},
						{
							easing: 'swing',
							duration: 1800
						}
					);

					$('.num-5').animateNumber({
						number: 2 * decimal_factor,

						numberStep: function (now, tween) {
							var floored_number = Math.floor(now) / decimal_factor,
								target = $(tween.elem);

							if (decimal_places > 0) {
								// force decimal places even if they are 0
								floored_number = floored_number.toFixed(decimal_places);

								// replace '.' separator with ','
								floored_number = floored_number.toString().replace('.', ',');
							}

							target.html(floored_number + '');
						}
					},
						{
							easing: 'swing',
							duration: 1800
						}
					);

					$('.num-6').animateNumber({
						number: 350000,
						numberStep: comma_separator_number_step
					},
						{
							easing: 'swing',
							duration: 1800
						}
					);

					isDone = true;
				}
			}
		});
	}
	conditionsCount();

	function saleCount() {
		var isDone = false;

		var targetNum = $('.sale__count');
		var targetNumPos = targetNum.offset().top;
		var winHeight = $(window).height();
		var scrollToElem = targetNumPos - winHeight;

		$(window).scroll(function () {
			var winScrollTop = $(this).scrollTop();
			if (winScrollTop > scrollToElem) {
				// Сработает, когда экран достигнет элемента в переменной target

				if (!isDone) {
					// Ваша ф-ция которая что то делает, отработает 1 раз и все

					var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ', 3, '%');
					var decimal_places = 1;
					var decimal_factor = decimal_places === 0 ? 1 : Math.pow(10, decimal_places);

					$('.num-7').animateNumber({
						number: 10,
						numberStep: comma_separator_number_step
					},
						{
							easing: 'swing',
							duration: 1800
						}
					);

					isDone = true;
				}
			}
		});
	}
	saleCount();

	function disableButtonForm() {
		$('.sale__form .check').click(function (event) {
			$('.sale__form button.disable').toggleClass('not-disable');
		});
	}
	disableButtonForm();

	function openMap() {
		$('.map-link').click(function (event) {
			$('.footer__map').toggleClass('active');
		});
	}
	openMap();

	function wowAdvantage() {
		var targetItem = $('.advantage__item');
		var targetNumPos = targetItem.offset().top;
		var winHeight = $(window).height();
		var scrollToElem = targetNumPos - winHeight;

		$(window).scroll(function () {
			var winScrollTop = $(this).scrollTop();
			if (winScrollTop > scrollToElem) {
				// Сработает, когда экран достигнет элемента в переменной targetItem

				$('.advantage__item').addClass('animated flipInY');
			}
		});
	}
	wowAdvantage();

	function wowSteps() {
		var targetItem = $('.steps__item');
		var targetNumPos = targetItem.offset().top;
		var winHeight = $(window).height();
		var scrollToElem = targetNumPos - winHeight;

		$(window).scroll(function () {
			var winScrollTop = $(this).scrollTop();
			if (winScrollTop > scrollToElem) {
				// Сработает, когда экран достигнет элемента в переменной targetItem

				$('.steps__item').addClass('animated flipInY');
			}
		});
	}
	wowSteps();

	function iconFlag() {
		var i = '<i class="icon-flag"></i>';
		$('.advantage__item_subtitle ul li').append(i);

		$('.icon-flag').append('<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="689.000000pt" height="502.000000pt" viewBox="0 0 689.000000 502.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,502.000000) scale(0.100000,-0.100000)" fill="#cd343a" stroke="none"><path d="M4846 4938 c-23 -89 -50 -145 -110 -224 -215 -287 -621 -472 -1186 -541 -194 -23 -689 -24 -940 0 -647 60 -1151 43 -1605 -55 -281 -60 -555 -167 -735 -286 -96 -64 -238 -194 -246 -226 -5 -20 42 -106 586 -1076 53 -96 250 -447 435 -780 186 -333 474 -848 640 -1145 166 -297 309 -553 317 -570 l16 -30 6 70 c23 240 90 382 258 541 201 191 479 312 858 373 352 57 704 55 1260 -9 628 -71 1074 -62 1525 31 378 79 746 228 938 383 21 16 65 -67 -488 921 -117 209 -385 688 -595 1065 -211 377 -467 836 -570 1020 -103 184 -200 358 -215 385 -55 100 -127 225 -129 225 -1 0 -10 -33 -20 -72z m74 -425 c18 -32 49 -89 70 -128 21 -38 75 -135 120 -215 45 -80 94 -167 110 -195 15 -27 58 -104 95 -170 37 -66 85 -154 107 -195 23 -41 47 -82 54 -91 27 -31 15 -47 -76 -99 -117 -67 -234 -117 -393 -169 -132 -43 -356 -101 -392 -101 -55 -1 -53 -5 223 -491 148 -261 279 -491 292 -511 25 -43 6 -44 240 9 243 55 463 127 663 217 32 14 59 26 61 26 4 0 85 -141 285 -500 78 -140 146 -262 151 -270 5 -8 27 -47 49 -87 l40 -72 -52 -30 c-152 -87 -417 -183 -638 -232 -168 -37 -253 -48 -265 -36 -6 7 -63 107 -126 222 -398 728 -380 697 -402 691 -64 -16 -307 -56 -406 -67 -69 -8 -237 -13 -420 -14 -343 0 -555 16 -581 43 -9 10 -107 181 -219 382 -112 201 -241 432 -287 514 l-84 149 78 -7 c291 -24 392 -28 676 -23 257 4 333 8 432 26 111 19 224 45 229 53 1 2 -96 179 -216 393 -121 215 -237 422 -258 461 l-39 71 127 42 c254 84 450 198 617 362 55 54 101 99 102 99 1 0 16 -26 33 -57z m-2590 -513 c80 -5 182 -13 227 -16 l82 -7 246 -439 c136 -242 245 -442 243 -444 -2 -2 -71 3 -154 11 -433 41 -735 41 -980 0 -137 -23 -284 -57 -284 -66 0 -4 15 -34 33 -66 19 -32 136 -242 262 -468 125 -225 234 -416 240 -424 11 -11 23 -9 76 12 189 75 540 83 984 21 170 -23 388 -65 408 -78 16 -10 480 -827 473 -833 -1 -2 -59 2 -127 7 -165 14 -574 14 -724 0 -145 -14 -314 -42 -454 -75 -57 -14 -105 -24 -106 -23 -1 2 -120 216 -264 475 l-263 473 -197 -100 c-246 -125 -428 -233 -560 -333 -57 -43 -104 -77 -106 -75 -1 2 -22 37 -45 78 -41 73 -52 92 -117 210 -36 66 -353 634 -394 707 l-30 52 68 56 c202 168 489 311 746 371 42 10 77 22 77 27 0 4 -80 151 -177 325 -97 174 -210 375 -249 447 -40 71 -72 131 -70 132 5 6 230 33 341 41 154 13 622 14 795 2z"/></g></svg>');
	}
	iconFlag();
});
