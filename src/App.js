import React, { Component, useState, useEffect } from "react";
import Brain from "./componants/Brain";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";

//COMPONANTS
import Dash from "./componants/dashBoard/Dash";
import Lore from "./lore/Lore";
import InfoGrid from "./componants/gridInformations/InfoGrid";

export default function App(params) {
    const [isWeighted, setIsWeighted] = useState(true);

    return (
        <Router>
            <div className="App">
                <Dash />
                <Route
                    exact
                    path="/"
                    render={(props) => (
                        <React.Fragment>
                            <InfoGrid isWeighted={isWeighted} />
                            <Brain
                                isWeighted={isWeighted}
                                setIsWeighted={setIsWeighted}
                            />
                        </React.Fragment>
                    )}
                />
                <Route path="/lore" component={Lore} />
            </div>
        </Router>
    );
}

/*class App extends Component {
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
                                <InfoGrid />
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

export default App;*/
