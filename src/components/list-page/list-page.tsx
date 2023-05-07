import React from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import ListPageStyles from "../list-page/list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {ArrowIcon} from "../ui/icons/arrow-icon";


interface ILinkedList<T> {
  addToTail: (element: number | null) => void;
  deleteTail: () => void;
  addToHead: (element: number | null) => void;
  deleteHead: () => void;
  addByIndex: (ind: number, value: number) => void;
  deleteByIndex: (ind: number) => void;
}


export class Node<T> {
  value: number | null
  next: Node<number | null> | null

  constructor(value: number | null, next?: Node<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}


export class ListPage<T> extends React.Component<{}, {
  value: number | null, index: number | null,
  change: number, colourHead: ElementStates, colourTail: ElementStates, deletingTailMark: boolean,
  addingTailMark: boolean, deletingHeadMark: boolean, addingHeadMark: boolean, deletingElMark: boolean,
  addingElMark: boolean, currentIndex: number | null, colourElement: ElementStates, colourArrow: string, addingElMarkZero: boolean
}> implements ILinkedList<T> {

  private container: Node<number>[] = [new Node(0, new Node(34, new Node(8, new Node(1, null)))), new Node(34, new Node(8, new Node(1, null))), new Node(8, new Node(1, null)), new Node(1, null)];
  private head: Node<number> | null;
  private tail: Node<number> | null;
  private length: number = 4;

  constructor(props: any) {
    super(props)
    this.state = {
      value: null,
      index: null,
      change: 0,
      colourHead: ElementStates.Default,
      colourTail: ElementStates.Default,
      deletingTailMark: false,
      addingTailMark: false,
      deletingHeadMark: false,
      addingHeadMark: false,
      addingElMark: false,
      deletingElMark: false,
      currentIndex: null,
      colourElement: ElementStates.Default,
      colourArrow: "#0032FF",
      addingElMarkZero: false
    };

    this.head = new Node(0, new Node(34, new Node(8, new Node(1, null))));

    this.tail = new Node(1, null);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }


  handleChangeValue(event: React.FormEvent<HTMLInputElement>) {
    (document.getElementById("inputValue") as HTMLInputElement).value == '' ?
      this.setState({value: null})
      :
      this.setState({value: Number((event.target as HTMLInputElement).value)});
  }


  handleChangeIndex(event: React.FormEvent<HTMLInputElement>) {
    (document.getElementById("inputIndex") as HTMLInputElement).value == '' ?
      this.setState({index: null})
      :
      this.setState({index: Number((event.target as HTMLInputElement).value)});
  }


  addToTail(element: number | null) {
    const node = new Node<number>(element);


    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
    }

    this.tail.next = node;
    this.tail = node;


    this.setState({addingTailMark: true});
    setTimeout(() => {
      this.setState({addingTailMark: false})
      this.length++

      this.container.push(node)
      this.setState({colourTail: ElementStates.Modified});
      this.setState({change: 1});
    }, 500)

    setTimeout(() => this.setState({colourTail: ElementStates.Default}), 1000)
  }


  deleteTail() {
    if (this.isEmpty()) {
      throw new Error("No elements in the list");
    }

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    }

    let currentNode = this.head;
    while (currentNode && currentNode.next) {

      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    this.setState({deletingTailMark: true});
    setTimeout(() => {
      this.setState({deletingTailMark: false})
      this.length--
      this.container.pop()
      this.setState({change: -1});
      this.setState({value: null});
    }, 500)

  }


