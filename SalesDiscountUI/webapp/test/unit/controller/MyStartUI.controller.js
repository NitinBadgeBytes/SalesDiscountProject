/*global QUnit*/

sap.ui.define([
	"salesDiscount/SalesDiscountUI/controller/MyStartUI.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MyStartUI Controller");

	QUnit.test("I should test the MyStartUI controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
