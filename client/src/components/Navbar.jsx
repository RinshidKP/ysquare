import React, { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [highlightedElement, setHighlightedElement] = useState(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const elements = document.getElementsByClassName('nav-link');
      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        if (
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        ) {
          setHighlightedElement(element.getAttribute('data-pathname'));
          break;
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  return (
    <nav className="admin-nav-bar">
      <div className="container">
        <a
          className="nav-link" activeClassName="highlight"
          data-pathname="/"
        >
          Home
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
