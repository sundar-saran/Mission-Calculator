$(document).ready(function () {
    //BindTooltip("#");
    $("#txtAreashowshow").attr('readonly', true);
    $("#btnSave").hide();
    $("#btnOk").hide();
    var i = "";
    var m = "";
    var T = $("#ddlratehead").val();
    $("#ddlratehead").change(function () {
        T = $("#ddlratehead").val()
    });
    $(".Formula_button").click(function () {
        i = i + " " + $(this).val();
        m = m + " " + $(this).val();
        $("#btnSave").hide();
        $("#btnOk").hide();
        if ($(this).val() == "End" || $(this).val() == "Case" || $(this).val() == "Then" || $(this).val() == "When" || $(this).val() == "Else" || $(this).val() == "AND" || $(this).val() == "OR") {
            i = i.split("Case").join("Case \n");
            i = i.split("Then").join("Then");
            i = i.split("When").join("When \n");
            i = i.split("Else").join("Else \n")
            i = i.split("AND").join("AND")
            i = i.split("OR").join("OR")
        }
        m = m.split(' ').join('@');
        $("#txtAreashowshow").val(i);
        $("#hiddata").val(m);
    });
    $("#btnUndo").click(function () {
        var s = String();
        var s = m;
        if (s.lastIndexOf('@', s.length) > 0) {
            s = s.substring(0, s.lastIndexOf('@', s.length));
        }
        else {
            s = ""
        }
        m = s;
        k = m;
        k = k.split('@');
        var expression = "";
        for (j = 0; j < k.length; j++) {
            if (k[j].indexOf("ID") >= 0 || k[j].indexOf("RD") >= 0) {
                var index = k[j].substring(2, k[j].length);
                if (expression == "") {
                    $('#ddlHead option').each(function () {
                        if ($(this).val() == index) {
                            ddlvalue = $(this).text();
                        }
                    });
                    expression = ddlvalue;
                }
                else {
                    $('#ddlHead option').each(function () {
                        if ($(this).val() == index) {
                            ddlvalue = $(this).text();
                        }
                    });
                    expression = expression + " " + ddlvalue;
                }
            }
            else {
                if (expression == "")
                    expression = k[j];
                else
                    expression = expression + " " + k[j]
            }
        }

        // $("#txtAreashowshow").html(expression);
        $("#txtAreashowshow").val(expression);
        $("#ddlHead").val(0);
        $("#btnSave").hide();
        $("#btnOk").hide();
        i = expression;
        i = i.split("<").join("<");
        if (i == "End" || i == "Case" || i == "Then" || i == "When" || i == "Else") {
            i = i.split("End").join("End \n");
            i = i.split("Case").join("Case \n");
            i = i.split("Then").join("Then \n");
            i = i.split("When").join("When \n");
            i = i.split("Else").join("Else \n");
        }
        i = i.split("AND").join("AND");
        i = i.split("OR").join("OR");
        //        $("#txtAreashowshow").val(i);
        //        $("#ddlHead").val(0);
        //        $("#btnSave").hide();
    });

    $("#btnClear").click(function () {
        $("#btnSave").hide();
        $("#txtAreashowshow").val("");
        i = $("#txtAreashowshow").val();
        m = "";
        $("#ddlHead").val(0);
    });
    $("#ddlHead").change(function () {
        i = $("#txtAreashowshow").val();
        if ($("#ddlHead option:selected").val() == 0) {
            alert("Please select salary head");
            return false;
        }
        i = i + " " + $("#ddlHead option:selected").text();
        $("#txtAreashowshow").val(i)
        if (T == "ID") {
            m = m + " " + "ID" + $("#ddlHead option:selected").val();
        }
        else {
            m = m + " " + "RD" + $("#ddlHead option:selected").val();
        }
        m = m.split(' ').join('@');
        $("#txtAreashowshow").val()
        $("#ddlHead").val(0);
        $("#btnSave").hide();
        $("#btnOk").hide();
    });
    $("#btnTest").click(function () {
        $.getJSON(urlPrefix + "/HRM/HrmsFormulaMaster/TestFormula", { Query: m }, function (data) {
            if (data == true) {
                var val = $("#hidval").val();
                $("#btnSave").show();
                var val = $("#hidval").val();
                if (val != null || val != "") {
                    if (val == "F") {
                        $("#btnOk").show();
                    }
                    else {
                        $("#btnOk").hide();
                    }
                }


                var x = m.split('@').join(' ');
                s1 = ltrim(x);
                s2 = rtrim(s1);
                var y = s2.split(' ').join('@');
                $("#hidvalue").val(y);
                var cnti = $("<div />").html(i).text();
                $("#hidtext").val(cnti);
                alert("Formula Tested Successfully !");
            }
            else {
                alert("Wrong Formula, Please Try Again !");
                $("#btnSave").hide();
                $("#btnOk").hide();
            }
        });
    });
    $("#txtConstant").change(function () {
        a1 = $("#txtConstant").val();
        i = i + " " + a1;
        m = m + " " + a1;
        m = m.split(' ').join('@');
        $("#txtAreashowshow").val(i);
        $("#hiddata").val(m)
        $("#txtConstant").val('');
        $("#ddlHead").val(0);
        $("#btnSave").hide();
        $("#btnOk").hide();
    });

    $("#btnSave").click(function () {
        //if (!isBlank("txtExpName", "Formula Name")) {
        //    return false;
        //}
        //if (!isSelected("ddlApplicableto", "Head Type")) {

        //    return false;
        //}

        //if (!isBlank("txtEffectiveFrom", "Effective Date")) {
        //    return false;
        //}
        var x = m.split('@').join(' ');
        s1 = ltrim(x);
        s2 = rtrim(s1);
        var y = s2.split(' ').join('@');
        $("#textArea").val(y);
        
       
    });




});


