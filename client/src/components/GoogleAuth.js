import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';

class GoogleAuth extends React.Component{

    componentDidMount(){
        window.gapi.load('client:auth2',() =>{
            window.gapi.client.init({
                clientId:'547382728079-2gcj51gbp7vq4nhtv1g5m305nq18jfmh.apps.googleusercontent.com',
                scope:'email'
            }).then(() =>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(() => this.onAuthChange(this.auth.isSignedIn.get()));
            });
        });
    }

    onAuthChange = (isSignedIn) =>{
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            this.props.signOut();
        }
    }

    onClickSignIn = () =>{
        this.auth.signIn();
    }

    onClickSignOut = () =>{
        this.auth.signOut();
    }

    renderButton(){
        if(this.props.isSignedIn=== null){
            return null;
        } else if(this.props.isSignedIn){
            return (
                <button onClick={this.onClickSignOut} className="ui red google button">
                <i className="google icon" ></i>
                Sign Out
            </button>
            );
        } else{
            return (
                <button onClick={this.onClickSignIn}className="ui red google button">
                <i className="google icon" ></i>
                Sign In
            </button>
            );
        }
    }

    render(){
        return (
            <div>
                {this.renderButton()}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {isSignedIn: state.auth.isSignedIn};
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);