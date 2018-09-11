import React from 'react';
import '../css/searchresults.css';

class SearchResults extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            response: []
        }
    }

    componentDidMount() {
        var xhttp = new XMLHttpRequest();
        var self = this;

        xhttp.onreadystatechange = function(e){
            console.log(this);
            if (xhttp.readyState === 4 && xhttp.status === 200){
                console.log(this.responseText);
                let response = JSON.parse(this.responseText)
                let thumbnail = response.thumbnail
                // console.log(thumbnail)
                // thumbnail.forEach(function(element) {
                //     self.setState({
                //         response: self.state.response.concat([thumbnail])
                //     })
                // });

                self.setState({
                    response: response
                })

                // self.setState({
                //     reponse : this.response
                // })
            }
        }
            let vocab = this.props.vocab;
            let keyword = this.props.keyword;
        xhttp.open("GET", "https://rakutenmafia.azurewebsites.net/api/search?q=" + keyword + "&k=" + vocab, true);
        xhttp.send();
    }

    render() {
        return (

            <div className={"searchresults"}>
                {this.state.reponse}
                <div className="header">
                    <h1 className="text-center">Find Words On Youtube!</h1>
                    <p className="text-center">ユーチューブでたんごをさがそう!</p>
                    <p className="text-center"><a href="/" className="btn btn-success">Home ほーむ</a></p>
                </div>
                <div className="main">
                    <div className="row">
                        <div className="col-xs-12">
                            <a onClick={() =>this.props.changePage('Player')} >
                                <div className="col-xs-3">
                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/fTwAz1JC4yI"
                                            frameBorder="0"
                                            allow="autoplay; encrypted-media" allowFullScreen></iframe>
                                </div>
                                <div className="col-xs-9">
                                    <h3>data_title</h3>
                                    <h3>含んでるワードの数：</h3>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                {this.state.a}
                <button className="SearchResults" onClick = {() => this.props.changePage('SearchResults')}>
                    SearchResults
                </button>
                <button className="Player" onClick = {() => this.props.changePage('Player')}>
                    Player
                </button>
            </div>
        )
    }
}

export default SearchResults;