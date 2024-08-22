import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex space-x-2 text-gray-700">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-2 h-2 mx-2 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 8 8"
                fill="currentColor"
              >
                <path d="M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z" />
              </svg>
            )}
            {index === items.length - 1 ? (
              <span className="text-cyan-600">{item.label}</span>
            ) : (
              <Link to={item.href} className="text-gray-400 hover:text-gray-600">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
