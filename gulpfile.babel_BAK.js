'use strict';
require("@babel/register")

// GUlp is a simple platform-agnostic toolkit that helps you automate painful
// and time-consuming tasks in your workflow
import gulp from 'gulp';
// browser-sync - Live CSS Reload & Browser Syncing
import browserSyncLib from 'browser-sync';
// minimist - argument parser without all the fanciful decoration
import minimist from 'minimist';
// gulp-load-plugins - Loads gulp plugins from package dependencies and attaches
// gulp-load-plugins - 패키지 종속성에서 gulp 플러그인을 로드하고 연결합니다.

// them to an object of your choice.
// 선택한 객체로 이동합니다.





import gulpLoadPlugins from 'gulp-load-plugins';

// Import package.json to grab and use the config property
import packageJsonData from './package.json';

import clean from './gulp-tasks/clean';
import watch from './gulp-tasks/watch';

import { printCompile, getBaseUrl } from './gulp/util/util.js';


const config = Object.assign({}, packageJsonData.config);
const args = minimist(process.argv.slice(2));
const dir = config.directory;

const taskTarget = args.production ? `${dir.production}-haha` : dir.development;

// Create a new browserSync instance
const browserSync = browserSyncLib.create();

// Load gulp plugins
const plugins = gulpLoadPlugins({
  // when set to true, the plugin will log info to console.
  // true로 설정하면 플러그인이 콘솔에 정보를 기록합니다.

  // Useful for bug reporting and issue debugging
  // 버그 보고 및 문제 디버깅에 유용합니다.
  DEBUG: false
});

// Read all files from the gulp folder and load all gulp tasks
// fs.readdirSync('./gulp')
//   .filter(fileName => /\.(js)$/i.test(fileName))
//   .map(fileName => fileName.split('.').reduce(a=>a)());
const baseUrl = getBaseUrl(args, config)
const taskOptionList = { gulp, config, args, taskTarget, plugins, browserSync, baseUrl };

clean(taskOptionList);
watch(taskOptionList);

gulp.task(
  'dev',
  gulp.series(
    'clean:development',
    'watch',
  )
);

// Default gulp task
gulp.task('default', () => {
  console.log('Default gulp task');
});