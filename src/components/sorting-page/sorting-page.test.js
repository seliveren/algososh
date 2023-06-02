import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {SortingPage} from "./sorting-page";
import {BrowserRouter} from "react-router-dom";
import {act} from "react-test-renderer";

jest.setTimeout(10000);

describe('Test Sorting algorithms', () => {

  it("bubble sort is correct asc (empty array)", async () => {

    render(<SortingPage initValues={[]}/>, {wrapper: BrowserRouter});

    const bubbleType = screen.getByTestId("bubble");
    const ascSortButton = screen.getByTestId("ascButton");

    fireEvent.click(bubbleType);
    fireEvent.click(ascSortButton);

    await waitFor(() => {
      expect(screen.getByTestId("result")).toBeEmpty();
    }, {timeout: 2000});
  });


  it("bubble sort is correct asc (one element in array)", async () => {

    render(<SortingPage initValues={[6]}/>, {wrapper: BrowserRouter});

    const bubbleType = await screen.findByTestId("bubble");
    const ascSortButton = await screen.findByTestId("ascButton");

    fireEvent.click(bubbleType);
    fireEvent.click(ascSortButton);

    await waitFor(() => {
      expect(screen.getByTestId("columnText")).toHaveTextContent('6');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getByTestId("column")).toHaveClass('modified');
    }, {timeout: 5000});
  });


  it("bubble sort is correct asc (several elements in array)", async () => {

    render(<SortingPage initValues={[23, 90, 78, 21]}/>, {wrapper: BrowserRouter})

    const bubbleType = screen.getByTestId("bubble");
    const ascSortButton = screen.getByTestId("ascButton");

    act(() => {
      bubbleType.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

    act(() => {
      ascSortButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("columnText")[0]).toHaveTextContent('21');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("column")[0]).toHaveClass('modified');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("columnText")[1]).toHaveTextContent('23');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("column")[1]).toHaveClass('modified');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("columnText")[2]).toHaveTextContent('78');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("column")[2]).toHaveClass('modified');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("columnText")[3]).toHaveTextContent('90');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("column")[3]).toHaveClass('modified');
    }, {timeout: 5000});
  });


  it("bubble sort is correct desc (empty array)", async () => {

    render(<SortingPage initValues={[]}/>, {wrapper: BrowserRouter})

    const bubbleType = screen.getByTestId("bubble");
    const descSortButton = screen.getByTestId("descButton");

    fireEvent.click(bubbleType);
    fireEvent.click(descSortButton);

    await waitFor(() => {
      expect(screen.getByTestId("result")).toBeEmpty();
    }, {timeout: 2000});
  });


  it("bubble sort is correct desc (one element in array)", async () => {

    render(<SortingPage initValues={[6]}/>, {wrapper: BrowserRouter})

    const bubbleType = screen.getByTestId("bubble");
    const descSortButton = screen.getByTestId("descButton");

    fireEvent.click(bubbleType);
    fireEvent.click(descSortButton);

    await waitFor(() => {
      expect(screen.getByTestId("columnText")).toHaveTextContent('6');
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getByTestId("column")).toHaveClass('modified');
    }, {timeout: 2000});
  });


  it("bubble sort is correct desc (several elements in array)", async () => {

    render(<SortingPage initValues={[23, 90, 78, 21]}/>, {wrapper: BrowserRouter})

    const bubbleType = screen.getByTestId("bubble");
    const descSortButton = screen.getByTestId("descButton");

    fireEvent.click(bubbleType);
    fireEvent.click(descSortButton);

    await waitFor(() => {
      expect(screen.getAllByTestId("columnText")[0]).toHaveTextContent('90');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("column")[0]).toHaveClass('modified');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("columnText")[1]).toHaveTextContent('78');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("column")[1]).toHaveClass('modified');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("columnText")[2]).toHaveTextContent('23');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("column")[2]).toHaveClass('modified');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("columnText")[3]).toHaveTextContent('21');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("column")[3]).toHaveClass('modified');
    }, {timeout: 5000});
  });


  it("selection sort is correct asc (empty array)", async () => {

    render(<SortingPage initValues={[]}/>, {wrapper: BrowserRouter})

    const selectionType = screen.getByTestId("selection");
    const ascSortButton = screen.getByTestId("ascButton");

    fireEvent.click(selectionType);
    fireEvent.click(ascSortButton);

    await waitFor(() => {
      expect(screen.getByTestId("result")).toBeEmpty();
    }, {timeout: 2000});

  });


  it("selection sort is correct asc (one element in array)", async () => {
    render(<SortingPage initValues={[5]}/>, {wrapper: BrowserRouter})

    const selectionType = screen.getByTestId("selection");
    const ascSortButton = screen.getByTestId("ascButton");

    fireEvent.click(selectionType);
    fireEvent.click(ascSortButton);

    await waitFor(() => {
      expect(screen.getByTestId("columnText")).toHaveTextContent('5');
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getByTestId("column")).toHaveClass('modified');
    }, {timeout: 2000});
  });


  it("selection sort is correct asc (several elements in array)", async () => {

    render(<SortingPage initValues={[23, 90, 78, 21]}/>, {wrapper: BrowserRouter})

    const selectionType = screen.getByTestId("selection");
    const ascSortButton = screen.getByTestId("ascButton");

    fireEvent.click(selectionType);
    fireEvent.click(ascSortButton);

    await waitFor(() => {
      expect(screen.getAllByTestId("columnText")[0]).toHaveTextContent('21');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("column")[0]).toHaveClass('modified');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("columnText")[1]).toHaveTextContent('23');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("column")[1]).toHaveClass('modified');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("columnText")[2]).toHaveTextContent('78');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("column")[2]).toHaveClass('modified');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("columnText")[3]).toHaveTextContent('90');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("column")[3]).toHaveClass('modified');
    }, {timeout: 5000});
  });


  it("selection sort is correct desc (empty array)", async () => {

    render(<SortingPage initValues={[]}/>, {wrapper: BrowserRouter})

    const selectionType = screen.getByTestId("selection");
    const descSortButton = screen.getByTestId("descButton");

    fireEvent.click(selectionType);
    fireEvent.click(descSortButton);

    await waitFor(() => {
      expect(screen.getByTestId("result")).toBeEmpty();
    }, {timeout: 2000});
  });


  it("selection sort is correct desc (one element in array)", async () => {

    render(<SortingPage initValues={[5]}/>, {wrapper: BrowserRouter})

    const selectionType = screen.getByTestId("selection");
    const descSortButton = screen.getByTestId("descButton");

    fireEvent.click(selectionType);
    fireEvent.click(descSortButton);

    await waitFor(() => {
      expect(screen.getByTestId("columnText")).toHaveTextContent('5');
    }, {timeout: 2000});

    await waitFor(() => {
      expect(screen.getByTestId("column")).toHaveClass('modified');
    }, {timeout: 2000});
  });


  it("selection sort is correct desc (several elements in array)", async () => {

    render(<SortingPage initValues={[23, 90, 78, 21]}/>, {wrapper: BrowserRouter})

    const selectionType = screen.getByTestId("selection");
    const descSortButton = screen.getByTestId("descButton");

    act(() => {
      selectionType.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

    act(() => {
      descSortButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("columnText")[0]).toHaveTextContent('90');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("column")[0]).toHaveClass('modified');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("columnText")[1]).toHaveTextContent('78');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("column")[1]).toHaveClass('modified');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("columnText")[2]).toHaveTextContent('23');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("column")[2]).toHaveClass('modified');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("columnText")[3]).toHaveTextContent('21');
    }, {timeout: 5000});

    await waitFor(() => {
      expect(screen.getAllByTestId("column")[3]).toHaveClass('modified');
    }, {timeout: 5000});
  });

});


