$(document).ready(function () {
    var hours = 0, minutes = 0, second = 0, t;
    var timeOn = false;
    var i = localStorage.length;

    $(document).on('click', '#remove', function () {
        var curRow = ($(this).parents('tr').index()); //Get current row number
        $(this).parents('tr').remove(); //Delete the row visually
        localStorage.removeItem(localStorage.key(curRow)); //Remove the data from the data storage
    });
    $(document).keypress(function(e) {
        if(e.which == 13 ) {

            $('#icon').trigger('click');

        }
    });
    $(document).on('click', '#clear', function () {
        $('#clientName').val('');
        $('#contactName').val('');
        $('#startTime').val('');
        $('#endTime').val('');
        $('#totalTime').val('');
        $('#desc').val('');
        timeOn = false;
        hours = 0, minutes = 0, second = 0, t;

    });

    $(document).on('click', '#clearAll', function () {
        $('#clientName').val('');
        $('#contactName').val('');
        $('#startTime').val('');
        $('#endTime').val('');
        $('#totalTime').val('');
        $('#desc').val('');
       localStorage.clear();
        $("#timeTable tbody tr").remove();
        timeOn = false;
        hours = 0, minutes = 0, second = 0, t;
    });
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
        $('[rel=tooltip]').tooltip({container: 'body'});
    }) //Opt-in Icon tool tip

    for (var min = 1; min < i + 1; min++) { //For the min of 1, loop through the localStorage
        try {
            var key = localStorage.key(min - 1); //Retrieve the key starting at index[0]
            var ret = localStorage.getItem(key);
        }
        catch (err) {
            alert("Error retrieving time data"); //Halt and catch fire
        }
        JSON.stringify(ret || {});  // Encode as a string
        var data = JSON.parse(ret);

        $("#timeTable").find('tbody')
            .append($('<tr>', {id: "row" + min})
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
                    .text(data.desc))
                .append($('<td>')
                    .append($("<button>", { type: "button", class: "btn btn-danger", id: "remove"})
                        .text('x')))
            //Import the data to table
        );

    }

    //Stopwatch function
    $('#icon').click(function () {

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
            $(this).text('Start');
            $('#endTime').val(time);
            clearTimeout(t);
            var totalTime = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00");
            $('#totalTime').val(totalTime);
            console.log('timespent = ' + totalTime);
        }
        else {
            $(this).text('Stop');
            $('#startTime').val(time);
            second = seconds;
            count();
          //Coming back and trying to this made me understand I need to clarify.  If timeOn equals true start the timer.  Which happens at the else statement.

        }

    });
    //End all time functions

    $('#total').unbind('click').click(function () {

        $('#icon').focus();
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
                    .text($('#desc').val()))
                .append($('<td>')
                    .append($("<button>", { type: "button", class: "btn btn-danger", id: "remove"})
                        .text('X')))
        );

        var data =
        {
            clientname: $('#clientName').val(),
            contactname: $('#contactName').val(),
            starttime: $('#startTime').val(),
            endtime: $('#endTime').val(),
            totaltime: $('#totalTime').val(),
            desc: $('#desc').val(),
            entry: i //Place keeper for current entries (prevents overwriting)
        };
        i++;
        localStorage["timeentry" + i] = JSON.stringify(data);
        $('#clientName').val('');
        $('#contactName').val('');
        $('#startTime').val('');
        $('#endTime').val('');
        $('#totalTime').val('');
        $('#desc').val('');

        hours, second, minutes = 0;

    });


});
