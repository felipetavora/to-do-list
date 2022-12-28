import styles from './styles.module.css';
import { FormEvent, useState } from 'react';
import { PlusCircle } from 'phosphor-react';
import { TaskListProps } from '../TaskList/TaskList';

interface InputProps {
   onSubmit: ({ id, title, isComplete }: TaskListProps) => void;
}

export function InputTask(onSubmit: InputProps) {
   const [task, setTask] = useState('');

   function handleSubmit(e: FormEvent) {
      e.preventDefault();
      onSubmit.onSubmit({
         id: Math.floor(Math.random() * 10000),
         title: task,
         isComplete: false,
      });
      setTask('');
   }

   return (
      <section className={styles.section}>
         <form onSubmit={handleSubmit} className={styles.container}>
            <input
               className={styles.inputTask}
               type="text"
               placeholder="Adicione uma nova tarefa..."
               value={task}
               onChange={(e) => setTask(e.target.value)}
               required
            />
            <button type="submit" className={styles.buttonCreateTask}>
               Criar
               <PlusCircle className={styles.icon} size={18} />
            </button>
         </form>
      </section>
   );
}
