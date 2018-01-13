//includeJs("Content/toast/js/simpleToastMessage.js");

function includeJs(jsFilePath) {
    var js = document.createElement("script");

    js.type = "text/javascript";
    js.src = jsFilePath;

    document.body.appendChild(js);
}

function IsControlIDTextRequired(control, message) {
    var isValid = true;
    if (control.length == 1) {
        if (document.getElementById(control[0][0].id).value.trim() == "") {
            if (message) {
                errorToastAuto(message);
            }
            else {
                errorToastAuto(control[0][0].id + ' Tidak Boleh Kosong!.');
            }
            isValid = false;
        }        
    }
    else {
        var msg = [];
        for (var iControl = 0; iControl < control.length; iControl++) {
            if (document.getElementById(control[iControl][0].id).value.trim() == "") {
                if (message) {
                    msg.push(message);
                }
                else{
                    msg.push(control[iControl][0].id + ' Tidak Boleh Kosong!.');
                }

                isValid = false;
            }
        }

        if (!isValid) {
            errorToastAuto(msg);
        }
    }

    return isValid;
}

function IsControlTitleTextRequired(control, message) {
    var isValid = true;
    if (control.length == 1) {
        if (document.getElementById(control[0][0].id).value.trim() == "") {
            if (message) {
                errorToastAuto(message);
            }
            else {
                errorToastAuto(control[0][0].title + ' Tidak Boleh Kosong!.');
            }

            isValid = false;
        }
    }
    else {
        var msg = [];
        for (var iControl = 0; iControl < control.length; iControl++) {
            if (document.getElementById(control[iControl][0].id).value.trim() == "") {
                if (message) {
                    msg.push(message);
                }
                else {
                    msg.push(control[iControl][0].title + ' Tidak Boleh Kosong!.');
                }

                isValid = false;
            }
        }

        if(!isValid)
        {
            errorToastAuto(msg);
        }
    }

    return isValid;
}

function IsValidEmailAddress(control) {
    var isValidEmail = true;
    debugger;
    //var email = document.getElementById(control).value();
    //return IsTextRequired(control);

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(control)) {
        isValidEmail = false;
        errorToastAuto("Format email anda tidak valid");
    }

    return isValidEmail;
}

function OpenToastAutoMessage(message) {
    errorToastAuto(message);
}

function OpenToastDefaultMessage(message) {
    defaultToast(message);
}