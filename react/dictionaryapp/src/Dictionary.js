import React, { useState } from 'react';

const Dictionary = () => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e) => {
    setWord(e.target.value);
  };


  const fetchMeaning = async () => {
    if (!word.trim()) return;

    setIsLoading(true);
    setError('');
    setMeaning('');

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();

      if (data.title) {
        setError('Word not found!');
      } else {
       
        const wordMeaning = data[0].meanings[0].definitions[0].definition;
        setMeaning(wordMeaning);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dictionary-container">
      <input
        type="text"
        value={word}
        onChange={handleChange}
        placeholder="Enter a word..."
      />
      <button onClick={fetchMeaning}>Search</button>

      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {meaning && <p className="meaning">Meaning: {meaning}</p>}
    </div>
  );
};

export default Dictionary;
