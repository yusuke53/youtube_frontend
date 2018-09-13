import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
    BrowserView,
    MobileView
} from "react-device-detect";


class Index extends React.Component{
    render(){
        return(
            <div className={"index"}>
                <BrowserView>
                    <App />
                </BrowserView>
                <MobileView>
                    unti
                </MobileView>
            </div>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
