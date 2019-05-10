import React from 'react';
import Image from 'react-image-resizer';
import icon from './icon.png'; // Tell Webpack this JS file uses this image
 
function Icon() {

    return (
      <div>
        <Image
          img src={icon} alt="icon" 
          //src="./logo.png"
          height={50}
          width={50}
        />
      </div>
    );
  
}

export default Icon;