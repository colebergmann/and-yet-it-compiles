import React from 'react';
import Image from 'react-image-resizer';
import disneylandcur from './disneylandcur.jpg';
import "./center.css"
 
function DisneylandCur() {

    return (
      <div>
          <Image
          img src={disneylandcur} alt="disneylandcur" className="center"
          //src="./logo.png"
          height={450}
          width={900}
          //style={{alignSelf:'center'}}
        />
      </div>
    );
  
}

export default DisneylandCur;