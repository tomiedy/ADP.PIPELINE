//Verifikasi Notif
var unverificationLegalisir = 0;
var unverificationSalinan = 0;
var unverificationSkl = 0;
var unverificationNjop = 0;
$(document).ready(function () {
    $.ajax({
        url: '/Notifikasi/UnverifiedLegalisirSPPT',
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined) {
                $("#notifId").html("");
                var notifUnveriedLegalisir = document.getElementById("notifId");
                if (notifUnveriedLegalisir != null) {
                    notifUnveriedLegalisir.appendChild(document.createTextNode(data.countData));
                }

                unverificationLegalisir = data.countData;

                $("#NotificationBox").html("");
                if (data.Message == "OK") {
                    var notificationBox = document.getElementById("NotificationBox");
                    if (notificationBox != null) {
                        notificationBox.appendChild(document.createTextNode(data.Pesan));
                    }
                    $.playSound('/Content/notifalert/notification');
                    $("#NotificationBox").addClass(data.notifclass);
                    $("#NotificationBox").fadeIn(5000);
                    $("#NotificationBox").delay(5000).fadeOut(1000);
                }

                UpdateNotificationValue();
            }
        }
    });
    GetSalinanSPPT();
    setInterval(GetSalinanSPPT, 20000);

    GetLegalisirSppt();
    setInterval(GetLegalisirSppt, 20000);

    GetSkl();
    setInterval(GetSkl, 20000);

    GetNjop();
    setInterval(GetNjop, 20000);
})

function GetSalinanSPPT() {
    $.ajax({
        url: '/Notifikasi/UnverifiedSalinanSPPT',
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined) {
                $("#notifTranscId").html("");
                var sumNotifTransc = document.getElementById("notifTranscId");
                if (sumNotifTransc != null) {
                    sumNotifTransc.appendChild(document.createTextNode(data.countData));
                }
                unverificationSalinan = data.countData;
                $("#NotificationBox").html("");
                if (data.Message == "OK") {
                    var notificationBox = document.getElementById("NotificationBox");
                    if (notificationBox != null) {
                        notificationBox.appendChild(document.createTextNode(data.Pesan));
                    }
                    $.playSound('/Content/notifalert/notification');
                    $("#NotificationBox").addClass(data.notifclass);
                    $("#NotificationBox").fadeIn(3000);
                    $("#NotificationBox").delay(3000).fadeOut(1000);
                }
                UpdateNotificationValue();
            }
        }
    });
}

function GetLegalisirSppt() {
    $.ajax({
        url: '/Notifikasi/UnverifiedLegalisirSPPT',
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined) {
                $("#notifId").html("");
                var notifUnveriedLegalisir = document.getElementById("notifId");
                if (notifUnveriedLegalisir != null) {
                    notifUnveriedLegalisir.appendChild(document.createTextNode(data.countData));
                }

                unverificationLegalisir = data.countData;

                $("#NotificationBox").html("");
                if (data.Message == "OK") {
                    var notificationBox = document.getElementById("NotificationBox");
                    if (notificationBox != null) {
                        notificationBox.appendChild(document.createTextNode(data.Pesan));
                    }
                    $.playSound('/Content/notifalert/notification');
                    $("#NotificationBox").addClass(data.notifclass);
                    $("#NotificationBox").fadeIn(5000);
                    $("#NotificationBox").delay(5000).fadeOut(1000);
                }

                UpdateNotificationValue();
            }
        }
    });
}

function GetSkl() {
    $.ajax({
        url: '/Notifikasi/UnverifiedSuratKeteranganLunas',
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined) {
                $("#notifId").html("");
                var notifUnveriedSkl = document.getElementById("notifId");
                if (notifUnveriedSkl != null) {
                    notifUnveriedSkl.appendChild(document.createTextNode(data.countData));
                }

                unverificationSkl = data.countData;

                $("#NotificationBox").html("");
                if (data.Message == "OK") {
                    var notificationBox = document.getElementById("NotificationBox");
                    if (notificationBox != null) {
                        notificationBox.appendChild(document.createTextNode(data.Pesan));
                    }
                    $.playSound('/Content/notifalert/notification');
                    $("#NotificationBox").addClass(data.notifclass);
                    $("#NotificationBox").fadeIn(2000);
                    $("#NotificationBox").delay(2000).fadeOut(1000);
                }

                UpdateNotificationValue();
            }
        }
    });
}

function GetNjop() {
    $.ajax({
        url: '/Notifikasi/UnverifiedKeteranganNjop',
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined) {
                $("#notifId").html("");
                var notifUnverifiedNjop = document.getElementById("notifId");
                if (notifUnverifiedNjop != null) {
                    notifUnverifiedNjop.appendChild(document.createTextNode(data.countData));
                }

                unverificationNjop = data.countData;

                $("#NotificationBox").html("");
                if (data.Message == "OK") {
                    var notificationBox = document.getElementById("NotificationBox");
                    if (notificationBox != null) {
                        notificationBox.appendChild(document.createTextNode(data.Pesan));
                    }
                    $.playSound('/Content/notifalert/notification');
                    $("#NotificationBox").addClass(data.notifclass);
                    $("#NotificationBox").fadeIn(4500);
                    $("#NotificationBox").delay(4500).fadeOut(1000);
                }

                UpdateNotificationValue();
            }
        }
    });
}

