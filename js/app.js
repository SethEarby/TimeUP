
$(document).ready(function () {
    var hours = 0, minutes = 0, second = 0, t;
    var timeOn = false;
    var i = localStorage.length;

    $(document).on('click', '#remove', function()
    {
        var cur = ($(this).parents('tr').index()+ 1);
        $(this).parents('tr').remove();
       // localStorage.removeItem('timeentry'+cur);
        console.log(cur);
    });




    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
        $('[rel=tooltip]').tooltip({container: 'body'});
    }) //Bootstrap Data on

    for (var min = 1; min < localStorage.length + 1; min++) {
          try {
            var ret = localStorage.getItem('timeentry' + min);
        }
        catch (err) {
            alert("Error retrieving time entry.");
        }
        JSON.stringify(ret || {});
        var data = JSON.parse(ret);

        $("#timeTable").find('tbody')
            .append($('<tr>', {id:"row"+min})
                .append($('<td>')
                    .text(data.clientname))
                .append($('<td>')
                    .text(data.contactname))
                .append($('<td>')
                    .text(data.starttime))
                .append($('<td>')
                    .text(data.endtime))
                .append($('<td>')
                    .text(data.totaltime))
                .append($('<td>')
                .append($("<button>", { type: "button", class: "btn btn-danger", id:"remove"})
                    .text('x')))

        );

    }

    $('#icon').click(function () {
        console.log('click');
        function stopWatch() {
            second++;
            if (second >= 60) {
                second = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }

            count();
        }

        //End stopwatch function

        function count() {
            t = setTimeout(stopWatch, 1000); //Iterate the stopWatch function every second (realtime);

        }

        //End count function

        if (timeOn != true)
            timeOn = true;
        else
            timeOn = false;
        //If clicked, set timeOn to true.  If clicked when checked, set it to false.

        var date = new Date,
            day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            seconds = date.getSeconds(),
            ampm = hour > 12 ? "PM" : "AM";

        hour = hour % 12;
        hour = hour ? hour : 12; // zero = 12

        minute = minute > 9 ? minute : "0" + minute;
        seconds = seconds > 9 ? seconds : "0" + seconds;
        hour = hour > 9 ? hour : "0" + hour;
        var time = hour + ":" + minute + " " + ampm;
        //Visual time display

        if (timeOn === false) {
            $('#endTime').val(time);
            clearTimeout(t);
        }
        else {
            $('#startTime').val(time);
            second = seconds;
            count();
        }
    });
    //End all time functions

    $('#total').unbind('click').click(function () {
        var totalTime = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00");
        $('#totalTime').val(totalTime);

        $("#timeTable").find('tbody')
            .append($('<tr>')
                .append($('<td>')
                    .text($('#clientName').val()))
                .append($('<td>')
                    .text($('#contactName').val()))
                .append($('<td>')
                    .text($('#startTime').val()))
                .append($('<td>')
                    .text($('#endTime').val()))
                .append($('<td>')
                    .text($('#totalTime').val()))
                .append($('<td>')
                    .append($("<button>", { type: "button", class: "btn btn-danger", id:"remove"})
                        .text('x')))

        );

        var data =
        {
            clientname: $('#clientName').val(),
            contactname: $('#contactName').val(),
            starttime: $('#startTime').val(),
            endtime: $('#endTime').val(),
            totaltime: $('#totalTime').val(),
            entry: i //Place keeper for current entries (prevents overwriting)
        };
        i++;
        localStorage["timeentry" + i] = JSON.stringify(data);

        console.log('i update ='+i);
        $('#clientName').val('')
        $('#contactName').val('')
        $('#startTime').val('')
        $('#endTime').val('')
        $('#totalTime').val('')

        hours, second, minutes = 0;

    });

    //icon.Click

//    window.onbeforeunload = function (event) {
//        var message = "Your data will not be saved if you close now.  Are you sure?";
//        if (typeof event == 'undefined') {
//            event = window.event;
//        }
//        if (event) {
//            event.returnValue = message;
//        }
//        return message;
//    }
});
