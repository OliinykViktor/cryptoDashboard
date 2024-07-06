# Market Data Dashboard

This is a Market Data Dashboard built with React, TypeScript, and Ant Design, using Redux Toolkit for state management and CodeMirror for displaying code snippets. The app fetches market data from the CoinGecko API and supports theme switching.

## Features

- Display market data in a table
- Pagination and page size options
- Filters for market data
- Theme switching between light and dark mode
- Display source code with CodeMirror

## Tech Stack

- **Frontend**: React, TypeScript, Ant Design, Vite
- **State Management**: Redux Toolkit
- **API**: CoinGecko API
- **Code Editor**: CodeMirror
- **Deployment**: Firebase CDN

## Setup

### Prerequisites

- Node.js
- Yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/OliinykViktor/cryptoDashboard.git
cd market-data-dashboard
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
```

4.Open your browser and navigate to http://localhost:5173/.

## Project Structure

- **src/: Contains all the source code**
- **app/: Redux store configuration and slices**
- **view/: Page components**
- **shared/: Reusable components, shared models, utilities, and constants**
- **types/: TypeScript type definitions**

## Usage

### Market Data

The market data is fetched from the CoinGecko API. You can filter the data using the filters provided and paginate through the results.

### Theme Switching

Use the theme switcher to toggle between light and dark themes.

### Code Snippets

The source code for components is displayed using CodeMirror. You can view the code for each component directly in the application.

## Deployment

The application is deployed to Firebase CDN. To deploy your own version:

1. Install Firebase CLI:

```bash
yarn global add firebase-tools
```

2. Login to Firebase:

```bash
firebase login
```

3. Initialize Firebase in your project directory:

```bash
firebase init
```

4.Deploy to Firebase:

```bash
firebase deploy
```

## Acknowledgements

- [CoinGecko](https://www.coingecko.com/en/api) API for market data
- [Ant Design](https://ant.design/) for UI components
- [CodeMirror](https://codemirror.net/) for the code editor
