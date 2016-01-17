if (Meteor.isClient){
	Template.post.events({
		'submit .posting-form':function(event){
			event.preventDefault();
			var formData = {
				title: event.target.title.value,
				description: event.target.description.value,
				buyorsellparam: event.target.inlineRadioOptions.value,
				author: Meteor.user().username
			}
			console.log(formData);
			var captchaData = grecaptcha.getResponse();

			Meteor.call('formSubmissionMethod', formData, captchaData, function(error, result) {
            // reset the captcha
            grecaptcha.reset();

            if (error) {
                console.log('There was an error: ' + error.reason);
            } else {

            console.log('Success!');
            if(formData.title == null || formData.description == null || formData.buyorsellparam > 2){
				return;
			}
			else{
			Items.insert({
			itemname: formData.title,
			description: formData.description,
			buyorsell: formData.buyorsellparam,
			dateposted: new Date(),
			author: formData.author
				});
			Router.go('/');

			}


            }
        });
			}


	});
	


}