import React from 'react';
// No necesitas 'Link' aquí, ya que el Navbar (en MainLayout) lo maneja.

function DashboardAdmin() {
  return (
    // Este es el <main> de tu archivo indexAdmin.html
    <main className="container my-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="display-4 fw-bold text-purple">Tienda DuocFragancias</h1>
          <p className="lead">La mejor selección de perfumes importados y nacionales con los precios más convenientes
            del mercado.</p>
          <p>Encuentra fragancias únicas para cada ocasión, desde clásicos atemporales hasta las últimas novedades
            en el mundo de la perfumería.</p>
        </div>
        <div className="col-md-3 row-mx-auto text-center videoPolo">
          {/*
            ¡IMPORTANTE! Para que este GIF funcione:
            1. Mueve tu carpeta 'videos' a la carpeta 'public' en la raíz de tu proyecto React.
            2. La ruta en 'src' ahora debe ser absoluta desde la raíz: '/videos/video_polo.gif'
          */}
          <img 
            src="/assets/gifs/video_polo_blue.gif" 
            alt="Perfume animado" 
            className="img-fluid rounded shadow gif-perfume" 
          />
        </div>
      </div>
    </main>
  );
}

export default DashboardAdmin;