import { Link } from "react-router-dom";
import GoogleMapEmbed from "./GoogleMapEmbed.jsx"

const ContactInfoSection = () => {
  return (
    <div className="leb" style= {{ backgroundColor: 'rgb(255, 253, 247)' }}>
      
   <section className="bb-offices-sec">
      <h2 className="bb-offices-title">Our Offices</h2>

      {/* Office Card 1 */}
      <div className="bb-office-card">
        <div className="bb-office-left">
          <h3 className="bb-office-name">BluBridge Technologies (P) Ltd.</h3>
          <p className="bb-office-address">
            Plot #E160 Tiger Varadhachari Road,<br />
            Kalakshetra Colony, Besant Nagar,<br />
            Chennai – 600090
          </p>
        </div>

        <div className="bb-office-right">
          <div className="bb-pin-icon"><img src="/images/iconm.png"></img></div>
          <Link to="https://www.google.com/maps/place/E-160,+E-160,+Tiger+Varadachari+Rd,+Ashtalaxmi+Garden,+Anna+Colony,+Chennai,+Tamil+Nadu+600090/@12.9952355,80.2678145,19.33z/data=!4m6!3m5!1s0x3a5267f99937211f:0x9a7c0ce1a9d5ab0f!8m2!3d12.995444!4d80.26799!16s%2Fg%2F11jgdsgng4?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D" className="bb-map-link" target="_blank">View on Map »</Link>
        </div>
      </div>

      {/* Office Card 2 */}
      <div className="bb-office-card">
        <div className="bb-office-left">
          <h3 className="bb-office-name">BluBridge Technologies (P) Ltd.</h3>
          <p className="bb-office-address">
            30, Norton Rd, Mandavelipakkam, Raja<br />
            Annamalai Puram, Chennai, Tamil<br />
            Nadu 600028
          </p>
        </div>

        <div className="bb-office-right">
          <div className="bb-pin-icon"><img src="/images/iconm.png"></img></div>
          <Link to="https://www.google.com/maps/place/Blubridge+Technologies/@13.0287762,80.2693766,17.96z/data=!4m6!3m5!1s0x3a52674aca00a59f:0xbe74d1b0e2583c39!8m2!3d13.0280416!4d80.2681674!16s%2Fg%2F11m5jk9jys?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D" className="bb-map-link" target="_blank">View on Map »</Link>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bb-contact-sec">
        <p className="bb-contact-title">Phone:</p>
        <p className="bb-contact-value">+91 8925987250</p>

        <p className="bb-contact-title">Email:</p>
        <p className="bb-contact-value">Info.1@blubridge.com</p>
      </div>
    </section>
    </div>
  );
};

export default ContactInfoSection;
