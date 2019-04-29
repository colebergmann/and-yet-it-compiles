import React from 'react';
import logo from './Magic Minutes Transparent.png'; // Tell Webpack this JS file uses this image

console.log(Magic Minutes Transparent); // /logo.84287d09.png

function Logo() {
  // Import result is the URL of your image
  return <img src={logo} alt="Magic Minutes Transparent" />;
}

export default Logo;