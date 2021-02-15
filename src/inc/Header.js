import './Header.css';
import React,{useState} from 'react';

export default function Header({search}) {
  const [phrase, setPhrase] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    search(phrase);
  }

  return (
    <div id="header">
      <p>kjhkjjkhkjhkjhkjhkj</p>
      <form onSubmit={handleSubmit}>
        <input placeholder="Search..." onChange={e => setPhrase(e.target.value)}/>
        <button>Search</button>
      </form>
    </div>
  )
}
