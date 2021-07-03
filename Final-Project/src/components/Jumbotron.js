import React from "react";
import PropTypes from "prop-types";

export default function Jumbotron({ src, alt, imgStyle, children }) {
  return (
    <div>
      <div className="jumbotron">
        <img src={src} alt={alt} style={imgStyle}></img>
        <div className="overlay"></div>
        <div className="message">{children}</div>
      </div>
    </div>
  );
}

Jumbotron.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  imgStyle: PropTypes.object,
  children: PropTypes.node,
};
