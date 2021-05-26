import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';

import Header from '../components/Header';
import Input from '../components/Input';
import ToDos from '../components/ToDos';

import { useTheme } from  '../hooks/theme';
import { useRepo } from  '../hooks/repositories';

import styles from '../styles/sass/Home.module.scss';

interface ToDoRepoData {
  todo: string;
  isCompleted: boolean;
}

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isActiveSelected, setIsActiveSelected] = useState(false);
  const [isCompletedSelected, setIsCompletedSelected] = useState(false);

  const { todoRepo, setTodoRepo} = useRepo();

  const toggleAll = () => {
    setIsAllSelected(!isAllSelected);
    setIsActiveSelected(false);
    setIsCompletedSelected(false);
  }

  const toggleActive = () => {
    setIsActiveSelected(!isActiveSelected);
    setIsAllSelected(false);
    setIsCompletedSelected(false);
  }

  const toggleCompleted = () => {
    setIsCompletedSelected(!isCompletedSelected);
    setIsAllSelected(false);
    setIsActiveSelected(false);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('@TODO', JSON.stringify(todoRepo))
    }
  }, [todoRepo])

  const { isDarkTheme } = useTheme();

  const handleSubmit = useCallback(async () => {
      formRef.current?.setErrors({});

      const to_do = formRef.current.getFieldValue("to-do");

      const newToDo = {
        todo: to_do,
        isCompleted: false,
      }

      setTodoRepo([...todoRepo, newToDo]);
  },[]);

  return (
    <section className={isDarkTheme ? styles. darkMain : styles.main}>
      {isDarkTheme
      ? <img src="/bg-desktop-dark.jpg" alt="landscape" />
      : <img src="/bg-desktop-light.jpg" alt="landscape" />
      }
      <div className={styles.container}>
        <Header />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="to-do" />
        </Form>

        <div className={styles.containerTodo}>
          <div className={styles.indexTodo} >
            {todoRepo.map((todo, index) => (
              <ToDos todo={todo.todo} isCompleted={todo.isCompleted} key={index} />
            ))}
          </div>

          {/* <ToDos todo={'diahwdiowahd'} isCompleted={false} /> */}

          <div className={styles.footerTodo}>
            <p>5 items left</p>
            <div className={styles.filters}>
              <p className={isAllSelected ? styles.selectedFilter : undefined} onClick={toggleAll}>All</p>
              <p className={isActiveSelected ? styles.selectedFilter : undefined} onClick={toggleActive}>Active</p>
              <p className={isCompletedSelected ? styles.selectedFilter : undefined} onClick={toggleCompleted}>Completed</p>
            </div>
            <p>Clear Completed</p>
          </div>
        </div>


      </div>
    </section>
  )
}

export default Home;
