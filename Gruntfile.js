var timer = require("./grunt-timer.js");
module.exports = function (grunt) {
    timer.init(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            all: [
                "*.js",
                "!grunt-timer.min.js"
            ]
        },
        watch: {
            files: [
                "*.js",
                "!grunt-timer.min.js"
            ],
            tasks: ["min"]
        },
        uglify: {
            my_target: {
                files: {
                    "grunt-timer.min.js": [
                        "grunt-timer.js"
                    ]
                }
            },
            options: {
                banner: "/*!\n    " +
                        "<%= pkg.name %> (v<%= pkg.version %>) <%= grunt.template.today('dd-mm-yyyy') %>\n    " +
                        "(c) <%= pkg.author %>\n" +
                        "*/\n"
            }
        }
    });
    grunt.task.registerTask("run", "runs a task that lasts the designated number of ms", function (ms) {
        var done = this.async();
        setTimeout(function() {
            grunt.log.writeln( ms + "ms task ran");
            done();
        }, parseInt(ms, 10));
    });
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.registerTask("min", ["jshint", "uglify"]);
    grunt.registerTask("test", ["run:100", "run:500", "run:1000"]);
};