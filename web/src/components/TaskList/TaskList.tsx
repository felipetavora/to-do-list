import styles from './styles.module.css';
import { useState } from 'react';
import { Trash } from 'phosphor-react';
import { InputTask } from '../InputTask/InputTask';
import emptyList from '../../assets/emptyList.svg';

export interface TaskListProps {
   id: number;
   title: string;
   isComplete: boolean;
}

export function TaskList() {
   const [allTasks, setAllTasks] = useState<TaskListProps[]>([]);
   const countCompleteTasks = allTasks.filter((task) => task.isComplete).length;

   function handleCompletedTask(id: number) {
      const updatedTask = [...allTasks].map((task) => {
         if (task.id === id) {
            task.isComplete = !task.isComplete;
         }
         return task;
      });
      setAllTasks(updatedTask);
   }

   function handleNewTask(task: TaskListProps) {
      if (task.title.trim() === '') {
         return;
      }
      const newTasks = [task, ...allTasks];
      setAllTasks(newTasks);
   }

   function handleDeleteTask(id: number) {
      const removeTask = [...allTasks].filter((task) => task.id !== id);
      setAllTasks(removeTask);
   }

   return (
      <>
         <InputTask onSubmit={handleNewTask} />
         <div className={styles.container}>
            <div className={styles.countContainer}>
               <span className={styles.tasks}>
                  Tarefas criadas <strong>{allTasks.length}</strong>
               </span>
               <span className={styles.concludedTasks}>
                  Concluídas
                  <strong>
                     {countCompleteTasks} de {allTasks.length}
                  </strong>
               </span>
            </div>
            {allTasks.length ? (
               allTasks.map((task) => {
                  return (
                     <div key={task.id} className={styles.list}>
                        <div className={styles.listContainer} onClick={() => handleCompletedTask(task.id)}>
                           <input
                              className={task.isComplete ? styles.radioChecked : styles.radio}
                              type="checkbox"
                              checked={task.isComplete}
                              onChange={() => {}}
                           />
                           <label></label>
                           <p className={task.isComplete ? styles.textChecked : ''}>{task.title}</p>
                        </div>
                        <button onClick={() => handleDeleteTask(task.id)} title="Deletar tarefa" className={styles.trash}>
                           <Trash size={20} />
                        </button>
                     </div>
                  );
               })
            ) : (
               <>
                  <div className={styles.emptyList}>
                     <img src={emptyList} alt="Lista vazia" />
                  </div>
                  <p className={styles.span}>
                     <strong>Você ainda não tem tarefas cadastradas</strong>
                     <br />
                     Crie tarefas e organize seus itens a fazer
                  </p>
               </>
            )}
         </div>
      </>
   );
}
