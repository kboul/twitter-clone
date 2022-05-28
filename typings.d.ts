interface TweetBody {
  text: string;
  username: string;
  profileImg: string;
  image?: string;
}

interface Tweet extends TweetBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: "tweet";
  blockTweet: boolean;
}

interface CommentBody {
  comment: string;
  profileImg: string;
  tweetId: string;
  username: string;
}

interface Comment extends CommentBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  tweet: {
    _ref: string;
    _type: "reference";
  };
  _type: "comment";
  _updatedAt: string;
}

export type { Comment, CommentBody, Tweet, TweetBody };
