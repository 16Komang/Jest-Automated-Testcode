import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import './Home.css';

const Home = ({ username}) => {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <header className="home-header">
          <h1>Selamat Datang, {username}</h1>
          <p>Mari Belajar UI Interactive Dengan Reactjs</p>
        </header>
        <section className="features">
          <div className="feature-card">
            <h2>Membuat TodoList</h2>
            <a href='/todolist' className="feature-link">Mencatat Kegiatan Yang Kamu Lakukan.</a>
          </div>
          <div className="feature-card">
            <h2>Membuat Calculator</h2>
            <a href='/calculator' className="feature-link">Melakukan Perhitungan Angka.</a>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
