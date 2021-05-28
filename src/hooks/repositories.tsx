import React, { createContext, useContext, useState } from 'react';

interface ToDoRepo {
  id: string;
  todo: string;
  isCompleted: boolean;
}

interface RepositoryContextData {
  todoRepo: ToDoRepo[];
  setTodoRepo: (todoRepo: ToDoRepo[]) => void;
}

export const RepositoryContext = createContext<RepositoryContextData>({} as RepositoryContextData);

export const RepositoryProvider: React.FC = ({ children }) => {
  const [todoRepo, setTodoRepo] = useState<ToDoRepo[]>(() => {
    if (typeof window !== 'undefined') {
      const repository = localStorage.getItem('@TODO');

      if(repository) {
        return JSON.parse(repository);
      }

    return [] as ToDoRepo[];

    }

    return [] as ToDoRepo[];
  })

  return (
    <RepositoryContext.Provider value={{
      todoRepo, setTodoRepo
    }}
    >
      {children}
    </RepositoryContext.Provider>
  );
};

export function useRepo(): RepositoryContextData {
  const context = useContext(RepositoryContext);

  return context;
}

