import React from 'react';
import Showcard from './Showcard';
import IMAGE_NOT_FOUND from '../../image/not-found.png';

const Showgrid = ({ data }) => {
  return (
    <div>
      {data.map(({ show }) => (
        <Showcard
          key={show.id}
          id={show.id}
          name={show.name}
          image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
          summary={show.summary}
        />
      ))}
    </div>
  );
};

export default Showgrid;
