import { diffLines } from 'diff';
import fs from 'fs';
import path from 'path';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { Counter } from '../counter/Counter';

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
const studentFilePath = './src/components/irbaAdika/Counter.js';
const answerKeyFilePath = './src/components/kunci/Counter.js';

// Baca konten file
const studentCode = readFileContent(studentFilePath);
const answerKeyCode = readFileContent(answerKeyFilePath);

// Bandingkan file sebelum menjalankan pengujian
if (compareFiles(studentCode, answerKeyCode)) {
  console.log('✔ Kode sesuai dengan kunci jawaban. Melanjutkan ke pengujian otomatis...'); 

  // Define Jest tests
  describe('Counter component', () => {
    test('renders correctly', () => {
      render(<Counter />);
      expect(screen.getByRole('heading')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Decrement' })).toBeInTheDocument();
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Set' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Increment' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    });

    test('renders a count of 0', () => {
      render(<Counter />);
      expect(screen.getByRole('heading')).toHaveTextContent('0');
    });

    test('renders a count of -1 after clicking the decrement button', async () => {
      render(<Counter />);
      await userEvent.click(screen.getByRole('button', { name: 'Decrement' }));
      expect(screen.getByRole('heading')).toHaveTextContent('-1');
    });

    test('renders a count of -2 after clicking the decrement button twice', async () => {
      render(<Counter />);
      await userEvent.click(screen.getByRole('button', { name: 'Decrement' }));
      await userEvent.click(screen.getByRole('button', { name: 'Decrement' }));
      expect(screen.getByRole('heading')).toHaveTextContent('-2');
    });

    test('renders a count of 10 after clicking the set button', async () => {
      render(<Counter />);
      await userEvent.type(screen.getByRole('spinbutton'), '10');
      await userEvent.click(screen.getByRole('button', { name: 'Set' }));
      expect(screen.getByRole('heading')).toHaveTextContent('10');
    });

    test('renders a count of 1 after clicking the increment button', async () => {
      render(<Counter />);
      await userEvent.click(screen.getByRole('button', { name: 'Increment' }));
      expect(screen.getByRole('heading')).toHaveTextContent('1');
    });

    test('renders a count of 2 after clicking the increment button twice', async () => {
      render(<Counter />);
      await userEvent.click(screen.getByRole('button', { name: 'Increment' }));
      await userEvent.click(screen.getByRole('button', { name: 'Increment' }));
      expect(screen.getByRole('heading')).toHaveTextContent('2');
    });

    test('renders a count of 0 after clicking the reset button', async () => {
      render(<Counter />);
      await userEvent.click(screen.getByRole('button', { name: 'Increment' }));
      await userEvent.click(screen.getByRole('button', { name: 'Reset' }));
      expect(screen.getByRole('heading')).toHaveTextContent('0');
    });

    test('elements are focused in the right order', async () => {
      render(<Counter />);
      const decrementButton = screen.getByRole('button', { name: 'Decrement' });
      const amountInput = screen.getByRole('spinbutton');
      const setButton = screen.getByRole('button', { name: 'Set' });
      const incrementButton = screen.getByRole('button', { name: 'Increment' });
      const resetButton = screen.getByRole('button', { name: 'Reset' });

      await userEvent.tab();
      expect(document.activeElement).toBe(decrementButton);

      await userEvent.tab();
      expect(document.activeElement).toBe(amountInput);

      await userEvent.tab();
      expect(document.activeElement).toBe(setButton);

      await userEvent.tab();
      expect(document.activeElement).toBe(incrementButton);

      await userEvent.tab();
      expect(document.activeElement).toBe(resetButton);
    });
  });
} else {
  console.log('❌ Kode tidak sesuai dengan kunci jawaban.');
}
