import React, { Component } from 'react';

import Comments from './Comments';
import Newcomment from './NewComment'

import { database } from './firebase'

export default class App extends Component {
  state = {
    comments:{},
    isLoading : false
  }

  sendComment = comment =>{
    const id = database.ref().child('comments').push().key;
    const comments = {}
    comments['comments/'+id] = { comment }
    console.log(comments)
    database.ref().update(comments)

    // this.setState({
    //   comments:[...this.state.comments,comment + ' ' + id],
    // })
  }

  componentDidMount(){
    this.setState({isLoading :true})
    this.comments = database.ref('comments');
    this.comments.on('value', snapshot =>{
      this.setState({
        comments:snapshot.val(),
        isLoading:false
      })
    })
  }

  render() {
    return (
      <div>
      <Newcomment sendComment={this.sendComment} />
      <Comments comments= {this.state.comments}/>
      {this.state.isLoading && <p>Carregando...</p>}
      </div>
    );
  }
}
