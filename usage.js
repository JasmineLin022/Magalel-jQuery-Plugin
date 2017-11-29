(function($){
'use strict';

	var ModuleName = 'banner';

	var Module = function(ele,options){
		this.ele = ele;
		this.$ele = $(ele);
		this.option = options;
	};

	Module.DEFAULTS ={
		openAtStart:'true',
		autoToggle:'false',
		button: {
			closeText: '收合', 
			openText: '展開', 
			class: 'btn' 
		},
		class: {
			closed: 'closed',
			closing: 'closing',
			opened: 'opened',
			opening: 'opening'
		},
		whenTransition: function() {
			console.log('whenTransition');
		},
	};

	Module.prototype.transition = function(i){
		// console.log('transition');
		var tran = this;
		$('.banner').on('transitionend',function(){
			// console.log('transitionend');
			// console.log(i);
			if(i=='closed'){
				tran.opening();
			}else{
				tran.closing();
			}
		});
	}

	Module.prototype.opening = function(){//打開 新增Class 'opened'
		// console.log('open');
		
		$('.banner').addClass(this.option.class.opened);
		$('.banner').removeClass(this.option.class.opening);
		$('.banner').removeClass(this.option.class.closed);
		$('.banner').removeClass(this.option.class.closing);
		$('.img').removeClass('bottom');
		
	};

	Module.prototype.open=function(){
		// console.log('opening');
		$('.img').removeClass('bottom');
		$('.banner').addClass(this.option.class.opening);
		$('.banner').removeClass(this.option.class.closing);
		$('.banner').removeClass(this.option.class.closed);
		var closeText = this.option.button.closeText;

		$('.btn').text(closeText);
		$('<style>.btn:after{ border-top:0px ;border-bottom:3px solid #666 }</style>').appendTo('head');
		if(this.option.transition==true){
			$('.banner').addClass('transition');
			this.transition(this.option.class.closed);

		}else{
			$('.img').removeClass('bottom');
			this.opening();
		}	
	};

	Module.prototype.closing = function(){//收合 新增Class 'closed'
		// console.log('closed');
		
		$('.banner').addClass(this.option.class.closed);
		$('.banner').removeClass(this.option.class.closing);
		$('.banner').removeClass(this.option.class.opening);
		$('.banner').removeClass(this.option.class.opened);
		$('.img').addClass('bottom');
	};

	Module.prototype.close = function(){
		// console.log('closing');
		$('.banner').addClass(this.option.class.closing);
		$('.banner').removeClass(this.option.class.opening);
		$('.banner').removeClass(this.option.class.opened);
		var openText = this.option.button.openText;
		$('.btn').text(openText);
		$('<style>.btn:after{ border-top: 3px solid #666;border-bottom: 0px}</style>').appendTo('head');
		if(this.option.transition==true){
			$('.banner').addClass('transition');
			this.transition(this.option.class.opened);
		}else{
			$('.img').addClass('bottom');
			this.closing();
		}
	};



	Module.prototype.toggle = function(){
		console.log('toggle');
		var openText = this.option.button.openText;
		if($('.btn').text()==openText){
			this.open();
		}else{
			this.close();
		}
	};

	Module.prototype.init = function(module){
		var closeText = this.option.button.closeText;
		var openText = this.option.button.openText;
		var btn = this.option.button.class;
		if(this.option.openAtStart == true){ 
			
			$('.banner').append('<button class='+btn+'>'+closeText+'</button>');
			$('.hi').css({
				"position":"absolute"
				// bottom: '0',
				// right: '0',
				// backgroundColor: '#000',
				// border: '0',
				// borderRadius: '3px 0 0 0',
				// color:'#666',
				// cursor: 'pointer',
				// padding: '4px 10px 4px 8px',
				// boxSizing: 'border-box',
				// fontSize:'10px'
			});
			$('.banner').addClass(this.option.class.opened);
		}else{
			$('.banner').append('<button class='+btn+'>'+openText+'</div></button>');
			$('.banner').addClass(this.option.class.closed);
			$('.img').addClass('bottom');
		}
		var a = this;
		var btn = this.option.button.class;
		$('.'+btn).click(function(module){ 
			if(a.option.autoToggle == true){
				a.toggle();
			}
		});
	};



	$.fn[ModuleName] = function( methods, options ){
		return this.each(function(i,ele){
			var $this = $(this);
			var module = $this.data(ModuleName);
			var opts = null;
			if(!!module){
				if(typeof methods ==='string' && typeof options === 'undefined'){
					module[methods]();
				}else if(typeof methods === 'string' && (typeof options ==='object' || typeof options ==='function')){
					module[methods](options);
				}else{
					console.log('unsupported options!');
					throw 'unsupproted options!';
				}
			}else{
				opts = $.extend({},Module.DEFAULTS,(typeof methods === 'object' && methods),(typeof options === 'object' && options));
				module = new Module(this, opts);
				$this.data(ModuleName,module);
				module.init(module);
			}
		});
	}

})(jQuery);






// $('.banner').banner({
// 	// 設定一開始是否為開或合
// 	openAtStart: true, // [boolean] true | false
// 	// 設定啟動後是否要自動開或合，若設為false，就不要自勳開合；若為true是馬上自動開合；若為數字是幾毫秒之後開合
// 	autoToggle: true, // [boolean|number] true | false | 3000
// 	// 設定收合展開按鈕
// 	button: {
// 		closeText: '收合', // [string]
// 		openText: '展開', // [string]
// 		class: 'btn' // [string]
// 	},
// 	// 設定模組在各狀態時的class
// 	class: {
// 		closed: 'closed', // [string]
// 		closing: 'closing', // [string]
// 		opened: 'opened', // [string]
// 		opening: 'opening' // [string]
// 	},
// 	// 是否要有transition效果
// 	transition: true,
// 	// 當有transition時，要執行的callback function
// 	whenTransition: function() {
// 		console.log('whenTransition');
// 	}
// });

// $('.banner').banner('toggle');

// $('.banner').banner('open');

// $('.banner').banner('close');



