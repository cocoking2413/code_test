/**
 * Created by Administrator on 2016-10-21.
 */
var gulp= require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    obfuscate = require('gulp-obfuscate'),
    del = require('del');

gulp.task('help',function () {

    console.log('	gulp clean       清除文件');

    console.log('	gulp mincss      压缩css');

    console.log('	gulp minjs       压缩js');

    console.log('	gulp default     默认任务');

});

gulp.task('default', ['clean'], function() {
    gulp.start('mincss', 'minjs');
});

//压缩css
gulp.task('mincss', function() {
    return gulp.src('src/*.css')      //压缩的文件
        .pipe(gulp.dest('bin/css'))   //输出文件夹
        .pipe(minifycss());   //执行压缩
});
//压缩js
gulp.task('minjs', function() {
    return gulp.src('src/*.js')
        //.pipe(concat('main.js'))    //合并所有js到main.js
        //.pipe(gulp.dest('bin/js'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        //.pipe(obfuscate()) //混淆
        .pipe(gulp.dest('bin/js'));  //输出
});
//执行压缩前，先删除文件夹里的内容
gulp.task('clean', function(cb) {
    del(['bin/css', 'bin/js'], cb)
});