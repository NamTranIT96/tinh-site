/**
 * Theme functions file
 *
 * Contains handlers for navigation, accessibility, header sizing
 * footer widgets and Featured Content slider
 *
 */
( function( $ ) {
	"use strict";
	var _body    = $( 'body' ),
		_window = $( window );
	$(document).ready(function() {
		_filter_ajax_sort_count();
		_sticky_menu();
		_left_right_submenu();
		// Search toggle.
		_search_toggle();
		/*Menu Categories*/
		_categories_menu_toggle();
		//Check to see if the window is top if not then display button
		_back_to_top();
		/* Add button show / hide for widget_product_categories */
		_toggle_categories();
		_event_single_image();
		_layout_blog_masonry();
		_load_wpbingo_menu_sidebar();
		_event_ajax_search();
		_event_circlestime();
	});
	_window.resize(function() {
		_load_canvas_menu();
		_left_right_submenu();
		_resize_sticky_kit();
	});	
	/* Show/hide NewsLetter Popup */
	_window.load(function() {
		_body.addClass('loaded');
		$( ".slick-carousel" ).each(function() {
			_load_slick_carousel($(this));	
		});
	});
	function _kola_update_total_price(){
		$.ajax({
			url: kola_ajax_url,
			type: "POST",
			data: {
				'action' : 'kola_update_total_price'
			},
			success:function(data) {
				$("#cart .text-price-cart").html(data['total_price']);
			}
		});
	}	
	function _filter_ajax_sort_count(){
		if(!$('.bwp-filter-ajax').length){
			$( ".sort-count" ).change(function() {
				var value = $(this).val();
				_setGetParameter('product_count',value);
			});
		}		
	}
	function _resize_sticky_kit(){
		if($(".bwp-single-product").length){
			var $element = $(".bwp-single-product");
			var _data = $element.data();
			if(_data.product_layout_thumb == "list" || _data.product_layout_thumb == "list2"){
				_sticky_kit();
			}
		}		
	}
	function _toggle_categories(){
		var $root = $(".widget_product_categories");
		if($(".current-cat-parent",$root).length > 0){
			var $current_parent = $(".current-cat-parent",$root);
			$current_parent.addClass('open');
			$("> .children",$current_parent).stop().slideToggle(400);
		}
		var $current = $(".current-cat",$root);
		$current.addClass('open');
		$("> .children",$current).stop().slideToggle(400);
		$( '.cat-parent',$root ).each(function(index) {
				var $element = $(this);
				if($(".children",$element).length > 0){
				$element.prepend('<span class="arrow"></span>');
				$(".arrow",$element).on( 'click', function(e) {
					e.preventDefault();
					$element.toggleClass('open').find( '> .children' ).stop().slideToggle(400);
				});
			}
		});
	}	
	function _back_to_top(){
	   _window.scroll(function() {
			if ($(this).scrollTop() > 100) {
				$('.back-top').addClass('button-show');
			} else {
				$('.back-top').removeClass('button-show');
			}
		});
		$('.back-top').on( "click", function() {
			$('html, body').animate({
				scrollTop: 0
			}, 800);
			return false;
		});			
	}	
	function _categories_menu_toggle(){
		if($('.categories-menu .btn-categories').length){
			$('.categories-menu .btn-categories').on( "click", function(){
				$('.wrapper-categories').toggleClass('bwp-active');
			});
		}			
	}	
	function _search_toggle(){
		$( '.search-toggle' ).on( 'click.break', function( event ) {
			$('.page-wrapper').toggleClass('opacity-style');
			var wrapper = $( '.search-overlay' );
				wrapper.toggleClass( 'search-visible' );
		} );
		$( '.close-search','.search-overlay' ).on( 'click.break', function( event ) {
			$('.page-wrapper').toggleClass('opacity-style');
			var wrapper = $( '.search-overlay' );
				wrapper.toggleClass( 'search-visible');
		} );
	}	
	function _wpbingo_menu_left(){
		//Navigation Right
		var $header_wpbingo_menu_left = $('.header-wpbingo-menu-left');
		$('.wpbingo-menu-left .menu-title').on( "click", function() {
			if($header_wpbingo_menu_left.hasClass('active')){
				$header_wpbingo_menu_left.removeClass('active');
			}	
			else{
				$header_wpbingo_menu_left.addClass('active');
			}	
			return false;
		});			
	}
	_wpbingo_menu_left();
	function _show_sticky_sidebar(){
		var $sticky_sidebar = $('.sticky-sidebar');
		$('.btn-sticky').on( "click", function() {
			if($sticky_sidebar.hasClass('active')){
				$sticky_sidebar.removeClass('active');
			}	
			else{
				$sticky_sidebar.addClass('active');
			}	
			return false;
		});			
	}
	_show_sticky_sidebar();	
	function _headercategories(){
		//Navigation right
		var $menu_categories = $('.menu-categories');
		$('.navigation-categories').on( "click", function() {
			if($menu_categories.hasClass('active')){
				$menu_categories.removeClass('active');
			}	
			else{
				$menu_categories.addClass('active');
			}	
			return false;
		});		
		$('.kola-close',$menu_categories).on( "click", function() {
			$menu_categories.removeClass('active');
			return false;
		});		
		//Navigation right			
	}
	 _headercategories();
	function _canvasrightNavigation(){
		//Navigation right
		var $wpbingo_menu_right = $('.wpbingo-menu-right');
		$('.navigation-right').on( "click", function() {
			if($wpbingo_menu_right.hasClass('active')){
				$wpbingo_menu_right.removeClass('active');
			}	
			else{
				$wpbingo_menu_right.addClass('active');
			}	
			return false;
		});		
		$('.kola-close',$wpbingo_menu_right).on( "click", function() {
			$wpbingo_menu_right.removeClass('active');
			return false;
		});		
		//Navigation right			
	}
	 _canvasrightNavigation();
	function _setGetParameter(paramName, paramValue)
	{
		var url = window.location.href;
		var hash = location.hash;
		url = url.replace(hash, '');
		if (url.indexOf(paramName + "=") >= 0)
		{
			var prefix = url.substring(0, url.indexOf(paramName));
			var suffix = url.substring(url.indexOf(paramName));
			suffix = suffix.substring(suffix.indexOf("=") + 1);
			suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
			url = prefix + paramName + "=" + paramValue + suffix;
		}
		else
		{
		if (url.indexOf("?") < 0)
			url += "?" + paramName + "=" + paramValue;
		else
			url += "&" + paramName + "=" + paramValue;
		}
		window.location.href = url + hash;
	}
	function _sticky_menu(){
		if(_window.width() >= 1024){
			if($(".header-content").data("sticky_header")){
				var CurrentScroll = 0;
				var bwp_width = _window.width();
				_window.scroll(function() {
				if(($(".header-content").data("sticky_tablet") == 0) && bwp_width < 992)
					return;
				var NextScroll = $(this).scrollTop();
				if ((NextScroll < CurrentScroll) && NextScroll > 200) {
					$('.bwp-header').addClass('sticky');
				} else if (NextScroll >= CurrentScroll ||  NextScroll <=200 ) {
					$('.bwp-header').removeClass('sticky');
				}
				CurrentScroll = NextScroll;  
				});
			}
		}	
	}	
	function _kola_top_link(){
		var custom_menu = $('.block-top-link .widget-custom-menu');
		$('.widget-title',custom_menu).on( "click", function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$('div',$(this).parent()).slideUp();	
			}
			else{
				$('.widget-title',custom_menu).removeClass('active');
				$('div',custom_menu).slideUp();				
				$(this).addClass('active');
				$('div',$(this).parent()).slideDown();	
			}	
		});
	}
	_kola_top_link();
	function _load_slick_carousel($element){
		$element.slick({
			arrows: $element.data("nav") ? true : false ,
			dots: $element.data("dots") ? true : false ,
			infinite: true,
			prevArrow: '<i class="slick-arrow fa fa-chevron-left"></i>',
			nextArrow: '<i class="slick-arrow fa fa-chevron-right"></i>',	
			slidesToShow: $element.data("columns"),
			asNavFor: $element.data("asnavfor") ? $element.data("asnavfor") : false ,
			vertical: $element.data("vertical") ? true : false ,
			verticalSwiping: $element.data("verticalswiping") ? $element.data("verticalswiping") : false ,
			rtl: (_body.hasClass("rtl") && !$element.data("vertical")) ? true : false ,
			centerMode: $element.data("centermode") ? $element.data("centermode") : false ,
			centerPadding: $element.data("centerpadding") ? $element.data("centerpadding") : false ,
			focusOnSelect: $element.data("focusonselect") ? $element.data("focusonselect") : false ,
			responsive: [	
				{
				  breakpoint: 1200,
				  settings: {
					slidesToShow: $element.data("columns1"),
				  }
				},				
				{
				  breakpoint: 1024,
				  settings: {
					slidesToShow: $element.data("columns2"),
					centerMode : false
				  }
				},
				{
				  breakpoint: 768,
				  settings: {
					slidesToShow: $element.data("columns3"),
					vertical: false,
					verticalSwiping : false,
					centerMode : false
				  }
				},
				{
				  breakpoint: 480,			  
				  settings: {
					slidesToShow: $element.data("columns4"),
					vertical: false,
					verticalSwiping : false,
					centerMode : false					
				  }
				}
			],
			onAfterChange: function() {
				_move_nav_slick($element);
			}			
		});
		_move_nav_slick($element);
	}
	function _move_nav_slick($element){
		if($(".slick-arrow",$element).length > 0){
			var $prev = $(".fa-chevron-left",$element).clone();
			$(".fa-chevron-left",$element).remove();
			if($element.parent().find(".fa-chevron-left").length == 0){
				$prev.prependTo($element.parent());
			}
			$prev.on( "click", function() {
				$element.slickPrev();
			});
			var $next =  $(".fa-chevron-right",$element).clone();
			$(".fa-chevron-right",$element).remove();
			if($element.parent().find(".fa-chevron-right").length == 0){
				$next.appendTo($element.parent());
			}
			$next.on( "click", function() {
				$element.slickNext();
			});
		}		
	}	
	//Dropdown Menu
	function _dropdown_menu(){
		$( ".pwb-dropdown" ).each(function(){
			var $dropdown = $(this);
			var active_text = $dropdown.find('li.active').text();
			if(active_text){
				$(".pwb-dropdown-toggle",$dropdown).html(active_text);
			}
			$("li",$dropdown).on( "click", function() {
				$("li",$dropdown).removeClass("active");
				$(this).addClass('active');
				var this_text = $(this).text();
				$(".pwb-dropdown-toggle",$dropdown).html(this_text);
				$dropdown.removeClass("open");
			});
		});		
	}
	_dropdown_menu();
	function _click_toggle_filter(){
		var $element = $(".bwp-top-bar");
		$(".button-filter-toggle",$element).on( "click", function() {
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$(".sidebar-product-filter").slideUp();
			}else{
				$(this).addClass('active');	
				$(".sidebar-product-filter").slideDown();
			}
		});	
	}
	_click_toggle_filter();
	//Menu CanVas
	function _click_button_canvas_menu(){
		$('#show-megamenu').on( "click", function() {
			if($('.bwp-canvas-navigation').hasClass('active'))
				$('.bwp-canvas-navigation').removeClass('active');
			else
				$('.bwp-canvas-navigation').addClass('active');
			return false;
		});		
	}
	_click_button_canvas_menu();
	function _load_canvas_menu(){
		var wd_width = _window.width(); 
		var $main_menu = $(".menu","#main-navigation");
		if(wd_width <= 991){
			if($("#canvas-main-menu").length < 1 && $main_menu.length > 0){
				var $menu = $main_menu.parent().clone();
				$menu.attr( "id", "canvas-main-menu");
				$($menu).find(".menu").removeAttr('id');
				$('#page').append('<div  class="bwp-canvas-navigation"><span id="remove-megamenu" class="remove-megamenu icon-remove"></span></div>');			
				$('.bwp-canvas-navigation').append($menu);
				$menu.mmenu({
					offCanvas: false,
					"navbar": {
					"title": false
					}
				});
				_remove_canvas_menu();
			}
		}else{
			$(".bwp-canvas-navigation").remove();
		}		
	}
	_load_canvas_menu();
	function _remove_canvas_menu(){
		$('#remove-megamenu').on( "click", function() {
			$('.bwp-canvas-navigation').removeClass('active');
			return false;
		});		
	}
	function _layout_blog_masonry(){
		var $container = $(".blog-content-masonry");
		$container.imagesLoaded().progress( function() {
			$container.isotope({
				layoutMode : "masonry",
				percentPosition: true,
				masonry: {
				  columnWidth: ".masonry-post"
				}
			});
		});
	}
	function _event_single_image(){
		if($(".bwp-single-product").length){
			var $element = $(".bwp-single-product");
			var _data = $element.data();
			if(_data.product_layout_thumb == "zoom"){
				$('.variations_form').on('wc_variation_form show_variation reset_image', function() {
					$('.zoomContainer .zoomWindowContainer .zoomWindow').css('background-image', 'url(' + $('#image').attr('src') + ')');
				});	
				_zoomSingleImage(_data);
			}
			if(_data.product_layout_thumb == "scroll"){
				$('.variations_form').on('wc_variation_form show_variation reset_image', function() {
					$( '.image-thumbnail' ).slickGoTo( 0 );
				});
				$('.img-thumbnail a').swipebox();
			}
			if(_data.product_layout_thumb == "list" || _data.product_layout_thumb == "list2"){
				_sticky_kit();
				$('.img-thumbnail a').swipebox();
				$('.variations_form').on('wc_variation_form show_variation reset_image', function() {
					$(window).scrollTop( 300 );
				});
			}	
		}
	}
	function _zoomSingleImage(_data){
		if (($(window).width()) >= 768){
			$("#image").elevateZoom({
					zoomType : _data.zoomtype,
					scrollZoom  : _data.zoom_scroll,
					lensSize    : _data.lenssize,
					lensShape    : _data.lensshape,
					containLensZoom  : _data.zoom_contain_lens,
					gallery:'image-thumbnail',
					cursor: 'crosshair',
					galleryActiveClass: "active",
					lensBorder: _data.lensborder,
					borderSize : _data.bordersize,
					borderColour : _data.bordercolour,
			});
		}
		else{
			$("#image").elevateZoom({
					zoomEnabled: false,
					scrollZoom: false,
					gallery:'image-thumbnail',
					cursor: 'crosshair',
					galleryActiveClass: "active"
			});
		}
		if(_data.popup) {
			$("#image").bind("click", function(e) {
				e.preventDefault();	
				var ez =   $('#image').data('elevateZoom');
				$.swipebox(ez.getGalleryList());
			});		
		}else{
			$("#image").bind("click", function(e) {  
				return false;
			});				
		}		
	}
	function _sticky_kit(){
		var window_width = $( window ).width();
		$(".bwp-single-info").trigger("sticky_kit:detach");
		if (window_width < 991) {
			$(".bwp-single-product").removeClass("active");
		} else {
			if(($(".bwp-single-info").height()) <= ($(".bwp-single-image").height())){
				$(".bwp-single-product").addClass("active");
				$(".bwp-single-info").stick_in_parent();
			}else{
				$(".bwp-single-product").removeClass("active");
			}
		}		
	}
	function _load_wpbingo_menu_sidebar(){
		var $menu = $(".wpbingo-menu-sidebar");
		appendGrower($menu);		
	}	
	function appendGrower($menu)
	{
		if($("li.menu-item-has-children",$menu).find('.grower').length <= 0){
			$("li.menu-item-has-children",$menu).append('<span class="grower close"> </span>');
			clickGrower($menu);
		}	
	}
	function removeGrower($menu)
	{
		$(".grower",$menu).remove();
	}
	function offtogglemegamenu($menu)
	{
		$('li.menu-item-has-children .sub-menu',$menu).css('display','');	
		$menu.removeClass('active');
		$("li.menu-item-has-children  .grower",$menu).removeClass('open').addClass('close');	
	}	
	function clickGrower($menu){
		$("li.menu-item-has-children  .grower",$menu).on( "click", function() {
			if($(this).hasClass('close')){
				$(this).addClass('open').removeClass('close');
				$('.sub-menu',$(this).parent()).first().slideDown();	
			}else{
				$(this).addClass('close').removeClass('open');		
				$('.sub-menu',$(this).parent()).first().slideUp();
			}
		});			
	}
	/*Search JS*/
	function _event_ajax_search(){
		var $element = $(".ajax-search");
		$(".input-search",$element).on("keydown", function() {
			setTimeout(function($e){	
			var character = $e.val();
			var limit = $element.data("limit") ? $element.data("limit") : 5;
			if(character.length >= 2){
				$( ".result-search-products",$element ).empty();
				$( ".result-search-products",$element ).addClass("loading");
				$( ".result-search-products",$element ).show();
				$.ajax({
					url: $element.data("admin"),
					dataType: 'json',
					data: {
						action : "kola_search_products_ajax",
						character : character,
						limit : limit
					},
					success: function(json) {
						var html = '';
						if (json.length) {
							for (var i = 0; i < json.length; i++) {
								if (!json[i]['category']) {
									html += '<li class="item-search">';
									html += '	<a class="item-image" href="' + json[i]['link'] + '"><img class="pull-left" src="' + json[i]['image'] + '"></a>';
									character = (character).toLowerCase(character);
									character = (character).replace("%20"," ");
									json[i]['name'] = (json[i]['name']).toLowerCase(json[i]['name']);
									json[i]['name'] = (json[i]['name']).replace(character, '<b>'+character+'</b>');
									html += '<div class="item-content">';
									html += '<a href="' + json[i]['link'] + '" title="' + json[i]['name'] + '"><span>'	+ json[i]['name'] + '</span></a>';
									if(json[i]['price']){
										html += '<div class="price">'+json[i]['price']+'</div>';
									}
									html += '</div></li>';
								}
							}
						}else{	
							html = '<li class="no-result-item">'+$element.data("noresult")+'</li>';
						}
						$( ".result-search-products",$element ).removeClass("loading");
						$( ".result-search-products",$element ).html(html);
					}
				});
			}else{
				$( ".result-search-products",$element ).removeClass("loading");
				$( ".result-search-products",$element ).empty();
				$( ".result-search-products",$element ).hide();
			}				
		  }, 200, $(this));
		});	
	}
	function _event_circlestime(){
		$( ".time-circles" ).each(function(){
			var $circles = $(this);
			$circles.TimeCircles({
					circle_bg_color: $circles.data("bg_color"),
					fg_width: $circles.data("fg_width"),
					bg_width: $circles.data("bg_width"),
					time: {
						Days: { 
							color: $circles.data("time_color"),
							text : $circles.data("text_day")
						},
						Hours: { 
							color: $circles.data("time_color"),
							text : $circles.data("text_hour")	
						},
						Minutes: { 
							color: $circles.data("time_color"),
							text : $circles.data("text_min")
						},
						Seconds: { 
							color: $circles.data("time_color"),
							text : $circles.data("text_sec")
						}
					}
			});
		});
	}
	function _left_right_submenu(){
		$( ".menu-item-has-children.level-1" ).each(function() {
			var _item_menu = $(this);
			var spacing_item_menu = _item_menu.outerWidth();
			var spacing_item_menu_left = _item_menu.offset().left;
			var spacing_item_menu_right = _window.width() - (spacing_item_menu+spacing_item_menu_left);
			if(spacing_item_menu_right <= 225){
				_item_menu.addClass("sub-menu-left");
			}else{
				_item_menu.removeClass("sub-menu-left");
			}	
		});
	}
} )( jQuery );