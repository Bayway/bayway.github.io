/*
Author: Massimiliano Fiori
URL: http://www.codingcage.com/
*/

const command = "&command=Authenticate"
const partnerName = "&partnerName=applicant"
const partnerPassword = "&partnerPassword=d7c3119c6cdab02d68d9"
const useExpensifyLogin = "&useExpensifyLogin=false"

$('document').ready(function()
{ 
     /* validation */
	 $("#login-form").validate({
      rules:
	  {
			partnerUserSecret: {
			required: true,
			},
			partnerUserID: {
            required: true,
            email: true
            },
	   },
       messages:
	   {
            partnerUserSecret:{
                      required: "please enter your password"
                     },
            partnerUserID: "please enter your email address",
       },
	   submitHandler: submitForm	
       });  
	   /* validation */
	   
	   /* login submit */
	   function submitForm()
	   {		
			var data = $("#login-form").serialize() + command + partnerName + partnerPassword + useExpensifyLogin;
				
			$.ajax({
				
			type : 'GET',
			url  : 'https://www.expensify.com/api',
			data : data,
			beforeSend: function()
			{	
				$("#error").fadeOut();
				$("#btn-login").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; sending ...');
			},
			success :  function(response)
			   {	
			   		var result = JSON.parse(response);					
					if(result.jsonCode==200){
									
						$("#btn-login").html('<img src="img/btn-ajax-loader.gif" /> &nbsp; Signing In ...');
						setTimeout(' window.location.href = "home.php"; ',4000);
					}
					else{
									
						$("#error").fadeIn(1000, function(){						
				$("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+result.message+' !</div>');
											$("#btn-login").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Sign In');
									});
					}
			  }
			});
				return false;
		}
	   /* login submit */
});