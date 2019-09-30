exports.validateRegistrationData =

    newUser => {

        let errors = {};

        // validate first name
        if (isEmpty(newUser.fname)){
            errors.fname = "Please enter your first name!";
        }

        // validate last name
        if (isEmpty(newUser.lname)){
            errors.lname = "Please enter your last name!";
        }

        // validate email address
        if (isEmpty(newUser.email)){
            errors.email = "Please enter your email address!";
        } else if (!isEmail(newUser.email)){
            errors.email = "Please enter a valid email address!";
        }

        // validate entered passwords
        if (isEmpty(newUser.password)) errors.pw = "Please enter a password!";
        if (newUser.password !== newUser.confirmPassword) errors.pw_c = "Passwords must match";

        return  {
                    errors,
                    valid: Object.keys(errors).length === 0
                }

    }

exports.validateLoginData =

    user => {

        let errors = {};
        if (isEmpty(user.email)) errors.email = "Please enter a valid email address.";
        if (isEmpty(user.password)) errors.password = "Please enter a password.";

        return  {
            errors,
            valid: Object.keys(errors).length === 0
        }
    }

/*=============================HELPER FUNCTIONS===============================*/

const isEmpty = (string) => {
    return (!string || string.trim() === "");
}

const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(regEx);
}
