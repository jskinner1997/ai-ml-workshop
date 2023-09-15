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
        const results = await generateImage("A group of students and staff members gathered in the Great Hall of Hogwarts Castle, all of them sniffling and coughing due to a sudden outbreak of colds. Madam Pomfrey, the school nurse, stands at the front of the room, holding a large cauldron containing her famous Pepperup potion. She ladles the steaming potion into cups and hands them out to the afflicted individuals. Ginny Weasley, one of the students, looks particularly pale and miserable, but she's being persuaded by Percy, another student, to take a dose of the potion. As she drinks it down, steam begins to rise from her vibrant red hair, giving the appearance that her entire head is engulfed in flames. The atmosphere is cozy and warm despite the chill outside, with the fire crackling in the hearth and the smell of the potion filling the air.\n" +
            "inner prompt?: A group of students and staff members gathered in the Great Hall of Hogwarts Castle, all of them sniffling and coughing due to a sudden outbreak of colds. Madam Pomfrey, the school nurse, stands at the front of the room, holding a large cauldron containing her famous Pepperup potion. She ladles the steaming potion into cups and hands them out to the afflicted individuals. Ginny Weasley, one of the students, looks particularly pale and miserable, but she's being persuaded by Percy, another student, to take a dose of the potion. As she drinks it down, steam begins to rise from her vibrant red hair, giving the appearance that her entire head is engulfed in flames. The atmosphere is cozy and warm despite the chill outside, with the fire crackling in the hearth and the smell of the potion filling the air.\n" +
            "A group of students and staff members gathered in the Great Hall of Hogwarts Castle, all of them sniffling and coughing due to a sudden outbreak of colds. Madam Pomfrey, the school nurse, stands at the front of the room, holding a large cauldron containing her famous Pepperup potion. She ladles the steaming potion into cups and hands them out to the afflicted individuals. Ginny Weasley, one of the students, looks particularly pale and miserable, but she's being persuaded by Percy, another student, to take a dose of the potion. As she drinks it down, steam begins to rise from her vibrant red hair, giving the appearance that her entire head is engulfed in flames. The atmosphere is cozy and warm despite the chill outside, with the fire crackling in the hearth and the smell of the potion filling the air.\n");
    }, 360000)

    test('fetch image', async () => {
        const results = await fetchImage(42764798);
    })
})