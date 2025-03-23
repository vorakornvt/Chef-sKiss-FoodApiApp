import { useState } from "react"
import AccordionItem from "./AccordionItem"

// 3f. Pass in props & destructure, to access these in the render
function AccordionList({ panels }) {
  // 3b. Copy THEN delete local state, as we will move to parent page -> GOTO AboutPage.jsx
  // const [panels, setPanels] = useState([
  //   { id: 1, title: "What Am I Currently Up To", content: "Lorem ipsum dolor sit amet." },
  //   { id: 2, title: "What Makes Me Code", content: "Lorem ipsum dolor sit amet." },
  //   { id: 3, title: "What Have I Got Involved In", content: "Lorem ipsum dolor sit amet." },
  // ]);
  // 3g. Delete the local component state now - as this content data has now been accessed via parent props NOT state.  Test & DONE!

  // 2b. Our accordion needs to do two functions: (i) show a panel when clicked on + (ii) hide all other panels.  We will use a state property & a function to manage this
  // 2c. activeIndex will store the id of the accordion to be open
  const [activeIndex, setActiveIndex] = useState(0);

  // 2d. Will be the onShow event which sets the item that needs to show
  function handleShow(id){
    console.log(`Showing Accordion Panel ${id}`);
    setActiveIndex(id);
  }

  return (
    <div>
      {/* 2e. Pass this function as a callback due to parameter + isActive value to child - to be consumed & create conditonal shows -> GO TO AccordionItem.jsx */}
      {panels.map(panel => 
        <AccordionItem 
          key={panel.id}
          title={panel.title}
          isActive={activeIndex === panel.id}
          onShow={() => handleShow(panel.id)} 
        >{panel.content}</AccordionItem>
      )}
    </div>
  )
}

export default AccordionList