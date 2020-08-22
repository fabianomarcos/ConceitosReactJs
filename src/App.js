import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [counter, setCounter] = useState(5)

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    setCounter(counter + 1);
    const response = await api.post('repositories', {
      title: `Project ${counter}`,
      url: `https://github.com/title`,
      techs: [
      "React",
      "ReactNative",
      "AngularJS",
      "TypeScript"
      ]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(
      repositories.filter(
        repository => repository.id !== id
      )
    );
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <span>{repository.techs.map(tech => <span key={tech}>{tech}</span>)}</span>
            <span>{repository.likes}</span>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
