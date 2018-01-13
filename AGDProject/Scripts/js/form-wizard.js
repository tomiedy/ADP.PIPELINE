$(function () {
    var wizard_1 = $("#wizard-1").steps({
        transitionEffect: "slideLeft"
    });
    wizard_1.steps("add", {
        title: "Pelayanan",
        content: '<fieldset><legend>Pelayanan</legend>' +
                 '<div class="form-group"><label for="IdPelayanan" class="col-md-2" control-label>Jenis Pelayanan :</label>' +
                 '<div class="col-md-10">'+
                 '<select class="form-control selectpicker required" data-live-search="true" id="IdPelayanan" name="IdPelayanan">' +
                 '<option value="0">- Pilih Pelayanan -</option>'+
                 '</select></div>'+
                 '</div>' +
                 '</fieldset>'
});
wizard_1.steps("add", {
    title: "Profile",
    content: '<fieldset><legend>Profile Information</legend><div class="form-group"><label for="name">First name *</label><div><input id="name" name="name" type="text" class="form-control required"></div></div><div class="form-group"><label for="surname">Last name *</label><div><input id="surname" name="surname" type="text" class="form-control required"></div></div><div class="form-group"><label for="email">Email *</label><div><input id="email" name="email" type="text" class="form-control required email"></div></div><div class="form-group"><label for="address">Address</label><div><input id="address" name="address" type="text" class="form-control"></div></div><div class="form-group"><label for="age">Age (The warning step will show up if age is less than 18) *</label><div><input id="age" name="age" type="text" class="form-control required number"></div></div></fieldset>'
});
wizard_1.steps("add", {
    title: "Warning",
    content: '<fieldset><legend>You are to young</legend><p>Please go away ;-)</p></fieldset>'
});
wizard_1.steps("add", {
    title: "Finish",
    content: '<fieldset><legend>Terms and Conditions</legend><input id="acceptTerms" name="acceptTerms" type="checkbox" class="required"> <label for="acceptTerms">I agree with the Terms and Conditions.</label></fieldset>'
});

/*************************************************/
/************ #rootwizard-custom-arrow ***********/
$('#rootwizard-tabdetail2').bootstrapWizard({
    onTabShow: function(tab, navigation, index) {
        var $total = navigation.find('li').length;
        var $current = index+1;
        var $percent = ($current/$total) * 100;
        $('#rootwizard-tabdetail2').find('.bar').css({width:$percent+'%'});
    },
    'onNext': function(tab, navigation, index) {

        // select id of current tab content
        var $id = tab.find("a").attr("href");
        var $approved = 1;
        // Check all input validation
        $($id + " input").each(function(){
            if (!$(this).val()) {
                $(this).parent().parent().find("i.alert").removeClass("alert-hide");
                $approved = 0;
            } else {
                $(this).parent().parent().find("i.alert").addClass("alert-hide");
            }
        });
        if ($approved !== 1) return false;
    },
    'onTabClick': function(tab, navigation, index) {
        // select id of current tab content
        var $id = tab.find("a").attr("href");
        var $approved = 1;
        // Check all input validation
        $($id + " input").each(function(){
            if (!$(this).val()) {
                $(this).parent().parent().find("i.alert").removeClass("alert-hide");
                $approved = 0;
            } else {
                $(this).parent().parent().find("i.alert").addClass("alert-hide");
            }
        });
        if ($approved !== 1) return false;
        // Add class visited to style css
        if (tab.attr("class")=="visited"){
            tab.removeClass("visited");
        } else {
            tab.addClass("visited");
        }
    },'tabClass': 'nav nav-pills','nextSelector': '.button-next', 'previousSelector': '.button-previous'
});
/************ #rootwizard-custom-circle ***********/
$('#rootwizard-custom-circle').bootstrapWizard({
    onTabShow: function(tab, navigation, index) {
        var $total = navigation.find('li').length;
        var $current = index+1;
        var $percent = ($current/$total) * 100;
        $('#rootwizard-custom-circle').find('.bar').css({width:$percent+'%'});
    },
    'onNext': function(tab, navigation, index) {

        // select id of current tab content
        var $id = tab.find("a").attr("href");
        var $approved = 1;
        // Check all input validation
        $($id + " input").each(function(){
            if (!$(this).val()) {
                $(this).css('border-color', 'red');
                $(this).parent().parent().find("i.alert").removeClass("alert-hide");
                $approved = 0;
            } else {
                $(this).parent().parent().find("i.alert").addClass("alert-hide");
            }
        });
        if ($approved !== 1) return false;
    },
    'onTabClick': function(tab, navigation, index) {
        // select id of current tab content
        var $id = tab.find("a").attr("href");
        var $approved = 1;
        // Check all input validation
        $($id + " input").each(function(){
            if (!$(this).val()) {
                $(this).css('border-color', 'red');
                $(this).parent().parent().find("i.alert").removeClass("alert-hide");
                $approved = 0;
            } else {
                $(this).parent().parent().find("i.alert").addClass("alert-hide");
            }
        });
        if ($approved !== 1) return false;
        // Add class visited to style css
        if (tab.attr("class")=="visited"){
            tab.removeClass("visited");
        } else {
            tab.addClass("visited");
        }
    },
    'tabClass': 'bwizard-steps-o','nextSelector': '.button-next', 'previousSelector': '.button-previous'
});

});