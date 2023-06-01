import React from 'react';
import renderer from 'react-test-renderer';
import {render, screen, within} from '@testing-library/react';
import {Circle} from './circle';
import {ElementStates} from "../../../types/element-states";


describe('Test Circle component', () => {
  it("circle without letter is rendered correctly", () => {
    const CircleComponent = renderer.create(<Circle/>).toJSON();
    expect(CircleComponent).toMatchSnapshot();
  });

  it("circle with letter is rendered correctly", () => {
    const props = {
      letter: "5"
    };
    const CircleComponent = renderer.create(<Circle {...props}/>).toJSON();
    render(<Circle {...props} />);
    expect(screen.getByTestId('circle')).toHaveTextContent('5');
    expect(CircleComponent).toMatchSnapshot();
  });

  it("circle with head is rendered correctly", () => {
    const props = {
      head: 'head'
    };
    const CircleComponent = renderer.create(<Circle {...props}/>).toJSON();
    render(<Circle {...props} />);
    expect(screen.getByTestId('head')).toHaveTextContent('head');
    expect(CircleComponent).toMatchSnapshot();
  });

  it("circle with react-element in head is rendered correctly", () => {
    const props = {
      head: <Circle isSmall={true}/>
    };
    render(<Circle {...props} />)
    within(screen.getByTestId('circle')).getByTestId('isSmall circle')
  });

  it("circle with tail is rendered correctly", () => {
    const props = {
      tail: 'tail'
    };
    const CircleComponent = renderer.create(<Circle {...props}/>).toJSON();
    render(<Circle {...props} />);
    expect(screen.getByTestId('tail')).toHaveTextContent('tail');
    expect(CircleComponent).toMatchSnapshot();
  });

  it("circle with react-component in tail is rendered correctly", () => {
    const props = {
      tail: <Circle isSmall={true}/>
    };
    render(<Circle {...props} />)
    within(screen.getByTestId('circle')).getByTestId('isSmall circle')
  });

  it("circle with index is rendered correctly", () => {
    const props = {
      index: '1'
    };
    const CircleComponent = renderer.create(<Circle {...props}/>).toJSON();
    render(<Circle {...props} />);
    expect(screen.getByTestId('index')).toHaveTextContent('1');
    expect(CircleComponent).toMatchSnapshot();
  });

  it("circle with prop isSmall is rendered correctly + default state", () => {
    const props = {
      isSmall: true,
      state: ElementStates.Default
    };
    const CircleComponent = renderer.create(<Circle {...props}/>).toJSON();
    render(<Circle {...props} />);
    expect(screen.getByTestId('isSmall circleColoured')).toBeTruthy();
    expect(screen.getByTestId('isSmall circleColoured')).toHaveClass('default')
    expect(CircleComponent).toMatchSnapshot();
  });

  it("default circle is rendered correctly", () => {
    const props = {
      state: ElementStates.Default
    };
    const CircleComponent = renderer.create(<Circle {...props}/>).toJSON();
    render(<Circle {...props} />);
    expect(screen.getByTestId('circleColoured')).toHaveClass('default')
    expect(CircleComponent).toMatchSnapshot();
  });

  it("changing circle is rendered correctly", () => {
    const props = {
      state: ElementStates.Changing
    };
    const CircleComponent = renderer.create(<Circle {...props}/>).toJSON();
    render(<Circle {...props} />);
    expect(screen.getByTestId('circleColoured')).toHaveClass('changing');
    expect(CircleComponent).toMatchSnapshot();
  });

  it("modified circle is rendered correctly", () => {
    const props = {
      state: ElementStates.Modified
    };
    const CircleComponent = renderer.create(<Circle {...props}/>).toJSON();
    render(<Circle {...props} />);
    expect(screen.getByTestId('circleColoured')).toHaveClass('modified');
    expect(CircleComponent).toMatchSnapshot();
  });

});


