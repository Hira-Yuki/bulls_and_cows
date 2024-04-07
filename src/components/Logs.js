import React from 'react';

const Logs = ({logs}) => {

  return (
    <>
      <h2>기록</h2>
      <ol>
        {logs.map((log, index) => {
          return <li key={`${log}_${index}`}>{log}</li>;
        })}
      </ol>
    </>
  );
};

export default Logs;
