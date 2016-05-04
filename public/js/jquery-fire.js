$(document).ready(function(e){

	$('.reg-form').submit(function(e){
		e.preventDefault();
		
		var data = $('.reg-form').serializeArray();
		// console.log(data);
		$.ajax({
			method: 'POST',
			url: '/boarding/reg',
			data: data,
			dataType: 'JSON',
			success: function(res){
				console.log(res);
				if(res == 'yes'){
					alertline('alert-notify-success','<b>Boarding pass has been created.</b>');
					setTimeout(function(){
						window.location.assign('/boarding/pass');
					}, 4000);
				}else{
					alertline('alert-notify-danger','<b>Something went wrong</b>');
				}
			}
		})
	});
});

function removePass(n){
	data = {'b_id': n};
	$.ajax({
		method: 'POST',
		url: '/boarding/remove',
		data: data,
		dataType: 'JSON',
		success: function(res){
			window.location.assign('/boarding/remove');
		}
	})
}



//ALERT LINE
function alertline(mood,message){
	//$('.alert-top-notify').slideUp(0);
	$('.alert-top-notify').removeClass('alert-notify-success alert-notify-info alert-notify-warning alert-notify-danger');
	$('.alert-top-notify').addClass(mood);
	// console.log(message);
	var messageshow = "<center><span>"+message+"</span></center>";
	// $(messageshow).appendTo('.alert-top-notify');
	$('.alert-top-notify').html(messageshow);
	// $('.alert-top-notify').show('slide',{ direction : "up"});
//	console.log($('.alert-top-notify').is(':visible'));
	if($('.alert-top-notify').is(':visible')){

	}else{
		$('.alert-top-notify').slideDown();
	}
	// hidealert();
	setTimeout(function(){$('.alert-top-notify').slideUp();},5000);

	function hidealert(){
		// setTimeout(function(){$('.alert-top-notify').slideUp();},5000);
	}
}