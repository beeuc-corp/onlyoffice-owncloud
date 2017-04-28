/**
 *
 * (c) Copyright Ascensio System Limited 2010-2017
 *
 * This program is freeware. You can redistribute it and/or modify it under the terms of the GNU 
 * General Public License (GPL) version 3 as published by the Free Software Foundation (https://www.gnu.org/copyleft/gpl.html). 
 * In accordance with Section 7(a) of the GNU GPL its Section 15 shall be amended to the effect that 
 * Ascensio System SIA expressly excludes the warranty of non-infringement of any third-party rights.
 *
 * THIS PROGRAM IS DISTRIBUTED WITHOUT ANY WARRANTY; WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR
 * FITNESS FOR A PARTICULAR PURPOSE. For more details, see GNU GPL at https://www.gnu.org/copyleft/gpl.html
 *
 * You can contact Ascensio System SIA by email at sales@onlyoffice.com
 *
 * The interactive user interfaces in modified source and object code versions of ONLYOFFICE must display 
 * Appropriate Legal Notices, as required under Section 5 of the GNU GPL version 3.
 *
 * Pursuant to Section 7 § 3(b) of the GNU GPL you must retain the original ONLYOFFICE logo which contains 
 * relevant author attributions when distributing the software. If the display of the logo in its graphic 
 * form is not reasonably feasible for technical reasons, you must include the words "Powered by ONLYOFFICE" 
 * in every copy of the program you distribute. 
 * Pursuant to Section 7 § 3(e) we decline to grant you any rights under trademark law for use of our trademarks.
 *
*/

(function ($, OC) {

    $(document).ready(function () {
        OCA.Onlyoffice = _.extend({}, OCA.Onlyoffice);
        if (!OCA.Onlyoffice.AppName) {
            OCA.Onlyoffice = {
                AppName: "onlyoffice"
            };
        }

        var advToogle = function (toggle) {
            $("#onlyofficeSecretPanel").toggleClass("onlyoffice-hide", toggle);
            $("#onlyofficeSaveBreak").toggleClass("onlyoffice-hide", toggle || null);
        };

        if ($("#onlyofficeInternalUrl").val().length
            || $("#onlyofficeSecret").val().length) {
            advToogle(false);
        }

        $("#onlyofficeAdv").click(function () {
            advToogle();
        });

        $("#onlyofficeSave").click(function () {
            var onlyofficeUrl = $("#onlyofficeUrl").val().trim();

            if (!onlyofficeUrl.length) {
                $("#onlyofficeInternalUrl, #onlyofficeSecret").val("");
            }

            var onlyofficeSecret = $("#onlyofficeSecret:visible").val() || "";
            var onlyofficeInternalUrl = ($("#onlyofficeInternalUrl:visible").val() || "").trim();

            $.ajax({
                method: "PUT",
                url: OC.generateUrl("apps/onlyoffice/ajax/settings"),
                data: {
                    documentserver: onlyofficeUrl,
                    documentserverInternal: onlyofficeInternalUrl,
                    secret: onlyofficeSecret
                },
                success: function onSuccess(response) {
                    if (response && response.documentserver != null) {
                        $("#onlyofficeUrl").val(response.documentserver);
                        $("#onlyofficeInternalUrl").val(response.documentserverInternal);
                        $("#onlyofficeSecret").val(response.secret);

                        var message =
                            response.error
                                ? (t(OCA.Onlyoffice.AppName, "Error when trying to connect") + " (" + response.error + ")")
                                : t(OCA.Onlyoffice.AppName, "Settings have been successfully updated");
                        var row = OC.Notification.show(message);
                        setTimeout(function () {
                            OC.Notification.hide(row);
                        }, 3000);
                    }
                }
            });
        });

        $(".section-onlyoffice input").keypress(function (e) {
            var code = e.keyCode || e.which;
            if (code === 13) {
                $("#onlyofficeSave").click();
            }
        });
    });

})(jQuery, OC);
