angular.module('todoModule',[]).controller( 'TodoController', function($scope){
	$scope.TodoInit = function(){
		if( $scope.loadTodoList() === null ){
			$scope.todos = [];
		}else{
			$scope.todos = $scope.loadTodoList();
		}
	};
	$scope.addTodo = function() {
		$scope.todos.push({
			text: $scope.todoText,
			done: false,
			time: new Date().getTime()
		});
		$scope.todoText = '';
		$scope.saveTodoList();
	};
	$scope.todoChange = function(){
		$scope.saveTodoList();
	};
	$scope.archive = function() {
		var tmpTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(tmpTodos, function(todo){
			if (!todo.done) $scope.todos.push(todo);
		});
		$scope.saveTodoList();
	};	
	$scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo){
			count+= todo.done ? 0 : 1;
		});
		return count;
	};	
	$scope.sortTodos = function(){
		$scope.todos.sort(function(a, b){
			if( a.done === b.done ) return ( a.time == b.time ) ? 0 : (a.time > b.time) ? 1 : -1;		
			return ( a.done === b.done ) ? 0 : a.done ? 1 : -1;
		});
	}
	$scope.saveTodoList = function(){
		$scope.sortTodos();
		localStorage.setItem('fancyTodoList', JSON.stringify($scope.todos));
	};
	$scope.loadTodoList = function(){
		return JSON.parse(localStorage.getItem('fancyTodoList'));
	}
});