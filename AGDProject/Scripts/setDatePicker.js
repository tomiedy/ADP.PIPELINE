$(document).ready(function () {

    var dates = $("#StartDate").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        changeYear: true,
        dateFormat: "mm/dd/yy",
        numberOfMonths: 1,
        onSelect: function (selectedDate) {
            var option = this.id == "StartDate" ? "minDate" : "maxDate",
					instance = $(this).data("datepicker"),
					date = $.datepicker.parseDate(
						instance.settings.dateFormat ||
						$.datepicker._defaults.dateFormat,
						selectedDate, instance.settings);
            dates.not(this).datepicker("option", option, date);
        }
    });

    $('input[type="submit"]').button();
});