import React, { useEffect, useState } from 'react';
import { db } from '../../../../lib/firebase-admin';

const ProjectPage = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  useEffect(() => {
    projects && setSelectedProject(projects[0]);
  });
  console.log(projects);
  return (
    <div>
      <h2>Welcome to the project page! Project name:</h2>
      {selectedProject && <p>{selectedProject.projectName}</p>}
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  try {
    let ref = db.collection('projects').where('projectName', '==', params.startup);

    const snapshot = await ref.get();
    const projects = [];

    snapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });

    return {
      props: { projects },
    };
  } catch (error) {
    console.log('Error --> ', error);
  }
};

export default ProjectPage;
