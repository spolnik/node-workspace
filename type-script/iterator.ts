'use strict';

export interface IteratorResult<T> {
    done: boolean,
    value?: T
}

export interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

class Component {
    constructor(public name: string) {}
}
class Frame implements Iterator<Component> {
    private pointer = 0;
    constructor(public name: string, public components: Component[]) {}

    public next(): IteratorResult<Component> {
        if (this.pointer < this.components.length) {
            return {
                done: false,
                value: this.components[this.pointer++]
            }
        } else {
            return {
                done: true
            }
        }
    }
}

let frame = new Frame("Door", [new Component("top"), new Component("bottom"), new Component("left"), new Component("right")]);
let iteratorResult1 = frame.next(); //{ done: false, value: Component { name: 'top' } }
console.log(iteratorResult1);
let iteratorResult2 = frame.next(); //{ done: false, value: Component { name: 'bottom' } }
console.log(iteratorResult2);
let iteratorResult3 = frame.next(); //{ done: false, value: Component { name: 'left' } }
console.log(iteratorResult3);
let iteratorResult4 = frame.next(); //{ done: false, value: Component { name: 'right' } }
console.log(iteratorResult4);
let iteratorResult5 = frame.next(); //{ done: true }
console.log(iteratorResult5);

//It is possible to access the value of iterator result via the value property:
let component = iteratorResult1.value;
console.log(component);