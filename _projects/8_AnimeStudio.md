---
layout: page
title: Anime Studio
description: Bringing Studio Ghibli-Style Art to Everyone
# img: 
importance: 8
category: work
---


## Project Overview
When Studio Ghibli style images started trending across social media following ChatGPT's image generation capabilities, I realized there was an opportunity to create an accessible alternative for users without premium subscriptions. I developed Anime Studio, a web application that democratizes high-quality anime-style image generation.

## Technical Implementation

### Model Development
- Fine-tuned a custom image generation model using carefully curated anime and Studio Ghibli style datasets
- Optimized the model for quality output while maintaining reasonable inference speed on consumer hardware

### Backend Architecture
- Implemented a FastAPI backend for efficient model serving
- Developed an automated job queuing system to handle concurrent requests
- Created cleanup processes to manage server resources and temporary files

### System Reliability
- Built a middleware proxy with rate limiting to prevent abuse
- Implemented request validation and error handling for a robust user experience
- Optimized for scalability to handle varying traffic loads

## Impact
The application gained significant traction, attracting users from over 40 countries