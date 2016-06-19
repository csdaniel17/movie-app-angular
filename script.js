var API_KEY = 'fec8b5ab27b292a68294261bb21b04a5';

var app = angular.module('my-app', ['ngRoute']);

//route configuration - what route goes to what pages
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'MainController',
      templateUrl: 'main.html'
    })
    .when('/:movieId', {
      controller: 'DetailsController',
      templateUrl: 'details.html'
    });
});

//main controller
app.controller('MainController', function($scope, $http) {
  $http.get('http://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY).success(function(movie) {
    $scope.movie = movie;
    console.log(movie);
  });

  var page = 2;
  $scope.getMoreMovies = function() {
    $http.get('http://api.themoviedb.org/3/movie/now_playing?api_key=' + API_KEY + '&page=' + page).success(function(movie) {
      $scope.movie = movie;
      if (page <= movie.total_pages) {
        page++;
      }
    });
  };

});

//details page controller
app.controller('DetailsController', function($scope, $http, $routeParams) {
  $scope.movieId = $routeParams.movieId;
  $http.get('http://api.themoviedb.org/3/movie/' + $routeParams.movieId + '?api_key=' + API_KEY).success(function(data) {
    $scope.data = data;
    console.log(data);
  });
});
