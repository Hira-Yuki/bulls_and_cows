import React from 'react';

const Header = ({ label, isSuccess, answer }) => {
  return (
    <>
      <h1>{label}</h1>
      <header className="header">
        {isSuccess ? `정답: ${answer}` : '----'}
      </header>
    </>
  );
};

export default Header;
