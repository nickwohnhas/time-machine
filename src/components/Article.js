import React from 'react';

const Article = (props) => {
  return (
    <div>
      <li className="list-group-item list-group-item-light"><a href={props.url}>{props.headline}</a></li>
    </div>
  )
}

export default Article;
