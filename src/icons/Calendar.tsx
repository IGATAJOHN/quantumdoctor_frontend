import React from 'react';
import PropTypes from 'prop-types';
const CalendarIcon = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-6 h-6  ${props.className}`}
      viewBox="0 0 24 24"
      fill="none"
    >
    <path d="M3.91667 1.5V3.25M12.0833 1.5V3.25M1 13.75V5C1 4.53587 1.18437 4.09075 1.51256 3.76256C1.84075 3.43437 2.28587 3.25 2.75 3.25H13.25C13.7141 3.25 14.1592 3.43437 14.4874 3.76256C14.8156 4.09075 15 4.53587 15 5V13.75M1 13.75C1 14.2141 1.18437 14.6592 1.51256 14.9874C1.84075 15.3156 2.28587 15.5 2.75 15.5H13.25C13.7141 15.5 14.1592 15.3156 14.4874 14.9874C14.8156 14.6592 15 14.2141 15 13.75M1 13.75V7.91667C1 7.45254 1.18437 7.00742 1.51256 6.67923C1.84075 6.35104 2.28587 6.16667 2.75 6.16667H13.25C13.7141 6.16667 14.1592 6.35104 14.4874 6.67923C14.8156 7.00742 15 7.45254 15 7.91667V13.75M8 9.08333H8.00622V9.08956H8V9.08333ZM8 10.8333H8.00622V10.8396H8V10.8333ZM8 12.5833H8.00622V12.5896H8V12.5833ZM6.25 10.8333H6.25622V10.8396H6.25V10.8333ZM6.25 12.5833H6.25622V12.5896H6.25V12.5833ZM4.5 10.8333H4.50622V10.8396H4.5V10.8333ZM4.5 12.5833H4.50622V12.5896H4.5V12.5833ZM9.75 9.08333H9.75622V9.08956H9.75V9.08333ZM9.75 10.8333H9.75622V10.8396H9.75V10.8333ZM9.75 12.5833H9.75622V12.5896H9.75V12.5833ZM11.5 9.08333H11.5062V9.08956H11.5V9.08333ZM11.5 10.8333H11.5062V10.8396H11.5V10.8333Z" stroke="#004BA8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>

    </svg>
  );
  CalendarIcon.propTypes = {
    className: PropTypes.string,
  };
  
  export default CalendarIcon;