import React, { useState } from 'react';
import './GamesHome.css'; // Import CSS file for styling

// Importing images and game components
import Sudokuimage from './Sudokuimage.png';
import Memoryimage from './Memoryimage.jpeg';
import tictactoe from './tic-tac-toe.jpg';
import Sudoku from './Games/games/sudokogame/Sudoko.js';
import MagicMatch from './Games/games/MemoryGame.js';
import Tictactoe from './Games/games/TicTacToe/titactoe.js'

function HomePage() {
    const [selectedGame, setSelectedGame] = useState(null);

    const handlePlayClick = (game) => {
        setSelectedGame(game);
    };

    return (
        <div className='gamer'>
        <div className="home-page">
            <div className="game-cards">
                <div className="card">
                    <img className="card-img" src={tictactoe} alt="Tic Tac Toe" />
                    <button className="play-now" onClick={() => handlePlayClick('Tictactoe')}>
                        Play Now
                    </button>
                </div>

                <div className="card">
                    <img className="card-img" src={Sudokuimage} alt="Sudoku" />
                    <button className="play-now" onClick={() => handlePlayClick('Sudoku')}>
                        Play Now
                    </button>
                </div>

                <div className="card">
                    <img className="card-img" src={Memoryimage} alt="Memory" />
                    <button className="play-now" onClick={() => handlePlayClick('memory')}>
                        Play Now
                    </button>
                </div>
            </div>

            {selectedGame === 'Tictactoe' && <Tictactoe />}
            {selectedGame === 'Sudoku' && <Sudoku />}
            {selectedGame === 'memory' && <MagicMatch />}
        </div>
        </div>
    );
}

export default HomePage;
