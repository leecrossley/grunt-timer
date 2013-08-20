exports = module.exports = (function () {
    var timer = {}, grunt, hooker, start, last, task;

    var gruntLog = function (text, head) {
        if (head) {
            grunt.log.header(head);
        }
        grunt.log.writeln(text);
    };

    timer.init = function (_grunt) {
        grunt = _grunt;
        hooker = _grunt.util.hooker;
        start = new Date();
        last = start;

        var logCurrent = function () {
            gruntLog(task + " " + new Date() - last, task + " timer");
        };

        hooker.hook(grunt.log, "timer", function () {
            if (!task || task === grunt.task.current.nameArgs) {
                return;
            }
            logCurrent();
            task = grunt.task.current.nameArgs;
            last = new Date();
        });

        process.on("exit", function () {
            hooker.unhook(grunt.log, "timer");
            // catch the last task
            logCurrent();
        });
    };

    return timer;
})();