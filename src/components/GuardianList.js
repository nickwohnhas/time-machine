import React from 'react';
import Article from './Article';

class GuardianList extends React.Component {

handleResponse = (props) => {
  const articleArray = this.props.response.results
    return articleArray.map((article) => ({ url: article.webUrl, headline: article.webTitle }))
}
  render() {
    console.log(this.props.response.results)
    const list = this.handleResponse()
    return (
      <div>
      <h3>Articles from the Guardian on this day:</h3>

        {list.map((articleHash) => (
          <Article url={articleHash.url} headline={articleHash.headline} />
          ))}

      </div>
    )
  }
}

export default GuardianList;
