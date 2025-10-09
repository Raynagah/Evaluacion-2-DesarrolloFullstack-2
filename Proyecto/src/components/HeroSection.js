//Componente de la página principal 
import React from 'react';
import heroGif from '../assets/gifs/video_polo_blue.gif'; 

function HeroSection() {
  return (
    <section className="hero-section pt-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-4 fw-bold text-purple">Tienda DuocFragancias</h1>
            <p className="lead">La mejor selección de perfumes importados y nacionales con los precios más convenientes del mercado.</p>
            <a href="tienda.html" className="btn btn-purple btn-lg">Explorar Productos</a>
          </div>
          <div className="col-md-6 text-center">
            {/* Nota cómo se importa y usa la imagen local y se cambia el style */}
            <img src={heroGif} alt="Perfumes" className="img-fluid rounded shadow" style={{ maxWidth: '300px' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;