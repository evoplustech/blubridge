import { Link } from "react-router-dom";
import GoogleMapEmbed from "./GoogleMapEmbed.jsx"

const ContactInfoSection = () => {
  return (
    <div className="text-black px-6 py-8 rounded-lg max-w-2xl space-y-6 mainlt" style= {{ backgroundColor: 'rgb(255, 253, 247)' }}>
      
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
          <Link to="https://www.google.com/maps/@12.995322,80.2678272,3a,75y,100.97h,96.44t/data=!3m7!1e1!3m5!1sWsJDiz4y1obGxh1B4PTrzA!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-6.443799846570272%26panoid%3DWsJDiz4y1obGxh1B4PTrzA%26yaw%3D100.9726938608738!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D" className="bb-map-link" target="_blank">View on Map »</Link>
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
          <Link to="https://www.google.com/local/place/fid/0x3a52674aca00a59f:0xbe74d1b0e2583c39/photosphere?iu=https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid%3DrSKD62zPEKm7TEFZ-yUr7A%26cb_client%3Dsearch.gws-prod.gps%26yaw%3D285.38077%26pitch%3D0%26thumbfov%3D100%26w%3D0%26h%3D0&ik=CAISFnJTS0Q2MnpQRUttN1RFRloteVVyN0E%3D&sa=X&ved=2ahUKEwjXoYfe3ZKRAxUTT2wGHRIMGjcQpx96BAgZEBI" className="bb-map-link" target="_blank">View on Map »</Link>
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
