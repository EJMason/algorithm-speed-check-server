const gulp = require('gulp');
const gulpTs = require('gulp-typescript');
const gutil = require('gulp-util');
const runSequence = require('run-sequence');

const tsProject = gulpTs.createProject('tsconfig.json');

gulp.task('default', () => {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist'));
});

gulp.task('ansible', () => {
  gutil.log(gutil.colors.bgMagenta.black('Ready, Go Ansible!'));
  return run('ansible-playbook playbook.yml', { cwd: ANSIBLE_DIR }).exec();
});

gulp.task('typescript', () => {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist'));
});

gulp.task('deploy', done => {
  gutil.log(gutil.colors.bgBlue.black('-- GULP -- \n  Deploying to the magic cloud'));
  runSequence('typescript', 'ansible', done);
});
