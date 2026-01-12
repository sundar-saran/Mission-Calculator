
var i = "";
var m = "";
$(document).ready(function () {
    //BindTooltip("#");
   
    //$("#txtAreashowshow").attr('readonly', true);
    var k = '@' + $("#hidvalue").val();
   // alert(k);
    $("#btnOk").hide();
    var g = k.split('@');
    //m = k.split('@').join(' ');
    m = k;
    $("#hiddata").val(m);
    //alert($("#hiddata").val());
    var expression = "";
    for (j = 0; j < g.length; j++) {
        if (g[j].indexOf("ID") >= 0) {
            var index = g[j].substring(2, g[j].length);
            if (expression == "")
                expression = $("#ddlHead option[value='" + index + "']").text();
            else
                expression = expression + " " + $("#ddlHead option[value='" + index + "']").text();
        }
        else {
            if (expression == "")
                expression = g[j];
            else
                expression = expression + " " + g[j];
        }
    }
    var t
    t = new String();
    t = expression;
    t = t.split("End").join("\n End");
    t = t.split("Case").join(" Case");
    t = t.split("Then").join("\n Then");
    t = t.split("When").join("\n When");
    t = t.split("Else").join("\n Else");
    t = t.split("AND").join(" AND");
    t = t.split("OR").join(" OR");
    t = t.split("<").join(" <");
    var r1 = t;
    //r1 = unescape(escape(r1));
    r1=$('<div/>').html(r1).text();
    $("#txtAreashowshow").val(r1);
    var text = $('#txtAreashowshow').text();
    var number = parseInt(text, 10);
    $("#ddlHead").val(0);
    //        alert(number);
    $(".Formula_button").click(function () {

        $("#btnSave").hide();
        $("#btnOk").hide();
        i = "";
        //m = "";
        i = $("#txtAreashowshow").val();
        i = i + " " + $(this).val();
        i = i.split("<").join("<");
        if ($(this).val() == "End" || $(this).val() == "Case" || $(this).val() == "Then" || $(this).val() == "When" || $(this).val() == "Else") {

            i = i.split("End").join("\n End");
            i = i.split("Case").join("Case");
            i = i.split("Then").join("\n Then");
            i = i.split("When").join("\n When");
            i = i.split("Else").join("\n Else");
        }
        i = i.split("AND").join("AND");
        i = i.split("OR").join("OR");

        m = m + " " + $(this).val();
        m = m.split(' ').join('@');
        i = $("<div />").html(i).text();
        $("#txtAreashowshow").val(i);
        $("#ddlHead").val(0);
    });

    $("#btnUndo").click(function () {
        $("#btnSave").hide();
        $("#btnOk").hide();
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
            if (k[j].indexOf("ID") >= 0) {
                var index = k[j].substring(2, k[j].length);
                if (expression == "")
                    expression = $("#ddlHead option[value='" + index + "']").text();
                else
                    expression = expression + " " + $("#ddlHead option[value='" + index + "']").text();
            }
            else {
                if (expression == "")
                    expression = k[j];
                else
                    expression = expression + " " + k[j];
            }
        }
        var t
        t = new String();
        t = expression;
        t = t.split("End").join("\n End");
        t = t.split("Case").join(" Case");
        t = t.split("Then").join("\n Then");
        t = t.split("When").join("\n When");
        t = t.split("Else").join("\n Else");
        t = t.split("AND").join(" AND");
        t = t.split("OR").join(" OR");
        t = t.split("<").join("<");
        expression = t;
        expression = $("<div />").html(expression).text();
        $("#txtAreashowshow").val(expression);
        $("#ddlHead").val(0);
        $("#btnSave").hide();
        $("#btnOk").hide();
        //i = $("#txtAreashowshow").val();
    });
    $("#btnClear").click(function () {
        $("#txtAreashowshow").val("");
        i = $("#txtAreashowshow").val();
        //m = $("#hiddata").val();
        m = "";
        $("#ddlHead").val(0);
        $("#btnSave").hide();
        $("#btnOk").hide();
    });
    $("#ddlHead").change(function () {
        i = $("#txtAreashowshow").val();
        if ($("#ddlHead option:selected").val() == 0) {
            alert("Please select salary head");
            return false;
        }
        i = i + " " + $("#ddlHead option:selected").text();
        i = $("<div />").html(i).text();
        $("#txtAreashowshow").val(i)
        m = m + " " + "ID" + $("#ddlHead option:selected").val();
        m = m.split(' ').join('@');
        $("#txtAreashowshow").val()
        $("#ddlHead").val(0);
        $("#btnSave").hide();
        $("#btnOk").hide();
    });
    $("#btnTest").click(function () {
        m = $("<div />").html(m).text();
        $.getJSON(urlPrefix +"/HRM/SalaryHeadNew/TestFormula", { Query: m }, function (data) {

            if (data == true) {

                if (m != null && m != "") {
                    var x = m;
                    var s1 = x.split('@').join(' ');
                    var s2 = ltrim(s1);
                    var s3 = rtrim(s2);
                    var y = s3.split(' ').join('@');
                    $("#hidvalue").val(y);
                    if (i != null) {
                        var cnti = $("<div />").html(i).text();
                        $("#hidtext").val(cnti);
                    }
                }
                else {
                    var x = m + $("#txtAreashowshow").val();
                    var s1 = x.split('@').join(' ');
                    var s2 = ltrim(s1);
                    var s3 = rtrim(s2);
                    var y = s3.split(' ').join('@');
                    $("#hidvalue").val(y);
                    if (i !=null)
                    {
                        var cnti = $("<div />").html(i).text();
                        $("#hidtext").val(cnti);
                    }
                }
                $("#btnSave").show();
                $("#btnOk").show();
                alert("Formula Tested Successfully !");
            }

            else {
                alert("Wrong Formula, Please Try Again !");
                $("#btnSave").hide();
                $("#btnOk").hide();
            }
        });
    });
    $("#txtConstant").keypress(function (e) {
        var c = e.which;
        if (c == 13) {
            return false;
        }
    });
    $("#txtConstant").change(function () {       
        i = $("#txtAreashowshow").val();
        //m = $("#txtAreashowshow").val();
        a1 = $("#txtConstant").val();
        i = i + " " + a1;
        m = m + " " + a1;
        m = m.split(' ').join('@');
        i = $("<div />").html(i).text();
        $("#txtAreashowshow").val(i);
        $("#hiddata").val(m)
        $("#txtConstant").val('');
        $("#btnSave").hide();
        $("#btnOk").hide();

    });
    $("#btnSave").click(function () {
        if (!isBlank("txtExpName", "Formula Name")) {
            return false;
        }
        if (!isSelected("ddlApplicableto", "Head Type")) {

            return false;
        }

        if (!isBlank("txtEffectiveFrom", "Effective Date")) {
            return false;
        }

        if (m != null && m != "") {
            var x = m;
            var s1 = x.split('@').join(' ');
            var s2 = ltrim(s1);
            var s3 = rtrim(s2);
            var y = s3.split(' ').join('@');
            $("#textArea").val(y);
        }
        else {
            var x = m + $("#txtAreashowshow").val();
            var s1 = x.split('@').join(' ');
            var s2 = ltrim(s1);
            var s3 = rtrim(s2);
            var y = s3.split(' ').join('@');
            $("#textArea").val(y);
        }

    });

});
  

