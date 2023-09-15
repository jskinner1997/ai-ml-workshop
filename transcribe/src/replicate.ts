import Replicate from "replicate";
import fetch from "cross-fetch";

export const askLlama = async (prompt: string) => {
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN || "no_token",
        fetch: fetch
    });

    const model = "stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf";
    const input = { prompt};
    const output = await replicate.run(model, { input });

    console.log(output);
}

