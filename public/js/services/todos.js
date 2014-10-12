angular.module('todoService', [])

	.factory('Todos', function($http){

		return{

			get : function(){
				return $http.get('/api/todos');
			},
			create : function(data){
				return $http.post('/api/todos', data);
			},
			delete : function(id){
				return $http.delete('api/todos/' + id);
			}
		}
	});