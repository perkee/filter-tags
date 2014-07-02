

(function($,window,document,undefined){
	$.uniq = function(array,fn,invert){
		invert = !!invert;
		array = $.isFunction(fn) ? array.sort(fn) : array.sort();
		return $.grep(array,function(v,i){
			return !i || v !== array[i-1];
		},invert);
	};
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
		var option = function(tag){
			return '<option value="'+tag+'">'+tag+'</option>';
		};
		var $form = $('<form></form>');
		var $label,select,$selects=$([]),values = opts.categories;
		for(var k in values){
			values[k] = [];
		}
		$filterable.each(function(){
			for(var cat in values){
				values[cat].push($(this).data(cat));
			}
		});
		for(var cat in values){
			values[cat] = $.uniq(values[cat]);
		}
		for(var cat in values) {
			$label = $('<label for="'+cat+'">'+cat+'</label>');
			select = '<select id="'+cat+'" name="'+cat+'"'+(opts.categories[cat] ? ' multiple' : '')+' size="'+values[cat].length+'"">';
			select += $.map(values[cat],option).join('');
			select += '</select>';
			$select = $(select);
			$selects = $selects.add($select);
			$form.append($label);
			$form.append($select);
		}
		$selects.on('change',function(evt){
			var select = this;
			var $select = $(this);
			var vals = $select.val();
			if(vals.length){
				$filterable.show();
				$selects.each(function(){
					select = this;
					$select = $(this);
					vals = $select.val();
					if(vals.length){
						$filterable.filter(function(index,el){
							var $el = $(el);
							return !~$.inArray($el.data(select.name),vals);
						}).hide();
					}
				});
			}
			console.log(this.name,vals);
			console.log()
		});
		$t.append($form);
		return this;
	};
})(jQuery,window,document);

