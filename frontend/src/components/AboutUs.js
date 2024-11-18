import "../styles/AboutUs.css";

const AboutUs = () => {
    return (
        <div className="aboutUs">
            <body>
            <div className="header">
                <h1>Sobre Nosotros</h1>
            </div>
            <section className="about-section">
                <div className="content">
                <h2>Nuestra Historia</h2>
                <p>
                    Nacimos como un proyecto universitario en la carrera de Ingeniería en Sistemas de la UTN FRLP, con la visión de mejorar la eficiencia en la gestión de restaurantes de nuestra ciudad. Desde nuestros inicios la idea fue crear una herramienta intuitiva y funcional que facilite la vida de todos los plantenses amantes de una buena comida.
                </p>
                </div>
                <div className="content">
                <h2>Equipo</h2>
                <p>
                    Somos un grupo de cinco estudiantes comprometidos con la tecnología y la innovación. Cada miembro aporta sus conocimientos en desarrollo de software y diseño de interfaces para ofrecer cada día un mejor producto.
                </p>
                </div>
                <div className="content">
                <h2>Misión</h2>
                <p>
                    Nuestra misión es transformar la gestión de restaurantes, brindando una solución tecnológica que simplifique procesos y mejore la experiencia tanto para dueños como para clientes.
                </p>
                </div>
            </section>
            <h2 className="final">
                ¡Gracias por ser parte de nuestra historia y permitirnos acompañarte en cada bocado!
            </h2>
            </body>
        </div>
    );
};

export default AboutUs;
