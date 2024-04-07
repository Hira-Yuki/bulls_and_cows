import { useState } from 'react';
import './App.css';
import { generateRandomNumber } from './Modules/random';
import Logs from './components/Logs';

const alertMessage = {
  needFourNumber: '4자리 숫자를 입력해주세요.',
  requiredOnlyNumber: '숫자만 입력해 주세요.',
  noDuplicated: '입력 값에 중복이 있어요.',
};

function App() {
  const [initialState, setInitialState] = useState({
    randomNumber: generateRandomNumber(),
    answer: '',
    logs: [],
    isSuccess: false,
  });

  const { randomNumber, answer, logs, isSuccess } = initialState;

  const handleAnswerChanged = (event) => {
    const newAnswer = event.target.value;
    setInitialState({ ...initialState, answer: newAnswer });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const answers = initialState.answer.split('').map(Number);

    if (answers.some((number) => isNaN(number))) {
      alert(alertMessage.requiredOnlyNumber);
      return;
    }

    if (answers.length !== 4) {
      alert(alertMessage.needFourNumber);
      setInitialState({ ...initialState, answer: '' });
      return;
    }

    const isDuplicate = answers.some((number) => {
      return answers.indexOf(number) !== answers.lastIndexOf(number);
    });

    if (isDuplicate) {
      alert(alertMessage.noDuplicated);
      return;
    }

    const { strike, ball } = randomNumber.reduce(
      (prev, cur, index) => {
        if (answers[index] === cur) {
          return {
            ...prev,
            strike: prev.strike + 1,
          };
        }
        if (answers.includes(cur)) {
          return {
            ...prev,
            ball: prev.ball + 1,
          };
        }
        return prev;
      },
      { strike: 0, ball: 0 }
    );

    if (strike === 4) {
      alert('정답입니다.');
      setInitialState({
        ...initialState,
        logs: [...logs, `${answer} (축하합니다. 정답입니다.)`],
        isSuccess: true,
      });
      return;
    }
    setInitialState({
      ...initialState,
      logs: [...logs, `${answer} (strike: ${strike}, ball: ${ball})`],
      answer: '',
    });
  };

  const handleRetry = () => {
    setInitialState({
      ...initialState,
      randomNumber: generateRandomNumber(),
      answer: '',
      logs: [],
      isSuccess: false,
    });
  };

  return (
    <div className="App">
      <h1>숫자 야구 게임</h1>
      <header className="header">
        {isSuccess ? `정답: ${answer}` : '----'}
      </header>
      <section>
        <form onSubmit={handleSubmit}>
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
            <button type="submit">맞춰보기</button>
          )}
        </form>
      </section>
      <Logs logs={logs} />
    </div>
  );
}

export default App;
