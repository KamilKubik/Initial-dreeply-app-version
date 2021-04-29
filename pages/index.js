import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  useEffect(async () => {
    const snapshot = await db.collection('projects').get();

    const projects = [];
    snapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    console.log(projects);
  }, []);

  const onProjectCreate = async () => {
    const projectId = uuidv4();
    const newProject = {
      projectId,
      projectName: inputValue,
    };
    await db.collection('projects').doc(projectId).set(newProject);
    router.push('/dashboard/startups/[startup]', `/dashboard/startups/${inputValue}`);
  };
  return (
    <div>
      <Head>
        <title>Next.js on the Jamstack with Netlify!</title>
      </Head>
      <h1>
        Next.js on the <a href="https://jamstack.org">Jamstack</a>
      </h1>

      <h3>
        Hooray 🎉 - you've built this with <a href="https://nextjs.org">Next.js</a>!
      </h3>
      <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Add new project" />
      <button onClick={onProjectCreate}>Create your project!</button>

      <style jsx>{`
        :global(html, body) {
          margin: 0;
          padding: 0;
          height: 100%;
        }

        :global(body) {
          font-size: calc(10px + 1vmin);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background-color: #282c34;
          color: white;
        }

        a {
          color: pink;
          text-decoration: none;
        }

        .content {
          padding: 0 32px;
        }
      `}</style>
    </div>
  );
};

export default Home;
