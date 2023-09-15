import {startRequest} from "../src";

describe('Transcription Test', ()=>{
    const jestConsole = console;

    beforeEach(() => {
        global.console = require('console');
    });

    afterEach(() => {
        global.console = jestConsole;
    });

    test('Transcribe File', async ()=>{
        const results = await  startRequest();
    }, 360000)
})