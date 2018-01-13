$(document).ready(function () {
    $("body").append('<div class="toast-message"><span style="display:none;" id="toastmessageouter" class=""><span id="toastmessage">Hello! Welcome to simpleToastAlert!</span><span onclick="closeToast()" id="closetoast">&times;</span></span></div>');
});

var successToast = function (message) {
    $("#toastmessageouter").attr("style", "display:none");
    $("#toastmessageouter").removeClass("error-toast").addClass("success-toast");
    toastMessage(message);
};

var errorToast = function (message) {
    $("#toastmessageouter").attr("style", "display:none");

    var errMessage = "";
    try {
        if (message instanceof Array) {
            for (var iMsg = 0; iMsg < message.length; iMsg++) {
                errMessage += message[iMsg] + '<br/>';
            }
        }
        else {
            errMessage = message;
        }
    } catch (e) {
        errMessage = message;
    }

    $("#toastmessage").html(errMessage).text();
    //$("#toastmessage").text(message);
    $("#toastmessageouter").fadeIn(500);
    $("#toastmessageouter").removeClass("success-toast").addClass("error-toast");
    toastMessage(message);
};

var defaultToast = function (message) {
    $("#toastmessageouter").attr("style", "display:none");
    $("#toastmessageouter").removeClass("success-toast").removeClass("error-toast");
    toastMessage(message);
};

var toastMessage = function (message) {
    $("#toastmessageouter").attr("style", "display:none");
    var errMessage = "";
    try {
        if (message instanceof Array) {
            for (var iMsg = 0; iMsg < message.length; iMsg++) {
                errMessage += message[iMsg] + '<br/>';
            }
        }
        else {
            errMessage = message;
        }
    } catch (e) {
        errMessage = message;
    }

    $("#toastmessage").html(errMessage).text();
    //$("#toastmessage").text(message);
    $("#toastmessageouter").fadeIn(500);
};

var closeToast = function () {
    $("#toastmessageouter").fadeOut("fast", function () {
        $("#toastmessageouter").removeClass("success-toast").removeClass("error-toast");
    });
};

var successToastAuto = function (message) {
    $("#toastmessageouter").attr("style", "display:none");
    $("#toastmessageouter").removeClass("error-toast").addClass("success-toast");
    toastMessageAuto(message);
};

var errorToastAuto = function (message) {
    $("#toastmessageouter").attr("style", "display:none");
    $("#toastmessageouter").removeClass("success-toast").addClass("error-toast");
    toastMessageAuto(message);
};

var defaultToastAuto = function (message) {
    $("#toastmessageouter").attr("style", "display:none");
    $("#toastmessageouter").removeClass("success-toast").removeClass("error-toast");
    toastMessageAuto(message);
};

var toastMessageAuto = function (message) {
    $("#toastmessageouter").attr("style", "display:none");

    var errMessage = "";
    try {
        if (message instanceof Array) {
            for (var iMsg = 0; iMsg < message.length; iMsg++) {
                errMessage += message[iMsg] + '<br/>';
            }
        }
        else {
            errMessage = message;
        }
    } catch (e) {
        errMessage = message;
    }

    $("#toastmessage").html(errMessage).text();
    $("#toastmessageouter").fadeIn(1000);
    clearTimeout(timeout);
    var timeout = setTimeout(function () {
        $("#toastmessageouter").fadeOut(1000);
    }, 3000);
};
