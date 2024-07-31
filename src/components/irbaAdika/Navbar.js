import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout',
      text: 'Apakah Anda yakin ingin logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Logged Out',
          text: 'You have been successfully logged out.',
          icon: 'info',
          timer: 1000,
          timerProgressBar: true,
          willClose: () => {
            navigate('/');
          }
        });
      }
    });
  };

  return (
    <nav className="navbar"> 
      <ul className="navbar-list"> 
        <li className="navbar-item"><a href="/home" className="navbar-link">Home</a></li> 
        <li className="navbar-item"><a href="/todolist" className="navbar-link">Todolist</a></li>
        <li className="navbar-item"><a href="/calculator" className="navbar-link">Calculator</a></li>
        <li className="navbar-item"><button onClick={handleLogout} className="logout-button">Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
