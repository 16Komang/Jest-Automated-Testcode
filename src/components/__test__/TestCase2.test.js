import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import user from '@testing-library/user-event';
import TestCase2 from '../form/TestCase2';
import assert from 'assert';
import { diffLines } from 'diff';
import fs from 'fs';
import path from 'path';

// Fungsi untuk membaca file
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

// Path file mahasiswa dan kunci jawaban
const studentFilePath = './src/components/irbaAdika/Form.js';
const answerKeyFilePath = './src/components/kunci/Form.js';

// Baca konten file
const studentCode = readFileContent(studentFilePath);
const answerKeyCode = readFileContent(answerKeyFilePath);

// Bandingkan file sebelum menjalankan pengujian
if (compareFiles(studentCode, answerKeyCode)) {
  console.log('✔ Kode sesuai dengan kunci jawaban. Melanjutkan ke pengujian otomatis...');

  // Define Jest tests
  describe('TestCase2', () => {
    test('renders username and password inputs correctly', () => {
      render(<TestCase2 />);
      const usernameInput = screen.getByPlaceholderText('Username');
      assert.ok(usernameInput, 'Username input should be rendered');
      const passwordInput = screen.getByPlaceholderText('Password');
      assert.ok(passwordInput, 'Password input should be rendered');
    });

    test('login fails with incorrect credentials', async () => {
      const originalAlert = window.alert;
      window.alert = jest.fn();

      render(<TestCase2 />);
      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      const loginButton = screen.getByRole('button', { name: 'Login' });

      await user.type(usernameInput, 'wrongusername');
      await user.type(passwordInput, 'wrongpassword');
      await user.click(loginButton);

      assert.strictEqual(screen.queryByText('Halo, wrongusername!'), null, 'Username greeting should not be displayed');
      assert.strictEqual(window.alert.mock.calls.length, 1, 'Alert should be called once');
      assert.strictEqual(window.alert.mock.calls[0][0], 'Login gagal.', 'Alert message should be "Login gagal."');

      window.alert = originalAlert;
    });

    test('login succeeds with correct credentials', async () => {
      render(<TestCase2 />);
      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      const loginButton = screen.getByRole('button', { name: 'Login' });

      await user.type(usernameInput, 'admin');
      await user.type(passwordInput, 'password');
      await user.click(loginButton);

      assert.ok(screen.getByText('Halo, admin!'), 'Successful login message should be displayed');
    });
  });
} else {
  console.log('❌ Kode tidak sesuai dengan kunci jawaban.');
}
