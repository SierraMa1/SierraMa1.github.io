'use client'; // Necesario porque usaremos "hooks" de React (useState)

import React, { useState, FormEvent } from 'react';

// --- Definimos el "mini-juguete": una To-Do List ---
// Este es un componente autocontenido que vive dentro de nuestra sección

// 1. Definimos el tipo de dato para cada "tarea" (buena práctica de TS)
interface Todo {
  id: number;
  text: string;
}

function TodoListApp() {
  // 2. Definimos los "estados"
  const [todos, setTodos] = useState<Todo[]>([]); // La lista de tareas
  const [input, setInput] = useState<string>(''); // El texto en el campo de entrada

  // 3. Función para manejar el envío del formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue
    if (!input.trim()) return; // No añadir tareas vacías

    const newTodo: Todo = {
      id: Date.now(), // ID único basado en la fecha
      text: input,
    };

    setTodos([...todos, newTodo]); // Añade la nueva tarea al final de la lista
    setInput(''); // Limpia el campo de entrada
  };

  // 4. Función para borrar una tarea
  const handleDelete = (id: number) => {
    // Filtra la lista, quedándose solo con las tareas que NO tienen esa ID
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800/60 backdrop-blur-sm shadow-xl rounded-2xl p-6 w-full max-w-md mx-auto border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">
        Mini To-Do List
      </h3>
      
      {/* 5. Formulario para añadir tareas */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Añadir una tarea..."
          className="flex-grow p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors"
        >
          Añadir
        </button>
      </form>

      {/* 6. Lista de tareas pendientes */}
      <ul className="space-y-3 h-48 overflow-y-auto pr-2">
        {todos.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center italic pt-4">No hay tareas pendientes.</p>
        ) : (
          todos.map(todo => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm animate-fade-in"
            >
              <span className="text-gray-900 dark:text-white">{todo.text}</span>
              <button
                onClick={() => handleDelete(todo.id)}
                className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
              >
                {/* Icono de papelera (SVG) para que se vea profesional */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                </svg>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}


// --- El componente principal de la SECCIÓN ---
// Este es el que exportamos y usamos en `page.tsx`
export default function PlaygroundSection() {
  return (
    <section id="playground" className="py-20 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
          Playground Interactivo
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          No te fíes solo de mi palabra. Prueba mi código tú mismo.
          Aquí tienes un componente funcional construido con React y Tailwind.
        </p>
        
        {/* Aquí renderizamos nuestra mini-app */}
        <div className="flex justify-center">
          <TodoListApp />
        </div>

      </div>
    </section>
  );
}

// Estilo simple para la animación de entrada
// (No puedo añadirlo al CSS global, así que lo defino aquí)
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out;
    }
  `;
  document.head.appendChild(style);
}
