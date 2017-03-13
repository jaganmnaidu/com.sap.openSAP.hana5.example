/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, quotes: 0, no-use-before-define: 0, new-cap:0 */
"use strict";
var express = require("express");

module.exports = function() {
	var app = express.Router();

/*	var xsenv = require("@sap/xsenv");
	xsenv.loadEnv();
	var credentials = xsenv.getServices({
		auditlog: 'openSAP5-ex-log'
	}).auditlog;*/
	var auditLog = require('@sap/audit-logging'); //(credentials);

	//TOC
	app.get("/", function(req, res) {
		var output = "<H1>Audit Log Examples</H1></br>" +
			"<a href=\"" + req.baseUrl + "/example1\">/example1</a> - Simple Audit Log Example</br>" +
			require(global.__base + "utils/exampleTOC").fill();
		res.type("text/html").status(200).send(output);
	});

	//Simple AuditLog Example
	app.get("/example1", function(req, res) {
		auditLog.securityMessage('%d unsuccessful login attempts', 3).by('John Doe').externalIP('127.0.0.1').log(function(err, id) {
			// Place all of the remaining logic here
			if (err) {
				res.type("text/plain").status(500).send("ERROR: " + err.toString());
				return;
			}
			res.type("application/json").status(200).send(JSON.stringify('Log Entry Saved as: ' + id));
		});
	});

	return app;
};