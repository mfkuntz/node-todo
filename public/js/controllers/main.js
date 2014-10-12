angular.module('todoController', [])

	.controller('mainController', function($scope, $http, Todos){

		$scope.formData = {};

		//when landing, show all todos
		Todos.get()
			.success(function(data){
				$scope.todos = data;
			})
			.error(function(data){
		});

		//Add
		$scope.createTodo = function(){
			
			//Validate form contains data
			if (!$.isEmptyObject($scope.formData)){
				
				Todos.create($scope.formData)
					.success(function(data){
						$scope.formData = {}; //clear form entry
						$scope.todos = data;
					})
					.error(function(data){
						console.log('ERROR: ' + data);
					});
			}

		};

		//delete
		$scope.deleteTodo = function(id){
			Todos.delete(id)
				.success(function(data){
					$scope.todos = data;
				})
				.error(function(data){
					console.log('ERROR: ' + data);
			});
		};

	});
