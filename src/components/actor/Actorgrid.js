import React from 'react';
import Actorcard from './Actorcard';
import IMAGE_NOT_FOUND from '../../image/not-found.png';


const Actorgrid = ({ data }) => {
  return (
    <div>
      {data.map(({ person }) => (
        <Actorcard
          key={person.id}
          name={person.name}
          country={person.country ? person.country.name : null}
          birthday={person.birthday}
          deathday={person.deathday}
          gender={person.gender}
          image={person.image? person.image.medium:IMAGE_NOT_FOUND}
        />
      ))}
    </div>
  );
};

export default Actorgrid;
