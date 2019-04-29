import React from 'react';
import Article from './Article';
class NYTList extends React.Component {

  monthName = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
   return months[this.props.month]
  }

  articleArray = (props) => (this.props.test.response.docs.slice(0,10))

render() {
  const month = this.monthName()
  const articleArray = this.articleArray()
    return (
      <div>
      <b>Here is a list of New York Times articles from {month} of {this.props.year}:</b>
      <ul>
      {articleArray.map((articleObject) => (<Article url={articleObject.web_url} headline={articleObject.headline.main} />))}
      </ul>
      </div>
    )
  }
}

export default NYTList;
