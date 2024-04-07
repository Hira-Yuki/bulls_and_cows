import React from 'react';

const Form = ({
  handleSubmit,
  answer,
  handleAnswerChanged,
  isSuccess,
  handleRetry,
}) => {
  return (
    <section>
      <input
        type="text"
        value={answer}
        onChange={handleAnswerChanged}
        disabled={isSuccess}
      />
      {isSuccess ? (
        <button type="button" onClick={handleRetry}>
          다시하기
        </button>
      ) : (
        <button type="button" onClick={handleSubmit}>
          맞춰보기
        </button>
      )}
    </section>
  );
};

export default Form;
