import React, { useState } from 'react';
import axios from 'axios';
import PaymentModal from './PaymentModal';
import sooseki1 from '../assets/images/sooseki1.jpg';
import unst1 from '../assets/images/unst1.jpg';
import radha1 from '../assets/images/radha1.jpeg';
import sooseki from '../assets/audios/sooseki.mp3';
import unst from '../assets/audios/unst.mp3';
import radha from '../assets/audios/radha.mp3';

const songs = [
    {
        id: 1,
        title: 'Song 1',
        image: sooseki1,
        audio: unst,
        className: 'sooseki1'
    },
    {
        id: 2,
        title: 'Song 2',
        image: unst1,
        audio: sooseki,
        className: 'unst1'
    },
    {
        id: 3,
        title: 'Song 3',
        image: radha1,
        audio: radha,
        className: 'radha1'
    }
];

const MusicPlayer = () => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null);

    const handleDownload = (songId) => {
        setSelectedSong(songId);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalSubmit = async (paymentInfo) => {
        const paymentDetails = { ...paymentInfo, songId: selectedSong, price: 5, userId: 'user123' };

        try {
            await axios.post('/api/payments', paymentDetails);
            alert('Payment successful. Details saved to MongoDB.');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving payment details:', error);
            alert('Payment failed.');
        }
    };

    const handleImageClick = (imageClass) => {
        console.log(`Image ${imageClass} clicked`);
        // Add any specific functionality for each image here
    };

    return (
        <div className="app-container">
            <div className="music-player">
                {songs.map(song => (
                    <div key={song.id} className="card">
                        <img
                            src={song.image}
                            alt={song.title}
                            className={`card-image ${song.className}`}
                            onClick={() => handleImageClick(song.className)}
                        />
                        <div className="card-content">
                            <h2 className="card-title">{song.title}</h2>
                            <audio controls src={song.audio}></audio>
                            <div className="button-container">
                                <button onClick={() => handleDownload(song.id)} className="download-button">
                                    Download for $5
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {currentSong && <audio controls autoPlay src={currentSong.audio} />}
            </div>
            <PaymentModal
                isOpen={isModalOpen}
                onRequestClose={handleModalClose}
                onSubmit={handleModalSubmit}
            />
        </div>
    );
};

const styles = `

   .app-container {
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    flex-direction: column;
    padding: 20px;
    background-color: #f8f9fa;
    min-height: 100vh; /* Full viewport height */
    background: url('C:\Users\ghari\Downloads\Project\my-react-app\src\Components\Images\image2.jpg') no-repeat fixed center center;
}

.music-player {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center; /* Center the cards horizontally */
}

.card {
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 250px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s;
}

.card:hover {
    transform: scale(1.05);
}

.card-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 15px;
}

.card-title {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #333;
    text-align: center;
}

.button-container {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
}

.download-button {
    background-color: #28a745;
    color: #fff;
    border: none;
    padding: 10px 50px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.download-button:hover {
    background-color: #218838;
}

.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
}

.modal h2 {
    color: rgb(16, 17, 17);
    margin-top: 0;
}

.modal form div {
    margin-bottom: 15px;
}

.modal form label {
    color: black;
    display: block;
    margin-bottom: 5px;
}

.modal form input {
    color: #1e1e1f;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.modal form button {
    width: 100%;
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.modal form button:hover {
    background: #0056b3;
}

`;

const injectStyles = () => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
};

injectStyles();

export default MusicPlayer;
