(function($,window,document,undefined){
	$.fn.filterTags = function(opts){
		var defaults = {
			filteredItems : '>div',
			picker        : 'select',//'checkbox',false
			selectName    : 'filterTags'
		};
		if(opts){
			for(var k in opts){
				defaults[k] = opts[k];
			}
		}
		opts = defaults;
		var $t = $(this);
		var t = this;
		var $filterable = $t.find(opts.filteredItems);
		var tags = [];
		$filterable.each(function(){
			tags = tags.concat(this.className.split(' '));
		});
		tags = tags.sort();
		tags = $.grep(tags,function(v,i){//dedupe
			return !i || v !== tags[i - 1];
		});
		var select = '<select name="'+opts.selectName+'" multiple size="'+tags.length+'"">';
		var option = function(tag){
			return '<option value="'+tag+'">'+tag+'</option>';
		};
		select += $.map(tags,option).join('');
		select += '</select>';
		var $select = $(select);
		$select.on('change',function(){
			var $select = $(this);
			var val = $select.val();
			$filterable.hide();
			if(val.length){
				var $matches = $filterable.filter('.'+val.join('.')).show();
			}
		});
		$t.append($select);
		return this;
	};
})(jQuery,window,document);

