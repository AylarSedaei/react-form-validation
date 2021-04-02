import React, {Component} from "react";
const buttonStyle = {
    backgroundColor: "#0099ff",
    border: "2px solid #0099ff96",
    outline: "none",
    borderRadius: "4px",
    color: "#fff",
    display: "block",
    cursor: "pointer",
    fontSize: "16px",
    padding: "10px",
    marginTop: "20px",
    marginLeft: "auto",
    marginRight: "auto"
}
const textStyle = {
    borderRadius: "4px",
    display: "block",
    fontSize: "14px",
    width: "100%",
    padding: "10px"
}
const radioStyle = {
    width:"auto",
    display:"inline"
}
const formStyle = {
    alignItems: "center",
    width: "800px",
    maxWidth: "90%",
    marginLeft: "auto",
    marginRight: "auto"
}
const errorStyle = {
    color:  "red",
    fontSize: "small",
    display: "visible"
}
        
class Form extends Component {
    constructor() {
        super();
        this.state = {
            userName:"",
            validUserName:false,
            email:"",
            validEmail:false,
            education:"",
            sex:"",
            sexSelected:false,
            description:"",
            agreement:false
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e){
        const {name, value, type, checked} = e.target;
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value });
        this.handleErrors();
    }

    handleErrors(){
        const isLongEnough = (formElementValue, minimumLength) => (formElementValue.length >= minimumLength);
        const isEmail = (emailValue) => (emailValue.endsWith(".com") && emailValue.includes('@'));
        const validateSex = (sexValue) => ["Male", "Female", "Others"].includes(sexValue);

        this.setState(
            {validUserName : isLongEnough(this.state.userName, 5)},
            {validEmail : isEmail(this.state.email)},
            {agreement : this.state.agreement.checked},
            {sexSelected : validateSex(this.state.sex)}
        );
    }

    render() {
        let userNameErrorText = this.state.validUserName ? "" : "UserName is not valid.";
        let emailErrorText = this.state.validEmail ? "" : "Email is not valid.";
        let sexErrorText = this.state.sexSelected ? "" : "Sex is not selected.";
        let agreementErrorText = this.state.agreement ? "" : "You must agree to terms of privacy and policy.";

        return(
            <form style = {formStyle}>
                <input 
                    type="text" 
                    value={this.state.userName} 
                    name="userName" 
                    placeholder="UserName" 
                    style = {textStyle}
                    onChange={this.handleChange} 
                />
                <br/>
                <small style = {errorStyle} >{userNameErrorText}</small>
                <br/>

                <input 
                    type="text" 
                    value={this.state.email} 
                    name="email" 
                    placeholder="MyName@email.com" 
                    style = {textStyle}
                    onChange={this.handleChange} 
                />
                <br/>
                <small style = {errorStyle}>{emailErrorText}</small>
                <br/>

                <label>Education</label>
                <select 
                    value={this.state.education}
                    onChange={this.handleChange}
                    name="education"
                >
                    <option value="bachelorDegree">Bachelor's Degree</option>
                    <option value="masterDegree">Master Degree</option>
                    <option value="doctoralDegree">Doctoral Degree</option>
                    <option value="PHD">PHD</option>
                </select>
                <br/>

                <label>Description</label>
                <textarea 
                    name = "description"
                    style = {textStyle}
                    onChange={this.handleChange}
                />
                <br/>

                <label style = {radioStyle}>
                    <input 
                        type="radio" 
                        name="sex"
                        value="male"
                        checked={this.state.gender === "male"}
                        onChange={this.handleChange}
                    /> Male
                </label>
                <br/>
                <label style = {radioStyle}>
                    <input 
                        type="radio" 
                        name="sex"
                        value="female"
                        checked={this.state.gender === "female"}
                        onChange={this.handleChange}
                    /> Female
                </label>
                <br/>
                <label style = {radioStyle}>
                    <input 
                        type="radio" 
                        name="sex"
                        value="others"
                        checked={this.state.gender === "others"}
                        onChange={this.handleChange}
                    /> Others
                </label>
                <br/>
                <small style = {errorStyle}>{sexErrorText}</small>
                <br/>
                
                <label>
                    <input 
                        type="checkbox" 
                        name="agreement"
                        checked={this.state.agreement}
                        onChange={this.handleChange}
                    /> I agree to all terms of privacy and policy.
                </label>
                <br/>
                <small style = {errorStyle}>{agreementErrorText}</small>
                <br/>
                <button style = {buttonStyle} id = "submit" value = "Register">Register</button>
            </form>
        );
    }
}

export default Form;
