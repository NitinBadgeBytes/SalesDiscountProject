sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend(
      "salesDiscount.SalesDiscountUI.controller.MyStartUI",
      {
        onInit: function () {
          this.getView().setModel(
            new sap.ui.model.json.JSONModel({
              initialContext: JSON.stringify(
                { someProperty: "some value" },
                null,
                4
              ),
              apiResponse: "",
            })
          );
        },
        onSubmit: function () {
          var model = this.getView().getModel();
          var definitionId = "us10.328018e6trial.salesdiscountproject.salesDiscountProcess";
          // var initialContext = model.getProperty("/initialContext");
          var input1Raw = parseInt(this.getView().byId("productitems").getValue());
          var input2Raw = parseInt(this.getView().byId("discount").getValue());

          var input1 = parseInt(input1Raw, 10);
         var input2 = parseInt(input2Raw, 10);

// Validate and default to 0 if invalid
if (isNaN(input1)) {
    input1 = 0;
}
if (isNaN(input2)) {
    input2 = 0;
}
         
          var initialContext = {
           
              productitems: input1,
              discount: input2
         
        };

          var data = {
            definitionId: definitionId,
            context:initialContext,
          };

          $.ajax({
            url: this._getWorkflowRuntimeBaseURL() + "/workflow-instances",
            method: "POST",
            async: false,
            contentType: "application/json",
            headers: {
              "X-CSRF-Token": this._fetchToken(),
            },
            data: JSON.stringify(data),
            success: function (result, xhr, data) {
              model.setProperty(
                "/apiResponse",
                JSON.stringify(result, null, 4)
              );
            },
            error: function (request, status, error) {
              var response = JSON.parse(request.responseText);
              model.setProperty(
                "/apiResponse",
                JSON.stringify(response, null, 4)
              );
            },
          });
        },

        _fetchToken: function () {
          var fetchedToken;

          jQuery.ajax({
            url: this._getWorkflowRuntimeBaseURL() + "/xsrf-token",
            method: "GET",
            async: false,
            headers: {
              "X-CSRF-Token": "Fetch",
            },
            success(result, xhr, data) {
              fetchedToken = data.getResponseHeader("X-CSRF-Token");
            },
          });
          return fetchedToken;
        },

        _getWorkflowRuntimeBaseURL: function () {
          var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
          var appPath = appId.replaceAll(".", "/");
          var appModulePath = jQuery.sap.getModulePath(appPath);

          return appModulePath + "/bpmworkflowruntime/v1";
        },
      }
    );
  }
);
