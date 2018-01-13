var idPermohonan = "";
var controlToValidate = [];
$(document).ready(function () {
    controlToValidate.push($("#NoPelayanan"));
    controlToValidate.push($("#txtHp"));

    $("#btnCreateToken").on('click', function (e) {
        var noHp = $("#txtHp").val();
        var email = $("#txtEmail").val();
        idPermohonan = $("#NoPelayanan").val();
        var isValid = IsControlTitleTextRequired(controlToValidate);
        if (isValid) {
            if (email != null && email != "") {
                if (IsValidEmailAddress(email)) {
                    createToken(idPermohonan, noHp, email, "");
                }
            } else {
                createToken(idPermohonan, noHp, email, "");
            }
        }
    });
});

function createToken(idPermohonan, noHp, email, nmPelayanan) {
    debugger;
    $.ajax({
        url: '/Permohonan/GenerateKeyJson',
        data: { idPermohonan: idPermohonan, noHp: noHp, email: email, nmPelayanan: nmPelayanan },
        type: 'POST',
        dataType: 'JSON',
        beforeSend: function () {
            $.blockUI({
                css: {
                    border: 'none',
                    padding: '15px',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .5,
                    color: '#fff'
                }
            });
        },
        complete: function () { $.unblockUI(); },
        success: function (data) {
            debugger;
            if (data.redirect = true) {
                window.location.href = data.returnUrl;
                $.blockUI({
                    css: {
                        border: 'none',
                        padding: '15px',
                        backgroundColor: '#000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .5,
                        color: '#fff'
                    }
                });
            }
        }
    });
};