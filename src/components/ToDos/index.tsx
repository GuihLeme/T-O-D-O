import React, { useCallback, useState } from 'react';

import { useRepo } from '../../hooks/repositories';

import styles from './styles.module.scss';

interface ToDoProps {
  todo: string;
  isCompleted: boolean;
}

interface ToDoRepo {
  todo: string;
  isCompleted: boolean;
}

const ToDos: React.FC<ToDoProps> = ({ todo, isCompleted }) => {
  const [isChecked, setIsChecked] = useState(isCompleted);

  const { todoRepo, setTodoRepo } = useRepo();


  const toggleCheckbox = useCallback(() => {
    setIsChecked(!isChecked);

    todoRepo.map(task => {
      if(task.todo === todo) {
        let { isCompleted } = task
        isCompleted = isChecked;
        setTodoRepo((state: ToDoRepo[]) => {
          return {...state, task}
        })
      }
    })  //TRYING TO FIGURE OUT HOW DO I UPDATE THIS ELEMENT

  }, [isChecked])




  return (

      <div className={styles.todo}>
        <div className={isChecked ? styles.checked : styles.checkbox} onClick={toggleCheckbox}>
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
            <path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6" />
          </svg>
        </div>
        <p>{todo}</p>
      </div>

  )
}

export default ToDos;
