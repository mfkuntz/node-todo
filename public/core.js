var todo = angular.module('todo', []);

function mainController($scope, $http){

	$scope.formData = {};

	//when landing, show all todos
	$http.get('/api/todos')
		.success(function(data){
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data){
			console.log('ERROR: ' + data);
	});

	//Add
	$scope.createTodo = function(){
		$http.post('api/todos', $scope.formData)
			.success(function(data){
				$scope.formData = {}; //clear form entry
				$scope.todos = data;
				console.log(data);				
			})
			.error(function(data){
				console.log('ERROR: ' + data);
		});

	};

	//delete
	$scope.deleteTodo = function(id){
		$http.delete('/api/todos/' + id)
			.success(function(data){
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('ERROR: ' + data);
		});
	};
}