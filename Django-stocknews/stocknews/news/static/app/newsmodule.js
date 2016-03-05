'use strict';

/* App Module */
var app = angular.module("newsApp", ['ngRoute','ngCookies',"checklist-model"]);

app.config(function($interpolateProvider) {
 $interpolateProvider.startSymbol('{[{');
 $interpolateProvider.endSymbol('}]}');
});

app.run([
 '$http',
 '$cookies',
 function($http, $cookies) {
  $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
 }
]);


app.config(function($routeProvider) {
 $routeProvider.when("/", {
  templateUrl: "static/views/main.html/",
  controller: "mainpagecontrol",
 });
 $routeProvider.when('/tags/', {
  templateUrl: 'static/views/tags.html/',
  controller: 'tagscontrol'
 });
 $routeProvider.when('/task/:id', {
  templateUrl: 'static/views/task.html/',
  controller: 'taskcontrol'
 })

 $routeProvider.when('/tag/:id', {
  templateUrl: 'static/views/tag.html/',
  controller: 'tagviewcontrol'
 })


});