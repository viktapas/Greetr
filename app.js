// gets a `new` object. The architecture allows us to not have to use `new` keyword.
var g = G$('Vikas', 'Kumar');

// using our chainable methods
g.greet().setLang('es').greet(true);

// using our objects on button click event
$('#login').click(function () {

    // create `new` Greetr object. Let's pertend we know the name from the login.
    var loginGreetr = G$('Upasna', 'Kashyap');

    // hides the login. sets styles property `display` to none;
    $('#logindiv').hide();

    // using chainable methods and sets the HTML
    loginGreetr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
})