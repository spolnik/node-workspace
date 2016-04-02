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
}

let fib = new Fib();

console.log(fib.next());
console.log(fib.next());
console.log(fib.next());
console.log(fib.next());
console.log(fib.next());
console.log(fib.next());

let fibMax50 = new Fib(50);
console.log(JSON.stringify(fibMax50));

let fibMax21 = new Fib(21);
for (let num of <any>fibMax21) {
    console.log(num);
}

console.log(`<div>${JSON.stringify(fibMax21)}</div>`);