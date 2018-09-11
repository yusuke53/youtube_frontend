import React from 'react';
import '../css/search.css';

class Search extends React.Component{
    render(){
        return(
            <div className={"search"}>
                <div className="header">
                    <h1 className="text-center">Find Words On Youtube!</h1>
                    <p className="text-center">ユーチューブでたんごをさがそう!</p>
                </div>
                <div className="contents col-xs-offset-1 col-xs-10">
                    <div className="col-xs-12">
                        <form action="#" method="post">
                            <div className="form-group col-xs-offset-0 col-xs-12 col-md-offset-2 col-md-8">
                                <h3>Searching Vocab</h3>
                                <input className="form-control" type="text" placeholder="e.g. this"/>
                            </div>
                            <div className="form-group col-xs-offset-0 col-xs-12 col-md-offset-2 col-md-8">
                                <h3>Keyword on Youtube</h3>
                                <input className="form-control" type="text" placeholder="e.g. katy perry"/>
                            </div>
                            <div className="form-group col-xs-offset-0 col-xs-12 col-md-offset-2 col-md-8">
                                <h3>Category</h3>
                                <div className="sample">
                                    <input type="radio" name="s1" id="select1" value="1" checked="checked"/>
                                    <label htmlFor="select1">Music</label>
                                    <input type="radio" name="s2" id="select2" value="2"/>
                                    <label htmlFor="select2">Movie</label>
                                    <input type="radio" name="s3" id="select3" value="3"/>
                                    <label htmlFor="select3">Anime</label>
                                    <input type="radio" name="s4" id="select4" value="4"/>
                                    <label htmlFor="select4">Game</label>
                                    <input type="radio" name="s5" id="select5" value="5"/>
                                    <label htmlFor="select5">TED</label>
                                    <input type="radio" name="s6" id="select6" value="6"/>
                                    <label htmlFor="select6">その他</label>
                                </div>
                            </div>
                            <div className="col-xs-offset-0 col-xs-12 col-md-offset-2 col-md-8">
                                <button type="submit" className="btn btn-success btn-block">Search けんさく</button>
                                <button className="SearchResults" onClick = {() => this.props.changePage('SearchResults')}>
                                    SearchResults
                                </button>
                                <button className="Player" onClick = {() => this.props.changePage('Player')}>
                                    Player
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;
