var controlToValidate = [];
$(document).ready(function () {
    controlToValidate.push($("#nop"));
    controlToValidate.push($("#noktp"));
    controlToValidate.push($("#fileKtp"));
    controlToValidate.push($("#fileSppt"));

    $("#tgllahir").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd/M/yy",
        numberOfMonths: 1,
        autoclose: true
    });

    $('#nop').mask("99.99.999.999.999.9999.9");
    // Checkbox SK Non E-KTP
    $("#filenonektp").hide();
    $("#cbEktp").click(function () {
        if ($(this).is(':checked')) {
            $("#filenonektp").show();
        } else {
            $("#filenonektp").hide();
        };
    });
    $('#tblTunggakan').hide();
    // Checkbox SSPD
    $("#filesspd").hide();
    $("#cbSspd").click(function () {
        if ($(this).is(':checked')) {
            $("#filesspd").show();
        } else {
            $("#filesspd").hide();
        };
    });
    var isBlokirExist = false;
    var alasanBlokir = "";
    var msgBlokir = '';
    var notifTunggakan = '';
    // Get Data WP by NOP
    $("#btnSearchNop").click(function (e) {
        $('#tblTunggakan').show();
        e.preventDefault();
        nop = $('#nop').val();
        if (nop == '' || nop == null) {
            OpenToastAutoMessage("Nop Harus Diisi");
        } else {
            $("#namawp").val('');
            $("#alamatop").val('');
            $("#alamatwp").val('');
            $("#luasbumi").val('');
            $("#luasbangunan").val('');
            $.ajax({
                url: '/Permohonan/RetrieveDataObyek',
                data: { nop: nop },
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
                        if (data.DataObyek != undefined) {
                            $("#namawp").val(data.DataObyek.NamaWP);
                            $("#alamatop").val(data.DataObyek.AlamatOP);
                            $("#alamatwp").val(data.DataObyek.AlamatWP);
                            $("#luasbumi").val(data.DataObyek.LuasBumi);
                            $("#luasbangunan").val(data.DataObyek.LuasBangunan);
                            if (data.isBlokir) {
                                isBlokirExist = true;
                                errorToast(data.MessageBlokir);
                                msgBlokir = data.MessageBlokir;
                                $('#TunggakanPBBByNopTableContainer').jtable('load', { nop: nop });
                            } else {
                                isBlokirExist = false;
                                msgBlokir = "";
                                $('#TunggakanPBBByNopTableContainer').jtable('load', { nop: nop });
                            }
                        }
                        else {
                            OpenToastAutoMessage("Data Tidak Ditemukan");
                        }
                    }
                }
            });
        }
    });
    // Get Data KTP by No. KTP
    $("#btnSearchKtp").click(function (e) {
        e.preventDefault();
        $("#namaktp").val();
        $("#alamatktp").val();
        $("#tgllahir").val();
        $("#tmplahir").val();
        $("#rt").val();
        $("#rw").val();
        $("#kelurahan").val();
        $("#kecamatan").val();
        var noKTP = $("#noktp").val();
        if (noKTP == '' || noKTP == null) {
            OpenToastAutoMessage("No. KTP harus diisi");
        } else {
            $.ajax({
                url: '/Permohonan/GetWajibPajak',
                data: { noKTP: noKTP },
                type: 'POST',
                dataType: 'json',
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
                    if (data != undefined && data != null) {
                        $("#namaktp").val(data.Nama);
                        $("#alamatktp").val(data.Alamat);
                        $("#tgllahir").val(data.TanggalLahir);
                        $("#tmplahir").val(data.TempatLahir);
                        $("#rt").val(data.RT);
                        $("#rw").val(data.RW);
                        $("#kelurahan").val(data.Kelurahan);
                        $("#kecamatan").val(data.Kecamatan);
                        $("#frmKolDoku").find("input[type=text]").removeAttr("disabled");
                    }
                },
                error: function (data) {
                }
            });
        }
    });
    // table Is lunas
    var isTunggakanExist = false;
    $('#TunggakanPBBByNopTableContainer').jtable({
        title: 'Data Tunggakan PBB',
        paging: true, //Enable paging
        defaultSorting: 'Name ASC', //Set default sorting
        actions: {
            listAction: '/Permohonan/RetrieveDataTunggakanPBBByNOP'
        },
        fields: {
            NOP: {
                title: 'NOP'
            },
            D_PJK_THN: {
                title: 'TAHUN PAJAK'
            },
            StrJatuhTempo: {
                title: 'Jatuh Tempo'
            },
            StrSisaPajak: {
                title: 'Pokok Pajak'
            },
            StrDenda: {
                title: 'Sanksi'
            },
            StrTotalTanggungan: {
                title: 'Total',

            }
        },
        recordsLoaded: function (event, data) {
            if (data.serverResponse.TotalRecordCount != 0) {
                if (data.serverResponse.isDisabled) {
                    isTunggakanExist = true;
                    notifTunggakan = data.serverResponse.notifMsg;
                } else {
                    isTunggakanExist = false;
                    notifTunggakan = data.serverResponse.notifMsg;
                }

            } else {
                isTunggakanExist = false;
                notifTunggakan = '';
            }
        }
    });

    //Insert Permohonan Legalisir SPPT
    $("#saveLegalisirSppt").click(function () {
        var isValid = IsControlTitleTextRequired(controlToValidate);
        if (isValid) {
            var message = [];
            if (isTunggakanExist) {
                message.push(notifTunggakan);
            }
            if (isBlokirExist) {
                message.push(msgBlokir);
            }
        }
        if (message.length > 0) {
            OpenToastAutoMessage(message);
        } else {
            Simpan();
        }
    });
});

