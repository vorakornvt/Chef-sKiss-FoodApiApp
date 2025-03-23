# [E] to [G] COMPLEX CSS INTEGRATIONS

  - **CURRENT FOCUS:** We will now go through how to integrate React projects with THREE complex CSS frameworks & key rules with their applications:

    - **[E]** SCSS
    - **[F]** styled-components
    - **[G]** Tailwind

  - **NOTE:** This file continues from where we left off in Week 3, where we integrated our utility tooling like `react-router-dom` & **will be the base for each CSS framework integration**

## [E] SCSS CODE OVERVIEW

We will now cover various aspects regarding React + SCSS integration as follows:

**1. SETUP & INTEGRATION WITH SCSS**

  - Integrating with CLI SASS Compiler with [Vite](https://vitejs.dev/guide/features#css-pre-processors)

  - Initial adjustments to JSX files/directories to make SCSS run

**2. INTEGRATION OF SCSS + REACT-BOOTSTRAP**

  - Including React-Bootstrap stylesheet in as a SCSS import rather than external stylesheet
  
  - How to overwrite React-Bootstrap SASS with our own [Custom SASS](https://youtu.be/wdwLJcK865Q)

**3. SCSS-REACT FEATURES + 5-1 FILE ARCHITECTURE**

  - Converting CSS to SCSS features like Variables, Nesting, Extend & Modules

  - Linking SASS File Architecture with React & Bootstrap 

  - Discussion of future inclusion of mixins, functions & conditionals

&nbsp;

## [F] styled-components CODE OVERVIEW

We will now cover various aspects regarding React + styled-components integration as follows:

**1. SETUP & INTEGRATION WITH styled-components**

  - Installing styled-components package for [React Vite](https://styled-components.com/docs/basics#installation)

  - Any adjustments to JSX files/directories to make package run

**2. styled-components FEATURES + REACT-BOOTSTRAP**

  - **REMINDER:** Using React-Bootstrap as default UI with standard `main.jsx` import
  
  - Declaring CSS *styled-component* in JSX Template Literals

  - Declaring CSS *styled wrapper* in JSX to create container-like CSS

  - Overwriting React-Bootstrap components as custom *styled-ReactBS-components*

&nbsp;

## [G] TAILWIND CODE OVERVIEW

We will now cover various aspects regarding React + Tailwind integration as follows:

**1. SETUP & INTEGRATION WITH TAILWIND**

  - Installing styled-components package for [React Vite](https://tailwindcss.com/docs/installation/using-vite)

  - Any adjustments to JSX files/directories to make package run

**2. TAILWIND FEATURES**

  - **REMINDER:** We will remove React-Bootstrap as these frameworks clash!

  - Installing [Tailwind Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) + setup with config files
  
  - Converting CSS in `index.css` to the relevant utility classes, as in-line classNames

  - Setting complex CSS like flexbox/grid & pseudo-classes

  - **BONUS:** Utilising UI frameworks that use Tailwind - [DaisyUI](https://daisyui.com/), *but not responsive like Bootstrap*

  - **BONUS:** Using powerful features like light-dark mode class toggles