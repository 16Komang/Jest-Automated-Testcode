import { diffLines } from 'diff';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Hello from '../helloword/Hello';

const readFileContent = (filePath) => {
  return fs.readFileSync(path.resolve(filePath), 'utf8');
};

const compareFiles = (studentCode, answerKeyCode) => {
  const studentLines = studentCode.split('\n');
  const answerKeyLines = answerKeyCode.split('\n');
  const differences = diffLines(studentCode, answerKeyCode);
  let hasDifferences = false;

  differences.forEach((part, index) => {
    if (part.added || part.removed) {
      hasDifferences = true;
      const lineNumber = index + 1;
      const lines = part.value.split('\n');
      lines.forEach((line, lineIndex) => {
        const actualLine = lineNumber + lineIndex;
        if (part.added) {
          console.log(`Added at line ${actualLine}: ${line}`);
        } else if (part.removed) {
          console.log(`Removed at line ${actualLine}: ${line}`);
        }
      });
    }
  });

  return !hasDifferences;
};

const studentFilePath = './src/components/irbaAdika/Hello.js';
const answerKeyFilePath = './src/components/kunci/Hello.js';
const studentCode = readFileContent(studentFilePath);
const answerKeyCode = readFileContent(answerKeyFilePath);

if (compareFiles(studentCode, answerKeyCode)) {
  console.log('✔ Kode sesuai dengan kunci jawaban. Melanjutkan ke pengujian otomatis...');

  global.alert = jest.fn();

  describe('Hello component', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('renders Toolbar component', () => {
      render(<Hello />);
      const buttonElement = screen.getByText(/HelloWord/i);
      expect(buttonElement).toBeInTheDocument();
      console.log('✔ renders Toolbar component');
    });

    test('calls handleHelloWorld function when button is clicked', () => {
      render(<Hello />);
      const buttonElement = screen.getByText(/HelloWord/i);
      fireEvent.click(buttonElement);

      expect(global.alert).toHaveBeenCalledTimes(2);
      expect(global.alert).toHaveBeenNthCalledWith(1, 'Hello!');
      expect(global.alert).toHaveBeenNthCalledWith(2, 'Goodbye!');
      console.log('✔ calls handleHelloWorld function when button is clicked');
    });

    test('fails if handleHelloWorld function does not show correct alerts', () => {
      render(<Hello />);
      const buttonElement = screen.getByText(/HelloWord/i);
      fireEvent.click(buttonElement);

      expect(global.alert).toHaveBeenCalledTimes(2);
      expect(global.alert).toHaveBeenNthCalledWith(1, 'Hello!');
      expect(global.alert).toHaveBeenNthCalledWith(2, 'Goodbye!');
      console.log('✔ fails if handleHelloWorld function does not show correct alerts');
    });
  });

  afterAll(() => {
    console.log('Pengujian selesai.');
  });
} else {
  console.log('❌ Kode tidak sesuai dengan kunci jawaban.');
}
