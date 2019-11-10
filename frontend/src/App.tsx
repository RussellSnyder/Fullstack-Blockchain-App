import React from 'react';
import { BasicBlock, BasicBlockProps } from './components/BasicBlock'
import './App.css';
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import RawBlock from "./components/RawBlock";

interface AppState {
    blocks: Array<BasicBlockProps>;
    error: boolean;
    errorText: string;
}

class App extends React.Component {
    constructor(props: any) {
        super(props);

        this.state = {
            blocks: [],
            error: false,
            errorText: ''
        }

    }

    componentDidMount(): void {
        axios.get('/')
            .then(res => {
                if (!res.data.blocks) throw Error()

                this.setState({
                    blocks: res.data.blocks
                })

            }).catch(res => {
                this.setState({
                    error: true,
                    errorText: res.error.text
                })
        })
    }

    render() {
        const {blocks, error, errorText} = this.state as AppState;

          return (
          <Router>
            <div className="App">
              <header className="App-header container-fluid">
                  <div className="row">
                      <div className="col-12 text-center py-4">
                          <h1>
                            Bitwala Challenge
                          </h1>
                      </div>
                  </div>
              </header>
                <main className="container">
                    {error && <h4>{errorText}</h4>}
                    <Switch>
                        <Route path="/block/:id" children={<RawBlock />}/>
                        <Route path="/">
                            <h2>Blocks</h2>
                            <div className="row">
                                {blocks.length > 0 && blocks.map((block: BasicBlockProps, i) => {
                                    return (
                                        <div className="col-md-6 col-lg-4 mb-3" key={`basic-block-${i}`}>
                                            <BasicBlock { ...block }/>
                                        </div>
                                    )
                                })}
                            </div>
                        </Route>
                    </Switch>


                </main>
            </div>
          </Router>
          );

    }
}

export default App;
