// $("form").submit(function(e) {
//     e.preventDefault(); // Prevents the page from refreshing
//     var $this = $(this); // `this` refers to the current form element
//     $.post(
//         $this.attr("action"), // Gets the URL to sent the post to
//         $this.serialize(), // Serializes form data in standard format
//         function(data) { /** code to handle response **/ },
//         "json" // The format the response should be in
//     );
// });

// magic.js
$(document).ready(function() {
    $('#form-feedback').hide();
  
    // process the form
    $('form').submit(function(event) {
      // get the form data
      // there are many ways to get this data using jQuery (you can use the class or id also)
      var formData = {
        name: $('input[name=form-name]').val(),
        email: $('input[name=form-email]').val(),
        message: $('textarea[name=form-message]').val()
      };
      console.log({formData})
      // process the form
      $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: '/api/email', // the url where we want to POST
        data: formData, // our data object
        dataType: 'json', // what type of data do we expect back from the server
        encode: true
      })
        // using the done promise callback
        .done(function(data) {
          // log data to the console so we can see
          // here we will handle errors and validation messages
        });
  
      // stop the form from submitting the normal way and refreshing the page
      event.preventDefault();
      // alert("Message Sent!")
      $('#form-feedback')
        .show()
        .delay(10000)
        .fadeOut();
      $(this)
        .closest('form')
        .find('input[type=text], input[type=email], textarea')
        .val('');
    });
  });
  
  
  
  
  