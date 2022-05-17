const Button = ({ children, type = "button" }) => {
  return (
    <button className="btn" type={type}>
      <span id="span1" />
      <span id="span2" />
      <span id="span3" />
      <span id="span4" />
      <div className="btn_content">{children}</div>
    </button>
  );
};

export { Button };
