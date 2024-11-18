import "../styles/Contact.css";

const Contact = () => {
return (
    <div className="contact">
    <body>
        <div class="header">
        <h1>Contacto</h1>
        </div>
        <section class="contact-section">
        <div class="content">
            <h2>Queremos Escucharte</h2>
            <p> Si tenés alguna pregunta, sugerencia, incoveniente con la aplicación o querés trabajar con nosotros, no dudes en ponerte en contacto. <br /><br /> Tu mensaje no molesta.</p>
        </div>
        <div class="content">
            <h2>Detalles de Contacto</h2>
            <div class="contentDetalles">
            <p><b>Dirección:</b> Av. 60 1554 </p>
            <p><b>Ciudad:</b> Berisso, Provincia de Buenos Aires</p>
            <p><b>Teléfono:</b> (221) 123-4567</p>
            <p><b>Correo Electrónico:</b> contacto@gestion_restaurantelp.com.ar</p>
            <p><b>Instagram:</b> @Gestion_RestauranteLP</p> 
            <p><b>Facebook:</b> Gestion Restaurante La Plata</p>
            </div>
        </div>
        </section>
        <h2 class="final">
        ¡Esperamos tu mensaje y estamos felices de poder ayudarte en lo que
        necesites!
        </h2>
    </body>
    </div>
);
};

export default Contact;
