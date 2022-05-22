import { useStore } from "../hooks";

const replaceAllSpacesWithEmptyString = (username: string) => {
  return username.replace(/\s+/g, "").toLowerCase();
};

export default function Tweet() {
  const tweets = useStore(state => state.tweets);

  return (
    <>
      {tweets.map(tweet => (
        <div>
          <div>
            <img src={tweet.profileImg} alt="" />
          </div>

          <div>
            <div>
              <p>{tweet.username}</p>
              <p>@{replaceAllSpacesWithEmptyString(tweet.username)}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
