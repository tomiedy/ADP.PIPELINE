var controlToValidate = [];
$(document).ready(function () {
    controlToValidate.push($("#noHp"));
    var idPermohonan = $("#IdPermohonan").val();
    var nmPelayanan = $("#NamaPelayanan").val();
    OpenToastDefaultMessage('Mohon untuk menyimpan atau mencetak No. Permohonan ini : ' + idPermohonan + ' , ini berguna untuk proses berikutnya.');
    $("#btnCreateToken").on('click', function (e) {
        //e.preventDefault();
        var noHp = $("#noHp").val();
        var email = $("#txtEmail").val();
        var isValid = IsControlTitleTextRequired(controlToValidate);
        if (isValid) {
            if (email != null && email != "") {
                if (IsValidEmailAddress(email)) {
                    createToken(idPermohonan, noHp, email, nmPelayanan);
                }
            } else {
                createToken(idPermohonan, noHp, email, nmPelayanan);
            }
        }
    });
});

function createToken(idPermohonan, noHp, email, nmPelayanan) {
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
            if (data.redirect) {
                OpenToastAutoMessage(data.Message);
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
            } else {
                errorToast(data.Message);
            }
        }
    });
};

function printDiv(divId) {
    //var divElements = document.getElementById(divId).innerHTML;
    var divHeaderElements = document.getElementById('print').innerHTML;
    //Get the HTML of whole page
    var oldPage = document.body.innerHTML;

    //Reset the page's HTML with div's HTML only
    document.body.innerHTML =
      "<html><head><title></title></head><body>" +
      divHeaderElements + "</body>";

    //Print Page
    window.print();

    //Restore orignal HTML
    document.body.innerHTML = oldPage;
};