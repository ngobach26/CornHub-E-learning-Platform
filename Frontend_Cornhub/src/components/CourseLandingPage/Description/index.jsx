import React from 'react';
import DOMPurify from 'dompurify';

const Description = ({ description }) => {
  if (!description) return null;

  return (
    <div>
      <h3 className='mb-4 text-2xl font-bold'>Description</h3>
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
      />
    </div>
  );
};

export default Description;