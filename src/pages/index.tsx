import React, { useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import Header from '../components/Header';
import Input from '../components/Input';
import ToDos from '../components/ToDos';
import '../components/ThemeToggle';

import { useTheme } from  '../hooks/theme';
import { useRepo } from  '../hooks/repositories';

import '../styles/sass/Home.module.scss';

interface ToDoRepoData {
  todo: string;
  isCompleted: boolean;
}

const Home: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [isAllSelected, setIsAllSelected] = useState(true);
  const [isActiveSelected, setIsActiveSelected] = useState(false);
  const [isCompletedSelected, setIsCompletedSelected] = useState(false);

  const { todoRepo, setTodoRepo } = useRepo();
  const { theme } = useTheme();


  const selectAll = () => {
    setIsAllSelected(true);
    setIsActiveSelected(false);
    setIsCompletedSelected(false);;
  }

  const selectActive = () => {
    setIsActiveSelected(true);
    setIsAllSelected(false);
    setIsCompletedSelected(false);
  }

  const selectCompleted = () => {
    setIsCompletedSelected(true);
    setIsAllSelected(false);
    setIsActiveSelected(false);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('@TODO', JSON.stringify(todoRepo))
    }
  }, [todoRepo])

  let filteredRepo = Array.from(todoRepo);
  const activeTodoRepo = todoRepo.filter(task => {return task.isCompleted === false})

  if(isActiveSelected === true) {
      filteredRepo = filteredRepo.filter(todo => {return todo.isCompleted === false})
  }

  if(isCompletedSelected === true) {
    filteredRepo = filteredRepo.filter(todo => {return todo.isCompleted === true})
  }

  if(isAllSelected === true) {
    filteredRepo = Array.from(todoRepo)
  }


  function handleSubmit () {
    const to_do = formRef.current.getFieldValue("to-do");

    if(to_do != '') {
      const newToDo = {
            id: uuid(),
            todo: to_do,
            isCompleted: false,
          }

      setTodoRepo([newToDo, ...todoRepo]);


      formRef.current.reset()
    }

  }

  const handleOnDragEnd = (result) => {
    if(!result.destination) return;

    const items = Array.from(todoRepo);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem)

    setTodoRepo(items);
  }


  const handleClearCompleted = () => {
    const tasks = Array.from(todoRepo);
    const uncompletedTasks = tasks.filter(task => {
      return task.isCompleted !== true;
    })

    setTodoRepo(uncompletedTasks);
  }


  return (
    <section className={`main ${theme}`}>
      {theme === 'dark'
      ? <img src="/bg-desktop-dark.jpg" alt="landscape" />
      : <img src="/bg-desktop-light.jpg" alt="landscape" />
      }
      <div className='container'>
        <Header />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="to-do" />
        </Form>

        <div className='containerTodo'>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                  <ul className='indexTodo' {...provided.droppableProps} ref={provided.innerRef}>
                    {filteredRepo.map(({ id, isCompleted, todo }, index) => (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            <ToDos
                              todo={todo}
                              isCompleted={isCompleted}
                              selector={id}
                              forwardRef={provided.innerRef}
                            />
                          </li>
                        )}
                      </Draggable>
                      ))}
                      {provided.placeholder}
                  </ul>
              )}
            </Droppable>
          </DragDropContext>
          <div className='footerTodo'>
            {activeTodoRepo.length > 1
            ? <p>{activeTodoRepo.length} items left</p>
            : <p>{activeTodoRepo.length} item left</p>
            }

            <div className='filters'>
              <p className={isAllSelected ? 'selectedFilter' : undefined} onClick={selectAll}>All</p>
              <p className={isActiveSelected ? 'selectedFilter' : undefined} onClick={selectActive}>Active</p>
              <p className={isCompletedSelected ? 'selectedFilter' : undefined} onClick={selectCompleted}>Completed</p>
            </div>
            <div onClick={handleClearCompleted}>
              <p>Clear Completed</p>
            </div>
          </div>
        </div>
        <div className='reorder'>
          <p>Drag and drop to reorder list</p>
        </div>


      </div>
    </section>
  )
}

export default Home;
