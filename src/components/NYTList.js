import React from 'react';
import Article from './Article';
class NYTList extends React.Component {

articleArray = (props) => (this.props.test.response.docs.slice(0,10))

render() {
  const articleArray = this.articleArray()
    return (
      <div>
        <h3>Here is a list of New York Times articles from that month:</h3>

      {articleArray.map((articleObject) => (<Article url={articleObject.web_url} headline={articleObject.headline.main} />))}

      </div>
    )
  }
}

export default NYTList;
