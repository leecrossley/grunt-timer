var duration = require("duration"),
    colour = require("bash-color");

exports = module.exports = (function () {
    var timer = {}, grunt, hooker, last, task, total = 0;

    var logCurrent = function () {
        var dur = new duration(last).milliseconds;
        if (dur > 2) {
            grunt.log.writeln(colour.purple("Task '" + task + "' took " + dur + "ms"));
            addToTotal(dur);
        }
    };

    var logTotal = function () {
        grunt.log.writeln(colour.purple("All tasks took " + total + "ms", true));
    };

    var addToTotal = function (ms) {
        total = total + ms;
    };

    timer.init = function (_grunt) {
        grunt = _grunt;
        hooker = grunt.util.hooker;
        last = new Date();
        total = 0;

        hooker.hook(grunt.log, "header", function () {
            if (!task) {
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
            logTotal();
            hooker.unhook(grunt.log, "header");
        });
    };

    return timer;
})();