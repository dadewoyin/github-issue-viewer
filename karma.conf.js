'use strict';

module.exports = function(config){
  config.set({

    reporters: ['progress', 'html'],

    basePath : './',

    files : [
	{ pattern:
      'app/bower_components/angular/angular.js', watched: true, included: true },
  { pattern:
      'app/bower_components/angular-route/angular-route.js', watched: true, included: true },
  { pattern: 'app/bower_components/angular-mocks/angular-mocks.js', watched: true, included: true },

  { pattern: 'app/components/**/*.js', watched: true, included: true },
      
    ],
	

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome',
		            'Firefox',
	             ],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-htmlfile-reporter',
              ],

    htmlReporter : {
      outputFile: 'test/unit.html',
    }

  });
};
