import {startRequest} from "../src";
import {fetchImage, generateImage} from "../src/stable-diffusion";

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

    test('Stable Diffusion', async () => {
        const results = await generateImage("big foot monster but with little feet");
    }, 360000)

    test('fetch image', async () => {
        const results = await fetchImage(42764798);
    })
})