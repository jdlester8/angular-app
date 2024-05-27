interface Sample {
    time: number;
    value: number;
}

export class Graph {

    starttime: number;
    samples: Sample[];

    constructor() {
        this.starttime = new Date().getTime();
    }

    sample(sample: Sample) {
        this.samples.push(sample);
    }
}