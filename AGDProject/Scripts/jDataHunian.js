/// <reference path="jquery-1.5.min.js" />
/// <reference path="helper.js" />
$(document).ready(function () {
    //    $("#Tanggal").datepicker({
    //        changeMonth: true,
    //        changeYear: true,
    //        dateFormat: "mm/dd/yy"
    //    });

    $('input[type="submit"]').button();

    OnKeyUp("Propinsi", 2, "Kota", 2);
    OnKeyUp("Kota", 2, "Kecamatan", 2);
    OnKeyUp("Kecamatan", 3, "Kelurahan", 2);
    OnKeyUp("Kelurahan", 3, "JenisPajak", 2);
    OnKeyUp("JenisPajak", 3, "NomorUrutWP", 2);
    OnKeyUp("NomorUrutWP", 5, "", 2);

    //    $("#Tanggal").change(function () {
    //        var bln = parseInt($("#Tanggal").val().substr(0, 2), 0);
    //        var thn = parseInt($("#Tanggal").val().substr(6, 4), 0);
    //        $("#MasaPajak").val(bln);
    //        $("#TahunPajak").val(thn);
    //    });


    $('#TableContainer').jtable({
        title: 'JENIS KAMAR',
        paging: true,
        pageSize: 5,
        sorting: true,
        defaultSorting: 'JenisKamar ASC',
        messages: {
            //serverCommunicationError: 'salah koneksi',
            //noDataAvailable: 'Tidak ada data ditemukan!',
            pagingInfo: 'Menampilkan <b>{0}</b> - <b>{1}</b> dari <b>{2}</b> data'
        },
        actions: {
            listAction: '/Pendaftaran/GetDataHunian',
            updateAction: '/Pendaftaran/EditDataHunian'
        },
        fields: {
            Id: {
                key: true,
                title: 'ID',
                list: false
            },
            JenisKamar: {
                title: 'Jenis Kamar',
                width: '10%',
                edit: false
            },
            JumlahKamar: {
                title: 'Jumlah Kamar',
                width: '10%',
                edit: false
            },
            Terpakai: {
                title: 'Jumlah Terpakai',
                width: '10%',
                edit: true
            },
            Keterangan: {
                title: 'Keterangan',
                width: '10%',
                edit: true
            }
        }
    });

    $('#TableContainer1').jtable({
        title: 'HALL/BALLROOM',
        paging: true,
        pageSize: 5,
        sorting: true,
        defaultSorting: 'JenisKamar ASC',
        messages: {
            //serverCommunicationError: 'salah koneksi',
            //noDataAvailable: 'Tidak ada data ditemukan!',
            pagingInfo: 'Menampilkan <b>{0}</b> - <b>{1}</b> dari <b>{2}</b> data'
        },
        actions: {
            listAction: '/Pendaftaran/GetDataBanquet',
            updateAction: '/Pendaftaran/EditDataHunian'
        },
        fields: {
            Id: {
                key: true,
                title: 'ID',
                list: false
            },
            JenisKamar: {
                title: 'Jenis Ruangan',
                width: '10%',
                edit: false
            },
            JumlahKamar: {
                title: 'Jumlah Ruangan',
                width: '10%',
                edit: false
            },
            Terpakai: {
                title: 'Jumlah Terpakai',
                width: '10%',
                edit: true
            },
            Keterangan: {
                title: 'Keterangan',
                width: '10%',
                edit: true
            }
        }
    });
});

function OnKeyUp(controlId, valueLength, focusControl, code) {
    $("#" + controlId).keyup(function (eventHandler) {
        if ((eventHandler.keyCode >= 48 && eventHandler.keyCode <= 57) ||
           (eventHandler.keyCode >= 96 && eventHandler.keyCode <= 105)) {
            checkControlId(controlId, valueLength, focusControl);
            switch (code) {
                case 1:
                    //                    var npwpd = $("#KodeNPWP").val() + "." + $("#KecamatanNPWP").val() + "." + $("#NomorUrutNPWP").val() + "." + $("#KodeDinas").val() + "." + $("#NomorProyek").val();
                    //                    if (npwpd.length == 20) {
                    //                        GetNpwpd(npwpd);
                    //                    }
                    break;
                case 2:
                    var nop = $("#Propinsi").val() + "." + $("#Kota").val() + "." + $("#Kecamatan").val() + "." + $("#Kelurahan").val() + "." + $("#JenisPajak").val() + "." + $("#NomorUrutWP").val();
                    if (nop.length == 23) {
                        GetNop(nop);
                    }
                    break;
                default:
                    break;
            }
        }
    });
}

function GetNop(nop) {
    $("#NamaOP").val("");
    $("#AlamatOP").val("");
    $("#NPWPD").val("");
    $("#Rekening").val("");

    $.post("/Pendaftaran/GetNop", { nop: nop },
    function (result) {
        $("#NamaOP").val(result.NamaOP);
        $("#AlamatOP").val(result.AlamatOP);
        $("#NPWPD").val(result.NPWPD);
        $("#Rekening").val(result.Rekening);
    });

    var Bln = $("#Bulan").val();
    var Thn = $("#Tahun").val();
    $('#TableContainer').jtable('load', { nop: nop, Bulan: Bln, Tahun: Thn });
    $('#TableContainer1').jtable('load', { nop: nop, Bulan: Bln, Tahun: Thn });
}

function checkControlId(controlId, maxLength, focusControlId) {
    var ctrlValue = $("#" + controlId).val();
    if (ctrlValue.length >= maxLength) {
        focusOnControlId(focusControlId);
    }
}

function focusOnControlId(controlId) {
    if (controlId != "") {
        $("#" + controlId).focus();
    }
}