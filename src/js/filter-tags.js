

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
		var $label,select,$selects=$([]),$clears=$([]),values = opts.categories;
		function pushValues(){
			values[cat].push($(this).data(cat));
		}
		function makeClearCat($select){
			return function(evt){
				evt.preventDefault();
				$select.val([]);
				$select.trigger('change');
			};
		}
		for(var cat in values){
			values[cat] = [];
			$filterable.each(pushValues);
			values[cat] = $.uniq(values[cat]);
			$label = $('<label for="'+cat+'">'+cat+'</label>');
			select = '<select id="'+cat+'" name="'+cat+'"'+(opts.categories[cat] ? ' multiple' : '')+' size="'+values[cat].length+'"">';
			select += $.map(values[cat],option).join('');
			select += '</select>';
			$select = $(select);
			$clear  = $('<button type="button">Clear '+cat+'</button>');
			$selects = $selects.add($select);
			$form.append($label,$select,$clear);
			$clear.on('click',makeClearCat($select));
		}
		$selects.on('change',function(evt){
			evt.preventDefault();
			$filterable.show();
			$selects.each(function(index,select){
				$select = $(select);
				vals = $select.val();
				if(vals && vals.length){
					//don't hide anything if nothing is selected: that'd hide everything every time
					$filterable.filter(function(index,el){
						return !~$.inArray($(el).data(select.name),vals);//$.inArray is really indexOf, filterable object's data is one of selected values in select box,
					}).hide();
				}
			});
			console.log(this.name,vals);
		});
		$t.append($form);
		return this;
	};
})(jQuery,window,document);

