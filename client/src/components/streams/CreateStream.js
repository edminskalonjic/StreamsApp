import React from 'react';
import {connect} from 'react-redux';
import StreamForm from './StreamForm';
import {createStream} from '../../actions';

class CreateStream extends React.Component{

    onSubmit = (formValues) =>{
        this.props.createStream(formValues);
    }

    render(){

        if(!this.props.isSignedIn){
            return <h3>Please Sign In to create Streams!</h3>         
        }

        return(
            <div>
                <h2>Create a Stream</h2>
                <StreamForm onSubmit={this.onSubmit}/>
            </div>

        ); 
    }
}

const mapStateToProps = (state,ownProps) =>{
    return {
        stream: state.streams[ownProps.match.params.id],
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, {createStream})(CreateStream);