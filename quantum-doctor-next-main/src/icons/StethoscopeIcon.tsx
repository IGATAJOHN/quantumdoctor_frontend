import React from 'react';
import PropTypes from 'prop-types';
const StethoscopeIcon = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-6 h-6  ${props.className}`}
      viewBox="0 0 24 24"
      fill="none"
    >
     <path d="M16.12 12.3C17.3129 12.3 18.28 11.3329 18.28 10.14C18.28 8.94705 17.3129 7.97998 16.12 7.97998C14.927 7.97998 13.96 8.94705 13.96 10.14C13.96 11.3329 14.927 12.3 16.12 12.3Z" stroke="#004BA8" strokeWidth="1.2" strokeLinejoin="bevel"/>
<path d="M8.92 1.5H11.08V5.1C11.08 6.43669 10.549 7.71863 9.60382 8.66382C8.65864 9.609 7.37669 10.14 6.04 10.14C5.79907 10.1414 5.55838 10.1245 5.32 10.0896C4.12026 9.91643 3.02313 9.31667 2.22969 8.40026C1.43626 7.48384 0.999689 6.31217 1 5.1V1.5H3.16" stroke="#004BA8" strokeWidth="1.2" strokeLinejoin="bevel"/>
<path d="M16.12 12.3V14.46C16.12 15.7967 15.589 17.0786 14.6439 18.0238C13.6987 18.969 12.4167 19.5 11.08 19.5C9.74335 19.5 8.4614 18.969 7.51622 18.0238C6.57104 17.0786 6.04004 15.7967 6.04004 14.46V10.0896" stroke="#004BA8" strokeWidth="1.2" strokeLinejoin="bevel"/>
<path d="M7.4801 10.1399H4.6001V11.5799H7.4801V10.1399Z" stroke="#004BA8" strokeWidth="1.2" strokeLinejoin="bevel"/>

    </svg>
  );
  StethoscopeIcon.propTypes = {
    className: PropTypes.string,
  };
  
  export default StethoscopeIcon;
  