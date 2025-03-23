// 2f. We need to adjust our destructuring as we are passing MORE props + we can actually do this in the parameter call
function AccordionItem({ title, children, isActive, onShow }) {
  return (
    <section>
      <h3>{title}</h3>
      {/* 2g. We now want our content's appearance to be conditional based on the true/false value of isActive (which is defined in the parent via props) */}
      { isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>Show</button>
        // 2h. We also REFERENCE our function in the onClick, as the function only needs to be called when button is clicked.  The id as an argument has already occurred on mapping this item = DONE!
      )}
    </section>
  )
}

export default AccordionItem