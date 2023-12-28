import React from 'react';

const Meta = (props) => {
  const { title, subtitle } = props;

  return (
    <>
      <title>{title}</title>
      <meta name='description' content={subtitle} />
      <meta name='title' content={title} />
    </>
  );
};

export default Meta;
