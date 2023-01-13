import "./Loading.css";

const Loading = props => {
  return (
    <div className="modal-content">
      <div className="loader"></div>
      <div className="modal-text">Cargando...</div>
    </div>
  );
};

export default Loading;
