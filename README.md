# grunt-timer [![Dependency Status](https://david-dm.org/leecrossley/grunt-timer.png)](https://david-dm.org/leecrossley/grunt-timer) [![devDependency Status](https://david-dm.org/leecrossley/grunt-timer/dev-status.png)](https://david-dm.org/leecrossley/grunt-timer#info=devDependencies)

**grunt-timer.js times the duration of each of your grunt tasks automatically and outputs the execution time in milliseconds to the console after each task. It also logs the total time for all logged tasks at the end.**

## Getting started

### Install grunt-timer

```
npm install grunt-timer ## --save-dev
```

### Upgrade your Gruntfile.js

Add the grunt-timer reference to the very top of your Gruntfile.js:

```
var timer = require("grunt-timer");
```

Add the timer init call at the top of the module.exports function:

```
module.exports = function (grunt) {
    timer.init(grunt);
```
## Example output

```
Running "run:500" (run) task
500ms task ran
Task 'run:500' took 502ms
All tasks took 502ms
```

## Options

To use any option, pass an object parameter to your initialise function like so:

```
module.exports = function (grunt) {
    timer.init(grunt, { deferLogs: true, friendlyTime: true, color: "blue" });

```

### deferLogs

If you'd prefer to see a summary of all your task timings at the end of the grunt process, enable this option.

This is useful for the case where you have many grunt tasks, or they generate a lot of output while they are running,
and it might be tedious to scroll back through the console to find all the timing messages.

### deferLogsAndWriteInLine

Behaves like `deferLogs` but will also do the default inline logging.

This is useful if you want the summary (deferLogs) but a build could timeout, which would means there could be no grunt timer logs.

### friendlyTime

Enable this if you'd prefer to see the durations reported in a friendly hours/minutes/seconds format, instead of ms.

```
Task 'jshint:all' took 3 seconds
```

### totalOnly

Enable this if you'd prefer to only see the time all tasks took to complete.

This is useful for having many small, insignificant tasks that would generate considerable output even with deferLogs.

```
All tasks took 502ms
```

### color

If supplied, will override default purple for console output.

No color will be output if the grunt `--no-color` option is specified.

### ignoreAlias

Array of task aliases to ignore. e.g to stop grunt-timer running with the default task:

```
module.exports = function (grunt) {
    timer.init(grunt, { ignoreAlias: ["default"] });

```

## Notes

- The last task duration is output after the "Done, without errors". This is due to the way the hooking for the task name change works.

## License

[MIT License](http://ilee.mit-license.org)
