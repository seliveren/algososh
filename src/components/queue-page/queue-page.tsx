import React from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import QueuePageStyles from "../queue-page/queue-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";


interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}


export class QueuePage<T> extends React.Component<{}, { value: number | null, change: number, colourHead: ElementStates, colourTail: ElementStates }> implements IQueue<number> {
  private container: (number | null)[] = [null, null, null, null, null, null, null];
  private head = 0;
  private tail = -1;
  private length: number = 0;

  constructor(props: any) {
    super(props)
    this.state = {value: null, change: 0, colourHead: ElementStates.Default, colourTail: ElementStates.Default};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState({value: Number((event.target as HTMLInputElement).value)});
  }

  enqueue = (item: number) => {
    if (this.length > 7) {
      throw new Error("Maximum length exceeded");
    }

    if (this.length == this.head && this.head == this.tail) {
      this.tail = this.head;
    } else {
      this.tail++;
    }

    for (let i = 0; i <= this.container.length; i++) {
      if (this.container[i] == null && i >= this.tail) {
        this.length++;
        this.container[i] = item;
        this.setState({colourTail: ElementStates.Changing});
        setTimeout(() => this.setState({colourTail: ElementStates.Default}), 500)
        break;
      }
    }

    this.setState({change: 1});
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    for (let i = 0; i < this.container.length; i++) {
      if (this.container[i] != null && this.tail == this.head) {
        this.length--;
        this.container[i] = null;
        this.setState({colourTail: ElementStates.Changing});
        setTimeout(() => this.setState({colourTail: ElementStates.Default}), 500)
        break;
      } else if (this.container[i] != null && this.tail > this.head) {
        this.head++
        this.container[i] = null;
        this.setState({colourHead: ElementStates.Changing});
        setTimeout(() => this.setState({colourHead: ElementStates.Default}), 500)
        break;
      }
    }

    this.setState({change: 0});
  };

  peak = (): number | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    if (this.container.length > 0) {
      return this.container[this.container.length - 1];
    }
    return null;
  };

  clear = (): void => {
    for (let i = 0; i < this.container.length; i++) {
      if (this.container[i] != null) {
        this.container[i] = null;
      }
    }
    this.setState({change: -1});
    this.length = 0;
    this.head = 0;
    this.tail = -1;
    this.isEmpty();
  };

  handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    (document.getElementById("input") as HTMLInputElement).value = '';
    this.setState({value: null});
  }

  containsNull(array: (number | null)[]) {
    return array.some(el => el == null);
  }

  isEmpty = () => this.length === 0;

  render() {
    return (
      <SolutionLayout title="Очередь">

        <form className={QueuePageStyles.mainContainer} onSubmit={this.handleSubmit}>
          <Input extraClass={QueuePageStyles.inputField} placeholder={"Введите значение"} id="input" type={"number"} isLimitText={true} max={4}
                 onChange={(event) => {
                   this.handleChange(event)
                 }}/>
          {
            this.head == 7 || this.tail == 6 ? <Button id={"addButton"} text={'Добавить'}/> :
              this.state.value !== null && ((document.getElementById("input") as HTMLInputElement).value.length < 5) && this.containsNull(this.container) ?
                <Button id={"addButton"} extraClass={QueuePageStyles.addButton} type={'submit'} text={'Добавить'} onClick={(e) => {
                  this.enqueue(this.state.value as number);
                  this.handleSubmit(e);
                }}/> : <Button id={"addButton"} extraClass={QueuePageStyles.addButton} type={'submit'} text={'Добавить'} disabled={true}/>
          }

          {
            !this.isEmpty() ?
              <><Button id={"deleteButton"} extraClass={QueuePageStyles.deleteButton} text={'Удалить'} onClick={() => this.dequeue()}/>
                <Button text={'Очистить'} extraClass={QueuePageStyles.clearButton} onClick={() => {
                  this.clear()
                }}/></>
              :
              <><Button id={"deleteButton"} extraClass={QueuePageStyles.deleteButton} text={'Удалить'} onClick={() => this.dequeue()} disabled={true}/>
                <Button text={'Очистить'} extraClass={QueuePageStyles.clearButton} onClick={() => {
                  this.clear()
                }} disabled={true}/></>
          }
        </form>

        <div className={QueuePageStyles.resultContainer}>
          {
            this.container.map((el: number | null, index: number) =>
              this.state.change == 1 && el !== null && index == this.head && index == this.tail && this.length == this.head + 1 ?
                <Circle state={this.state.colourTail} key={index} letter={JSON.stringify(el)} index={index}
                        head={'head'} tail={'tail'}/> :
                el !== null && index == this.head && index == this.tail ?
                  <Circle state={this.state.colourHead} key={index} letter={JSON.stringify(el)} index={index}
                          head={'head'} tail={'tail'}/> :
                  this.state.change == 0 && index == this.head && index == this.tail && index == this.length ?
                    <Circle state={this.state.colourTail} key={index} letter={''} index={index} head={'head'}/> :
                    el !== null && index == this.head ?
                      <Circle state={this.state.colourHead} key={index} letter={JSON.stringify(el)} index={index}
                              head={'head'}/> :
                      el !== null && index == this.tail ?
                        <Circle state={this.state.colourTail} key={index} letter={JSON.stringify(el)} index={index}
                                tail={'tail'}/>
                        : el !== null && index !== this.tail && index !== this.head ?
                          <Circle state={ElementStates.Default} key={index} letter={JSON.stringify(el)} index={index}/> :
                          <Circle state={ElementStates.Default} key={index} letter={''} index={index}/>)
          }
        </div>
      </SolutionLayout>
    );
  }
}



