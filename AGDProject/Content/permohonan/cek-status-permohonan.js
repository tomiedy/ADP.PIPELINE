$(document).ready(function () {
    $('#StatusPermohonanTableContainer').hide();
    $("#btnCekPermohonan").click(function () {
        var idPermohonan = $("#IdPermohonan").val();
        $.ajax({
            url: '/Permohonan/CekStatusPermohonanJson',
            data: { idPermohonan: idPermohonan },
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
            success: function (e) {
                if (e != null && e != undefined) {
                    if (e.dataFile != null) {
                        $('#StatusPermohonanTableContainer').show();
                        $("span#genCode").text(e.genCode);
                        $("span#idPerm").text(e.dataFile.Id_Permohonan);
                        $("span#pelayanan").text(e.dataFile.MstPelayanan.Nama_Pelayanan);
                        $("span#tglPel").text(e.dtStr);
                        $("span#stts").text(e.lastStatus.StatusBerkas.Nama_Status);
                        $("span#uptd").text(e.dataFile.Kd_Uptd);
                        if (e.lastStatus.Keterangan == null) {
                            $("span#keterangan").text("-");
                        } else {
                            $("span#keterangan").text(e.lastStatus.Keterangan);
                        }
                       
                    } else {
                        OpenToastDefaultMessage(e.Message);
                        $('#StatusPermohonanTableContainer').hide();
                        $("span#genCode").empty();
                        $("span#idPerm").empty();
                        $("span#pelayanan").empty();
                        $("span#tglPel").empty();
                        $("span#stts").empty();
                        $("span#uptd").empty();
                        $("span#keterangan").empty();
                    }
                }
            }
        });
    });
});