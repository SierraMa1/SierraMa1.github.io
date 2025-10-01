// src/components/ProjectLinkCard.jsx
import Link from 'next/link';

export default function ProjectLinkCard({ icon: Icon, title, href }) {
  return (
    <Link 
      href={href}
      className="group block rounded-lg border border-gray-200 p-6 text-center shadow-sm transition-all hover:border-violet-500 hover:shadow-md"
    >
      <div className="flex justify-center mb-4">
        {/* El icono se mostrará aquí */}
        <Icon className="h-10 w-10 text-violet-600 transition-transform group-hover:scale-110" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">
        {title}
      </h3>
    </Link>
  );
}