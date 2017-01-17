/**
 * Created by Raymond Phua on 17-1-2017.
 */
var gulp = require('gulp');
var sonar = require('gulp-sonar');

gulp.task('sonar', function () {
  var options = {
    sonar: {
      host: {
        url: 'http://repoj:9000/sonar'
      },
      jdbc: {
        url: 'jdbc:jtds:sqlserver://repoj/sonar',
        username: 'sa',
        password: 'Pa$$w0rd'
      },
      projectKey: 'sonar:kantilever-team2-web:1.0.0',
      projectName: 'Kantilever Web Team 2',
      projectVersion: '1.0.0',
      // comma-delimited string of source directories
      sources: 'src/app/',
      language: 'js',
      sourceEncoding: 'UTF-8',
      javascript: {
        lcov: {
          reportPath: 'test/sonar_report/lcov.info'
        }
      },
      exec: {
        // All these properties will be send to the child_process.exec method (see: https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback )
        // Increase the amount of data allowed on stdout or stderr (if this value is exceeded then the child process is killed, and the gulp-sonar will fail).
        maxBuffer : 1024*1024
      }
    }
  };

  // gulp source doesn't matter, all files are referenced in options object above
  return gulp.src('thisFileDoesNotExist.js', { read: false })
    .pipe(sonar(options))
    .on('error', util.log);
});
