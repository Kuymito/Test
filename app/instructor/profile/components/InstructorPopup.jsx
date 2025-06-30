'use client';

import React from 'react';

const SpinnerIcon = () => (
    <svg className="animate-spin h-4 w-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const InstructorPopup = ({ show, onLogoutClick, instructorName = "Instructor", instructorEmail = "instructor@gmail.com", isNavigating, onNavigate }) => {
  if (!show) return null;

  return (
    <div className="instructor-popup absolute w-[299px] right-5 top-20 bg-white dark:bg-gray-700 shadow-custom-heavy rounded-[5px] z-[1000]">
      <div className="instructor-popup-header w-full h-[84px] bg-blue-600 dark:bg-blue-800 rounded-t-[5px] flex flex-col items-center justify-center p-2.5">
        <div className="instructor-popup-name font-poppins font-medium text-base leading-6 text-white">{instructorName}</div>
        <div className="instructor-popup-email font-sans font-normal text-xs leading-4 text-blue-200">{instructorEmail}</div>
      </div>
      <div className="instructor-popup-options p-2.5 flex flex-col">
        <div 
          onClick={() => onNavigate('/instructor/profile')}
          className={`popup-option w-full h-10 gap-4 bg-white dark:bg-gray-700 rounded-[5px] flex items-center px-4 mb-1.5 
            ${isNavigating 
              ? 'opacity-60 cursor-wait pointer-events-none' 
              : 'hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer'
            }
          `}
        >
          {isNavigating ? (
            <SpinnerIcon />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-blue-600 dark:text-blue-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          )}
          <div className="popup-option-text font-sans font-normal text-xs leading-[15px] text-blue-600 dark:text-blue-400">Edit Profile</div>
        </div>
        <div
          onClick={onLogoutClick}
          className="popup-option logout-option w-full h-10 gap-4 bg-white dark:bg-gray-700 rounded-[5px] flex items-center cursor-pointer px-4 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-red-500 dark:text-red-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
          </svg>
          <div className="popup-option-text font-sans font-normal text-xs leading-[15px] text-red-500 dark:text-red-400">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default InstructorPopup;