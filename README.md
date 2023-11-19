# NextJS LM-Studio Chatbot

A NextJS animated chatbot on local CPU using LM Studio. 

### Requirements

- Node.js 14+ and npm
- LM Stdio 
- NextJS
### Getting started

1. Download and install LM Studio, select a model and click "Start Server", for this project I used Mistral 7B Instruct q2_k_gguf because it's really fast on CPU, but any model should work. 

2. Clone this repo and run the following command to install the node_modules:

```shell
npm install
```

## Run the app

4. Run the development server : 

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.  

```shell
structure folder app

├── components                      # Components folder
├── pages                           # Next JS Pages
├── public                          # Public assets folder
├── store                           # Store folder
├── styles                          # Next JS Style
├── README.md                       # README file
├── tailwind.config.js              # Tailwind CSS configuration
├── .env                            # Next JS environment variables
```

### Features

- ⚡ [Next.js](https://nextjs.org) for Fullstack Framework Javascript
- 🤖 Integrate Chatbot API with [OpenAI](https://openai.com)
- 💎 Integrate Styling with [Tailwind CSS](https://tailwindcss.com)
- ⚙️ State Management with [Zustand](https://www.npmjs.com/package/zustand)
- 🔦 Animation Chats with [AutoAnimate](https://auto-animate.formkit.com)

### Screenshoot app

|Screenshot|
|---|
| ![SS Chat](https://github.com/PaulGwamanda/NextJS-LM-Studio-Chatbot/blob/main/public/image/chat-window.png?raw=true "ss nextjs chat ") | ![SS Chats](https://github.com/PaulGwamanda/NextJS-LM-Studio-Chatbot/blob/main/public/image/chat-window.png?raw=true "ss nextjs chat ") |

