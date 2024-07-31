import React, { useState } from 'react';

export default function Form() {
  const [nama, setNama] = useState('');
  const [inputNama, setInputNama] = useState('');

  return (
    <div>
      <h1>{nama}</h1>
      <input
        type="text"
        name="inputNama"
        value={inputNama}
        onChange={(e) => setInputNama(e.target.value)}
      />
      <button className="set-button" onClick={() => setNama(inputNama)}>Set Nama</button>
    </div>
  );
}
