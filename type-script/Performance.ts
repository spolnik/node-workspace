export class Performance {
    constructor(private func: Function, private iterations: number) {}

    private runTest() {
        let errors: number[] = [];
        let start = Performance.clock();
        
        for (let i = 0; i  < this.iterations; i++) {
            try {
                this.func();
            } catch (err) {
                // Limit the number of errors logged
                if (errors.length < 10) {
                    errors.push(i);
                }
            }
        }
        
        let testTime = Performance.clock(start);
        
        return {
            errors: errors,
            totalRunTime: testTime,
            iterationAverageTime: (testTime / this.iterations)
        };
    }

    private static clock(start = undefined): any {
        if ( !start ) {
            return process.hrtime();
        }

        let end = process.hrtime(start);

        return end[0]*1000 + end[1]/1000000;
    }
    
    static run(func: Function, iterations = 10000) {
        let tester = new Performance(func, iterations);
        return tester.runTest();
    }
}
