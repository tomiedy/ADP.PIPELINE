$("#showBtnReport").hide();
$(document).ready(function () {
    var idPermohonan = $("#idPermohonan").val();
    var encIdPermohonan = $("#encIdPermohonan").val();
    $.ajax({
        url: "/Permohonan/ConfirmPermohonanJson",
        data: { idPermohonan: idPermohonan },
        type: "POST",
        dataType: "JSON",
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
                if (e.isConfirmed) {
                    $("#headMssg").text("BERHASIL");
                    $("#msg").text(e.Message + ". Klik tombol di bawah ini untuk cetak Tanda Terima bukti pengajuan permohonan");
                    $("#showBtnReport").show();
                    $("#btnClickReport").attr("href", "/Permohonan/ReportTandaTerima?idpermohonan=" + encIdPermohonan)
                } else {
                    $("#headMssg").text("GAGAL");
                    $("#msg").text(e.Message);
                    $("#showBtnReport").hide();
                }
            }
        }
    });
});