#jQuery Bookmarklet

##Introduction

A simple jQuery bookmarklet that I hope will help others looking to develop a flexible bookmarklet on pages that may not have jQuery loaded on them already.

##Setup

The bookmarklet executes JavaScript that dynamically includes a `<script />` tag in the document.  That script will ensure that jQuery is loaded and enable the bookmarklet to execute script that relies on jQuery.

###The Bookmarklet Code
    javascript:(function(d,p){if(typeof(__i)!='undefined'){__initBookmarklet();}else{var%20__s=document.createElement('script');__s.type='text/javascript';__s.src='http://'+d+p;document.getElementsByTagName('head')[0].appendChild(__s);__i=true;}})('github.com','/spoon16/jQuery-Bookmarklet/raw/master/bookmarklet.js?'+Math.round(Math.random()*10000000));

##License

[MIT License](http://creativecommons.org/licenses/MIT/)

Copyright © 2010 Eric Schoonover

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
