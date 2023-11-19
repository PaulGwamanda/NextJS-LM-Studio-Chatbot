import { makeApiRequest } from "./api";
import { setApiResponse } from "./responseState";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed!!" });
    return;
  }

  if (req.method === "POST") {
    const messages = [
      { role: 'system', content: 'You are my friend. Your name is Bot' },
      { role: 'user', content: req.body.prompt },
    ];

    if (messages[1].content) {
      try {
        const response = await makeApiRequest(messages);
        console.log('response', response);
        if (response !== 'Error occurred during API request.') {
          setApiResponse(response); // Store the response
          res.json(response);
        } else {
          res.status(500).send("Oops, Something went wrong!!");
        }
      } catch (error) {
        console.error('Error in handler:', error);
        res.status(500).send("Oops, Something went wrong!!");
      }
    } else {
      res.status(404).send("Please, write your chat!!");
    }
  }
}