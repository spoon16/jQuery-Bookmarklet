//bookmarklet specific variable names
var __containerId = 'BM___container';
var __frameName = 'BM__frame';
var __logId = 'jQuery-Bookmarklet';

// build a form that will be posted to the iframe
// this allows information from the current page to be passed to
// the iframe without causing a cross site scripting related
// unauthorized exception to be thrown
function __buildForm(f) {
	__log('group', '[%i] building form', __logId);

	f.append(
		__$('<input type="hidden" name="url" />')
			.attr('value', window.location)
	);

	__log('info', '[%i] submitting form to frame', __logId);
	f.submit();

	__watchForCommands();

	__log('groupEnd');
}

function __watchForCommands() {
	var __detail = location.hash.match(/#c=([^&]+)(?:&v=([^&]+))?/);
	if (__detail) {
		var __cmd = __detail[1];
		if (__detail[2]) {
			var __val = __detail[2];
		}
		if (__cmd == 'close') {
			__log('info', '[%i] closing bookmarklet', __logId);
			__$('#' + __containerId).slideUp();
		}
		location.hash = '#';
	}
	setTimeout(__watchForCommands, 200);
}

function __initBookmarklet() {
	__$(document).ready(function () {
		__log('group', '[%i] initialize bookmarklet', __logId);

		var container = __$('<div />');
		var frame = __$('<iframe />');
		var form = __$('<form />');

		__log('info', '[%i] remove any existing bookmarklet container', __logId);
		__$('#' + __containerId).remove();

		__log('info', '[%i] render new bookmarklet container', __logId);
		__$('body').append(
			container
				.attr('id', __containerId)
				.css({
					'position': 'fixed',
					'top': '0px',
					'right': '0px',
					'height': '378px',
					'width': '520px',
					'background-color': '#FFFFFF',
					'border-left': 'solid 5px #D9CEB2',
					'border-bottom': 'solid 5px #D9CEB2',
					'z-index': '2147483647',
					'display': 'none'
				})
				.append(
					frame
						.attr('name', __frameName)
						.attr('id', __frameName)
						.attr('frameborder', '0')
						.css({
							'border': '0 none',
							'margin': '0',
							'padding': '0',
							'height': '100%',
							'width': '100%'
						})
						.load(function () {
							__log('info', '[%i] bookmarklet loaded', __logId);
							__$('#' + __containerId).show();
							__log('groupEnd');
						})
				)
				.append(
					form
						.attr('method', 'get')
						.attr('action', __rootUrl + '/jQuery-Bookmarklet/bookmarklet.html') // __rootUrl is defined in the bookmarklet
						.attr('target', __frameName)
				)
		);

		__buildForm(form);
	});
}

jQueryBookmarklet = function() {
	var callback;
	var tag;
		
	var log = function() {
		if (typeof (console) != 'undefined') {
			var args = Array.prototype.slice.call(arguments); 		// convert args to normal array
			var type = args[0]; 									// capture the console operation name http://getfirebug.com/wiki/index.php/Console_API
			if (typeof (console[type]) != 'undefined') {
				var consoleArgs = args.slice(1 || args.length); 	// remove index 0 from array
				args.push.apply(args, consoleArgs);
				if (typeof (console[type].apply) != 'undefined') {  // internet explorers console won't support using apply this way, so logging will be disabled there
					console[type].apply(console, consoleArgs); 		// will expand consoleArgs so elements are passed as individual args, splat operator
				}
			}
		}
	}

	var ensurejQuery : function(version) {
		log('group', 'ensure jQuery');
		if (!window.jQuery
			|| version > window.jQuery.fn.jquery) {
			log('info', 'inserting jQuery');
			tag = document.createElement('script');
			tag.type = 'text/javascript';
			tag.src = 'http://ajax.microsoft.com/ajax/jquery/jquery-' + version + '.min.js'; 	// use Microsoft CDN for jQuery
			tag.onload = tag.onreadystatechange = function () {
				if (tag.readyState
					|| tag.readyState == 'loaded'
					|| tag.readyState == 'completed') {
					tag.onreadystatechange = null;
					initJQuery();
				}
				else {
					initJQuery();
				}
			};
			document.getElementsByTagName('head')[0].appendChild(tag);
		}
		else {
			var jq = window.jQuery;
			log('info', 'jQuery %v found', jq.fn.jquery);
			execLoadedCallback(jq);
		}
	}

	var initJQuery : function() {
		var jq = window.jQuery;
		jq.noConflict(true);
		jq(tag).remove();
		log('info', 'jQuery %v loaded', jq.fn.jquery);
		execLoadedCallback(jq);
	}

	var execLoadedCallback : function(jq) {
		log('groupEnd');
		callback(jq);
	}

	return {
		$,
		init: function(version, loadedCallback) {
			callback = function(jq){
				this.$ = jq;
				loadedCallback(this.$);
			};
			ensurejQuery(version);
		}
	}
}

jQueryBookmarklet.init("1.4.2", function(jq) { alert('hello world'); });
