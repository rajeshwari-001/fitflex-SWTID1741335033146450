import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('https://exercisedb.p.rapidapi.com/exercises', {
          headers: {
            'X-RapidAPI-Key': 'c2f267ca71msh48f53ff2fbed4bbp1d2ba4jsnd5aaec892a03', // Your API key
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
          },
          params: {
            limit: 20, // Limit to 20 exercises
          },
        });
        const enhancedExercises = response.data.map((exercise) => ({
          name: exercise.name,
          type: exercise.target || 'General',
          procedure: exercise.instructions.join(' ') || 'Follow standard form for this exercise.',
          photo: exercise.gifUrl || 'https://via.placeholder.com/300x200?text=Workout',
        }));
        setExercises(enhancedExercises);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };
    fetchExercises();
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <div className="logo">Fitset <span>GYM</span></div>
        <nav>
          <a href="#home">Home</a>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="nav-search"
          />
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>Fitness wonder</h1>
          <p>Get Started with Fitness gym Today!</p>
          <button>Start Your</button>
        </div>
      </section>

      <main className="app-main">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          />
        </div>
        <section className="exercise-section">
          <h2>Read More</h2>
          <div className="exercise-grid">
            {exercises
              .filter((exercise) =>
                exercise.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((exercise) => (
                <div key={exercise.name} className="exercise-card">
                  <img src={exercise.photo} alt={exercise.name} className="card-image" />
                  <h3>{exercise.name}</h3>
                  <p><strong>Type:</strong> {exercise.type}</p>
                  <p><strong>Procedure:</strong> {exercise.procedure}</p>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;