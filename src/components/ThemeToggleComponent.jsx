import styled from "styled-components";

const DarkModeToggleWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  padding: 5px;
  border-radius: 20px;
  border: solid orange 1px;
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const SunIcon = styled.svg`
  width: 20px;
  background-color: "fff7ed";
  height: 20px;
  stroke: currentColor;
  transition: opacity 0.3s ease;
  opacity: ${(props) => (props.isDarkMode ? 0 : 1)};
`;

const MoonIcon = styled.svg`
  width: 20px;
  height: 20px;
  background-color: "tranpra";
  stroke: currentColor;
  transition: opacity 0.3s ease;
  opacity: ${(props) => (props.isDarkMode ? 1 : 0)};
`;

const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <DarkModeToggleWrapper>
      <SunIcon
        isDarkMode={isDarkMode}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </SunIcon>
      <HiddenCheckbox
        type="checkbox"
        value="synthwave"
        className="theme-controller"
        checked={isDarkMode}
        onChange={onToggle}
      />
      <MoonIcon
        isDarkMode={isDarkMode}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </MoonIcon>
    </DarkModeToggleWrapper>
  );
};

export default DarkModeToggle;
