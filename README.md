# DocScan - Document Scanning & Matching System

A modern web application for scanning and analyzing document similarities using advanced text matching algorithms. Built with React, Next.js, and Tailwind CSS, DocScan provides a robust platform for document analysis and management.

## 🚀 Features

### 📊 Document Analysis
- **Advanced Text Scanning**: Upload and analyze documents with sophisticated matching algorithms
- **Real-time Processing**: Watch your document analysis happen in real-time with progress tracking
- **Multiple Input Methods**: Support for direct text input and file uploads (.txt files)
- **Detailed Results**: Get comprehensive similarity scores and matched content highlights
- **Match History**: Keep track of all your previous scans and their results

### 👥 User Management
- **Secure Authentication**: Email and password-based user authentication
- **Profile Management**: Customize your user profile and preferences
- **Role-based Access**: Different capabilities for users and administrators
- **Activity Tracking**: Monitor your document scanning history and credit usage

### 💳 Credit System
- **Daily Free Credits**: Start with 20 free credits daily
- **Credit Management**: Request additional credits when needed
- **Usage Tracking**: Monitor your credit consumption
- **Admin Approval System**: Streamlined credit request workflow

### 📈 Analytics Dashboard (Admin)
- **System Statistics**: Monitor overall system usage and performance
- **User Analytics**: Track user activity and engagement
- **Credit Management**: Handle credit requests and allocations
- **Document Insights**: Analyze scanning patterns and trends

## 🛠️ Tech Stack

- **Frontend**
  - React 19 with Next.js 15
  - TypeScript for type safety
  - Tailwind CSS for styling
  - shadcn/ui for UI components
  - Lucide React for icons

- **State Management**
  - React Context API
  - Custom hooks for business logic

- **Authentication**
  - Local storage (demo version)
  - Secure password handling

- **Performance**
  - Server-side rendering with Next.js
  - Optimized document processing
  - Real-time updates

## 🚦 Getting Started

### Prerequisites

```bash
Node.js >= 18.0.0
npm >= 9.0.0 or yarn >= 1.22.0
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/madhubv/docscan.git
cd docscan
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
docscan/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages & components
│   │   ├── page.tsx      # Main dashboard view
│   │   └── layout.tsx    # Dashboard layout
│   ├── login/            # Authentication pages
│   ├── register/         # User registration
│   └── page.tsx          # Landing page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── button.tsx    # Button component
│   │   └── ...          # Other UI components
│   ├── scan-history.tsx  # Scan history component
│   └── ...              # Other feature components
├── lib/                  # Utility functions & helpers
│   ├── document-matcher.ts  # Document matching logic
│   └── utils.ts         # Common utilities
├── styles/              # Global styles
│   └── globals.css     # Global CSS
└── public/             # Static assets
```

## 🔍 Core Features

### Document Scanning

The scanning process involves:

1. **Input Methods**
   - Direct text input
   - File upload (.txt files)
   - Support for large documents

2. **Processing**
   - Real-time progress tracking
   - Similarity analysis
   - Pattern matching
   - Content comparison

3. **Results**
   - Similarity scores
   - Matched content highlighting
   - Detailed analysis report
   - Export capabilities

### Credit System

Credits are managed through:

1. **Allocation**
   - 20 free credits daily
   - Additional credit requests
   - Admin approval system

2. **Usage**
   - 1 credit per scan
   - Usage tracking
   - Low credit alerts

3. **Management**
   - Credit history
   - Usage analytics
   - Request system

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev         # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint

# Testing (coming soon)
npm run test       # Run test suite
```

### Environment Setup

Create a `.env.local` file:

```env
# Example environment variables (customize as needed)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Code Style

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Keep pull requests focused in scope

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React Framework
- [React](https://reactjs.org/) - UI Library
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Lucide Icons](https://lucide.dev/) - Icon Library

## 📞 Support

For support, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

Built with ❤️ by Madhubabu Anisetti


![Image](https://github.com/user-attachments/assets/401bdeb4-2922-4bf4-80f3-7dbbc2568fa6)
