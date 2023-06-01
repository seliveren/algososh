import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import App from "../app/app";
import userEvent from "@testing-library/user-event";


const test1 = 'well';
const test2 = 'hello';
const test3 = 'm';
const test4 = ' ';

const result1 = ['l', 'l', 'e', 'w'];
const result2 = ['o', 'l', 'l', 'e', 'h'];
const result3 = ['m'];
const result4 = [''];

jest.setTimeout(10000);

describe('Test String algorithm', () => {

  it("string algorithm with even number of letters is correct", async () => {

    render(<App/>);

    const menuButton = screen.getAllByRole("link");
    fireEvent.click(menuButton[0]);

    const button = screen.getByTestId("button");
    const input = screen.getByTestId("input");

    fireEvent.change(input, {target: {value: test1}});
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[0]).toHaveTextContent(`${result1[0]}`);
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[0]).toHaveClass('modified');
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[1]).toHaveTextContent(`${result1[1]}`)
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[1]).toHaveClass('modified');
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[2]).toHaveTextContent(`${result1[2]}`)
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[2]).toHaveClass('modified');
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[3]).toHaveTextContent(`${result1[3]}`)
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[3]).toHaveClass('modified');
    }, {timeout: 2000});

  });


  it("string algorithm with odd number of letters is correct", async () => {

    render(<App/>);

    const button = screen.getByTestId("button");
    const input = screen.getByTestId("input");

    userEvent.type(input, '{backspace}{backspace}{backspace}{backspace}')
    fireEvent.change(input, {target: {value: test2}});
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[0]).toHaveTextContent(`${result2[0]}`);
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[0]).toHaveClass('modified');
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[1]).toHaveTextContent(`${result2[1]}`)
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[1]).toHaveClass('modified');
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[2]).toHaveTextContent(`${result2[2]}`)
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[2]).toHaveClass('modified');
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[2]).toHaveClass('modified');
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[3]).toHaveTextContent(`${result2[3]}`)
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[3]).toHaveClass('modified');
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[4]).toHaveTextContent(`${result2[4]}`)
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[4]).toHaveClass('modified');
    }, {timeout: 2000});

  });


  it("string algorithm with one letter is correct", async () => {

    render(<App/>);

    const button = screen.getByTestId("button");
    const input = screen.getByTestId("input");

    userEvent.type(input, '{backspace}{backspace}{backspace}{backspace}{backspace}')
    fireEvent.change(input, {target: {value: test3}})
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[0]).toHaveTextContent(`${result3[0]}`);
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getAllByTestId("circleColoured")[0]).toHaveClass('modified');
    }, {timeout: 2000});

  });


  it("string algorithm with empty array is correct", async () => {

    render(<App/>);

    const button = screen.getByTestId("button");
    const input = screen.getByTestId("input");

    userEvent.type(input, '{backspace}')
    fireEvent.change(input, {target: {value: test4}})
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId("circleColoured")).toHaveTextContent(`${result4[0]}`);
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getByTestId("circleColoured")).toHaveClass('modified');
    }, {timeout: 2000});
  });

});