  addToHead(element: number | null) {
    const newNode = new Node<number>(element, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    this.setState({addingHeadMark: true});
    setTimeout(() => {
      this.setState({addingHeadMark: false})
      this.length++

      this.container.unshift(newNode);
      this.setState({colourHead: ElementStates.Modified});
      this.setState({change: 1});
    }, 500)

    setTimeout(() => this.setState({colourHead: ElementStates.Default}), 1000)
  }


  deleteHead() {
    if (this.isEmpty()) {
      throw new Error("No elements in the list");
    }

    if (!this.head) {
      return null;
    }

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    this.setState({deletingHeadMark: true});
    setTimeout(() => {
      this.setState({deletingHeadMark: false})
      this.length--
      this.container.shift();
      this.setState({change: -1});
      this.setState({value: null});
    }, 500)
    console.log(this.container)
  }


  addByIndex(ind: number, value: number) {
    if (ind < 0 || ind > this.length) {
      return 'Incorrect value of index';
    }

    let node = new Node<number>(value);

    if (ind === 0) {
      node.next = this.head;
      this.head = node;
      this.setState({addingElMarkZero: true})
      this.setState({currentIndex: ind});
      this.setState({index: ind});
      this.setState({colourElement: ElementStates.Changing})
    } else {
      let current = this.head;
      let prev = null;


      for (let index = 0; index <= ind; index++) {
        prev = current;
        current = current!.next;

        setTimeout(() => {
          index == 0 ? this.setState({addingElMarkZero: true}) : this.setState({
            addingElMark: true,
            addingElMarkZero: false
          });
          this.setState({currentIndex: index});
          this.setState({index: index});
          this.setState({colourElement: ElementStates.Changing});
          index !== ind ? this.setState({colourArrow: "#D252E1"}) : this.setState({colourArrow: "#0032FF"});

        }, 500 * index)

      }

      prev!.next = node;
      node.next = current;
    }


    setTimeout(() => {
      this.setState({addingElMark: false, addingElMarkZero: false});
      this.setState({currentIndex: ind});
    }, ind != 0 ? 500 * this.container.length + 300 : 300)


    setTimeout(() => {
      this.container.splice(ind, 0, node);
      this.length++;
      this.setState({colourElement: ElementStates.Modified})
      this.setState({colourArrow: "#0032FF"});
    }, ind != 0 ? 500 * this.container.length + 600 : 600)

    setTimeout(() => {
      this.setState({colourElement: ElementStates.Default});
    }, ind != 0 ? 500 * this.container.length + 900 : 900)


  }


  deleteByIndex(ind: number) {
    if (ind < 0 || ind > this.length) {
      return 'Incorrect value of position';
    }

    let current = this.head;

    if (ind === 0) {
      this.setState({deletingElMark: true})
      this.head = current!.next;
      this.setState({currentIndex: ind});
      this.setState({index: ind});
      this.setState({colourElement: ElementStates.Changing});
    } else {

      let prev: Node<number> | null = null;

      for (let index = 0; index <= ind; index++) {
        if (index !== ind) {
          prev = current;
          current = current!.next;
        }
        setTimeout(() => {
          this.setState({currentIndex: index});
          this.setState({index: index});
          this.setState({colourElement: ElementStates.Changing});
          index != ind ? this.setState({colourArrow: "#D252E1"}) : this.setState({colourArrow: "#0032FF"});
          index == ind ? this.setState({deletingElMark: true}) : this.setState({deletingElMark: false})
        }, 500 * index)
      }
      prev!.next = current!.next;
    }

    setTimeout(() => {
      this.setState({deletingElMark: false})
      this.length--
      this.container.splice(ind, 1)
      this.setState({colourElement: ElementStates.Default})
      this.setState({colourArrow: "#0032FF"});
    }, ind != 0 ? 500 * this.container.length + 300 : 300)
  }


  handleSubmitValue(e: { preventDefault: () => void; }) {
    e.preventDefault();
    (document.getElementById("inputValue") as HTMLInputElement).value = '';
    setTimeout(() => this.setState({value: null}), 500 * this.container.length + 400)
  }


  handleSubmitIndex(e: { preventDefault: () => void; }) {
    e.preventDefault();
    (document.getElementById("inputIndex") as HTMLInputElement).value = '';
    setTimeout(() => this.setState({index: null}), 500 * this.container.length + 400)
  }


  isEmpty = () => this.length === 0;


  render() {


    return (
      <SolutionLayout title="Связный список">
        <form className={ListPageStyles.mainContainer}>
          <Input id="inputValue" placeholder={"Введите значение"} extraClass={ListPageStyles.inputField} type={"number"}
                 isLimitText={true} max={4} onChange={(event) => {
            this.handleChangeValue(event)
          }}
                 disabled={this.state.addingTailMark || this.state.addingHeadMark || this.state.deletingTailMark || this.state.deletingHeadMark || this.state.deletingElMark || this.state.addingElMark}/>
          {
            this.state.value == null || (document.getElementById("inputValue") as HTMLInputElement).value.length > 4
              ?
              <>
                <Button text={'Добавить в head'} isLoader={this.state.addingHeadMark} onClick={(e) => {
                  this.addToHead(this.state.value);
                  this.handleSubmitValue(e);
                }
                } disabled={true}/>
                <Button text={'Добавить в tail'} isLoader={this.state.addingTailMark} onClick={(e) => {
                  this.addToTail(this.state.value);
                  this.handleSubmitValue(e);
                }
                } disabled={true}/>
              </>
              :
              <>
                <Button text={'Добавить в head'} isLoader={this.state.addingHeadMark} onClick={(e) => {
                  this.addToHead(this.state.value);
                  this.handleSubmitValue(e);
                }
                }
                        disabled={this.state.addingTailMark || this.state.addingHeadMark || this.state.deletingTailMark || this.state.deletingHeadMark || this.state.deletingElMark || this.state.addingElMark}/>
                <Button text={'Добавить в tail'} isLoader={this.state.addingTailMark} onClick={(e) => {
                  this.addToTail(this.state.value);
                  this.handleSubmitValue(e);
                }
                }
                        disabled={this.state.addingTailMark || this.state.addingHeadMark || this.state.deletingTailMark || this.state.deletingHeadMark || this.state.deletingElMark || this.state.addingElMark}/>
              </>
          }

          <Button text={'Удалить из head'} isLoader={this.state.deletingHeadMark} onClick={() => {
            this.deleteHead()
          }}
                  disabled={this.isEmpty() || this.state.addingTailMark || this.state.addingHeadMark || this.state.deletingTailMark || this.state.deletingHeadMark || this.state.deletingElMark || this.state.addingElMark}/>
          <Button text={'Удалить из tail'} isLoader={this.state.deletingTailMark} onClick={() => {
            this.deleteTail()
          }}
                  disabled={this.isEmpty() || this.state.addingTailMark || this.state.addingHeadMark || this.state.deletingHeadMark || this.state.deletingTailMark || this.state.deletingElMark || this.state.addingElMark}/>
        </form>

        <form className={ListPageStyles.mainContainer}>

          <Input id="inputIndex" placeholder={"Введите индекс"} extraClass={ListPageStyles.inputField}
                 onChange={(event) => {
                   this.handleChangeIndex(event)
                 }}
                 disabled={this.state.addingTailMark || this.state.addingHeadMark || this.state.deletingTailMark || this.state.deletingHeadMark || this.state.deletingElMark || this.state.addingElMark}/>

          {this.state.index == null || this.state.value == null || this.state.index < 0 || this.state.index > this.container.length - 1 || (document.getElementById("inputValue") as HTMLInputElement).value.length > 4 ?
            <Button extraClass={ListPageStyles.byIndexButton} text={'Добавить по индексу'} onClick={(e) => {
              this.addByIndex(this.state.index as number, this.state.value as number);
              this.handleSubmitIndex(e);
              this.handleSubmitValue(e);
            }} disabled={true}/>
            :
            <Button isLoader={this.state.addingElMark} extraClass={ListPageStyles.byIndexButton}
                    text={'Добавить по индексу'} onClick={(e) => {
              this.addByIndex(this.state.index as number, this.state.value as number);
              this.handleSubmitIndex(e);
              this.handleSubmitValue(e);
            }}
                    disabled={this.state.addingTailMark || this.state.addingHeadMark || this.state.deletingTailMark || this.state.deletingHeadMark || this.state.deletingElMark || this.state.addingElMark}/>
          }

          {this.state.index == null || this.state.index < 0 || this.state.index > this.container.length - 1 || (document.getElementById("inputValue") as HTMLInputElement).value.length > 4 ?
            <Button onClick={(e) => {
              this.deleteByIndex(this.state.index as number);
              this.handleSubmitIndex(e);
            }}
                    extraClass={ListPageStyles.byIndexButton} text={'Удалить по индексу'}
                    disabled={true}/>
            :
            <Button isLoader={this.state.deletingElMark} onClick={(e) => {
              this.deleteByIndex(this.state.index as number);
              this.handleSubmitIndex(e);
            }}
                    extraClass={ListPageStyles.byIndexButton} text={'Удалить по индексу'}
                    disabled={this.state.addingTailMark || this.state.addingHeadMark || this.state.deletingTailMark || this.state.deletingHeadMark || this.state.deletingElMark || this.state.addingElMark}/>
          }

        </form>

        <div className={ListPageStyles.resultContainer}>
          {

            this.container.map((el: Node<number>, index: number) => (
                <div key={index} className={ListPageStyles.nodesContainer}>
                  <Circle index={index} state={

                    (!this.state.addingElMark && index == this.state.currentIndex) ? this.state.colourElement : (index <= this.state.currentIndex! && this.state.addingElMark) ? this.state.colourElement : index == this.container.length - 1 && !(index == this.state.currentIndex) ? this.state.colourTail : index == 0 && !(index == this.state.currentIndex) ? this.state.colourHead : ElementStates.Default}
                          extraClass={ListPageStyles.circle}
                          letter={(index == this.container.length - 1 && this.state.deletingTailMark) || (index == 0 && this.state.deletingHeadMark) || (this.state.deletingElMark && index == this.state.index) ? '' : JSON.stringify(el.value)}
                          head={(index == 0 && this.state.addingHeadMark) || (index == this.container.length - 1 && this.state.addingTailMark) || (index == 0 && this.state.addingElMarkZero) || (index == this.state.currentIndex && this.state.addingElMark) ?
                            <Circle state={ElementStates.Changing} isSmall={true}
                                    letter={JSON.stringify(this.state.value)}/> : index == 0 ? 'head' : ''}
                          tail={(index == this.container.length - 1 && this.state.deletingTailMark) || (index == 0 && this.state.deletingHeadMark) || (this.state.deletingElMark && index == this.state.index) ?
                            <Circle state={ElementStates.Changing} isSmall={true}
                                    letter={JSON.stringify(el.value)}/> : index == this.container.length - 1 ? 'tail' : ''}/>
                  <span
                    className={index == this.container.length - 1 ? `${ListPageStyles.arrowLast}` : ``}><ArrowIcon

                    fill={index <= this.state.currentIndex! ? this.state.colourArrow : "#0032FF"}></ArrowIcon></span>
                </div>
              )
            )
          }
        </div>


      </SolutionLayout>
    );
  }
}

