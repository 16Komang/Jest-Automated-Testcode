import { diffLines } from 'diff';
import fs from 'fs';
import path from 'path';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Swal from 'sweetalert2';
import TestCase3 from '../websitereact/TestCase3';

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
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
const studentFilePath = './src/components/irbaAdika/FormStyle.js';
const answerKeyFilePath = './src/components/kunci/FormStyle.js';

// Baca isi file
const studentCode = readFileContent(studentFilePath);
const answerKeyCode = readFileContent(answerKeyFilePath);

// Bandingkan file sebelum menjalankan pengujian
if (compareFiles(studentCode, answerKeyCode)) {
  console.log('✔ Kode sesuai dengan kunci jawaban. Melanjutkan ke pengujian otomatis...');

  // Define Jest tests
  describe('Login Component', () => {
    test('renders input fields, show password checkbox, and login button', () => {
      render(<TestCase3 />);

      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      const showPasswordCheckbox = screen.getByLabelText('Show Password');
      const loginButton = screen.getByRole('button', { name: /login/i });

      expect(usernameInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(showPasswordCheckbox).toBeInTheDocument();
      expect(loginButton).toBeInTheDocument();
    });

    test('toggles password visibility when show password checkbox is clicked', async () => {
      render(<TestCase3 />);

      const passwordInput = screen.getByPlaceholderText('Password');
      const showPasswordCheckbox = screen.getByLabelText('Show Password');

      expect(passwordInput).toHaveAttribute('type', 'password');
      await userEvent.click(showPasswordCheckbox);

      expect(passwordInput).toHaveAttribute('type', 'text');
      await userEvent.click(showPasswordCheckbox);

      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('shows success alert on successful login', async () => {
      render(<TestCase3 />);

      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      const loginButton = screen.getByRole('button', { name: /login/i });

      await userEvent.type(usernameInput, 'React');
      await userEvent.type(passwordInput, 'password');

      await act(async () => {
        await userEvent.click(loginButton);
        await new Promise((resolve) => setTimeout(resolve, 1100));
      });

      expect(Swal.fire).toHaveBeenCalled();

      const [[callArgs]] = Swal.fire.mock.calls;

      expect(callArgs).toEqual(expect.objectContaining({
        title: 'Login Successful!',
        text: 'Welcome, React!',
        icon: 'success'
      }));
    });

    test('shows error alert on failed login', async () => {
      render(<TestCase3 />);

      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      const loginButton = screen.getByRole('button', { name: /login/i });

      await userEvent.type(usernameInput, 'wronguser');
      await userEvent.type(passwordInput, 'wrongpassword');

      await act(async () => {
        await userEvent.click(loginButton);
        await new Promise((resolve) => setTimeout(resolve, 1100));
      });

      expect(Swal.fire).toHaveBeenCalled();

      const [[callArgs]] = Swal.fire.mock.calls;

      expect(callArgs).toEqual(expect.objectContaining({
        title: 'Login Failed!',
        text: 'Username atau password salah.',
        icon: 'error'
      }));
    });
  });
} else {
  console.log('❌ Kode tidak sesuai dengan kunci jawaban.');
}
