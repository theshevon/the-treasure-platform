exports.validateRegistrationData =

    newUser => {

        let errors = {};

        if (isEmpty(newUser.email)){
            errors.email = "Must not be empty";
        } else if (!isEmail(newUser.email)){
            errors.email = "Must be a valid email address";
        }

        if (isEmpty(newUser.password)) errors.password = "Must not be empty";
        if (newUser.password !== newUser.confirmPassword) errors.confirmPassword = "Passwords must match";
        if (isEmpty(newUser.handle)) errors.handle = "Must not be empty";

        return  {
                    errors,
                    valid: Object.keys(errors).length === 0
                }

    }

exports.validateLoginData =

    user => {

        let errors = {};
        if (isEmpty(user.email)) errors.email = "Must not be empty";
        if (isEmpty(user.password)) errors.password = "Must not be empty";

        return  {
            errors,
            valid: Object.keys(errors).length === 0
        }
    }

/*=============================HELPER FUNCTIONS===============================*/

const isEmpty = (string) => {
    return (string.trim() === "");
}

const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(regEx);
}