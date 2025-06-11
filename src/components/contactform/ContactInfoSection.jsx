import GoogleMapEmbed from "./GoogleMapEmbed.jsx"

const ContactInfoSection = () => {
  return (
    <div className="text-black px-6 py-8 rounded-lg max-w-2xl space-y-6">
      {/* Address */}
      <div>
        <h3 className="text-lg font-semibold mb-1">Our Address:</h3>
        <p className="leading-relaxed">
          <strong>Blubridge Technologies (P) Ltd.</strong><br />
          30, Norton Rd, Mandavelipakkam,<br />
          Raja Annamalai Puram,<br />
          Chennai, Tamil Nadu 600028
        </p>
      </div>

      {/* Google Map */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Google Location:</h3>
        <div className="w-full h-64">

            <a target="_blank" href='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.1197282054386!2d80.26559247484599!3d13.028046813638671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267e22f621745%3A0x2af05bbdefeb0048!2sEvodigital%20Technologies%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1749638100046!5m2!1sen!2sin'><img src="/images/map.jpg"></img></a>
          
          {/* <GoogleMapEmbed /> */}
          
        </div>
      </div>

      {/* Phone */}
      <div>
        <h3 className="text-lg font-semibold mb-1">Phone:</h3>
        <p>+91 8925817199</p>
      </div>

      {/* Email */}
      <div>
        <h3 className="text-lg font-semibold mb-1">Email:</h3>
        <p>Info.1@blubridge.com</p>
      </div>
    </div>
  );
};

export default ContactInfoSection;
