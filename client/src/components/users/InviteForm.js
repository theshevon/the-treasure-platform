import React, { Component } from 'react';
import axios                from 'axios';

// bootstrap imports
import Spinner from 'react-bootstrap/Spinner';
import Button  from 'react-bootstrap/Button';
import Form    from 'react-bootstrap/Form';
import Row     from 'react-bootstrap/Row';
import Col     from 'react-bootstrap/Col';

// custom css
import '../../stylesheets/invite-form.css';

/**
 * Represents the form that is needed to invite users to the platform
 */
class InviteForm extends Component {

    minRows = 5;
    maxRows = 10;

    state = {
        noRows   : this.minRows,
        emails   : Array(this.minRows).fill(''),
        loading  : false,
		errors   : {},
		validated: false
    }

    /**
     * Adds rows to the form.
     */
    addRows = () => {
        // only allow row addition if it's below the threshold
        if (this.state.noRows < this.maxRows){
            let emails = [...this.state.emails];
            emails.push('');
            this.setState({
                            noRows : (this.state.noRows + 1),
                            emails: emails
                         });
        }
    }

    /**
     * Handles changes made to input fields.
     * When the value of an input field changes, its corresponding entry in the
     * state changes too.
     */
    handleChange = event => {

        let dash_index  = event.target.name.indexOf("-");
        let array_index = event.target.name.substring(0, dash_index);

        let emails = [...this.state.emails]
        emails[array_index] = event.target.value;

        this.setState({
                        validated : false,
                        emails : emails
                    });
    }

    /**
     * Sends the form data to the server.
     */
    handleSubmit = event => {

        event.preventDefault();

        this.setState({
			loading  : true
        });

        // send the data to the server
        axios({
                method: 'post',
                url: '/invite',
                data: { emails : this.state.emails }
            })
            .then(res => {
                this.setState({
                                loading : false,
                                validated : true
                             });
            })
            .catch(err => {
                this.setState({
                    errors    : err.response.data,
                    loading   : false,
                    validated : true
                });
            });
    }

    render() {

        let formContent = [];

        // create the rows to be displayed in the form
        for (var i=0; i<this.state.noRows; i++){

			let fieldName = i + "-email";
			let feedback  = null;
			let classes   = "invite-email-field mb-1";

            // check for error or success feeedback
			if (this.state.validated){

				if (this.state.errors && this.state.errors[i]){
					feedback = (
						<p
							className="invalid-feedback-msg">
							{ this.state.errors[i] }
						</p>
					);
					classes += " invalid-field"
                }
                else if (this.state.emails[i] !== ''){
                    feedback = (
						<p
							className="valid-feedback-msg">
							Successfully emailed!
						</p>
					);
					classes += " valid-field";
				}
			}

            // create the row with it's feedback
            formContent.push((
                                <Row
                                    key={"row-" + i}
                                    className="mt-1 mb-2 d-flex justify-content-center">
                                    <Col
                                        xs="12"
                                        md="10">

										<Form.Control
											className={ classes }
											name={ fieldName }
											type="email"
                                            placeholder="email"
                                            value={this.state.emails[i]}
											onChange={this.handleChange}/>
										{ feedback }
                                    </Col>
                                </Row>
                            ));
        }

        // if loading, replace button text with a spinner
        let btnContent;
        if (this.state.loading){
            btnContent = (<Spinner animation="border" size="sm"/>);
        } else {
            btnContent = ("Send Invites");
        }

        return (

                <Form>

                    {/* form rows */}
                    {formContent}

                    {/* 'Add Row' button */}
                    <Button
                        className="add-row-btn mt-2"
                        variant="light"
                        disabled={this.state.loading || this.state.noRows === this.maxRows}
                        onClick={this.addRows}>
                        + Add Row
                    </Button>

                    {/* separator */}
                    <hr
                        className="mt-3"/>

                    {/* 'Send Invitations' button */}
                    <Button
                        className="float-right"
                        variant="light"
                        type="submit"
                        disabled={this.state.loading}
                        onClick={this.handleSubmit}>
                        { btnContent }
                    </Button>
                </Form>
        );
    }
}

export default InviteForm;
