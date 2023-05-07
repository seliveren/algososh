import React from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import FibonacciPageStyles from "./fibonacci-page.module.css";
import {Circle} from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {

  const [numbers, setNumber] = React.useState<number[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<number>(0);

  React.useEffect(() => {
    document.getElementById("input")!.addEventListener("input",
      () => {
        setValue(Number((document.getElementById("input") as HTMLInputElement)!.value));
        setNumber([]);
      });
  }, [])


  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const number: number = Number((document.getElementById("input") as HTMLInputElement)!.value);
    e.preventDefault();

    if (number <= 19 && number > 0) {
      setLoading(true);
      startFibonacciSequence(number)
    }
    setNumber([])
  }

  function startFibonacciSequence(value: number) {

    if (value == 1) {

      setTimeout(() => setNumber([1]), 500)
      setTimeout(() => setNumber(([...prevState]) => [...prevState, 1]), 1000)
      setTimeout(() => setLoading(false), 500 * (numbers.length - 1) + 50)

    } else if (value == 2) {

      setTimeout(() => setNumber([1]), 500)
      setTimeout(() => setNumber(([...prevState]) => [...prevState, 1]), 1000)
      setTimeout(() => setNumber(([...prevState]) => [...prevState, 2]), 1000 + 500)
      setTimeout(() => setLoading(false), 500 * (numbers.length - 1) + 50)

    } else {
      for (let i = 0; i <= value; i++) {

        numbers[0] = 1;
        numbers[1] = 1;
        numbers[i] = numbers[i - 2] + numbers[i - 1];
        setTimeout(() => setNumber(([...prevState]) => [...prevState, numbers[i]]), 500 * i)

      }
      setTimeout(() => setLoading(false), 500 * (numbers.length - 1) + 50)
    }
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form id="form" className={FibonacciPageStyles.mainContainer} onSubmit={(e) => onSubmit(e)}>
        <Input type={"number"} id="input" isLimitText={true} max={19}/>

        {(value > 19 || value < 1) ?

          <Button extraClass={FibonacciPageStyles.button} text={"Рассчитать"} type={"submit"} id="button"
                  disabled={true}/>
          : <Button extraClass={FibonacciPageStyles.button} text={"Рассчитать"} type={"submit"} id="button"
                    isLoader={loading}/>}
      </form>

      <div className={FibonacciPageStyles.resultContainer}>

        {
          numbers.map((el: any, index: number) => (
            index < 10 ?
              <Circle key={index} letter={JSON.stringify(el)} index={index}/> :
              <Circle extraClass={FibonacciPageStyles.circle} key={index} letter={JSON.stringify(el)} index={index}/>)
          )}

      </div>
    </SolutionLayout>
  );
};




