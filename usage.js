(function($){
'use strict';

	var ModuleName = 'banner';

	var Module = function(ele,option){
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
	};

	Module.prototype.open = function(){//打開 新增Class 'opened'
		console.log('open');
		this.option.addClass('opened');
		this.option.removeClass('closed');
	};

	Module.prototype.close = function(){//收合 新增Class 'closed'
		console.log('closed');
		this.option.addClass('closed');
		this.option.removeClass('opened');
	};

	Module.prototype.toggle = function(){
		console.log('toggle');

	};

	Module.prototype.transiton = function(){
		this.option.css('transition','3s');
	}

	Module.prototype.init = function(){

	};



	$.fn[ModuleName] = function( methods, options ){
		return this.each(function(i,ele){
			var $this = $(this);
			var module = $this.data(ModuleName);
			var opts = null;
			if(!!module){
				if(typeof mtthods ==='string' && typeof options === 'undefined'){
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
				module.init();
				$this.data(ModuleName,module);
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



