import { User, Tweet } from "../types";

const API_BASE_URL = "http://localhost:3001";

const fetchJson = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = new Error("Request failed");
    (error as any).status = response.status;
    throw error;
  }
  return response.json();
};

export const api = {
  async login(email: string): Promise<User> {
    const users = await fetchJson(`${API_BASE_URL}/users?email=${email}`);
    if (!users.length) {
      const error = new Error("User not found");
      (error as any).status = 404;
      throw error;
    }
    return users[0];
  },

  async signup(
    email: string,
    username: string,
    fullName: string
  ): Promise<User> {
    const newUser = {
      id: username || email.split("@")[0],
      name: fullName,
      email,
    };
    return fetchJson(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
  },

  async getTweets(): Promise<Tweet[]> {
    const [tweets, users] = await Promise.all([
      fetchJson(`${API_BASE_URL}/tweets`),
      fetchJson(`${API_BASE_URL}/users`),
    ]);

    return tweets.map((tweet: Tweet) => ({
      ...tweet,
      author: users.find((user: User) => user.id === tweet.author_id) || {
        id: tweet.author_id,
        name: "Unknown User",
        email: "",
      },
    }));
  },

  async createTweet(text: string, authorId: string): Promise<Tweet> {
    return fetchJson(`${API_BASE_URL}/tweets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Date.now().toString(),
        author_id: authorId,
        text,
      }),
    });
  },
};
