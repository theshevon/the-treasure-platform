handleSubmit1 = event => {

    const form = event.currentTarget;

    if (this.state.stage === 0){
        console.log(form.checkValidity());
        if (form.checkValidity()) {
            this.setState({ stage: 1 });
        } else {
            event.preventDefault();
            event.stopPropagation();
        }
    } else {
        this.handleSubmit2(event);
    }
}

handleSubmit2 = event => {

    event.preventDefault();

    this.setState({
        loading: true
    });

    const userData = {
        email: this.state.email,
        password: this.state.password
    }

    axios({
            method: 'post',
            url: 'http://localhost:5000/comp30022app/us-central1/api/login',
            data: userData
        })
        .then(res => {
            this.setState({loading:false});
            this.props.history.push('/items');
        })
        .catch(err => {
            this.setState({
                email: "",
                password: "",
                errors: err.response.data,
                loading: false,
                validated: true
            })
        })
}

handleFileSelect = event => {
    if (this.state.selectedFiles.length === 0){
        let selectedFiles = [];
        let uploadedFiles = Array.from(event.target.files);
        uploadedFiles.forEach(file => {
            selectedFiles.push(URL.createObjectURL(file));
        })
        this.setState({selectedFiles: selectedFiles})
    } else {
        this.setState({selectedFiles: []})
    }
}

handleVisibilityOptionChange = () => {

    if (this.state.selectingWatchers){
        this.setState({selectingWatchers : false});
    } else {
        this.setState({selectingWatchers : true});
    }
    this.setState({ visiblto : [] });
}

handleImgSelect = (index) => {
    this.setState({ coverImgIndex : index });
}

handleReturn = () => {
    this.setState({
                    stage: 0,
                    validated: [false, false]
                  });

}
