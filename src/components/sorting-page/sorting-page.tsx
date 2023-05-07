import React from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {Direction} from "../../types/direction";
import SortingPageStyles from "../sorting-page/sorting-page.module.css";
import {Column} from "../ui/column/column";
import {ElementStates} from "../../types/element-states";


export const SortingPage: React.FC = () => {
  const [sortingType, setSortingType] = React.useState<string>('selection');
  const [sortingDirection, setSortingDirection] = React.useState<string>('');
  const [loadingAsc, setLoadingAsc] = React.useState<boolean>(false);
  const [loadingDesc, setLoadingDesc] = React.useState<boolean>(false);
  const [values, setValues] = React.useState<number[]>([85, 9, 93, 35, 80]);
  const [iterationJ, setIterationJ] = React.useState<number | null>();
  const [iterationI, setIterationI] = React.useState<number | null>();
  const [mark, setMark] = React.useState<number | null>();
  const [greenMark, setGreenMark] = React.useState<number | null>();
  const [lastMark, setLastMark] = React.useState<number | null>();


  React.useEffect(() => {
      document.getElementById('ascButton')!.addEventListener('click', () => {
        setSortingDirection('asc');
      });
      document.getElementById('descButton')!.addEventListener('click', () => {
        setSortingDirection('desc');
      });
    }
    , [])


  const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
    console.log('swapped!')
  };


  function countRandomNum(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


  function randomArr() {
    setGreenMark(null);
    setIterationI(null);
    setIterationJ(null);
    const randomArr = [];
    const randomLen = countRandomNum(3, 7);
    for (let i = 0; i <= randomLen; i++) {
      const randomNum = countRandomNum(0, 100);
      randomArr.push(randomNum);
    }
    setValues(randomArr);
  }


  const selectionSort = (arr: number[]) => {

    for (let i = 0; i < arr.length; i++) {

      setTimeout(() => {

        let maxInd = i;
        setIterationI(i);

        for (let j = i + 1; j <= arr.length - 1; j++) {

          setTimeout(() => {

            if (sortingDirection === 'desc' ? (arr[j] > arr[maxInd]) : (arr[j] < arr[maxInd])) {
              maxInd = j;
            }

            setIterationJ(j);
          }, j * 100)

        }

        setTimeout(() => {

          if (maxInd !== i) {
            swap(arr, i, maxInd);
            setMark(-1)
          }

        }, 200 * i + 900)

        setMark(0)

      }, 1000 * i)

      setMark(1)

    }

    setMark(2)

    setTimeout(() => {
      sortingDirection == 'asc' ? setLoadingAsc(false) : setLoadingDesc(false)
      setIterationI(arr.length)
      setValues(arr);
    }, 1000 * (arr.length) + 50);

  };


  function bubbleSort(arr: number[]) {

    for (let i = 0; i < arr.length - 1; i++) {

      setTimeout(() => {

        for (let j = 0; j < arr.length - i - 1; j++) {

          setTimeout(() => {

            setIterationI(j);
            setIterationJ(j + 1)

            if (sortingDirection === 'asc' ? (arr[j] > arr[j + 1]) : (arr[j] < arr[j + 1])) {
              swap(arr, j, j + 1)
            }

          }, 500 * j)

        }

        setGreenMark(arr[arr.length - 1 - i])

      }, 1000 * i)
      sortingDirection == 'desc' ? setLastMark(arr[arr.length - 1 - i]) : setLastMark(0)
    }


    setTimeout(() => {
      setValues(arr);
      sortingDirection == 'asc' ? setLoadingAsc(false) : setLoadingDesc(false);
      setIterationI(arr.length)
    }, 1000 * (arr.length) + 100);
  }


  function sort(arr: number[]) {
    sortingDirection == 'asc' ? setLoadingAsc(true) : setLoadingDesc(true);
    sortingType === 'bubble' ? bubbleSort(arr) : sortingType === 'selection' ? selectionSort(arr) : console.log('no sorting type selected');
  }


  return (
    <SolutionLayout title="Сортировка массива">
      <div className={SortingPageStyles.mainContainer}>
        <RadioInput value={'sorting'} name={'sortingType'} label={'Выбор'} onClick={() => {
          setSortingType('selection')
        }} defaultChecked/>
        <RadioInput value={'bubble'} name={'sortingType'} label={'Пузырёк'} onClick={() => {
          setSortingType('bubble')
        }}/>
        <Button id={"ascButton"} text={'По возрастанию'} onClick={() => sort(values)} isLoader={loadingAsc}
                sorting={Direction.Ascending}/>
        <Button id={"descButton"} text={'По убыванию'} onClick={() => sort(values)} isLoader={loadingDesc}
                sorting={Direction.Descending}/>
        <Button text={'Новый массив'} onClick={() => randomArr()}/>
      </div>

      <div id="result" className={SortingPageStyles.resultContainer}>
        {
          values.map((el, index) =>
            (loadingAsc || loadingDesc)
            &&
            (iterationI == index || iterationJ == index)
              ?
              <Column state={ElementStates.Changing} index={el} key={index}/> :
              <Column state={
                (sortingType == 'selection' && index < iterationI!) ? ElementStates.Modified :
                  sortingDirection == 'desc' && greenMark != null && (el <= greenMark! || el > greenMark!) ? ElementStates.Modified :
                    sortingDirection == 'asc' && greenMark != null && (el >= greenMark! || index == lastMark!) ? ElementStates.Modified :
                      ElementStates.Default} index={el}
                      key={index}/>)
        }
      </div>
    </SolutionLayout>
  );
};
