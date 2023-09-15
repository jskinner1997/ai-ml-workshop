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
    askLlama("Can you generate an image prompt from the following text:" +
        " I've rented a car in Las Vegas and have reserved a hotel in Twentynine Palms which is just north of Joshua Tree. We'll drive from Las Vegas through Mojave National Preserve and possibly do a short hike on our way down. Then spend all day on Monday at Joshua Tree. We can decide the next morning if we want to do more in Joshua Tree or Mojave before we head back.")
        .then(async r => {
            console.log(r)
            await generateImage(r!);
        })
})()