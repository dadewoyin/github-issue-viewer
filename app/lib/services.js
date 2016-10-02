var app = angular.module('services', []);

app.factory('getIssueInfo', function($location, $http) {

		var githubAPI = {};
//		$scope.issueInfo = [];

		// Retrieve info from user with issue 
		// number = issue number
		githubAPI.getIssue = function() {
			var href = $location.absUrl();
			var number = href.substr(href.lastIndexOf('/') + 1);
			issues_url = "https://api.github.com/repos/rails/rails/issues/" + number;
			return $http({
				method: 'GET',
				url: issues_url,
			});
		};

		// Retrieve info from users that commented on issue
		githubAPI.getComments = function() {	
			var comments_url = issues_url + "/comments";
			return $http({
				method: 'GET',
				url: comments_url,
			});
		};

		return githubAPI;
	
});
		// Truncate summary to 140 characters
app.service('truncate', function() {
	this.truncate = function(myString) {     
        var maxLength = 140; // maximum number of characters to extract
        var trimmedString = myString.substr(0, maxLength);

        // Re-trim if trimmedString is trimmed in middle of word
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));          myString = trimmedString + "...";
        return myString;
    };
});

		// Filter for truncating summary
app.filter('formatSummary',['truncate', function(truncate) {
    return function(myString) {
        return truncate.truncate(myString);
    };
}]);

		// Retrieve username in summary
app.service('linkUser', function() {
	this.linkUser = function(summary) {
		var link = '$1<a href="https://github.com/$2"> @$2 </a>';
  		return summary.replace(/(^|\s|>)@([a-zA-Z_-]{2,})/g, link);
	};
});
		// Filter for linking user
app.filter('linkGithubAccount', ['linkUser', function(linkUser) {
	return function(summary) {
		return linkUser.linkUser(summary);
	};
}]);
		// Markdown Filter
app.filter('markdown', function ($sce) {
    var converter = new Showdown.converter();
    return function (value) {
		var html = converter.makeHtml(value || '');
        return $sce.trustAsHtml(html);
    }; 
});