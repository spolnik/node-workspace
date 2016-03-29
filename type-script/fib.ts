import { Iterator, IteratorResult } from './iterator'

class Fib implements Iterator<number> {

    protected fn1 = 0;
    protected fn2 = 1;

    constructor(protected maxValue?: number) {}
    
    public next(): IteratorResult<number> {
        var current = this.fn1;
        this.fn1 = this.fn2;
        this.fn2 = current + this.fn1;

        if (this.maxValue && current <= this.maxValue) {
            return {
                done: false,
                value: current
            }
        } return {
            done: true
        }
    }

    [Symbol.iterator](): Iterator<number> {
        return this;
    }
}

let fib = new Fib();

console.log(fib.next());
console.log(fib.next());
console.log(fib.next());
console.log(fib.next());
console.log(fib.next());
console.log(fib.next());

let fibMax50 = new Fib(50);
console.log(Array.from(fibMax50));

let fibMax21 = new Fib(21);
for (let num of fibMax21) {
    console.log(num);
}
