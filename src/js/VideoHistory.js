import React from 'react';
import '../css/videohistory.css';

function gethistoryvideoIdAll(obj) {
    var historyvideoIds = [];

    for(var i=0; i<obj.length; i++){
        historyvideoIds[i] = obj[i].videoId;
    }

    return historyvideoIds;
}

class VideoHistory extends React.Component {
    componentDidMount() {
        var xhttp = new XMLHttpRequest();
        var self = this;

        xhttp.onreadystatechange = function(e){
            if (xhttp.readyState === 4 && xhttp.status === 200){
                let response = JSON.parse(this.responseText);
                console.log(response);
                let historyvideoIds = gethistoryvideoIdAll(response);
                let all = []
                for(var i=0; i<historyvideoIds.length; i++){
                    all.push([historyvideoIds[i]])
                }
                self.setState({
                    historyvideoIds : historyvideoIds,
                    all : all,
                    loading : false
                })
            }
        };
        let vocab = this.props.vocab;
        let keyword = this.props.keyword;
        xhttp.open("GET", "https://manatube.azurewebsites.net/api/search?q=" + keyword + "&k=" + vocab, true);
        xhttp.send();
    }
    render() {
        return (
            <div className={"videohistory"}>

            </div>
        )
    }
}
export default VideoHistory;