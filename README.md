# Twitter Clone

Twitter clone using nextjs inspired by https://www.youtube.com/watch?v=rCselwxbUgA

## Create .env.local file and include the following env vars:

```
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
SANITY_API_TOKEN=your_sanity_api_token
NEXT_PUBLIC_BASE_URL=your_localhost_url
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Start sanity server

Go to https://www.sanity.io/sonny and install

```
sudo npm install -g @sanity/cli
sanity init --coupon sonny2022
```

```
cd sanity && sanity start
```

Open [http://localhost:3333](http://localhost:3333) with your browser to see the result.

Sign in with github account
