import React from 'react';
import '../css/searchresults.css';

class SearchResults extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            a: []
        }
    }
    loadDoc() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                let response = JSON.parse(this.responseText)
                this.setState({
                    a : response
                })
                // const unti = a.map((a) =>
                //     <li>{a.thumbnail}</li>
                // );
                // console.log(a[0].thumbnail);
            }
        };
        let vocab = this.props.vocab;
        let keyword = this.props.keyword;
        // 逆にしてる
        xhttp.open("GET", "https://rakutenmafia.azurewebsites.net/api/search?q=" + keyword + "&k=" + vocab, true);
        xhttp.send();

    }

    render() {
        const a = this.state.a;
        return (

            <div className={"searchresults"}>
                {this.loadDoc()}
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