import { diffLines } from 'diff';
import fs from 'fs';
import path from 'path';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Swal from 'sweetalert2';
import Navbar from '../websitereact/Navbar';
import { MemoryRouter } from 'react-router-dom';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Fungsi untuk membaca isi file
const readFileContent = (filePath) => {
  return fs.readFileSync(path.resolve(filePath), 'utf8');
};

// Fungsi untuk membandingkan dua string kode
const compareFiles = (studentCode, answerKeyCode) => {
  const differences = diffLines(studentCode, answerKeyCode);
  const hasDifferences = differences.some(part => part.added || part.removed);

  if (hasDifferences) {
    differences.forEach((part, index) => {
      if (part.added || part.removed) {
        console.log(`Difference at line ${index + 1}: ${part.value}`);
      }
    });
    return false;
  }
  return true;
};

// Path file komponen mahasiswa dan kunci jawaban
const studentFilePath = './src/components/irbaAdika/Navbar.js';
const answerKeyFilePath = './src/components/kunci/Navbar.js';

// Baca isi file
const studentCode = readFileContent(studentFilePath);
const answerKeyCode = readFileContent(answerKeyFilePath);

// Bandingkan file sebelum menjalankan pengujian
if (compareFiles(studentCode, answerKeyCode)) {
  console.log('✔ Kode sesuai dengan kunci jawaban. Melanjutkan ke pengujian otomatis...');

  describe('Navbar', () => {
    test('renders correctly', () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );

      const homeLink = screen.getByRole('link', { name: 'Home' });
      expect(homeLink).toBeInTheDocument();

      const todolistLink = screen.getByRole('link', { name: 'Todolist' });
      expect(todolistLink).toBeInTheDocument();

      const calculatorLink = screen.getByRole('link', { name: 'Calculator' });
      expect(calculatorLink).toBeInTheDocument();

      const logoutButton = screen.getByRole('button', { name: 'Logout' });
      expect(logoutButton).toBeInTheDocument();
    });

    test('shows logout confirmation on logout button click', async () => {
      Swal.fire.mockResolvedValueOnce({ isConfirmed: true });

      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );

      const logoutButton = screen.getByRole('button', { name: 'Logout' });
      await userEvent.click(logoutButton);

      await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({
          title: 'Logout',
          text: 'Apakah Anda yakin ingin logout?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Ya',
          cancelButtonText: 'Tidak',
        }));
      });
    });

    test('navigates to home on confirm logout', async () => {
      Swal.fire.mockResolvedValueOnce({ isConfirmed: true });

      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );

      const logoutButton = screen.getByRole('button', { name: 'Logout' });
      await userEvent.click(logoutButton);

      await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({
          title: 'Logout',
          text: 'Apakah Anda yakin ingin logout?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Ya',
          cancelButtonText: 'Tidak',
        }));
      });

      await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({
          title: 'Logged Out',
          text: 'You have been successfully logged out.',
          icon: 'info',
          timer: 1000,
          timerProgressBar: true,
          willClose: expect.any(Function),
        }));
      });

      const willCloseCallback = Swal.fire.mock.calls[1][0].willClose;
      willCloseCallback();

      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    test('does not navigate to home on cancel logout', async () => {
      Swal.fire.mockResolvedValueOnce({ isConfirmed: false });

      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );

      const logoutButton = screen.getByRole('button', { name: 'Logout' });
      await userEvent.click(logoutButton);

      await waitFor(() => {
        expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({
          title: 'Logout',
          text: 'Apakah Anda yakin ingin logout?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Ya',
          cancelButtonText: 'Tidak',
        }));
      });

      expect(Swal.fire).not.toHaveBeenCalledWith(expect.objectContaining({
        title: 'Logged Out',
        text: 'You have been successfully logged out.',
        icon: 'info',
        timer: 1000,
        timerProgressBar: true,
      }));

      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
} else {
  console.log('❌ Kode tidak sesuai dengan kunci jawaban.');
}
