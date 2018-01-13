$(document).ready(function () {
    $("#btnSubmitToken").click(function () {
        var idPermohonan = $("#IdPermohonan").val();
        var token = $("#token").val();
        var phone = $("#Phone").val();
        $.ajax({
            url: '/Permohonan/SubmitTokenJson',
            data: { idPermohonan: idPermohonan, token: token, phone: phone },
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
                if (data != null && data != undefined) {
                    if (data.isReturnUrl == true) {
                        OpenToastDefaultMessage(data.Message);
                        window.location.href = data.redirectUrl;
                    } else if (data.isReturnUrl == false) {
                        OpenToastDefaultMessage(data.Message);
                    }
                }
            }
        });
    });
});