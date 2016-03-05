app.controller("classcontrol", function($scope, $http) {
    $scope.$parent.active = ""
        //var p=$cookieStore.get("tab")
});
app.controller("tagviewcontrol", function($scope, $http, $routeParams) {
    $scope.$parent.active = "tags"
    $scope.get_tag_details = function(id) {
        $http.get('/get-tag-details/' + id).success(function(data) {
            $scope.tag = data.tag;
        });
    }
    $scope.get_tag_details($routeParams.id)
    $scope.edit_tag = function(action) {
      if (action == "delete") {var confirmed = confirm("Are you sure?");
        if (!confirmed) {return false};
      };
      
        $http({
            ignoreLoadingBar: true,
            method: 'POST',
            url: '/update-or-delete-tag/',
            data: {
                "tagdetails": $scope.tag,
                "action": action
            }, // pass in data as strings
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } // set the headers so angular passing info as form data (not request payload)
        }).success(function(data) {
            $scope.status = data
            window.location = ("/#/tags")
        })
    }
})
app.controller("tagscontrol", function($scope, $http, $routeParams) {
    $scope.$parent.active = "tags"

    $scope.get_tags = function() {
        $http.get('/get-tags/').success(function(data) {
            $scope.tags = data.tags;
        });
    };
    $scope.create_tags = function() {
        $http({
            ignoreLoadingBar: true,
            method: 'POST',
            url: '/create-tags/',
            data: {
                "tags": $scope.new_tags
            }, // pass in data as strings
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } // set the headers so angular passing info as form data (not request payload)
        }).success(function(data) {
            $scope.tags = data.tags
            $scope.new_tags = "";
        })
    }
    $scope.get_tags()
})
app.controller("taskcontrol", function($scope, $http, $routeParams, $filter) {
    $scope.temp_tags = []
    $scope.current_tags = []
    $scope.task = {
        "name": "",
        "description": "",
        "isCompleted": false,
        "dueDate": null,
    }
    $scope.get_tags = function() {
        $http.get('/get-tags/').success(function(data) {
            $scope.tags = data.tags;
        });
    };
    $scope.get_tags()

    $scope.remove_task = function(id) {

        var confirmed = confirm("Are you sure?");
        if (!confirmed) {return false};
        
        $http({
            ignoreLoadingBar: true,
            method: 'POST',
            url: '/remove-task/',
            data: {
                "id": id
            }, // pass in data as strings
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } // set the headers so angular passing info as form data (not request payload)
        }).success(function(data) {

          window.location = ("/")
  
        })
    }

    $scope.create_tags = function() {
        $http({
            ignoreLoadingBar: true,
            method: 'POST',
            url: '/create-tags/',
            data: {
                "tags": $scope.new_tags
            }, // pass in data as strings
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } // set the headers so angular passing info as form data (not request payload)
        }).success(function(data) {
            $scope.tags = data.tags
            $scope.new_tags = "";
        })
    }
    
    $scope.get_task_details = function(id) {
        $http.get('/get-task-details/' + id).success(function(data) {
            $scope.task = data.task;
            $scope.task.dueDate = $filter('date')($scope.task
                .dueDate, "yyyy-MM-dd")
            $scope.temp_tags = data.tags
            angular.copy($scope.temp_tags, $scope.current_tags);
        });
    }
    $scope.get_tags = function(id) {
        $http.get('/get_tags/').success(function(data) {
            $scope.tags = data.tags;
        });
    }
    $scope.check_status = function($event, tag_id) {
        if ($event.target.checked) {
            $scope.task.tags.push(tag_id)
        } else {
            var index = $scope.task.tags.indexOf(tag_id);
            $scope.task.tags.splice(index, 1);
        };
    }
    $scope.check_tag = function(tag_id) {
        var index = $scope.task.tags.indexOf(tag_id);
        if (index == -1) {
            return false
        } else {
            return true
        };
    };
    $scope.mode = $routeParams.id;
    if ($scope.mode != "new") {
        $scope.get_task_details($scope.mode)
    };
    $scope.save_task = function(id) {
        $http({
            ignoreLoadingBar: true,
            method: 'POST',
            url: '/create-or-update-task/',
            data: {
                "taskdetails": $scope.task,
                "currenttags": $scope.current_tags,
                "temptags": $scope.temp_tags
            }, // pass in data as strings
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } // set the headers so angular passing info as form data (not request payload)
        }).success(function(data) {
            $scope.status = data
            window.location = ("/")
        })
    }
})
app.controller("mainpagecontrol", function($scope, $http) {
    $scope.$parent.active = "tasks"
    $scope.gettasks = function(keyword) {
        $http.get('/get-tasks/?q=' + keyword).success(function(data) {
            $scope.tasks = data.tasks;
        });
    };

    $scope.gettasks('')
    
    $scope.remove_task = function(id) {
        var confirmed = confirm("Are you sure?");
        if (!confirmed) {return false};
        $http({
            ignoreLoadingBar: true,
            method: 'POST',
            url: '/remove-task/',
            data: {
                "id": id
            }, // pass in data as strings
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } // set the headers so angular passing info as form data (not request payload)
        }).success(function(data) {

          $scope.gettasks('')
  
        })
    }
    
    $scope.addtags = function() {
        $http({
            ignoreLoadingBar: true,
            method: 'POST',
            url: '/addtags/',
            data: {
                "tags": $scope.tags
            }, // pass in data as strings
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } // set the headers so angular passing info as form data (not request payload)
        }).success(function(data) {
            $scope.temp_redeemcodes = [];
            $scope.liscence_edit = false;
            $scope.redeemcodes = data.redeemcodes;
            $scope.not_added_list = data.not_added_list;
            $scope.code_alert = true;
        })
    }
    $scope.routeTo = function(id) {
            window.location = "#/tagedit/1"
        }
        //var p=$cookieStore.get("tab")
});