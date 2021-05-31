import React, { useCallback, useState } from 'react';

import { useRepo } from '../../hooks/repositories';
import { useTheme } from '../../hooks/theme';

import styles from './styles.module.scss';

interface ToDoProps {
  selector: string;
  todo: string;
  isCompleted: boolean;
  forwardRef: any;
}

interface ToDoRepo {
  todo: string;
  isCompleted: boolean;
}

const ToDos: React.FC<ToDoProps> = ({ selector, todo, isCompleted }, ...rest) => {
  const [isChecked, setIsChecked] = useState(isCompleted);

  const { todoRepo, setTodoRepo, handleDeleteTodo } = useRepo();
  const { theme } = useTheme();


  const toggleCheckbox = useCallback(() => {
    setIsChecked(!isChecked);

    todoRepo.map((task, index) => {
      if(task.id === selector) {

        const newRepo = [...todoRepo];

        newRepo[index].isCompleted = !isChecked;

        setTodoRepo(newRepo);
      }
    })
  }, [isChecked, todoRepo])

  return (
      <div className={`todo ${theme}`} {...rest}>
        <div className={isChecked ? 'checked' : 'checkbox'} onClick={toggleCheckbox}>
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
            <path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6" />
          </svg>
        </div>
        <p className={isChecked ? 'completed' : undefined}>{todo}</p>
        <span onClick={() => handleDeleteTodo(selector)}><img src="/icon-cross.svg" alt="delete" /></span>
      </div>

  )
}

export default ToDos;
