import React from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import StackPageStyles from "../stack-page/stack-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";


interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
}

export class StackPage<T> extends React.Component<{}, { value: number | null, change: number, colour: ElementStates }> implements IStack<number> {

  private container: number[] = [];

  constructor(props: any) {
    super(props)
    this.state = {value: null, change: 0, colour: ElementStates.Default};
    this.handleChange = this.handleChange.bind(this);
  };


  handleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({value: Number((event.target as HTMLInputElement).value)});
  };


  push = (item: number): void => {
    if (item !== null) {
      this.container.push(item)
      this.setState({change: 1});
      this.setState({colour: ElementStates.Changing});
      setTimeout(() => this.setState({colour: ElementStates.Default}), 500)
    }
  };


  pop = (): void => {
    if (this.container.length > 0) {
      this.setState({change: 0});
      this.setState({colour: ElementStates.Changing});
      setTimeout(() => {
        this.container.pop();
        this.setState({colour: ElementStates.Default});
      }, 500)
    }
  };


  peak = (): number | null => {
    if (this.container.length > 0) {
      return this.container[this.container.length - 1];
    }
    return null;
  };


  getSize = () => this.container.length;


  clear = (): void => {
    this.setState({change: -1});
    if (this.container.length > 0) {
      while (this.container.length > 0) {
        this.container.pop();
      }
    }
  };


  handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    console.log('submitted!');
    (document.getElementById("input") as HTMLInputElement).value = '';
    this.setState({value: null});
  };


  render() {

    return (
      <SolutionLayout title="Стек">

        <form className={StackPageStyles.mainContainer} onSubmit={this.handleSubmit}>
          <Input placeholder={"Введите значение"} extraClass={StackPageStyles.inputField} id="input" type={"number"}
                 isLimitText={true} max={4} onChange={(event) => {
            this.handleChange(event)
          }}/>

          {
            this.state.value !== null && (document.getElementById("input") as HTMLInputElement).value.length < 5 ?
              <Button extraClass={StackPageStyles.addButton} id={"addButton"} type={'submit'} text={'Добавить'} onClick={(e) => {
                this.push(this.state.value as number);
                this.handleSubmit(e);
              }}/>
              :
              <Button extraClass={StackPageStyles.addButton} id={"addButton"} type={'submit'} text={'Добавить'} disabled={true}/>
          }

          {this.getSize() > 0 ?
            <><Button extraClass={StackPageStyles.deleteButton} id={"deleteButton"} text={'Удалить'} onClick={() => this.pop()}/>
              <Button extraClass={StackPageStyles.clearButton} text={'Очистить'} onClick={() => {
                this.clear()
              }}/></>
            :
            <><Button extraClass={StackPageStyles.deleteButton} id={"deleteButton"} text={'Удалить'} onClick={() => this.pop()} disabled={true}/>
              <Button extraClass={StackPageStyles.clearButton} text={'Очистить'} onClick={() => {
                this.clear()
              }} disabled={true}/></>
          }
        </form>

        <div className={StackPageStyles.resultContainer}>
          {
            this.container.map((el: number, index: number) =>
              index == this.getSize() - 1 ?
                <Circle state={this.state.colour} key={index} letter={JSON.stringify(el)} index={index}
                        head={'top'}/> :
                <Circle state={ElementStates.Default} key={index} letter={JSON.stringify(el)} index={index}/>
            )
          }
        </div>

      </SolutionLayout>
    );
  }
}
