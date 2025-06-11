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

            <a target="_blank" href="https://www.google.com/maps/place/30,+Norton+Rd,+Mandavelipakkam,+Mandaveli,+Chennai,+Tamil+Nadu+600028/@13.0280416,80.2681674,17z/data=!3m1!4b1!4m6!3m5!1s0x3a5267d1ab225575:0xe0b23cd509229297!8m2!3d13.0280416!4d80.2681674!16s%2Fg%2F11h3k0tc7n?entry=ttu&g_ep=EgoyMDI1MDIxOS4xIKXMDSoASAFQAw%3D%3D"><img src="/images/map.jpg"></img></a>
          
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
