import "../styles/form.scss";

const Form = () => {
  return (
    <div className="content-form">
      <div className="content-form-card">
        <header>
          <h1 className="content-form-card-title ">New Note</h1>
        </header>
        <form className="content-form-card-form ">
          <input type="text" placeholder="Title" className="content-form-card-input" />
          <textarea placeholder="Take a note..." className="content-form-card-textarea" rows={5} />
        </form>
      </div>
    </div>
  );
};

export { Form };
