var user = angular.module('adminModule',['xeditable','ngFileUpload']);
//,'ngFileUpload'

user.controller('adminController',['$scope','$http','$sce','$filter', 'Upload', function($scope,$http,$sce,$filter, Upload){
	$scope.isData = false;

	$scope.getalerts = function(){
		$scope.isData = false;
		$http({
			method : "GET",
			url : '/alert/all'
		}).success(function(res){
			if (res.status === 200) {
				console.log("success on getalerts" + res.data);
				$scope.alerts = res.data;
				if(res.data){
					$scope.isData = true;
				}
			}
		});
	}

	//add alert
	$scope.addAlert = function(){
		console.log("addAlert ::");
		$http({
			method : "POST",
			url : "/alert/create",
			data: {
				beacon: $scope.beacon,
				name: $scope.name,
				status: $scope.status,
				alert_type: $scope.alert_type
			}
		}).success(function(res) {
			
			if(res.status == 200) {
				console.log("success on add alert :" + res.data);
				$scope.getalerts();	
				//$scope.dismiss();
			}
		});
	};

	$scope.saveAlert = function(data, id) {
	//$scope.user not updated yet
		angular.extend(data, {id: id});
		console.log("saveAlert data::");
		console.log(data);
		$http({
			method : "POST",
			url : '/alert/edit',
			data: {
				alert_id: id,
				beacon: data.beacon,
				name: data.name,
				status: data.status,
				alert_type: data.alert_type
			}
		}).success(function(res){
			
			if (res.status === 200) {
				$scope.getalerts();			
				console.log("success on save alert" + res.data);
				$scope.alertformValidate = false;
				
				return;
				//$scope.alerts = res.data;
				//return $http.post('/saveUser', data);
			}
		});
	};

	// remove alert
	$scope.removeAlert = function(id) {
		//$scope.alerts.splice(index, 1);
		console.log("removeAlert ::");
		console.log(id);
		$http({
			method : "DELETE",
			url : '/alert/delete',
			params: {
				alert_id : id
			}
		}).success(function(res){

			if (res.status === 200) {	
				console.log("success on remove alert" + res.data);
				$scope.getalerts();
				return;
				//$scope.alerts = res.data;
			}
		});
	};


	$scope.beacons = [
	    {value: 1, text: 'Beacon 1'},
	    {value: 2, text: 'Beacon 2'},
	    {value: 3, text: 'Beacon 3'},
	    {value: 4, text: 'Beacon 4'},
	    {value: 5, text: 'Beacon 5'},
	    {value: 6, text: 'Beacon 6'}
  	]

  	$scope.alert_types = [
  		{value: 2, text: 'Bio Hazard'},
  		{value: 3, text: 'Danger of Infection'},
  		{value: 4, text: 'Caution Quarantine Area'},
  		{value: 5, text: 'Restrcited Area'}
  	]

  	$scope.getBeacons = function(){
  		$http({
  			method: "GET",
  			url: "/beacon/all"
  		}).success(function(res){
  			$scope.becs = res.data;
  			$scope.beacons = [];
  			console.log(res.data);
  			for(var i in res.data){
				$scope.beacons[i] = { value : Number(res.data[i].b_id), text: res.data[i].name }
			}
  			console.log($scope.beacons);
  		});
  	};

  	$scope.showAlertType = function(alert) {
	    var selected = [];
	    //console.log("temp ::"+temp);
    	if(alert){
    		console.log(JSON.stringify(alert.image).charAt(12));
	    	selected = $filter('filter')($scope.alert_types, {value: alert.alert_type });
    	}
	    //console.log(selected);
	    //console.log(selected);
	    return selected.length ? selected[0].text : 'Not set';
  	};


  	$scope.showBeacon = function(beacon){
  		var selected = [];
	    //console.log("temp ::"+temp);
	    //console.log("beacon : "+beacon);
	    if(beacon) {
	      selected = $filter('filter')($scope.beacons, {value: beacon});
	    }
	    return selected.length ? selected[0].text : 'Not set';
  	}
	//editableOptions.theme = 'bs3';


}]);