//$(document).ready(function () {
//    //BindTooltip("#");
//    $("#txtAreashowshow").attr('readonly', true);
//    $("#btnSave").hide();
//    var i = ""
//    var m = ""
//    $(".Formula_button").click(function () {
//        i = i + " " + $(this).val();
//        m = m + " " + $(this).val();
//        $("#btnSave").hide();
//        //i = i.split("<").join("<");
//        if ($(this).val() == "End" || $(this).val() == "Case" || $(this).val() == "Then" || $(this).val() == "When" || $(this).val() == "Else" || $(this).val() == "AND" || $(this).val() == "OR") {
//            i = i.split("End").join("<b><font color=red>Else</font></b></br>")
//            i = i.split("Case").join("<b><font color=red>Case</font></b></br>");
//            i = i.split("Then").join("<b><font color=red>Then</font></b></br>&nbsp;&nbsp;");
//            i = i.split("When").join("<b><font color=red>When</font></b></br>");
//            i = i.split("Else").join("<b><font color=red>Else</font></b></br>&nbsp;&nbsp;")
//            i = i.split("AND").join("<b><Font color=red>AND</Font></b>")
//            i = i.split("OR").join("<b><Font color=red>OR</Font></b>")
//        }

//        m = m.split(' ').join('@');
//        $("#txtAreashowshow").html(i);
//        $("#hiddata").val(m);
//    });

//    $("#btnUndo").click(function () {
//        var s = String();
//        var s = m;
//        if (s.lastIndexOf('@', s.length) > 0) {
//            s = s.substring(0, s.lastIndexOf('@', s.length));
//        }
//        else {
//            s = ""
//        }
//        m = s;
//        k = m;
//        k = k.split('@');
//        var expression = "";
//        for (j = 0; j < k.length; j++) {
//            if (k[j].indexOf("ID") >= 0) {
//                var index = k[j].substring(2, k[j].length);
//                if (expression == "")
//                    expression = $("#ddlHead option").eq(index).text();
//                else
//                    expression = expression + $("#ddlHead option").eq(index).text();
//            }
//            else {
//                if (expression == "")
//                    expression = k[j];
//                else
//                    expression = expression + " " + k[j]
//            }
//        }
//        // $("#txtAreashowshow").html(expression);
//        i = expression;

//        var f = i.split(', ');
//        for (var d = 0; d < f.length; d++) {

//            if (f == "End" || f == "Case" || f == "Then" || f == "When" || f == "Else") {
//                f = f.split("End").join("<b><font color=red>End</font></b><br>");
//                f = f.split("Case").join("<b><font color=red>Case</font></b></br>");
//                f = f.split("Then").join("<b><font color=red>Then</font></b></br>&nbsp;&nbsp;");
//                f = f.split("When").join("<b><font color=red>When</font></b></br>");
//                f = f.split("Else").join("<b><font color=red>Else</font></b></br>&nbsp;&nbsp;");
//                f = i.split("AND").join("<b><Font color=red>AND</Font></b>");
//                f = f.split("OR").join("<b><Font color=red>OR</Font></b>");
//            }
//        }
//        f = f.split("AND").join("AND");
//        f = f.split("OR").join("OR");
//        var f1 = f;
//        m = f1;
//        i = f1;
//        $("#txtAreashowshow").html(i);
//        $("#ddlHead").val(0);
//        $("#btnSave").hide();
//    });

//    $("#btnClear").click(function () {
//        $("#btnSave").hide();
//        $("#txtAreashowshow").html("");
//        i = $("#txtAreashowshow").html();
//        m = "";
//        $("#ddlHead").val(0);
//    });
//    $("#ddlHead").change(function () {
//        i = $("#txtAreashowshow").html();
//        if ($("#ddlHead option:selected").val() == 0) {
//            alert("Please select salary head");
//            return false;
//        }
//        i = i + " " + $("#ddlHead option:selected").text();
//        $("#txtAreashowshow").val(i)
//        m = m + " " + "ID" + $("#ddlHead option:selected").val();
//        m = m.split(' ').join('@');
//        $("#txtAreashowshow").val()
//        $("#ddlHead").val(0);
//        $("#btnSave").hide();
//    });
//    $("#btnTest").click(function () {
//        $.getJSON("/SalaryHead/TestFormula", { Query: m }, function (data) {
//            if (data == true) {
//                alert("Formula Tested Successfully !");
//                $("#btnSave").show();
//            }
//            else {
//                alert("Wrong Formula, Please Try Again !");
//                $("#btnSave").hide();
//            }
//        });
//    });
//    $("#txtConstant").change(function () {
//        a1 = $("#txtConstant").val();
//        i = i + " " + a1;
//        m = m + " " + a1;
//        m = m.split(' ').join('@');
//        $("#txtAreashowshow").val(i);
//        $("#hiddata").val(m)
//        $("#txtConstant").val('');
//        $("#ddlHead").val(0);
//        $("#btnSave").hide();
//    });

//    $("#btnSave").click(function () {
//        if (!isBlank("txtExpName", "Formula Name")) {
//            return false;
//        }
//        if (!isSelected("ddlApplicableto", "Head Type")) {

//            return false;
//        }

//        if (!isBlank("txtEffectiveFrom", "Effective Date")) {
//            return false;
//        }

//        var x = m.split('@').join(' ');
//        s1 = ltrim(x);
//        s2 = rtrim(s1);
//        var y = s2.split(' ').join('@');
//        $("#textArea").val(y);
//    });

//});
  
