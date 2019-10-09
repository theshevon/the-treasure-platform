import React, { Component } from 'react'
import axios                from 'axios'

// bootstrap imports
import Spinner from 'react-bootstrap/Spinner'
import Button  from 'react-bootstrap/Button'
import Form    from 'react-bootstrap/Form'
import Row     from 'react-bootstrap/Row'
import Col     from 'react-bootstrap/Col'

// custom css
import '../../stylesheets/invite-form.css';

class InviteForm extends Component {

    minRows = 5;
    maxRows = 10;

    state = {
        noRows   : this.minRows,
        emails   : Array(this.minRows).fill(''),
        loading  : false,
		errors   : null,
		validated: false
    }

    // adds rows to the form
    addRows = () => {
        // only allow row addition if its below the threshold
        if (this.state.noRows < this.maxRows){
            let emails = [...this.state.emails];
            emails.push('');
            this.setState({
                            noRows : (this.state.noRows + 1),
                            emails: emails
                         });
        }
    }

    // handles changes made to input fields
    // when the value of an input field changes, its corresponding entry in the
    // state changes too
    handleChange = event => {

        let dash_index  = event.target.name.indexOf("-");
        let array_index = event.target.name.substring(0, dash_index);

        let emails = [...this.state.emails]
        emails[array_index] = event.target.value;

        this.setState({ emails : emails });
    }

    // sends the form data to the server
    handleSubmit = event => {

        event.preventDefault();

        this.setState({
			loading  : true,
			validated: true
        });

        // send the data to the server
        axios({
            method: 'post',
            url: 'http://localhost:5000/comp30022app/us-central1/api/invite',
            data: { emails : this.state.emails }
        })
        .then(res => {
            this.setState({ loading : false });
        })
        .catch(err => {
            this.setState({
                errors    : err.response.data,
                loading   : false,
            })
        })
    }

    render() {

        let formContent = [];
        for (var i=0; i< this.state.noRows; i++ ){

			let fieldName = i + "-email";
			let feedback  = null;
			let classes   = "invite-email-field mb-1";

			if (this.state.validated && this.state.errors){
				if (this.state.errors[i]){
					feedback = (
						<p
							className="invalid-feedback-msg">
							{ this.state.errors[i] }
						</p>
					)
					classes += " invalid-field"
				} else {
					classes += " valid-field";
				}
			}

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
            btnContent = ("Send Invitations");
        }

        return (
                <Form
                    onSubmit={this.handleSubmit}>
                    {formContent}
                    <Button
                        className="add-row-btn mt-2"
                        variant="light"
                        disabled={this.state.loading || this.state.noRows === this.maxRows}
                        onClick={this.addRows}>
                        + Add Another
                    </Button>

                    <hr
                        className="mt-3"/>

                    <Button
                        className="float-right"
                        variant="dark"
                        type="submit"
                        disabled={this.state.loading}>
                        { btnContent }
                    </Button>
                </Form>
        )
    }
}

export default InviteForm;