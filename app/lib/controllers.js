var app = angular.module('controllers', []);

    app.controller('defaultController', ['$scope', '$http', 
      function ($scope, $http) {

          $scope.nameFilter = null;
          $scope.userList = [];

          // Get repo name
          $scope.repo = "rails/rails";

          // Concatenate url from pages needed/repo name
          var urlBase = 'https://api.github.com/repos/' + $scope.repo + '/issues?page=';

          var url = 'https://api.github.com/repos/' + $scope.repo + '/issues?page=' + 1 + '&per_page=25';

          $http.get(url)
          .success(function (response) {

              // Get user list from API response
              $scope.userList = response;

              $scope.pageChanged = function(newPage) {
                  getResultsPage(newPage);
              };

              function getResultsPage(pageNumber) {
                  var urlBase = 'https://api.github.com/repos/rails/rails/issues?page=';
                  $scope.userList = [];
                      $http.get(urlBase + pageNumber + '&per_page=25')
                      .success(function(result) {
                          $scope.userList = result;
                      });
                  
              } 

          });

          // White text
          $scope.color = {
              "color" : "white",
          };

    }])
    .controller('viewController', function ($scope, $routeParams, getIssueInfo) {

        $scope.number = $routeParams.number;

        // Retrieve necessary data when user clicks an issue to see more info  
        $scope.issueInfo = [];
        $scope.commentInfo = [];
        $scope.label = [];
         
        
        // Retrieve info from user with issue 
        getIssueInfo.getIssue($scope.number).success(function(data){
            $scope.issueInfo = data;
            $scope.label = data.labels;
        });

        // Retrieve info from users that commented on issue
        getIssueInfo.getComments($scope.number).success(function(response){
            $scope.commentInfo = response;
        });

        // Convert summary to Github Marked
        $scope.color = {
            "color" : "white",
        };
    });                         