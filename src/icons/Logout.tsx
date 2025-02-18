import React from 'react';
import PropTypes from 'prop-types';
const LogoutIcon = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-6 h-6  ${props.className}`}
      viewBox="0 0 24 24"
      fill="none"
    >
    <path d="M6.04004 11H19" stroke="#FFFAFB" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.91 0.919922H3.25C1.99 0.919922 1 1.90992 1 3.07992V18.8299C1 20.0899 1.99 21.0799 3.25 21.0799H9.91" stroke="#FFFAFB" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15.5801 7.58008L19.0001 11.0001L15.5801 14.4201" stroke="#FFFAFB" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>

    </svg>
  );
  LogoutIcon.propTypes = {
    className: PropTypes.string,
  };
  
  export default LogoutIcon;