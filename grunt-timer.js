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
        hooker = grunt.util.hooker;
        start = new Date();
        last = start;

        var logCurrent = function () {
            gruntLog(task + " " + new Date() - last, task + " timer");
        };

        hooker.hook(grunt.log, "header", function () {
            grunt.log.writeln("a");
            if (!task || task === grunt.task.current.nameArgs) {
                return;
            }
            task = grunt.task.current.nameArgs;
            logCurrent();
            last = new Date();
        });

        process.on("exit", function () {
            logCurrent();
            hooker.unhook(grunt.log, "header");
        });
    };

    return timer;
})();