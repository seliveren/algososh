import React from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import StringPageStyles from "../string/string.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";

export const StringComponent: React.FC = () => {

  const [loading, setLoading] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string[]>([]);
  const [marker, setMarker] = React.useState<boolean>(false);
  const [initialColor, setInitialColor] = React.useState<boolean>(true);
  const [iteration, setIteration] = React.useState<number>();
  const [startIndex, setStartIndex] = React.useState<number | null>();
  const [endIndex, setEndIndex] = React.useState<number | null>();

  React.useEffect(() => {
    document.getElementById("input")!.addEventListener(("change"), () => {
      setValue((document.getElementById("input") as HTMLInputElement)!.value.split(''));
      setInitialColor(true);
      setIteration(0);
    });
  }, [])

  const swap = (arr: string[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  function swapString() {
    let start = 0;
    let end = value.length - 1;
    const mid = Math.floor((start + end) / 2)
    setInitialColor(false)

    for (let i = 0; i <= mid; i++) {
      setTimeout(() => {
          swap(value, end, start);
          setIteration(i);
          setStartIndex(start);
          setEndIndex(end);
          start++;
          end--;
        },
        1000 * i);
    }

    setTimeout(() => {
      setLoading(false);
      setStartIndex(null);
      setEndIndex(null);
      setIteration(-1);
    }, 500 * (value.length) + 50)
  }


  function onSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    if (value.length <= 11 && value.length > 0) {
      setMarker(true);
      setTimeout(() => setLoading(true), 700);
      setTimeout(() => swapString(), 1000);
    }
  }


  return (
    <SolutionLayout title="Строка">

      <form id="form" className={StringPageStyles.mainContainer} onSubmit={onSubmit}>
        <Input type={"text"} id="input" isLimitText={true} maxLength={11}/>
        {(value.length > 11 || value.length < 1) ?
          <Button extraClass={StringPageStyles.button} text={"Развернуть"} type={"submit"} id="button" disabled={true}/>
          : <Button extraClass={StringPageStyles.button} text={"Развернуть"} type={"submit"} id="button"
                    isLoader={loading}/>}
      </form>

      <div className={StringPageStyles.resultContainer}>
        {marker ?
          value.map((el: any, index: number) =>
            loading && (startIndex == index || endIndex == index) ?
              <Circle state={ElementStates.Changing} key={index} letter={el} index={index}/> : !initialColor && (
                startIndex! >= index || endIndex! <= index) || iteration == -1 ?
                <Circle state={ElementStates.Modified} key={index} letter={el} index={index}/> :
                <Circle state={ElementStates.Default} key={index}
                        letter={el} index={index}/>)
          : <></>}
      </div>

    </SolutionLayout>
  );
};
