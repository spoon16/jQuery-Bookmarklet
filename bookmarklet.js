//bookmarklet specific variable names
var __containerId = 'BM___container';
var __frameName = 'BM__frame';
var __logId = 'jQuery-Bookmarklet';

// simple log function that won't throw an exception
// if a console is not available
function __log() {
    if (typeof (console) != 'undefined') {
        var args = Array.prototype.slice.call(arguments); 	//convert args to normal array
        var type = args[0]; 									//capture the console operation name http://getfirebug.com/wiki/index.php/Console_API
        if (typeof (console[type]) != 'undefined') {
            var consoleArgs = args.slice(1 || args.length); 	//remove index 0 from array
            args.push.apply(args, consoleArgs);
            console[type].apply(console, consoleArgs); 		//will expand consoleArgs so elements are passed as individual args, splat operator
        }
    }
}

// initialize the bookmarklet jQuery variable (__$)
function __initJQuery() {
    var jq = window.jQuery;
    jq.noConflict(true);
    jq(__bookmarkletJQueryTag).remove();
    __log('info', 'jQuery %v loaded', jq.fn.jquery);
    __setJQuery(jq);
}

// set the bookmarklet jQuery variable (__$)
function __setJQuery(jq) {
    __$ = jq;
    __log('groupEnd');
    __initBookmarklet();
}

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
						.attr('method', 'post')
						.attr('action', __rootUrl + '/bookmarklet.html') // __rootUrl is defined in the bookmarklet
						.attr('target', __frameName)
				)
        );

        __buildForm(form);
    });
}

(function (__version) {
    __log('group', 'ensure jQuery');
    if (!window.jQuery
        || __version > window.jQuery.fn.jquery) {
        __log('info', 'inserting jQuery');
        __bookmarkletJQueryTag = document.createElement('script');
        __bookmarkletJQueryTag.type = 'text/javascript';
        __bookmarkletJQueryTag.src = 'http://ajax.microsoft.com/ajax/jquery/jquery-' + __version + '.min.js'; 	// use Microsoft CDN for jQuery
        __bookmarkletJQueryTag.onload = __bookmarkletJQueryTag.onreadystatechange = function () {
            if (__bookmarkletJQueryTag.readyState
                || __bookmarkletJQueryTag.readyState == 'loaded'
                || __bookmarkletJQueryTag.readyState == 'completed') {
                __bookmarkletJQueryTag.onreadystatechange = null;
                __initJQuery();
            }
            else {
                __initJQuery();
            }
        };
        document.getElementsByTagName('head')[0].appendChild(__bookmarkletJQueryTag);
    }
    else {
        var jq = window.jQuery;
        __log('info', 'jQuery %v found', jq.fn.jquery);
        __setJQuery(jq);
    }
})('1.4.2'); // the min version of jQuery that needs to be available
