import React from 'react';
import PropTypes from 'prop-types';
const DashboxIcon = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-6 h-6  ${props.className}`}
      viewBox="0 0 24 24"
      fill="none"
    >
     <path d="M7.5 1V10H0.5V1H7.5ZM7.5 13V18H0.5V13H7.5ZM17.5 9V18H10.5V9H17.5ZM17.5 6H10.5V1H17.5V6Z" stroke="#FFFAFB"/>

       </svg>
  );
  DashboxIcon.propTypes = {
    className: PropTypes.string,
  };
  
  export default DashboxIcon;