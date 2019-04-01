import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {fetchStreams} from '../../actions';


class ListStreams extends React.Component{

    componentDidMount(){
        this.props.fetchStreams();
    }

    renderAdmin(stream){
        if(stream.userId===this.props.currentUserId && stream.userId!== null){
            return(
                <div>
                    <Link className="ui button primary" to = {`/streams/edit/${stream.id}`}>
                        Edit
                    </Link>
                    <Link className="ui button negative" to ={`/streams/delete/${stream.id}`}>Delete</Link>
                </div>
            );
        }
    }

    renderList(){
        return this.props.streams.map(stream => {
            return(
                <div key ={stream.id} className="item">
                    <div className="right floated content">{this.renderAdmin(stream)}</div>
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link className="header" to={`/streams/${stream.id}`}>{stream.title}</Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    }

    renderCreate(){
        if(this.props.isSignedIn){
            return(
                <div>
                <Link to="/streams/new" className="ui button primary">
                    Create new Stream
                </Link>
                </div>
            );
        }

    }

    render(){
        return (    
            <div >
                <h3>Stream List</h3>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>          
        );
    }
};

const mapStateToProps = (state) =>{
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default  connect(mapStateToProps,{fetchStreams})(ListStreams);