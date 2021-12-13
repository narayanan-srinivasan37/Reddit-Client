const base_url = "https://www.reddit.com";

export const fetchPostData = async (parameter) => {
  try {
    const fetchData = await fetch(`${base_url}/r/popular/${parameter}.json`);
  
    const jsondata = await fetchData.json();

    if (fetchData.status === 200) {
      const data = jsondata.data.children;
      return data;
    }
  } catch (err) {
    throw new Error(err.message || "failed to fetch");
  }
};

export const subreddit = async () => {
  try {
    const fetchData = await fetch(`${base_url}/subreddits.json`);
    const jsondata = await fetchData.json();

    if (fetchData.status === 200) {
      const data = jsondata.data.children.map((subreddit) => {
        return subreddit;
      });

      return data;
    }
  } catch (err) {
    throw new Error(err.message || "failed to fetch");
  }
};

export const commentFetch = async (fetchParams) => {
  const { subreddit, id } = fetchParams;

  try {
    const fetchData = await fetch(
      `${base_url}/r/${subreddit}/comments/${id}/.json`
    );
    const jsonresponse = await fetchData.json();

    if (fetchData.status === 200) {
      return jsonresponse;
    }
  } catch (err) {
    throw new Error(err.message || "failed to fetch");
  }
};

export const subredditPosts = async (subreddit) => {
  try {
    const fetchData = await fetch(`${base_url}/r/${subreddit}/.json`);
    const jsonresponse = await fetchData.json();

    if (fetchData.status === 200) {
      return jsonresponse;
    }
  } catch (err) {
    throw new Error(err.message || "failed to fetch");
  }
};

export const subredditAbout = async (subreddit) => {
  try {
    const fetchData = await fetch(`${base_url}/r/${subreddit}/about.json`);
    const jsonresponse = await fetchData.json();

    if (fetchData.status === 200) {
      return jsonresponse;
    }
  } catch (err) {
    throw new Error(err.message || "failed to fetch");
  }
};

export const userAbout = async (user) => {
  try {
    const fetchData = await fetch(`${base_url}/user/${user}/about.json`);
    const jsonresponse = await fetchData.json();
    if (fetchData.status === 200) {
      return jsonresponse;
    }
  } catch (err) {
    throw new Error(err.message || "failed to fetch");
  }
};

export const userPosts = async (user) => {
  try {
    const fetchData = await fetch(`${base_url}/user/${user}/.json`);
    const jsonresponse = await fetchData.json();

    if (fetchData.status === 200) {
      return jsonresponse;
    }
  } catch (err) {
    throw new Error(err.message || "failed to fetch");
  }
};

export const redditSearch = async (param, type = "sr") => {
  try {
    const fetchData = await fetch(
      `${base_url}/search.json?q=${param}&type=${type}`
    );
    const jsonresponse = await fetchData.json();

    if (fetchData.status === 200) {
      return jsonresponse;
    }
  } catch (err) {
    throw new Error(err.message || "failed to fetch");
  }
};
