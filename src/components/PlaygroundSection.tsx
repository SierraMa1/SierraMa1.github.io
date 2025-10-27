'use client';

import React, { useState, FormEvent, useEffect } from 'react';
// 1. Importamos la librería para el previsualizador de Markdown
import ReactMarkdown from 'react-markdown';

// --- Juguete 1: To-Do List (El que ya teníamos) ---
interface Todo {
  id: number;
  text: string;
}

function TodoListApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTodo: Todo = { id: Date.now(), text: input };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-md mx-auto border border-gray-200 dark:border-gray-700 h-full flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:hover:shadow-blue-500/20">
      <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        1. Mini To-Do List
      </h3>
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
      <ul className="space-y-3 h-48 overflow-y-auto pr-2 flex-grow">
        {todos.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center italic pt-4">No hay tareas pendientes.</p>
        ) : (
          todos.map(todo => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm animate-fade-in"
            >
              <span className="text-gray-900 dark:text-white break-all">{todo.text}</span>
              <button
                onClick={() => handleDelete(todo.id)}
                className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors ml-2 flex-shrink-0"
              >
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

// --- Juguete 2: Buscador de Perfiles de GitHub ---
interface GithubProfile {
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  html_url: string;
}

function GithubProfileFinder() {
  const [username, setUsername] = useState<string>('');
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setProfile(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('Usuario no encontrado');
      }
      const data: GithubProfile = await response.json();
      setProfile(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-md mx-auto border border-gray-200 dark:border-gray-700 h-full flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:hover:shadow-green-500/20">
      <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
        2. Buscador de Perfiles (API)
      </h3>
      <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario de GitHub..."
          className="flex-grow p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500" // Color de focus
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors disabled:opacity-50"
        >
          {loading ? '...' : 'Buscar'}
        </button>
      </form>
      <div className="flex-grow flex items-center justify-center text-center h-48">
        {loading && <p className="text-gray-500 dark:text-gray-400">Buscando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {profile && (
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="block text-left p-4 bg-gray-100 dark:bg-gray-900 rounded-lg w-full animate-fade-in">
            <div className="flex items-center gap-4">
              <img src={profile.avatar_url} alt={profile.name} className="w-16 h-16 rounded-full border-2 border-green-500" />
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">{profile.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{profile.bio || 'Sin biografía'}</p>
                <p className="text-sm text-gray-800 dark:text-gray-100 mt-1">
                  <span className="font-semibold">{profile.public_repos}</span> repositorios públicos
                </p>
              </div>
            </div>
          </a>
        )}
        {!loading && !error && !profile && (
          <p className="text-gray-500 dark:text-gray-400 italic">Escribe un usuario (ej: 'facebook')</p>
        )}
      </div>
    </div>
  );
}

// --- Juguete 3: Previsualizador de Markdown ---
function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState<string>(
`# ¡Hola, Markdown!
Escribe **texto en negrita** o *en cursiva*.

- Lista de ítems
- Otro ítem

\`\`\`js
// Escribe algo de código
console.log("¡Funciona!");
\`\`\``
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-md mx-auto border border-gray-200 dark:border-gray-700 h-full flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl dark:hover:shadow-purple-500/20">
      <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        3. Previsualizador de Markdown
      </h3>
      <div className="flex flex-col gap-4 flex-grow h-64 md:h-auto">
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="w-full h-40 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
          placeholder="Escribe tu Markdown aquí..."
        />
        <div className="w-full h-48 flex-grow p-3 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-y-auto prose dark:prose-invert">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}


// --- El componente principal de la SECCIÓN ---
export default function PlaygroundSection() {

  // --- NUEVO HUEVO DE PASCUA ---
  // Este código se ejecutará solo una vez cuando el componente se cargue en el navegador.
  useEffect(() => {
    const message = "¡Hola, developer! 👋 ¿Curios@ por ver cómo está hecho esto? Si encuentras el secreto en /api/secreto, ¡menciónalo en la entrevista!";
    const styles = "color: #0ea5e9; font-size: 1.2rem; font-weight: bold; background: #f0f9ff; padding: 10px; border-radius: 8px;";
    
    console.log("%c" + message, styles);
  }, []); // El array vacío [] asegura que esto solo se ejecute una vez.
  // --- FIN DEL HUEVO DE PASCUA ---

  return (
    <section id="playground" className="py-20 bg-gray-100 dark:bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
          Playground Interactivo
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          No te fíes solo de mi palabra. Prueba mi código tú mismo.
          Aquí tienes varios componentes funcionales construidos con React, Tailwind y APIs externas.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          <TodoListApp />
          <GithubProfileFinder />
          <MarkdownPreviewer />
        </div>

      </div>
    </section>
  );
}

// Estilo simple para la animación de entrada
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
