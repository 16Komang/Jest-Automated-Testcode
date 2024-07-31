import React from 'react';
export default function Hello() {
    const handleHelloWorld = () => {
        alert('Hello!');
        alert('Goodbye!');
  
    };
    return (
        <Toolbar
        onHelloWord={handleHelloWorld}
        />
    );
}
function Toolbar({onHelloWord}){
    return (
        <div>
            <Button onClick={onHelloWord}>HelloWord</Button>
        </div>
    );

}

function Button({ onClick, children }) {
    return (
      <button onClick={onClick}>
        {children}
      </button>
    );
  }
  