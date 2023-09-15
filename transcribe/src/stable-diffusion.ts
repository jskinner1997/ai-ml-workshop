import axios from "axios";
export const generateImage = async (textPrompt: string) => {
    const url = "https://stablediffusionapi.com/api/v3/text2img";
    const raw = {
        "key": "Ef5oSsfaztfGPQioolnLc3DFbVvrhLeu5zhlWC9naYuy0hIUlUMTOUcjC3CA",
        "prompt": textPrompt,
        "negative_prompt": "",
        "width": 1024,
        "height": 1024,
        "samples": 4,
        "num_inference_steps": 20,
        "seed": null,
        "guidance_scale": 8,
        "safety_checker": "no",
        "multi_lingual": "no",
        "panorama": "no",
        "self_attention": "no",
        "upscale": "no",
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
        "key": "Ef5oSsfaztfGPQioolnLc3DFbVvrhLeu5zhlWC9naYuy0hIUlUMTOUcjC3CA",
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