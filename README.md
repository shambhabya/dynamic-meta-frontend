# Dynamic Meta Frontend

This is the frontend for the Dynamic Meta project, a React application that allows users to create custom Open Graph images for their content.

## Live Demo

You can view the live demo of this project at: [http://dynamic-meta.netlify.app](http://dynamic-meta.netlify.app)

## Features

- Create custom Open Graph images
- Preview Open Graph images in real-time
- Customize color schemes and design templates
- Integration with backend API for image generation

## Technologies Used

- React
- Tailwind CSS
- React Helmet (for meta tags)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/dynamic-meta-frontend.git
   cd dynamic-meta-frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

3. Create a `.env` file in the root directory and add the backend URL()not necessasary:

   ```
   REACT_APP_BACKEND_URL=https://dynamic-meta-backend.onrender.com
   ```

4. Start the development server:

   ```
   npm run dev
   ```

   or

   ```
   yarn start
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Deployment

This project is deployed on Netlify. To deploy your own version:

1. Fork this repository
2. Sign up for a Netlify account
3. Connect your GitHub account to Netlify
4. Choose the forked repository for deployment
5. Configure the build settings:
   - Build command: `npm run build` or `yarn build`
   - Publish directory: `build`
6. Add the environment variable `REACT_APP_BACKEND_URL` with your backend URL
7. Deploy!

## How It's Made

This Dynamic Meta frontend is built using modern web technologies and best practices:

1. **React**: The app is built using React, a popular JavaScript library for building user interfaces. React's component-based architecture allows for creating reusable UI elements and efficient state management.

2. **Tailwind CSS**: For styling, we use Tailwind CSS, a utility-first CSS framework. Tailwind allows for rapid UI development with pre-defined classes, making it easy to create responsive and customizable designs.

3. **React Helmet**: To dynamically update meta tags (including the Open Graph image URL), we use React Helmet. This ensures that the generated OG images are properly set for social media sharing.

4. **State Management**: The app uses React's built-in useState and useEffect hooks for state management and side effects, providing a simple and efficient way to handle component state and lifecycle.

5. **API Integration**: The frontend communicates with the backend API using the Fetch API, sending POST requests to generate OG images based on user input.

6. **Real-time Preview**: As users input their content and select design options, a real-time preview of the OG image is displayed using inline styles that mirror the backend's image generation logic.

7. **Responsive Design**: The app is designed to be fully responsive, ensuring a good user experience on both desktop and mobile devices.

The development process focused on creating a seamless user experience while maintaining performance and code maintainability. The modular structure of the React components allows for easy expansion and modification of features.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
