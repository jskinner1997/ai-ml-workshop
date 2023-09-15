import axios from "axios";
export const generateImage = async (textPrompt: string) => {
    const url = "https://stablediffusionapi.com/api/v3/text2img";
    const raw = {
        "key": "BAPbWEsrureJo1qCqYSqloBpubH15Gz1OgcLBLC5K01kBf9fh6gEX1dDIIgh",
        "prompt": textPrompt,
        "negative_prompt": "",
        "width": 512,
        "height": 512,
        "samples": 1,
        "num_inference_steps": 20,
        "seed": null,
        "guidance_scale": 8,
        "safety_checker": "yes",
        "multi_lingual": "no",
        "panorama": "no",
        "self_attention": "no",
        "upscale": "yes",
        "embeddings_model": null,
        "webhook": null,
        "track_id": null
    }

    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: raw,
    };

    try {
        await axios.post(url, requestOptions.body)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.error("Error generating image:", error);
    }
};

export const fetchImage = async (requestId: number) => {
    const url = "https://stablediffusionapi.com/api/v4/dreambooth/fetch";
    const raw = {
        "key": "BAPbWEsrureJo1qCqYSqloBpubH15Gz1OgcLBLC5K01kBf9fh6gEX1dDIIgh",
        "request_id": requestId
    }
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: raw,
    };

    try {
        await axios.post(url, requestOptions.body)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.error("Error fetching image:", error);
    }
}