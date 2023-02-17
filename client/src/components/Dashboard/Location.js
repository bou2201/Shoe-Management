import React from "react";

const Location = () => {
  return (
    <div className="dashboard-content-location">
      <h4 className="content-title">Location</h4>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.944299322485!2d105.85971361501224!3d20.994869786016803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad11b1f441bf%3A0xcf480c26f8137a3a!2sVTC%20Online%20Building!5e0!3m2!1svi!2s!4v1675776736458!5m2!1svi!2s"
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: 20 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="location"
      ></iframe>
    </div>
  );
};

export default Location;
