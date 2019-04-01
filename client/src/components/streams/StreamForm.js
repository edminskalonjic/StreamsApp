import React from 'react';
import {Field, reduxForm} from 'redux-form';


class StreamForm extends React.Component{

     renderError = (meta) =>{
        if(meta.error && meta.touched){
            return(
            <div>
                {meta.error}
            </div>
            );
        }
    }

    renderInput = ({input, label, meta}) =>{
        const className = `field ${meta.error && meta.touched ? 'error':''}`;
        return(
            <div className={className}>
                <label>{label}</label>
                <input autoComplete="off" {...input}/>
                <div className="ui error message">{this.renderError(meta)}</div>
            </div>
        );
    }

    onFormSubmit = (formValues) =>
    {   
        this.props.onSubmit(formValues);
    }

    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.onFormSubmit)} className="ui form ">
                    <Field name="title" component={this.renderInput} label="Enter a name"/>
                    <Field name="description" component={this.renderInput} label="Enter description"/>
                    <button className="ui button primary">Submit</button>
                </form>
            </div>          
        );
    }
};

const validate = (formValues) =>{
    const error = {};
    if(!formValues.title){
        error.title = 'Enter a title please';
    }

    if(!formValues.description){
        error.description='Enter a description please';
    }

    return error;
}

export default reduxForm({
    form:'streamForm',
    validate
})(StreamForm);

