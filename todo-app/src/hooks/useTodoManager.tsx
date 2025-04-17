import { useState, useEffect } from 'react';

export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export default function useTodoManager(initialTasks: Task[] = []) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string, completed = false) => {
    const newTask = {
      id: Date.now(),
      text,
      completed,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return { tasks, addTask, deleteTask, toggleTask };
}
