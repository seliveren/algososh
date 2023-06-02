import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen, fireEvent} from '@testing-library/react';
import {Button} from './button';


describe('Test Button component', () => {
  it("button without text is rendered correctly", () => {
    const ButtonComponent = renderer.create(<Button/>).toJSON();
    expect(ButtonComponent).toMatchSnapshot();
  });

  it("button with text is rendered correctly", () => {
    const props = {
      text: "Кнопка"
    };
    render(<Button {...props} />);
    const ButtonComponent = renderer.create(<Button {...props}/>).toJSON();
    expect(screen.getByRole('button')).toHaveTextContent('Кнопка');
    expect(ButtonComponent).toMatchSnapshot();
  });

  it("disabled button is rendered correctly", () => {
    const props = {
      disabled: true
    };
    render(<Button {...props} />);
    const ButtonComponent = renderer.create(<Button {...props}/>).toJSON();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(ButtonComponent).toMatchSnapshot();
  });

  it("loading button is rendered correctly", () => {
    const props = {
      isLoader: true
    };
    render(<Button {...props} />);
    const ButtonComponent = renderer.create(<Button {...props}/>).toJSON();
    expect(screen.getByAltText('Загрузка.')).not.toEqual(null);
    expect(ButtonComponent).toMatchSnapshot();
  });

  it("callback is executed when the button is pressed", () => {
    const callback = jest.fn();
    render(<Button text={"Click me!"} onClick={callback}/>);
    const button = screen.getByText("Click me!");
    fireEvent.click(button);
    expect(callback).toHaveBeenCalled();
  });

});


