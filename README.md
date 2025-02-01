# Talk Insights - AI-Powered Call Summarization

Talk Insights is a web application that allows companies to upload call audio files, get them analyzed by AI, and receive summarized insights on a dashboard. The application uses advanced Natural Language Processing (NLP) techniques to provide valuable insights such as sentiment analysis, categories, and a brief summary of the conversation.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Talk Insights is designed to help businesses understand and analyze their call conversations with customers, partners, or employees. The application generates:

- **Summarized Transcripts**: AI-powered summaries of the key points discussed in the call.
- **Sentiment Analysis**: An analysis of the emotional tone of the conversation (positive, neutral, or negative).
- **Category Detection**: Automatic categorization of the call's topics (e.g., "quality improvement," "partner support").
- **Visualization Dashboard**: A clean, easy-to-understand dashboard with various visualizations, such as bar charts, to present the analysis.

This tool is especially useful for teams that want to keep track of customer feedback, improve their services, and gain insights from their phone conversations.

## Features

- **Call File Upload**: Upload audio files in various formats (e.g., MP3, WAV).
- **AI-Powered Call Summarization**: Automatically summarize key points from the conversation.
- **Sentiment Analysis**: Analyze the emotional tone of the conversation.
- **Category Detection**: Automatically categorize the conversation based on key topics.
- **Interactive Dashboard**: Visualize sentiment and categories with interactive charts and graphs.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Social Media Integration**: Share the summary and insights with your team or on social media (coming soon).

## Technologies Used

- **Frontend**: React JS, Tailwind CSS
- **Backend**: Python (Flask/Django), AI & NLP Libraries (spaCy, Hugging Face)
- **Data Visualization**: Chart.js, React Chart.js
- **Authentication**: Firebase Authentication
- **Deployment**: Heroku (Frontend), AWS or DigitalOcean (Backend)
- **Database**: Firebase or MongoDB

## Installation

### Prerequisites

- Node.js (for frontend)
- Python (for backend)
- Firebase (for authentication)
- MongoDB (or Firebase) for data storage

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/talk-insights.git
   cd talk-insights/frontend

   ```

2. Install Dependencies:

```bash
 npm install

```

3. Start the development server:

```bash
npm start
```
