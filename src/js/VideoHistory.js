import React from 'react';
import '../css/videohistory.css';

function gethistoryvideoIdAll(obj) {
    var historyvideoIds = [];

    for(var i=0; i<obj.length; i++){
        historyvideoIds[i] = obj[i].videoId;
    }

    return historyvideoIds;
}
function gethistorywordAll(obj) {
    var historywords = [];

    for(var i=0; i<obj.length; i++){
        historywords[i] = obj[i].word;
    }

    return historywords;
}

class VideoHistory extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            historywords : [],
            historyvideoIds : [],
            all : []
        };
    }
    componentDidMount() {
        var xhttp = new XMLHttpRequest();
        var self = this;

        xhttp.onreadystatechange = function(e){
            if (xhttp.readyState === 4 && xhttp.status === 200){
                let response = JSON.parse(this.responseText);
                console.log(response);
                let historyvideoIds = gethistoryvideoIdAll(response);
                let historywords = gethistorywordAll(response);
                let all = []
                for(var i=0; i<historyvideoIds.length; i++){
                    all.push([historyvideoIds[i],historywords[i]])
                }
                console.log(all)
                self.setState({
                    historywords : historywords,
                    historyvideoIds : historyvideoIds,
                    all : all
                })
            }
        };
        xhttp.open("GET", "https://manatube.azurewebsites.net/api/history", true);
        xhttp.send();
    }
    render() {
        return (
            <div className={"videohistory"}>
                {this.state.all.map((all) => {
                    word:{all[1]}
                })}
            </div>
        )
    }
}
export default VideoHistory;