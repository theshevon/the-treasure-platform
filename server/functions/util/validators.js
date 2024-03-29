/**
 * Validates a list of email addresses corresponding to potential users of the
 * platform.
 */
exports.validateInvitationData =

    (emails) => {

        let errors       = {};
        let uniqueEmails = new Set();

        emails.forEach((email, index) => {

            if (!isEmpty(email)){

                // check for duplicate emails
                if (uniqueEmails.has(email)){
                    errors[index] = `You've already entered this email before!`
                } else {

                    // add to unique email set
                    uniqueEmails.add(email);

                    // check for invalid emails
                    if (!isEmail(email)){
                        errors[index] = `${email} is not a valid email!`
                    }
                }
            }
        });

        return  {
            errors,
            allInvalid: Object.keys(errors).length === emails.length
        }
    }

/**
 * Validates invitee data to ensure that both the email address and code that
 * they entered are valid.
 */
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

/**
 * Validates user registration data to ensure that all the fields contain
 * valid data.
 */
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
        if (newUser.pw !== newUser.pw_c) errors.pw = "Passwords must match!";

        return  {
                    errors,
                    valid: Object.keys(errors).length === 0
                }

    }

/**
 * Validates user login data to ensure that all the fields contain valid data.
 */
exports.validateLoginData =

    (user) => {

        let errors = {};

        // validate email address
        if (isEmpty(user.email) || !isEmail(user.email)) errors.email = "Please enter a valid email address.";

        // validate password
        if (isEmpty(user.password)) errors.password = "Please enter a password.";

        return  {
            errors,
            valid: Object.keys(errors).length === 0
        }
    }

/**
 * Validates item data to ensure that all the fields contain valid data.
 */
exports.validateItemData =

    (item, secondaryUserIDs) => {

        let errors = {};

        // check if name and desc are valid
        if (isEmpty(item.name)) errors.name = "Please enter a name for the item.";
        if (isEmpty(item.desc)) errors.desc = "Please enter a desciption for the item.";

        // check if 'assignedTo' user is a valid user
        if (item.assignedTo && !secondaryUserIDs.includes(item.assignedTo)){
            errors.assignedTo = "Please select a valid user from the dropdown";
        }

        // check if 'visibleTo' field contains valid SUs
        if (item.visibleTo){
            for (var i=0; i<item.visibleTo.length; i++){
                if (!secondaryUserIDs.includes(item.visibleTo[i])){
                    errors.visibleTo = "Please select valid users from the dropdown";
                    break;
                }
            }
        }

        return {
            errors,
            valid: Object.keys(errors).length === 0
        }
    }

/**
 * Validates the support request data to ensure all the fields are valid.
 */
exports.validateSupportData =

    (supportData) => {

        let errors = {};

        // check if subject and message are valid
        if (isEmpty(supportData.subject)) errors.subject = "Please enter a subject!";
        if (isEmpty(supportData.message)) errors.message = "Please enter a message!";

        return {
            errors,
            valid : Object.keys(errors).length === 0
        }
    }

/*=============================HELPER FUNCTIONS===============================*/

/**
 * Checks if a given string is empty.
 */
const isEmpty = (string) => {
    return (!string || string.trim() === "");
}

/**
 * Checks if a given string corresponds to an email address.
 */
const isEmail = (email) => {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(regEx);
}
