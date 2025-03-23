// 3c. Make sure to remember to import useState here
import { useState } from "react";
import { Container } from "react-bootstrap"

import AccordionList from "../components/features/accordion/AccordionList"

function AboutPage() {
  // 3d. Add in the state (or any methods) from child list component
  const [panels, setPanels] = useState([
    { id: 1, title: "What Am I Currently Up To", content: "Lorem ipsum dolor sit amet." },
    { id: 2, title: "What Makes Me Code", content: "Lorem ipsum dolor sit amet." },
    { id: 3, title: "What Have I Got Involved In", content: "Lorem ipsum dolor sit amet." },
  ]);

  return (
    <Container>
      <h1>About Me</h1>
      {/* 3e. Make sure to pass all necessary props down to the children that are currently referencing them -> GOTO AccordionList.jsx */}
      <AccordionList 
        panels={panels}
      />
    </Container>
  )
}

export default AboutPage