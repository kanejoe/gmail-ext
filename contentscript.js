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

if(document.getElementById('firstHeading')) {
	var d = document.getElementById('firstHeading');
	var newDiv = document.createElement("div");
	var newContent = document.createTextNode("Hi there and greetings!");
	newDiv.appendChild(newContent); //add the text node to the newly created div.
	d.appendChild(newDiv);
}
