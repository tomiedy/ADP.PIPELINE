var controlToValidate = [];
$(document).ready(function () {
    controlToValidate.push($("#nop"));
    controlToValidate.push($("#noktp"));
    controlToValidate.push($("#masaPajak"));
    controlToValidate.push($("#fileKtp"));
    controlToValidate.push($("#keperluan"));
    $("#tgllahir").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd/M/yy",
        numberOfMonths: 1,
        autoclose: true
    });

    $('#tblTunggakan').hide();
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
    // Get Data WP by NOP
    var isBlokirExist = false;
    var alasanBlokir = "";
    var msgBlokir = '';
    var notifTunggakan = '';
    $("#btnSearchNop").click(function (e) {
        $('#tblTunggakan').show();
        e.preventDefault();
        nop = $('#nop').val();
        if (nop == '' || nop == null) {
            OpenToastAutoMessage("Nop harus diisi..");
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
                            $("#masaPajak").empty();
                            //$("#masaPajak2").empty();
                            if (data.countListOp != 0) {
                                var optionhtml = '<option value="">--Pilih Tahun Pajak--</option>';
                                $.each(data.listObyekPajak, function (i) {
                                    optionhtml += '<option value="' + data.listObyekPajak[i].THN_PAJAK_SPPT + '">' + data.listObyekPajak[i].THN_PAJAK_SPPT + '</option>';

                                });
                                $("#masaPajak").append(optionhtml);
                                //$("#masaPajak").change(function () {
                                //    var masaPajak1 = $("#masaPajak").val();
                                //    $("#masaPajak2").empty();

                                //    $.each(data.listObyekPajak, function (i) {
                                //        if (data.listObyekPajak[i].THN_PAJAK_SPPT >= masaPajak1) {
                                //            var optionhtml = '<option value="' + data.listObyekPajak[i].THN_PAJAK_SPPT + '">' + data.listObyekPajak[i].THN_PAJAK_SPPT + '</option>';
                                //        }
                                //        $("#masaPajak2").append(optionhtml);
                                //    });
                                //});
                            } else if (data.countListOpFasum != 0) {
                                var optionhtml = '<option value="">--Pilih Tahun--</option>';
                                $.each(data.listObyekFasum, function (i) {
                                    optionhtml += '<option value="' + data.listObyekFasum[i].THN_NIR_ZNT + '">' + data.listObyekFasum[i].THN_NIR_ZNT + '</option>';

                                });
                                $("#masaPajak").append(optionhtml);
                                $("#masaPajak").change(function () {
                                    var masaPajak1 = $("#masaPajak").val();
                                    $("#masaPajak2").empty();

                                    $.each(data.listObyekFasum, function (i) {
                                        if (data.listObyekFasum[i].THN_NIR_ZNT >= masaPajak1) {
                                            var optionhtml = '<option value="' + data.listObyekFasum[i].THN_NIR_ZNT + '">' + data.listObyekFasum[i].THN_NIR_ZNT + '</option>';
                                        }
                                        $("#masaPajak2").append(optionhtml);
                                    });
                                });
                            } else {
                                OpenToastAutoMessage(data.Message);
                            }

                            //checking blokir nop
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
            OpenToastAutoMessage("No. KTP harus diisi..");
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

    //Insert Permohonan Surat Keterangan Lunas
    $("#saveSKL").click(function (e) {
        debugger;
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
            errorToast(message);
        } else {
            Simpan();
        }
    });
});

function Simpan() {
    debugger;
    var nop = $("#nop").val();
    var noKtp = $("#noktp").val();
    var namaKtp = $("#namaktp").val();
    var alamatKtp = $("#alamatktp").val();
    var tempatLahir = $("#tmplahir").val();
    var tglLahir = $("#tgllahir").val();
    var rt = $("#rt").val();
    var rw = $("#rw").val();
    var kelurahan = $("#kelurahan").val();
    var kecamatan = $("#kecamatan").val();
    var keperluan = $("#keperluan").val();
    var masaPajak = $("#masaPajak").val();
    var ktp = $("#fileKtp").val();
    var skNonEktp = $("#fileSkNonEKtp").val();

    $.ajax({
        url: '/SuratKeteranganLunas/InsertSuratKeteranganLunas',
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
            skNonEktp: targetResultSkNonKtp,
            tahunPajak: masaPajak,
            keperluan: keperluan
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
                } else {
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