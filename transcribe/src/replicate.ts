import Replicate from "replicate";

export const askLlama = async (prompt: string) => {
    try {
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN || "no_token",
        });

        const model = "meta/llama-2-70b-chat:2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1";
        const input = {prompt};
        const output: string[] = await replicate.run(model, { input }) as string[];
        const parsed = output.reduce((acc, o) => {
            acc = acc + o;
            return acc;
        }, "")
        console.log('parsed: ', parsed)
        const innerText = parsed.split("\n")[2]
        console.log('inner prompt?: '+ innerText)
        return innerText;
    } catch (e) {
        console.log(e)
    }


}

