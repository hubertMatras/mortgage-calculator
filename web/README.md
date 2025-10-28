# Mortgage Calculator - Frontend

A modern, responsive mortgage calculator built with React, TypeScript, and Tailwind CSS. This frontend application provides an intuitive interface for calculating mortgage payments and viewing detailed amortization schedules.

## Features

- 📊 **Real-time Calculations**: Instantly calculate monthly payments, total interest, and total amount paid
- 📋 **Amortization Schedule**: View detailed month-by-month payment breakdown
- 💰 **Flexible Inputs**: Customize principal amount, interest rate, and loan term
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean interface built with Tailwind CSS

## Tech Stack

- **Pyhton3** - Backend API of this app
- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and formatting

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Backend API running (see parent README.md)

## Installation

1. Clone the repository and navigate to the web directory:
```bash
cd web
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables (optional):
```bash
cp .env.example .env.local
```

Set your API URL in the environment file:
```
VITE_API_URL=http://localhost:8000
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Component-specific styles
├── index.css        # Global styles and Tailwind imports
└── main.tsx         # Application entry point
```

## Usage

1. **Enter Loan Details**:
   - Principal amount (loan amount in £)
   - Annual interest rate (as percentage)
   - Loan term (in years)

2. **Calculate**: Click the "Calculate" button to get results

3. **View Results**:
   - Monthly payment amount
   - Total interest over the life of the loan
   - Total amount paid
   - Detailed amortization schedule (first 120 months displayed)

## Configuration

### Environment Variables

- `VITE_API_URL`: Backend API base URL (default: uses relative paths)

### Tailwind Configuration

The project uses Tailwind CSS v4. Configuration can be found in `tailwind.config.ts`.

## Building for Production

```bash
npm run build
```

Built files will be in the `dist/` directory.

## API Integration

This frontend communicates with a FastAPI backend. Ensure the backend is running and accessible at the configured API URL.

**API Endpoints Used:**
- `POST /calculate` - Calculate mortgage payments and amortization schedule

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.
