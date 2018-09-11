import React from 'react';
import Search from "./js/Search";
import SearchResults from "./js/SearchResults";
import Player from "./js/Player";


class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentPage : 'Search'
        }
        this.changePage = this.changePage.bind(this)
    }
    changePage(page) {
        this.setState({currentPage: page})
    }

    render() {
        let page = 'Search'
        if(this.state.currentPage === 'Search'){
            page = <Search
                changePage={this.changePage}
            />
        }else if(this.state.currentPage === 'SearchResults') {
            page = <SearchResults
                changePage={this.changePage}
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
