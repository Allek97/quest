import React, { Component } from "react";
import Brain from "./componants/Brain";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dash from "./componants/dashBoard/Dash";
import Lore from "./lore/Lore";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Dash />
                    <Route
                        exact
                        path="/"
                        render={(props) => (
                            <React.Fragment>
                                <Brain />
                            </React.Fragment>
                        )}
                    />
                    <Route path="/lore" component={Lore} />
                </div>
            </Router>
        );
    }
}

export default App;
