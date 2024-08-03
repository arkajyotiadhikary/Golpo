import { pipeline } from "@xenova/transformers";

export const generate = async (prompt: string) => {
      console.log("Generating story...", prompt);
      const generator = await pipeline("text-generation", "distilgp2");
      try {
            const output = await generator(prompt, {
                  max_length: 100,
                  num_return_sequences: 1,
            });
            return output;
      } catch (error) {
            console.error("Error generating story.", error);
      }
};
