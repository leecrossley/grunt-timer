var duration = require("duration"),
    color = require("bash-color"),
    hooker = require("hooker");

exports = module.exports = (function () {
    "use strict";
    var timer = {}, grunt, last, task,
        total = 0,
        deferLogs = false,
        totalOnly = false,
        friendlyTime = false,
        deferredMessages = [],
        options = {};

    var getDisplayTime = function (s) {
        if (!friendlyTime) {
            return s + "ms";
        }
        if (s < 1000) {
            return "<1 second";
        }

        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        return (hrs ? hrs + (hrs > 1 ? " hours " : " hour ") : "") +
            (mins ? mins + (mins > 1 ? " minutes " : " minute ") : "") +
            secs + (secs > 1 ? " seconds " : " second ");
    };

    var logCurrent = function () {
        var dur = new duration(last).milliseconds;
        if (dur > 2) {
            var logMsg = "Task '" + task + "' took " + getDisplayTime(dur);
            if(!totalOnly){
                if (deferLogs) {
                    deferredMessages.push(logMsg);
                } else {
                    grunt.log.writeln(color[options.color](logMsg));
                }
            }
            addToTotal(dur);
        }
    };

    var logTotal = function () {
        grunt.log.writeln(color[options.color]("All tasks took " + getDisplayTime(total), true));
    };

    var addToTotal = function (ms) {
        total = total + ms;
    };

    timer.init = function (_grunt, _options) {
        grunt = _grunt;
        total = 0;

        options = _options || {};

        deferLogs = !!options.deferLogs;
        friendlyTime = !!options.friendlyTime;
        totalOnly = !!options.totalOnly;

        options.color = options.color || "purple";

        hooker.hook(grunt.log, "header", function () {
            if (!task) {
                last = new Date();
                task = grunt.task.current.nameArgs;
            }
            if (task === grunt.task.current.nameArgs) {
                return;
            }
            logCurrent();
            task = grunt.task.current.nameArgs;
            last = new Date();
        });

        process.on("exit", function () {
            logCurrent();
            if (deferLogs) {
                for (var i = 0; i < deferredMessages.length; i++) {
                    var thisLog = deferredMessages[i];
                    grunt.log.writeln(color[options.color](thisLog));
                }
            }
            logTotal();
            hooker.unhook(grunt.log, "header");
        });
    };

    return timer;
})();