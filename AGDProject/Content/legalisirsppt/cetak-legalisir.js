$(document).ready(function () {
    var idPermohonan = $('#IdPermohonan').val();
    var img = '';
    $.ajax({
        url: '/Cetak/RetrieveDataCetakLegalisirSPPT',
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
            for (var i = 0; i < e.countPermDok; i++) {
                if (e.listPermDok[i].Id_Dokumen == '06') {
                    $('#imgSPPT').attr('src', 'data:image/png;base64,' + e.listPermDok[i].Base64StringImage);
                }

                if (e.listPermDok[i].Id_Dokumen == '07') {
                    if (e.listPermDok[i].Base64StringImage != null) {
                        $('#imgSSPD').attr('src', 'data:image/png;base64,' + e.listPermDok[i].Base64StringImage);
                    }
                }
            }

            $('span#tglcetak').text(e.data.PermohonanNoSurat.strPrintDate);
            $('span#nosurat').text(e.data.PermohonanNoSurat.No_Surat);

            $('span#headerTtd').text(e.dataUptd.Header_TTD);
            $('span#kota').text(e.dataUptd.Kota);
            $('span#name').text(e.dataUptd.Kepala_Uptd);
            $('span#nip').text(e.dataUptd.Nip);
            $('#ttd').attr('src', 'data:image/png;base64,' + e.dataUptd.EmbedLegalisir64String);
            img = 'data:image/png;base64,' + e.dataUptd.EmbedLegalisir64String + '';
        }
    })

    //$('#btnDownloadPdf').click(function (e) {
    //    e.preventDefault();
    //    var doc = new jsPDF('p', 'pt', 'a4');
    //    var source = $("#print")[0];
    //    specialElementHandlers = {
    //        // element with id of "bypass" - jQuery style selector
    //        '#bypassme': function (element, renderer) {
    //            // true = "handled elsewhere, bypass text extraction"
    //            return true
    //        }
    //    };
    //    margins = {
    //        top: 80,
    //        bottom: 60,
    //        left: 40,
    //        width: 522
    //    };
    //    doc.addImage(img, 'JPEG', 15, 40, 180, 180);
    //    doc.fromHTML(source, margins.left, margins.top, {
    //        'width': 170,
    //        'elementHandlers': specialElementHandlers
    //    });
    //    doc.output("dataurlnewwindow");
    //    //doc.save('aaa.pdf');
    //});
});

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;

    window.onafterprint = function () {
        window.location.reload(true);
    }
    
}


