import React from 'react';

const Article = (props) => {
  return (
    <div>
      <li><a href={props.url}>{props.headline}</a></li>
    </div>
  )
}

export default Article;
