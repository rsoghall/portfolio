$(document).ready(function() {
  $("#form-feedback").hide();

  // process the form
  $("form").submit(function(event) {
    event.preventDefault();

    // get the form data
    // there are many ways to get this data using jQuery (you can use the class or id also)

    var name = $("input[name=form-name]").val();
    var email = $("input[name=form-email]").val();
    var message = $("textarea[name=form-message]").val();

    var formFeedback = $("#form-feedback");
    console.log(name, email, message, "form fields");
    if (!name || !email || !message) {
      console.log("!name, email, message");
      formFeedback.html("All form fields are required");
      formFeedback.show();
      return;
    }
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var isValidEmail = emailRegex.test(email.toLowerCase());
    if (!isValidEmail) {
      console.log({ isValidEmail });
      formFeedback.html("Invalid Email Address");
      formFeedback.show();
      return;
    }
    var formData = {
      name: name,
      email: email,
      message: message
    };
    console.log({ formData });
    // process the form
    $.ajax({
      type: "POST", // define the type of HTTP verb we want to use (POST for our form)
      url: "/api/email", // the url where we want to POST
      data: formData, // our data object
      dataType: "json", // what type of data do we expect back from the server
      encode: true
    })
      // using the done promise callback
      .done(function(data) {
        console.log({ data });
        // log data to the console so we can see
        // here we will handle errors and validation messages
      });

    // stop the form from submitting the normal way and refreshing the page
    // alert("Message Sent!")
    formFeedback.html("Message sent");

    formFeedback
      .show()
      .delay(10000)
      .fadeOut();
    $(this)
      .closest("form")
      .find("input[type=text], input[type=email], textarea")
      .val("");
  });
});
