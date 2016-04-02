import {Performance} from "./Performance";

class CommunicationLines {
    calculate(teamSize: number) {
        return (teamSize * (teamSize - 1)) / 2;
    }
}

function testCommunicationLines() {
    let communicationLines = new CommunicationLines();

    let result = communicationLines.calculate(4);

    if (result !== 6) {
        throw new Error('Test failed for team size of 4.');
    }

    result = communicationLines.calculate(10);

    if (result !== 45) {
        throw new Error('Test failed for team size of 10.');
    }
}

function testCommunicationLinesWithFail() {
    let communicationLines = new CommunicationLines();

    let result = communicationLines.calculate(4);

    if (result !== 7) {
        throw new Error('Test failed for team size of 4.');
    }

    result = communicationLines.calculate(10);

    if (result !== 45) {
        throw new Error('Test failed for team size of 10.');
    }
}

let result = Performance.run(testCommunicationLines, 1000000);
// let result = Performance.run(testCommunicationLinesWithFail, 1000000);
// let result = Performance.run(() => testCommunicationLines(), 1000000);

console.log(result.totalRunTime + ' ms');
