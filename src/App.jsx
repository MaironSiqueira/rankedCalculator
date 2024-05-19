import React, { useState } from 'react';
import './App.css';

function App() {
  const [rankedPoints, setRankedPoints] = useState({ wins: '', defeats: '' });
  const [pointList, setPointList] = useState([]);
  const [wasSent, setWasSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Vitórias:', rankedPoints.wins);
    console.log('Derrotas:', rankedPoints.defeats);

    setWasSent(true);

    const balance = parseInt(rankedPoints.wins) - parseInt(rankedPoints.defeats);
    let level = '';

    switch (true) {
      case balance < 10:
        level = 'Ferro';
        break;
      case balance >= 10 && balance <= 20:
        level = 'Bronze';
        break;
      case balance >= 21 && balance <= 50:
        level = 'Prata';
        break;
      case balance >= 51 && balance <= 80:
        level = 'Ouro';
        break;
      case balance >= 81 && balance <= 90:
        level = 'Diamante';
        break;
      case balance >= 91 && balance <= 100:
        level = 'Lendário';
        break;
      case balance >= 101:
        level = 'Imortal';
        break;
      default:
        level = '';
    }

    setPointList([{ wins: rankedPoints.wins, defeats: rankedPoints.defeats, level }, ...pointList]);

    setRankedPoints({ wins: '', defeats: '' });
  };


  return (
    <>
      <h1>Classificador de Nível de Herói</h1>

      <form className="input-group" onSubmit={handleSubmit}>
        <span className="input-group-text">Quantidade de vitórias e derrotas</span>

        <input
          type="text"
          aria-label="Name"
          className="form-control"
          value={rankedPoints.wins}
          onChange={(event) => setRankedPoints({ ...rankedPoints, wins: event.target.value })}
        />
        <input
          type="number"
          aria-label="Experience"
          className="form-control"
          value={rankedPoints.defeats}
          onChange={(event) => setRankedPoints({ ...rankedPoints, defeats: event.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">Enviar</button>
      </form>

      {wasSent && (
        <div className="result">
          <h2>Últimas pontuações:</h2>
          {pointList.map((point, i) => (
            <div className="list" key={i}>
              <p>O Herói tem de saldo de {parseInt(point.wins) - parseInt(point.defeats)} está no nível de {point.level}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
