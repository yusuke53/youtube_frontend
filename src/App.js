import React from 'react';
import Search from "./js/Search";
import SearchResults from "./js/SearchResults";
import Player from "./js/Player";


class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentPage : 'Search',
            vocab : '',
            keyword : ''
        }
        this.changePage = this.changePage.bind(this)
        this.changeVocab = this.changeVocab.bind(this)
        this.changeKeyword = this.changeKeyword.bind(this)
    }
    changePage(page) {
        this.setState({currentPage: page})
    }

    changeVocab(vocab){
        this.setState({vocab : vocab})
    }

    changeKeyword(keyword){
        this.setState({keyword : keyword})
    }

    render() {
        let page = 'Search'
        if(this.state.currentPage === 'Search'){
            page = <Search
                changePage={this.changePage}
                changeVocab={this.changeVocab}
                changeKeyword={this.changeKeyword}
            />
        }else if(this.state.currentPage === 'SearchResults') {
            page = <SearchResults
                changePage={this.changePage}
                vocab={this.state.vocab}
                keyword={this.state.keyword}
            />
        }else if(this.state.currentPage === 'Player') {
            page = <Player
                changePage={this.changePage}
            />
        }
        return (
            <div className={"app"}>
                {page}
            </div>
        )
    }
}

export default App;
