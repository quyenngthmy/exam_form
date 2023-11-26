# Login & Register Form

Login page (the form includes username, password, remember checkbox & a link forgot password)

To login:
- Fill in the correct information of the existing username
- Fill any password

Register page (The form includes username, password, first name, last name, email, phone, address ...)

To register:
- Fill in the required information including username, password, full name, email, phone
- Address is not required

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)

## Getting Started

### Prerequisites

Make sure you have the following software installed before proceeding:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:
```
git clone https://github.com/quyenngthmy/exam_form.git
```
2. Navigate to the project directory:
```
cd source
```
3. Install dependencies:
```
npm install
```

### Scripts
List and explain the available npm scripts:

Start the development server:
```
npm start
```
Build the project for production:
```
npm run build
```
Run tests:
```
npm test
```
### Folder Structure
Explain the purpose of each important folder in your project.
```
├── /build/                  # Compiled files (not included in the repository)
├── /src/                   # Source code
│   ├── /assets/            # Static assets
│   ├── /components/        # React components
│   ├── index.scss          # Stylesheets
│   ├── index.html          # HTML template
│   ├── index.js            # Entry point
├── .babelrc                # Babel configuration
├── webpack.config.js       # Webpack configuration
└── package.json            # NPM package configuration
```
