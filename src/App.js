import { useState } from 'react';
import './App.css';
import { generateRandomNumber } from './Modules/random';
import Logs from './components/Logs';

function App() {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [answer, setAnswer] = useState('');
  const [logs, setLogs] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAnswerChanged = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const answers = answer.split('').map(Number);

    if (answers.some((number) => isNaN(number))) {
      alert('숫자만 입력해주세요.');
      return;
    }

    if (answers.length !== 4) {
      alert('4자리 숫자만 입력해주세요.');
      return;
    }

    const isDuplicate = answers.some((number) => {
      return answers.indexOf(number) !== answers.lastIndexOf(number);
    });

    if (isDuplicate) {
      alert('입력 값에 중복이 있어요.');
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
      setLogs([...logs, `${answer} (축하합니다. 정답입니다.)`]);
      setIsSuccess(true);
      return;
    }
    setLogs([...logs, `${answer} (strike: ${strike}, ball: ${ball})`]);

    setAnswer('');
  };

  const handleRetry = () => {
    setRandomNumber(generateRandomNumber());
    setAnswer('');
    setLogs([]);
    setIsSuccess(false);
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
