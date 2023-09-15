import {TranscribeStreamingClient, StartStreamTranscriptionCommand} from "@aws-sdk/client-transcribe-streaming";
import {createReadStream} from "fs";
import {join} from "path";
import {generateImage} from "./stable-diffusion";
import {askLlama} from "./replicate";

const audio = createReadStream(join(__dirname, "..", "resources", "input.flac"), {highWaterMark: 1024 * 10});

const LanguageCode = "en-US";
const MediaEncoding = "flac";
const MediaSampleRateHertz = 8000;


export const startRequest = async () => {
    const client = new TranscribeStreamingClient({});

    const params = {
        LanguageCode,
        MediaEncoding,
        MediaSampleRateHertz,
        ShowSpeakerLabel: true,
        AudioStream: (async function* () {
            for await (const chunk of audio) {
                yield {AudioEvent: {AudioChunk: chunk}};
            }
        })(),
    };
    const command = new StartStreamTranscriptionCommand(params);
    const response = await client.send(command);

    for await (const event of response.TranscriptResultStream!!) {
        if (event.TranscriptEvent) {
            const results = event.TranscriptEvent.Transcript?.Results;
            const done = results?.filter(result=>result.IsPartial===false).map((result) => {
                (result.Alternatives || []).map((alternative) => {
                    const transcript = alternative?.Items?.map((item) => item.Content).join(" ")
                    console.log(transcript)
                });
            });
        }
    }
}


(() => {
    askLlama("Can you generate an image prompt from the following text: " +
        "October arrived, spreading a damp chill over the grounds and into the castle. Madam Pomfrey, the nurse, was kept busy by a sudden spate of colds among the staff and students. Her Pepperup potion worked instantly, though it left the drinker smoking at the ears for several hours afterward. Ginny Weasley, who had been looking pale, was bullied into taking some by Percy. The steam pouring from under her vivid hair gave the impression that her whole head was on fire.")
        .then(async r => {
            console.log(r)
            await generateImage(r!);
        })
})()