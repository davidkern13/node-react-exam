import React from 'react';
import PropTypes from "prop-types";

const Title = ({title}) => {
   return (
    <div className="App--title">
        {title &&
          <h1>{title}</h1>
        }
      
    </div>
   );
};

Title.propTypes = {
    title: PropTypes.string,
};

export default Title;