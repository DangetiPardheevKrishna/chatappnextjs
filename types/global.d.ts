declare global {
  var mongoose: {
    conn: typeof import("mongoose") | null;
    promise: Promise<typeof import("mongoose")> | null;
  };
}

export {};

export type Personality = {
  id: string;
  name: string;
  avatar: string;
  systemPrompt: string;
};

export type Message = {
  id: string;
  personalityId: string;
  sender: "user" | "ai";
  content: string;
};
