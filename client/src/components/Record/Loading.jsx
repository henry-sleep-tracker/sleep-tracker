import "./Loading.css";

const Loading = () => {



  return (
    <div className="modal">
      <div className="modal-content">
        <div className="loader"></div>
        <div className="modal-text">Cargando...</div>
      </div>
    </div>
  );
};

export default Loading;
