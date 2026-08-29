import "./SectionTitle.css";

const SectionTitle = ({ title }) => {
  return (
    <div className="section-title">

      <h4>{title}</h4>

      <div className="section-line"></div>

    </div>
  );
};

export default SectionTitle;