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
			closeText: '�պ�', 
			openText: 'չ�_', 
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

	Module.prototype.open = function(){//���_ ����Class 'opened'
		console.log('open');
		$('.banner').addClass(this.option.class.opened);
		$('.banner').removeClass(this.option.class.closed);
		$('.btn').text('close');
		$('.img').removeClass('bottom');
		
	};

	Module.prototype.close = function(){//�պ� ����Class 'closed'
		console.log('closed');
		$('.banner').addClass(this.option.class.closed);
		$('.banner').removeClass(this.option.class.opened);
		$('.btn').text('open');
		$('.img').addClass('bottom');
		
		
	};

	Module.prototype.toggle = function(){
		console.log('toggle');
		if($('.btn').text()=='open'){
			this.open();
		}else{
			this.close();
		}
	};

	Module.prototype.transition = function(){
		console.log('transition');
		$('.banner').addClass('transition');

	}

	Module.prototype.init = function(module){
		if(this.option.openAtStart == true){  
			$('.banner').append('<button class="btn">close</button');
			$('.banner').addClass(this.option.class.opened);
		}else{
			$('.banner').append('<button class="btn">open</button');
			$('.banner').addClass(this.option.class.closed);
		}
		var a = this;
		$('.btn').click(function(module){ 
			if(a.option.autoToggle == true){
				a.toggle();
			}
		});
		if(this.option.transition == true){
			this.transition();
		}
		
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
				$this.data(ModuleName,module);
				module.init(module);
			}
		});
	}

})(jQuery);






// $('.banner').banner({
// 	// �O��һ�_ʼ�Ƿ���_���
// 	openAtStart: true, // [boolean] true | false
// 	// �O���������Ƿ�Ҫ�Ԅ��_��ϣ����O��false���Ͳ�Ҫ�Ԅ��_�ϣ�����true���R���Ԅ��_�ϣ����锵���ǎ׺���֮���_��
// 	autoToggle: true, // [boolean|number] true | false | 3000
// 	// �O���պ�չ�_���o
// 	button: {
// 		closeText: '�պ�', // [string]
// 		openText: 'չ�_', // [string]
// 		class: 'btn' // [string]
// 	},
// 	// �O��ģ�M�ڸ���B�r��class
// 	class: {
// 		closed: 'closed', // [string]
// 		closing: 'closing', // [string]
// 		opened: 'opened', // [string]
// 		opening: 'opening' // [string]
// 	},
// 	// �Ƿ�Ҫ��transitionЧ��
// 	transition: true,
// 	// ����transition�r��Ҫ���е�callback function
// 	whenTransition: function() {
// 		console.log('whenTransition');
// 	}
// });

// $('.banner').banner('toggle');

// $('.banner').banner('open');

// $('.banner').banner('close');



