import React from 'react';
import { Link } from 'react-router-dom';

// 1. ERROR SOLUCIONADO: Las rutas a las imágenes locales no se pudieron encontrar.
//    He reemplazado las imágenes con marcadores de posición (placeholders) para que el código compile.
//    Para usar tus propias imágenes, asegúrate de que estén en una carpeta pública (como `public/images`)
//    y usa la ruta directamente en el `src`, por ejemplo: `src="/images/Giorgio-Armani.webp"`.
//    O impórtalas como antes, pero verificando que la ruta relativa sea la correcta.

function Blogs() {
  // 2. El componente solo devuelve el contenido específico de la página.
  //    El Navbar y el Footer se renderizarán automáticamente a través de MainLayout.
  return (
    <section className="py-5">
      <div className="container">
        <h1 className="text-center mb-5 text-purple">Últimas Noticias</h1>
        <div className="row g-4">
          {/* --- Tarjeta de Blog 1 --- */}
          <div className="col-md-6">
            <div className="card h-100 shadow border-0">
              {/* 3. Se usa una URL de marcador de posición para la imagen */}
              <img 
                src="../img/Giorgio-Armani.webp" 
                className="card-img-top" 
                alt="Giorgio Armani" 
              />
              <div className="card-body d-flex flex-column">
                <h3 className="card-title text-purple">Adiós a Giorgio Armani</h3>
                <p className="card-text">
                  Un ícono de la moda y la perfumería nos deja. En su memoria, perfumes Armani con <strong>5% de descuento</strong> esta semana.
                </p>
                {/* 4. El 'a href' se cambia por 'Link to' para la navegación interna */}
                <Link to="/blog/armani" className="btn btn-purple mt-auto align-self-start">Leer más</Link>
              </div>
            </div>
          </div>

          {/* --- Tarjeta de Blog 2 --- */}
          <div className="col-md-6">
            <div className="card h-100 shadow border-0">
              <img 
                src="https://placehold.co/600x400/d1c4e9/4a148c?text=Carolina+Herrera" 
                className="card-img-top" 
                alt="Carolina Herrera" 
              />
              <div className="card-body d-flex flex-column">
                <h3 className="card-title text-purple">Los tres mejores perfumes de Carolina Herrera</h3>
                <p className="card-text">
                  Good Girl, 212 y CH: fragancias icónicas según la inteligencia artificial.
                </p>
                <Link to="/blog/carolina" className="btn btn-purple mt-auto align-self-start">Leer más</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Blogs;