function UpdateNotificationValue() {
    var sumNotification = parseInt(unverificationLegalisir) + parseInt(unverificationSalinan) + parseInt(unverificationSkl) + parseInt(unverificationNjop);
    $("#sumNotification").html('');

    var notificationBox = document.getElementById("sumNotification");
    notificationBox.appendChild(document.createTextNode(sumNotification));
    var notifMsg = sumNotification + " Notifikasi Baru";

    $("#sumNotificationMessage").html('');
    var notificationBoxMsg = document.getElementById("sumNotificationMessage");
    notificationBoxMsg.appendChild(document.createTextNode(notifMsg));

    //Legalisir
    $("#msgUnverifiedLegalisir").html('');
    var msgUnverifiedLegalisir = document.getElementById("msgUnverifiedLegalisir");
    msgUnverifiedLegalisir.appendChild(document.createTextNode(unverificationLegalisir + ' Verifikasi legalisir baru'));

    //Salinan SPPT
    $("#msgUnverifiedSalinan").html('');
    var msgUnverifiedSalinan = document.getElementById("msgUnverifiedSalinan");
    msgUnverifiedSalinan.appendChild(document.createTextNode(unverificationSalinan + ' Verifikasi Salinan baru'));

    //Surat Keterangan Lunas
    $("#msgUnverifiedSKL").html('');
    var msgUnverifiedSKL = document.getElementById("msgUnverifiedSKL");
    msgUnverifiedSKL.appendChild(document.createTextNode(unverificationSkl + ' Verifikasi Surat Keterangan Lunas baru'));

    //Keterangan NJop
    $("#msgUnverifiedNjop").html('');
    var msgUnverifiedNjop = document.getElementById("msgUnverifiedNjop");
    msgUnverifiedNjop.appendChild(document.createTextNode(unverificationNjop + ' Verifikasi Kererangan Njop baru'));

}


// Approval Notif
var unapprovedLegalisir = 0;
var unapprovedSalinan = 0;
var unapprovedSkl = 0;
var unapprovedNjop = 0;
$(document).ready(function () {
    $.ajax({
        url: '/Notifikasi/UnapprovalLegalisirSPPT',
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined) {
                $("#notifId").html("");
                var unapprovedLegalisir = document.getElementById("notifId");
                if (unapprovedLegalisir != null) {
                    unapprovedLegalisir.appendChild(document.createTextNode(data.countData));
                }

                unapprovedLegalisir = data.countData;

                $("#NotificationBox").html("");
                if (data.Message == "OK") {
                    var notificationBox = document.getElementById("NotificationBox");
                    if (notificationBox != null) {
                        notificationBox.appendChild(document.createTextNode(data.Pesan));
                    }
                    $.playSound('/Content/notifalert/notification');
                    $("#NotificationBox").addClass(data.notifclass);
                    $("#NotificationBox").fadeIn(5000);
                    $("#NotificationBox").delay(5000).fadeOut(1000);
                }

                UpdateNotificationApprovalValue();
            }
        }
    });
    GetProsesApproveSalinanSPPT();
    setInterval(GetProsesApproveSalinanSPPT, 20000);

    GetProsesApproveLegalisirSppt();
    setInterval(GetProsesApproveLegalisirSppt, 20000);

    GetProsesApproveSkl();
    setInterval(GetProsesApproveSkl, 20000);

    GetProsesApproveNjop();
    setInterval(GetProsesApproveNjop, 20000);
})

function GetProsesApproveSalinanSPPT() {
    $.ajax({
        url: '/Notifikasi/UnapprovalSalinanSPPT',
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined) {
                $("#notifTranscId").html("");
                var notifUnapprovedSalinanSPPT = document.getElementById("notifTranscId");
                if (notifUnapprovedSalinanSPPT != null) {
                    notifUnapprovedSalinanSPPT.appendChild(document.createTextNode(data.countData));
                }
                unapprovedSalinan = data.countData;
                $("#NotificationBox").html("");
                if (data.Message == "OK") {
                    var notificationBox = document.getElementById("NotificationBox");
                    if (notificationBox != null) {
                        notificationBox.appendChild(document.createTextNode(data.Pesan));
                    }
                    $.playSound('/Content/notifalert/notification');
                    $("#NotificationBox").addClass(data.notifclass);
                    $("#NotificationBox").fadeIn(3000);
                    $("#NotificationBox").delay(3000).fadeOut(1000);
                }
                UpdateNotificationApprovalValue();
            }
        }
    });
}

