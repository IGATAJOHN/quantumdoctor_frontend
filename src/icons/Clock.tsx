import React from 'react';
import PropTypes from 'prop-types';
const ClockIcon = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-6 h-6  ${props.className}`}
      viewBox="0 0 24 24"
      fill="none"
    >
     <path d="M9 18C4.04803 18 0 13.952 0 9C0 4.04803 4.04803 0 9 0C13.952 0 18 4.04803 18 9C18.0393 13.952 13.9913 18 9 18ZM9 0.943229C4.55895 0.943229 0.982533 4.55895 0.982533 8.9607C0.982533 13.3624 4.59825 16.9782 9 16.9782C13.4017 16.9782 17.0175 13.3624 17.0175 8.9607C17.0175 4.55895 13.441 0.943229 9 0.943229Z" fill="#004BA8"/>
<path d="M11.8296 13.5983L8.48901 10.2577V4.16602H9.55014V9.8254L12.5763 12.8516L11.8296 13.5983Z" fill="#004BA8"/>

    </svg>
  );
  ClockIcon.propTypes = {
    className: PropTypes.string,
  };
  
  export default ClockIcon;