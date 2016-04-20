// ==UserScript==
// @name           la krulermorna
// @copyright      la gleki <gleki.is.my.name@gmail.com>
// @license        Creative Commons Attribution 3.0 Unported (CC BY 3.0) http://creativecommons.org/licenses/by/3.0/
// @namespace      
// @description    https://mw.lojban.org/papri/la_krulermorna
// @include        https://lojban.slack.com/*
// @include        http://lojban.slack.com/*
// @match          *
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$(document).ready(main);

function main(){

	//http://www.jquery4u.com/snippets/6-jquery-cursor-functions/
	jQuery.fn.getSelectionStart = function(){
		if(this.lengh == 0) return -1;
		input = this[0];

		var pos = input.value.length;

		if (input.createTextRange) {
			var r = document.selection.createRange().duplicate();
			r.moveEnd('character', input.value.length);
			if (r.text == '')
			pos = input.value.length;
			pos = input.value.lastIndexOf(r.text);
		} else if(typeof(input.selectionStart)!="undefined")
		pos = input.selectionStart;

		return pos;
	}

	//Example jQuery set text selection function call
	//$("input[name='username']").setSelection(4, 20);

	jQuery.fn.setSelection = function(selectionStart, selectionEnd) {
		if(this.lengh == 0) return this;
		input = this[0];

		if (input.createTextRange) {
			var range = input.createTextRange();
			range.collapse(true);
			range.moveEnd('character', selectionEnd);
			range.moveStart('character', selectionStart);
			range.select();
		} else if (input.setSelectionRange) {
			input.focus();
			input.setSelectionRange(selectionStart, selectionEnd);
		}

		return this;
	}
	
	//changearray = ['cx','gx'];
	//replacewith = ["\u0109", "\u011D", "\u0124", "\u0134", "\u015C",];
	
	$('textarea').keyup(function(e){
		if (e.which == 32 || (65 <= e.which && e.which <= 65 + 25) || (97 <= e.which && e.which <= 97 + 25)) {
			var start = $(this).getSelectionStart();
			
			before = $(this).val().substr(0, start);
			after = $(this).val().substr(start);
			$([
				//\u007E	~
				//\u00C7	Ç
				//\u00E7	ç
				
				[/(a\/)/g,"ǎ"],
                [/(a`)/g,"ą"], [/(e`)/g,"ę"], [/(o`)/g,"ǫ"],
                [/(i`)/g,"ɩ"]
			]).each(function(index, item){
				before = before.replace(item[0], item[1]);
			});
			
			$(this).val(before+after);
			$(this).setSelection(start,start);
		}
		
		//if(e.which==88){
		//	var start = $(this).getSelectionStart();
		//	GM_log(start);
			
		//	signo = $(this).val().substr(start-2, 2);
		//	pos = $.inArray(signo, changearray);
		//	if(pos!=-1){
		//		GM_log(replacewith[pos]);
		//		$(this).val( $(this).val().substr(0, start-2) + replacewith[pos] + $(this).val().substr(start) );
		//		$(this).setSelection(start);
		//	}
		//}
	});
}
