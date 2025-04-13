---
layout: page
title: Anime Studio
description: A web application that allows users to create Anime style edits.
# img: 
importance: 8
category: work
---

# Anime Style Studio: Bringing Studio Ghibli-Style Art to Everyone

## Project Overview
I can't believe how quickly Studio Ghibli style images took over social media after ChatGPT's image generation release! I noticed most people couldn't access these features without premium subscriptions, so I built Anime Studio—a web app that makes high-quality anime-style image generation available to everyone.

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