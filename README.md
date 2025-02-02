# SoloConnect

SoloConnect is a web application designed to make solo travel more exciting and less stressful. It provides features like traveler matching, city guides to help solo travelers connect and explore with confidence.

## Features

- **Traveler Matching**: Swipe-based system to find and connect with like-minded travelers.
- **City Guides & Activities**: Curated travel guides for different destinations.
- **Traveler Blog**: Share experiences and photos with a community of solo travelers.

## Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Node.js 

## Installation & Setup

  ### Prerequisites
  - Node.js (Latest LTS recommended)
  - npm or yarn

### Steps to Run Locally

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/SoloConnect.git
   cd SoloConnect
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and configure necessary environment variables.

4. **Start the development server**:
   ```sh
   npm run dev
   ```
   or
   ```sh
   yarn dev
   ```

5. **Run the build process**:
   ```sh
   npm run build
   ```
   or
   ```sh
   yarn build
   ```

6. **Run the production server**:
   ```sh
   npm run preview
   ```
   or
   ```sh
   yarn preview
   ```

7. **Open the app**:
   Navigate to `http://localhost:5173` in your browser.

## Project Structure
```
SoloConnect/
│-- src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page-level components
│   ├── assets/        # Static assets (images, icons, etc.)
│   ├── hooks/         # Custom React hooks (if any)
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main App component
│   ├── main.tsx       # Entry point
│-- public/            # Static public files
│-- package.json       # Project metadata and dependencies
│-- tailwind.config.js # Tailwind CSS configuration
│-- vite.config.ts     # Vite configuration
```

## Workflow Diagram
Below is the workflow of the SoloConnect application:

```
User → Auth Form → Matching System → Translation API → City Guides → Traveler Blog
        |                     |                  |                |
      Login              Match Users         Translate       View & Post
```
##Video on how the program works:
https://drive.google.com/file/d/1Jh3sVeU-_GXAiIkTiqOX4PCTuW05PhEp/view?usp=drive_link

##Explanation : 
https://drive.google.com/file/d/1qa1SxBfFLZmc6GM9gyz5aYGl85SU58Qx/view?usp=drive_link

#Screenshots:
![Screenshot 2025-02-02 105217](https://github.com/user-attachments/assets/a7fbb891-aa7e-4cc4-b629-7e912586c58a)
![Screenshot 2025-02-02 105249](https://github.com/user-attachments/assets/2371deb4-481a-4137-b73f-6d3f5b917ac3)
![Screenshot 2025-02-02 105306](https://github.com/user-attachments/assets/b203fd45-fbbc-489b-ac17-23aade14ea29)
![Screenshot 2025-02-02 105316](https://github.com/user-attachments/assets/a03b65e3-6b5c-4ab4-892e-67724c547ae5)
![Screenshot 2025-02-02 105327](https://github.com/user-attachments/assets/10f9ae04-28f8-471a-b738-bb49dcf72e9d)





