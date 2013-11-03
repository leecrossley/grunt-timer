# grunt-timer [![Dependency Status](https://david-dm.org/leecrossley/grunt-timer.png)](https://david-dm.org/leecrossley/grunt-timer) [![devDependency Status](https://david-dm.org/leecrossley/grunt-timer/dev-status.png)](https://david-dm.org/leecrossley/grunt-timer#info=devDependencies)

**grunt-timer.js times the duration of each of your grunt tasks automatically and outputs the execution time in milliseconds to the console after each task.**

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

## Notes

- The last task duration is output after the "Done, without errors". This is due to the way the hooking for the task name change works.