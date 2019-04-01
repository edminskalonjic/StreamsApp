import React from 'react';
import {connect} from 'react-redux';
import {fetchStream, deleteStream} from '../../actions';
import {Link} from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';

class DeleteStream extends React.Component {

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions(){
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteStream(this.props.match.params.id)}
                 className="ui button negative">Delete</button>
                <Link to ="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent(){
        if(!this.props.stream){
            return "Are you sure you want to delete this stream";
        }
        return `Are you sure you want to delete stream with title: ${this.props.stream.title}`;
    }

    render(){
        if(!this.props.isSignedIn){
            return <h3>Please Sign In to continue!</h3>         
        }
            return (
                <Modal 
                    title="Delete Modal"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss = {() => history.push('/')}
                />
        );
    }
}

const mapStateToProps = (state, ownProps) =>{
    return {
        stream: state.streams[ownProps.match.params.id],
        isSignedIn: state.auth.isSignedIn
    };
} 

export default connect(mapStateToProps, {fetchStream, deleteStream})(DeleteStream);