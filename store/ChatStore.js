import axios from "axios";
import { toast } from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getApiResponse } from '../pages/api/responseState';

export const ChatStore = create(
    persist(
        (set, get) => ({
            chats: [],
            loading: false,

            addChat: async (inputChat) => {
                try {
                    // Display the prompt immediately
                    const promptEntry = {
                        prompt: inputChat,
                        answer: "...",
                        date: new Date(),
                    };

                    set((state) => ({
                        chats: [...state.chats, promptEntry],
                        loading: true,
                    }));

                    const response = await axios.post("/api/chat", {
                        prompt: inputChat,
                    });

                    if (typeof response.data === 'string') {
                        // Handle string response
                        const dataChat = {
                            prompt: inputChat,
                            answer: response.data || "No answer",
                            date: new Date(),
                        };

                        // Replace the loading prompt with the actual response
                        set((state) => ({
                            chats: state.chats.map((chat) =>
                                chat === promptEntry ? dataChat : chat
                            ),
                            loading: false,
                        }));
                    } else if (response.data && response.data.choices) {
                        // Handle response with choices
                        const answer = response.data.choices[0]?.message?.content;
                        const dataChat = {
                            prompt: inputChat,
                            answer: answer || "No answer",
                            date: new Date(),
                        };

                        // Replace the loading prompt with the actual response
                        set((state) => ({
                            chats: state.chats.map((chat) =>
                                chat === promptEntry ? dataChat : chat
                            ),
                            loading: false,
                        }));
                    } else {
                        console.log('Unexpected API Response:', response);

                        // Remove the loading prompt on unexpected response
                        set((state) => ({
                            chats: state.chats.filter((chat) => chat !== promptEntry),
                            loading: false,
                        }));
                    }
                } catch (err) {
                    console.error('Error during API request:', err);
                    if (err.response) {
                        console.error('API Response Data:', err.response.data);
                        console.error('API Response Status:', err.response.status);
                        console.error('API Response Headers:', err.response.headers);
                    }
                    toast.error(
                        err.response && err.response.data.message
                            ? err.response.data.message
                            : err.message
                    );

                    // Remove the loading prompt on error
                    set((state) => ({
                        chats: state.chats.filter((chat) => chat !== promptEntry),
                        loading: false,
                    }));
                }
            },

            removeOneChat: (item) => {
                toast.success(`Success delete ${item.prompt}`);
                set((state) => ({
                    chats: state.chats.filter((x) => x !== item),
                }));
            },

            removeAllChat: () => {
                toast.success(`Success delete all chats`);
                set({ chats: [] });
            },
        }),
        {
            name: "next-openai-chats",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
