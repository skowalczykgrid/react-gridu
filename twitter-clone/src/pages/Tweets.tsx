import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../utils/api";
import { sanitizeHTML, getInitials } from "../utils/storage";
import { validateTweet } from "../utils/validation";
import { Tweet } from "../types";
import "./Tweets.css";

const Tweets: React.FC = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [newTweetText, setNewTweetText] = useState("");
  const [tweetError, setTweetError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadTweets = async () => {
      try {
        const tweetsData = await api.getTweets();
        setTweets(tweetsData);
      } catch (error) {
        console.error("Failed to load tweets:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadTweets();
  }, []);

  const handleTweetChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setNewTweetText(text);
    setTweetError(validateTweet(text));
  };

  const handleTweetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const error = validateTweet(newTweetText);
    if (error) {
      setTweetError(error);
      return;
    }

    setIsSubmitting(true);
    try {
      await api.createTweet(newTweetText, user.id);
      setNewTweetText("");
      setTweetError("");
      const tweetsData = await api.getTweets();
      setTweets(tweetsData);
    } catch (error) {
      console.error("Failed to create tweet:", error);
      setTweetError("Failed to create tweet");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="tweets-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="tweets-page">
      <header className="tweets-header">
        <div className="header-content">
          <h1>🐦 Another Twitter Clone</h1>
          <div className="user-info">
            <span>{user?.name}</span>
            <span className="user-initials">
              {user?.name ? getInitials(user.name) : "U"}
            </span>
          </div>
        </div>
      </header>

      <main className="tweets-main">
        <div className="tweet-composer">
          <form onSubmit={handleTweetSubmit}>
            <textarea
              placeholder="What's happening?"
              value={newTweetText}
              onChange={handleTweetChange}
              className={tweetError ? "error" : ""}
              rows={3}
            />
            <div className="composer-footer">
              <div className="character-count">{newTweetText.length}/140</div>
              <button
                type="submit"
                disabled={isSubmitting || !!tweetError || !newTweetText.trim()}
                className="tweet-button"
              >
                {isSubmitting ? "Tweeting..." : "Tweet"}
              </button>
            </div>
            {tweetError && <div className="error-message">{tweetError}</div>}
          </form>
        </div>

        <div className="tweets-list">
          {tweets.map((tweet) => (
            <div key={tweet.id} className="tweet">
              <div className="tweet-avatar">
                {tweet.author ? getInitials(tweet.author.name) : "U"}
              </div>
              <div className="tweet-content">
                <div className="tweet-header">
                  <span className="author-name">
                    {tweet.author?.name || "Unknown User"}
                  </span>
                  <span className="author-handle">
                    @{tweet.author?.id || tweet.author_id}
                  </span>
                </div>
                <div
                  className="tweet-text"
                  dangerouslySetInnerHTML={{ __html: sanitizeHTML(tweet.text) }}
                />
              </div>
            </div>
          ))}
        </div>
      </main>

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Tweets;
