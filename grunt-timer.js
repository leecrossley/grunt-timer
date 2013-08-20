exports = module.exports = (function () {
    var timer = {}, grunt, hooker, start, last, task;

    var gruntLog = function (text) {
        grunt.log.writeln(text);
    };

    timer.init = function (_grunt) {
        grunt = _grunt;
        hooker = grunt.util.hooker;
        start = new Date();
        last = start;

        var logCurrent = function () {
            gruntLog("Task '" + task + "' took ");
        };
        
        var isParentMultiTask = function (task1, task2) {
            if (task1.indexOf(":") > 0) {
                return false;
            }
            if (task2.indexOf(":") > 0 && task2.indexOf(task1) === 0) {
                return true;
            }
            return false;
        };

        hooker.hook(grunt.log, "header", function () {
            if (!task) {
                task = grunt.task.current.nameArgs;
            }
            if (task === grunt.task.current.nameArgs) {
                return;
            }
            if (!isParentMultiTask(task, grunt.task.current.nameArgs)) {
                logCurrent();
            }
            task = grunt.task.current.nameArgs;
            last = new Date();
        });

        process.on("exit", function () {
            grunt.log.writeln("b");
            logCurrent();
            hooker.unhook(grunt.log, "header");
        });
    };

    return timer;
})();