function GetProsesApproveLegalisirSppt() {
    $.ajax({
        url: '/Notifikasi/UnapprovalLegalisirSPPT',
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined) {
                $("#notifId").html("");
                var notifUnapprovedLegalisir = document.getElementById("notifId");
                if (notifUnapprovedLegalisir != null) {
                    notifUnapprovedLegalisir.appendChild(document.createTextNode(data.countData));
                }

                unapprovedLegalisir = data.countData;

                $("#NotificationBox").html("");
                if (data.Message == "OK") {
                    var notificationBox = document.getElementById("NotificationBox");
                    if (notificationBox != null) {
                        notificationBox.appendChild(document.createTextNode(data.Pesan));
                    }
                    $.playSound('/Content/notifalert/notification');
                    $("#NotificationBox").addClass(data.notifclass);
                    $("#NotificationBox").fadeIn(5000);
                    $("#NotificationBox").delay(5000).fadeOut(1000);
                }

                UpdateNotificationApprovalValue();
            }
        }
    });
}

function GetProsesApproveSkl() {
    $.ajax({
        url: '/Notifikasi/UnapprovalSuratKeteranganLunas',
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined) {
                $("#notifTranscId").html("");
                var notifUnapprovedSkl = document.getElementById("notifTranscId");
                if (notifUnapprovedSkl != null) {
                    notifUnapprovedSkl.appendChild(document.createTextNode(data.countData));
                }
                unapprovedSkl = data.countData;
                $("#NotificationBox").html("");
                if (data.Message == "OK") {
                    var notificationBox = document.getElementById("NotificationBox");
                    if (notificationBox != null) {
                        notificationBox.appendChild(document.createTextNode(data.Pesan));
                    }
                    $.playSound('/Content/notifalert/notification');
                    $("#NotificationBox").addClass(data.notifclass);
                    $("#NotificationBox").fadeIn(3000);
                    $("#NotificationBox").delay(3000).fadeOut(1000);
                }
                UpdateNotificationApprovalValue();
            }
        }
    });
}

function GetProsesApproveNjop() {
    $.ajax({
        url: '/Notifikasi/UnapprovalKeteranganNjop',
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data != null && data != undefined) {
                $("#notifId").html("");
                var notifUnapprovedNjop = document.getElementById("notifId");
                if (notifUnapprovedNjop != null) {
                    notifUnapprovedNjop.appendChild(document.createTextNode(data.countData));
                }

                unapprovedNjop = data.countData;

                $("#NotificationBox").html("");
                if (data.Message == "OK") {
                    var notificationBox = document.getElementById("NotificationBox");
                    if (notificationBox != null) {
                        notificationBox.appendChild(document.createTextNode(data.Pesan));
                    }
                    $.playSound('/Content/notifalert/notification');
                    $("#NotificationBox").addClass(data.notifclass);
                    $("#NotificationBox").fadeIn(5000);
                    $("#NotificationBox").delay(5000).fadeOut(1000);
                }

                UpdateNotificationApprovalValue();
            }
        }
    });
}

function UpdateNotificationApprovalValue() {
    var sumNotification = parseInt(unapprovedLegalisir) + parseInt(unapprovedSalinan) + parseInt(unapprovedSkl) + parseInt(unapprovedNjop);
    $("#sumNotification").html('');

    var notificationBox = document.getElementById("sumNotification");
    notificationBox.appendChild(document.createTextNode(sumNotification));
    var notifMsg = sumNotification + " Notifikasi Baru";

    $("#sumNotificationMessage").html('');
    var notificationBoxMsg = document.getElementById("sumNotificationMessage");
    notificationBoxMsg.appendChild(document.createTextNode(notifMsg));

    //Legalisir
    $("#msgUnapprovedLegalisir").html('');
    var msgUnapprovedLegalisir = document.getElementById("msgUnapprovedLegalisir");
    msgUnapprovedLegalisir.appendChild(document.createTextNode(unapprovedLegalisir + ' Approval legalisir baru'));

    //Salinan SPPT
    $("#msgUnapprovedSalinan").html('');
    var msgUnapprovedSalinan = document.getElementById("msgUnapprovedSalinan");
    msgUnapprovedSalinan.appendChild(document.createTextNode(unapprovedSalinan + ' Approval Salinan baru'));

    //Surat Keterangan Lunas
    $("#msgUnapprovedSKL").html('');
    var msgUnapprovedSKL = document.getElementById("msgUnapprovedSKL");
    msgUnapprovedSKL.appendChild(document.createTextNode(unapprovedSkl + ' Approval Surat Keterangan Lunas baru'));

    //Keterangan NJop
    $("#msgUnapprovedNjop").html('');
    var msgUnapprovedNjop = document.getElementById("msgUnapprovedNjop");
    msgUnapprovedNjop.appendChild(document.createTextNode(unapprovedNjop + ' Approval Kererangan Njop baru'));

}