var unverification1Permohonan = 0;
var unverification2Permohonan = 0;

$(document).ready(function (param) {
    $.ajax({
        url: '/Dashboard/UnreadMailNotification',
        type: "POST",
        dataType: "json",
        data: { idRental: param },
        success: function (data) {
            if (data != null && data != undefined) {
                $("#notifId").html("");
                $("#notifIdside").html("");
                var notifUnreadEmail = document.getElementById("notifId");
                var notifUnreadEmailside = document.getElementById("notifIdside");
                if (notifUnreadEmail != null) {
                    notifUnreadEmail.appendChild(document.createTextNode(data.message));
                }
                if (notifUnreadEmailside != null) {
                    notifUnreadEmailside.appendChild(document.createTextNode(data.message));
                }
                unreadMailNotification = data.message;
                UpdateNotificationValue();
            }
        }
    });
    GetUnverification1();
    GetUnverification2();
    setInterval(GetUnverification1, 20000);
    setInterval(GetUnverification2, 20000);
})

function GetUnverification1() {
    $.ajax({
        url: '/Dashboard/GetUnconfirmedInvoice',
        type: "POST",
        dataType: "json",
        data: {},
        success: function (data) {
            if (data != null && data != undefined) {
                $("#notifTranscId").html("");
                var sumNotifTransc = document.getElementById("notifTranscId");
                if (sumNotifTransc != null) {
                    sumNotifTransc.appendChild(document.createTextNode(data.unconfirmedTrans));
                }
                unconfirmedTransactionNotification = data.unconfirmedTrans;
                $("#NotificationBox").html("");
                if (data.Message == "OK") {
                    var notificationBox = document.getElementById("NotificationBox");
                    if (notificationBox != null) {
                        notificationBox.appendChild(document.createTextNode(data.Pesan));
                    }
                    $.playSound('@Url.Content("~/Content/notifalert/notification")');
                    $("#NotificationBox").addClass(data.notifclass);
                    $("#NotificationBox").fadeIn(3000);
                    $("#NotificationBox").delay(3000).fadeOut(1000);
                }
                UpdateNotificationValue();
            }
        }
    });
}

function GetUnverification2() {
    $.ajax({
        url: '/Dashboard/GetUnconfirmedInvoice',
        type: "POST",
        dataType: "json",
        data: {},
        success: function (data) {
            if (data != null && data != undefined) {
                $("#notifTranscId").html("");
                var sumNotifTransc = document.getElementById("notifTranscId");
                if (sumNotifTransc != null) {
                    sumNotifTransc.appendChild(document.createTextNode(data.unconfirmedTrans));
                }
                unconfirmedTransactionNotification = data.unconfirmedTrans;
                $("#NotificationBox").html("");
                if (data.Message == "OK") {
                    var notificationBox = document.getElementById("NotificationBox");
                    if (notificationBox != null) {
                        notificationBox.appendChild(document.createTextNode(data.Pesan));
                    }
                    $.playSound('@Url.Content("~/Content/notifalert/notification")');
                    $("#NotificationBox").addClass(data.notifclass);
                    $("#NotificationBox").fadeIn(3000);
                    $("#NotificationBox").delay(3000).fadeOut(1000);
                }
                UpdateNotificationValue();
            }
        }
    });
}

function UpdateNotificationValue() {
    var sumNotification = parseInt(unverification1Permohonan) + parseInt(unverification2Permohonan);

    $("#sumNotification").html('');
    var notificationBox = document.getElementById("sumNotification");
    notificationBox.appendChild(document.createTextNode(sumNotification));
    var notifMsg = sumNotification + " Notifikasi Baru";

    $("#sumNotificationMessage").html('');
    var notificationBoxMsg = document.getElementById("sumNotificationMessage");
    notificationBoxMsg.appendChild(document.createTextNode(notifMsg));

    $("#msgNotifVer1").html('');
    var msgNotifVer1 = document.getElementById("msgNotifVer1");
    msgNotifVer1.appendChild(document.createTextNode(unverification1Permohonan + ' Verifikasi 1 baru'));

    $("#msgNotifVer2").html('');
    var msgNotifVer2 = document.getElementById("msgNotifVer2");
    msgNotifVer2.appendChild(document.createTextNode(unverification2Permohonan + ' Verifikasi 2 baru'));

}