exports.validateInvitationData =

    (emails) => {

        let errors = {};

        emails.forEach((email, index) => {
            if (!isEmpty(email) && !isEmail){
                errors[index] = `${email} is not a valid email!`
            }
        });

        return  {
            errors,
            allInvalid: Object.keys(errors).length === emails.length
        }
    }


exports.validateInviteeData =

    (invitee) => {

        let errors = {};

        // validate email address
        if (isEmpty(invitee.email)){
            errors.email = "Please enter your email address!";
        } else if (!isEmail(invitee.email)){
            errors.email = "Please enter a valid email address!";
        }

        // validate code
        if (isEmpty(invitee.code)) errors.code = "Please enter a code!";

        return  {
                    errors,
                    valid: Object.keys(errors).length === 0
                }
    }

exports.validateRegistrationData =

    (newUser) => {

        let errors = {};

        // validate first name
        if (isEmpty(newUser.fname)){
            errors.fname = "Please enter your first name!";
        }

        // validate last name
        if (isEmpty(newUser.lname)){
            errors.lname = "Please enter your last name!";
        }

        // validate entered passwords
        if (isEmpty(newUser.pw)) errors.pw = "Please enter a password!";
        if (newUser.pw !== newUser.pw_c) errors.pw = "Passwords must match";

        return  {
                    errors,
                    valid: Object.keys(errors).length === 0
                }

    }

exports.validateLoginData =

    (user) => {

        let errors = {};
        if (isEmpty(user.email) || !isEmail(user.email)) errors.email = "Please enter a valid email address.";
        if (isEmpty(user.password)) errors.password = "Please enter a password.";

        return  {
            errors,
            valid: Object.keys(errors).length === 0
        }
    }

exports.validateItemData =

    (item, users) => {

        let errors = {};

        // check if name and desc are valid
        if (isEmpty(item.name)) errors.name = "Please enter a name for the item.";
        if (isEmpty(item.desc)) errors.desc = "Please enter a name for the item.";

        // check if 'assignedTo' user is a valid user
        if (item.assignedTo && !users.includes(item.assignedTo)) errors.assignedTo = "Please select a valid user from the dropdown";

        // No need to check the 'visibleTo' users because the front-end does work
        // to determine the list of users. Tampering with that field shouldn't
        // result in any issues.

        return {
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
