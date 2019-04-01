import React from 'react';
import {connect} from 'react-redux';
import {editStream, fetchStream} from '../../actions';
import StreamForm from './StreamForm';
import _ from 'lodash';

class EditStream extends React.Component{

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit=(formValues)=>{
        this.props.editStream(formValues,this.props.match.params.id);
    }

    render(){
        if(!this.props.stream){
            return <div>Loading...</div>;
        }

        if(!this.props.isSignedIn){
            return <h3>Please Sign In to continue!</h3>         
        }
        return(
            <div>
                <h2>Edit a Stream</h2>
                <StreamForm onSubmit={this.onSubmit} initialValues={_.pick(this.props.stream,'title','description')} />
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

export default connect(mapStateToProps, {editStream, fetchStream})(EditStream);