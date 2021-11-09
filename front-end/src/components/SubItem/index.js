import React from 'react';
import PropTypes from "prop-types";

const SubItem = ({asksR, item, style}) => {
   return (
        <li key={item}>
            <div className={`${asksR ? 'bg-green reverse' : 'bg-red'}`}>
                {
                    item[0] &&
                    <p className={`${asksR ? 'f-child-reverse' : 'f-child'}`} style={style}>{item[0]}</p>
                }
        
                {
                    item[1] &&
                    <p style={style}>{item[1]}</p>
                }
                
            </div>
        </li>
   );
};

SubItem.propTypes = {
    asksR: PropTypes.bool,
    item: PropTypes.any
};

export default SubItem;