import React from 'react';

const NYTList = (props) => {
  console.log(props)
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const monthName = months[props.month]
  const objArray = props.test.response.docs.map((article) => (article.headline.main))
  return (
    <div>
    <b>Here is a list of New York Times articles from {monthName} of {props.year}:</b>
      <ul>
      {objArray.map((article) => (<li>{article}</li>)) }
      </ul>
    </div>
  )
}

export default NYTList;
