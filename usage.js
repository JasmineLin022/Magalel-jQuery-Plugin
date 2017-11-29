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
		console.log('transition');
		var tran = this;
		$('.banner').on('transitionend',function(){
			// console.log('transitionend');
			console.log(i);
			if(i=='closed'){
				tran.open();
			}else{
				tran.close();
			}
		});
	}

	Module.prototype.open = function(){//打開 新增Class 'opened'
		console.log('open');
		$('.banner').addClass(this.option.class.opened);
		$('.banner').removeClass(this.option.class.opening);
		$('.banner').removeClass(this.option.class.closed);
		$('.banner').removeClass(this.option.class.closing);
		$('.img').removeClass('bottom');
		
		
	};

	Module.prototype.opening=function(){
		console.log('opening');
		$('.img').removeClass('bottom');
		$('.banner').addClass(this.option.class.opening);
		$('.banner').removeClass(this.option.class.closing);
		$('.banner').removeClass(this.option.class.closed);
		$('.btn').text('收合');
		$('<style>.btn:after{ border-top:0px ;border-bottom:3px solid #666 }</style>').appendTo('head');
		if(this.option.transition==true){
			$('.banner').addClass('transition');
			this.transition(this.option.class.closed);

		}else{
			$('.img').removeClass('bottom');
			this.open();
		}	
	};

	Module.prototype.close = function(){//收合 新增Class 'closed'
		console.log('closed');
		$('.banner').addClass(this.option.class.closed);
		$('.banner').removeClass(this.option.class.closing);
		$('.banner').removeClass(this.option.class.opening);
		$('.banner').removeClass(this.option.class.opened);
		$('.img').addClass('bottom');
		
	};

	Module.prototype.closing = function(){
		console.log('closing');
		$('.banner').addClass(this.option.class.closing);
		$('.banner').removeClass(this.option.class.opening);
		$('.banner').removeClass(this.option.class.opened);
		$('.btn').text('展開');
		$('<style>.btn:after{ border-top: 3px solid #666;border-bottom: 0px}</style>').appendTo('head');
		if(this.option.transition==true){
			$('.banner').addClass('transition');
			this.transition(this.option.class.opened);
		}else{
			$('.img').addClass('bottom');
			this.close();
		}
	};



	Module.prototype.toggle = function(){
		console.log('toggle');
		if($('.btn').text()=='展開'){
			this.opening();
		}else{
			this.closing();
		}
	};

	Module.prototype.init = function(module){
		if(this.option.openAtStart == true){  
			$('.banner').append('<button class="btn">收合</button>');
			$('.banner').addClass(this.option.class.opened);
		}else{
			$('.banner').append('<button class="btn">展開</div></button>');
			$('.banner').addClass(this.option.class.closed);
		}
		var a = this;
		$('.btn').click(function(module){ 
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



