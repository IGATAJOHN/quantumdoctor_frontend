import React from 'react';
import PropTypes from 'prop-types';
const PersonIcon = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-6 h-6  ${props.className}`}
      viewBox="0 0 24 24"
      fill="none"
    >
    <path d="M14.8211 4.5001C14.6636 6.62428 13.0533 8.35713 11.2855 8.35713C9.51767 8.35713 7.90454 6.62468 7.74986 4.5001C7.58915 2.29034 9.15607 0.643066 11.2855 0.643066C13.4149 0.643066 14.9818 2.33052 14.8211 4.5001Z" stroke="#004BA8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.2856 10.9285C7.79012 10.9285 4.24245 12.857 3.58595 16.4971C3.5056 16.9358 3.7551 17.3569 4.21473 17.3569H18.3568C18.8164 17.3569 19.0647 16.9358 18.9856 16.4971C18.3287 12.857 14.781 10.9285 11.2856 10.9285Z" stroke="#004BA8" strokeWidth="1.2" strokeMiterlimit="10"/>
<path d="M3.25 5.78589V10.2858" stroke="#004BA8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M5.49987 8.03564H1" stroke="#004BA8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>

     </svg>
  );
  PersonIcon.propTypes = {
    className: PropTypes.string,
  };
  
  export default PersonIcon;