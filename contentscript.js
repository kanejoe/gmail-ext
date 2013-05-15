/*
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */
var regex = /sandwich/;

// Test the text of the body element against our regular expression.
if (regex.test(document.body.innerText)) {
	console.dir("it registers in 1-contentscript.js");
	// The regular expression produced a match, so notify the background page.
	chrome.extension.sendRequest({}, function(response) {});
} else {
  // No match was found.
}

console.dir("it registers in 2-contentscript.js");

// Javascript Enclosure 
(function () {
    var head;
    var max_retry = 200;
    
    // Check if Gmail UI frame is ready 
    function isGmailUIFrame(doc) {
        try {
            return document.getElementsByClassName('aic').length > 0;
        } catch (e) {
            return false;
        }
    }
	
	var createScriptElement = function(h) {
		var d,i,c,par;
		if (h.getElementsByClassName("G-Ni J-J5-Ji")){
			d=h.getElementsByClassName("G-Ni J-J5-Ji")[3];
			c=d.cloneNode(true);
			
			par = d.parentNode;
			par.insertBefore(c, d);
		}
	};
	
    // Loop to check if the Gmail UI is loaded
    var waitForGmailToLoad = function() {
        var top_frame, canvas_frame;
        try {
            top_frame = window.top.document;
            if (top_frame.getElementById('canvas_frame')) {
            }
        } catch (e) {}
        top_frame = window.document;
 
        if(top_frame && isGmailUIFrame(top_frame)) 
        {
            head = top_frame;
            // Gmail UI is loaded: insert the script elements
            createScriptElement(head);
            return head;
        }
        else{
            max_retry = max_retry -1;
            if(max_retry > 0)
                window.setTimeout(waitForGmailToLoad, 500);
        }
        return (head !== undefined);
    };
    waitForGmailToLoad();
}());
