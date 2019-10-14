import React, { Component } from 'react'

// bootstrap imports
import Spinner from 'react-bootstrap/Spinner'
import Button  from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row  from 'react-bootstrap/Row'
import Col  from 'react-bootstrap/Col'

import axios from 'axios'

// other imports
import ReCAPTCHA from "react-google-recaptcha";

// ReCaptcha keys
const SITE_KEY = "6Ld1er0UAAAAAONvG_XKNAPoMFYkts3_aIaqJslk"

class support extends Component {

    state = {
        loading : false,
        topic   : '',
        message : '',
        recaptchaToken: ''
    }

    onCaptchaChange = (value) => {
      console.log("Captcha value:", value);
      this.setState({recaptchaToken : value});
    }

    handleChange = event => {
		this.setState({ [event.target.name] : event.target.value });
    }

    handleSubmit = event => {

        event.preventDefault();

        this.setState({ loading : true });

        let data = {
            recaptchaToken: this.state.recaptchaToken,
            topic   : this.state.topic,
            message : this.state.message
        }

        axios({
                method : 'post',
                url    : 'http://localhost:5000/comp30022app/us-central1/api/support',
                data   : data
            })
            .then((res) => {
                this.setState({
                                loading  : false,
                                topic    : '',
                                message  : '',
                                response : res.data()
                            });
                return
            })
            .catch(err => {
                this.setState({ errors : err.response.data });
            })
    }


    render() {
          let btnContent;
              if (this.state.loading){
                  btnContent = (<Spinner animation="border" size="sm"/>);
              } else {
                  btnContent = ("Send");
              }

              return (
                  <div
      				className="main-container"
      				style={{width:"100vw", height:"100vh"}}>
      				<Row
      					className="login-form-container d-flex justify-content-center">
      					<Col
      						className="login-form-body p-5"
      						xs="10"
      						sm="6"
      						md="3">
      						<h1
      							className="form-title mb-4">
      							Tell Us What's Wrong
      						</h1>
      						<Form
      							noValidate
      							validated={this.state.validated}
      							onSubmit={this.handleSubmit}>
      							<Row
      								className="my-1">
      								<Form.Control
      									className="login-field"
      									name="topic"
      									placeholder="topic"
      									value={this.state.topic}
      									onChange={this.handleChange}
      									required/>
      								<Form.Control.Feedback
      									type="invalid">

                  					</Form.Control.Feedback>
      							</Row>
      							<Row
      								className="my-1">
      								<Form.Control
                                          as="textarea"
                                          name="desc"
                                          rows="5"
                                          placeholder="message"
                                          required
                                          onChange={this.handleChange}/>
      								<Form.Control.Feedback
      									type="invalid">
                  					</Form.Control.Feedback>
      							</Row>
                                <div
                                    class="d-flex justify-content-center">

                                <ReCAPTCHA
                                    sitekey={SITE_KEY}
                                    onChange={this.onCaptchaChange}
                                />

                                </div>
      							<Button
      								className="login-btn btn mt-3"
      								type="submit"
      								onClick={this.handleSubmit}
                                      disabled={this.state.loading}>
                                      {btnContent}
                                  </Button>
      						</Form>
      					</Col>
      				</Row>
      			</div>
            )
    }
}

export default support