function Simpan() {
    //nop detail
    var nop = $("#nop").val();
    //ktp detail
    var noKtp = $("#noktp").val();
    var namaKtp = $("#namaktp").val();
    var alamatKtp = $("#alamatktp").val();
    var tempatLahir = $("#tmplahir").val();
    var tglLahir = $("#tgllahir").val();
    var rt = $("#rt").val();
    var rw = $("#rw").val();
    var kelurahan = $("#kelurahan").val();
    var kecamatan = $("#kecamatan").val();
    //file
    var ktp = $("#fileKtp").val();
    var sppt = $("#fileSppt").val();
    var sspd = $("#fileSspd").val();
    var skNonEktp = $("#fileSkNonEKtp").val();
    $.ajax({
        url: '/LegalisirSPPT/InsertLegalisirSPPT',
        data: {
            nop: nop,
            noKtp: noKtp,
            namaKtp: namaKtp,
            alamatKtp: alamatKtp,
            tmptLahir: tempatLahir,
            tglLahir: tglLahir,
            rt: rt,
            rw: rw,
            kelurahanktp: kelurahan,
            kecamatanktp: kecamatan,
            ktp: targetResultKtp,
            sppt: targetResultSppt,
            sspd: targetResultSspd,
            skNonEktp: targetResultSkNonKtp
        },
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
            if (data != undefined && data != null) {
                if (data.isRedirect) {
                    window.location.href = data.redirectUrl;
                } else if (data.isRedirect == false) {

                }
            }
        }
    });
}

// function preview image non E-KTP
$("#fileSkNonEKtp").change(function () {
    readImage(this);
});

var targetResultSkNonKtp = "";
function readImage(input) {
    if (input.files && input.files[0]) {
        if (ValidateMaxFileSize(input)) {
            var reader = new FileReader();
            reader.onload = function (e) {

                $("#imgnonektp").attr('src', e.target.result);
                $("#anonektp").attr('href', e.target.result);

                targetResultSkNonKtp = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
        else {
            OpenToastAutoMessage('Input File Tidak Boleh Melebihi 2Mb');
            input.value = "";
        }
    }
}

// function preview image KTP
$("#fileKtp").change(function () {
    readImageKTP(this);
});

var targetResultKtp = "";
function readImageKTP(input) {
    if (input.files && input.files[0]) {
        if (ValidateMaxFileSize(input)) {
            var reader = new FileReader();
            reader.onload = function (e) {

                $("#imgktp").attr('src', e.target.result);
                $("#aktp").attr('href', e.target.result);

                targetResultKtp = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
        else {
            OpenToastAutoMessage('Input File Tidak Boleh Melebihi 2Mb');
            input.value = "";
        }
    }
}

// function preview image SSPD
$("#fileSspd").change(function () {
    readImageSSPD(this);
});
var targetResultSspd = "";
function readImageSSPD(input) {
    if (input.files && input.files[0]) {
        if (ValidateMaxFileSize(input)) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $("#imgsspd").attr('src', e.target.result);
                $("#asspd").attr('href', e.target.result);
                targetResultSspd = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
        else {
            OpenToastAutoMessage('Input File Tidak Boleh Melebihi 2Mb');
            input.value = "";
        }
    }
}

// function preview image SSPT
$("#fileSppt").change(function () {
    readImageSSPT(this);
});
var targetResultSppt = "";
function readImageSSPT(input) {
    if (input.files && input.files[0]) {
        var result = ValidateMaxFileSize(input);
        if (result) {
            var reader = new FileReader();
            reader.onload = function (e) {
                sppt = input.files[0];
                $("#imgsspt").attr('src', e.target.result);
                $("#asspt").attr('href', e.target.result);
                targetResultSppt = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
        else {
            OpenToastAutoMessage('Input File Tidak Boleh Melebihi 2Mb');
        }
    }
}

function ValidateMaxFileSize(input) {
    var _size = input.files[0].size;
    var fSExt = new Array('Bytes', 'KB', 'MB', 'GB'),
    i = 0; while (_size > 900) { _size /= 1024; i++; }
    var exactSize = (Math.round(_size * 100) / 100) + ';' + fSExt[i];
    var arrFile = exactSize.split(';');
    var result = true;
    switch (arrFile[1]) {
        case "KB":
            result = true;
            break;
        case "MB":
            var fileSize = parseInt(arrFile[0]);
            if (fileSize > 2) {
                result = false;
            }
            break;
        default:
            result = false;
            break;
    }
    if (!result) {
        input.value = "";
    }
    return result;
}