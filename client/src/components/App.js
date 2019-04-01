import React from 'react';
import ListStreams from '../components/streams/ListStreams';
import {Router, Route, Switch} from 'react-router-dom';
import CreateStream from './streams/CreateStream';
import EditStream from './streams/EditStream';
import ShowStream from './streams/ShowStream';
import DeleteStream from './streams/DeleteStream';
import Header from './Header';
import history from '../history';

const App = () =>{
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={ListStreams} />
                        <Route path="/streams/new" exact component={CreateStream} />
                        <Route path="/streams/edit/:id" exact component={EditStream} />
                        <Route path="/streams/delete/:id" exact component={DeleteStream} />
                        <Route path="/streams/:id" exact component={ShowStream} />
                    </Switch>
                </div>
            </Router>     
        </div>
    );
}

export default App;