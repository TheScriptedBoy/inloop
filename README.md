# Inloop - React Native Expo App (Android & iOS)

## Table of Contents
- [Overview](#overview)
- [How to Run and Test the Application](#how-to-run-and-test-the-application)
- [Reasoning Behind the Approach Taken](#reasoning-behind-the-approach-taken)
- [Assumptions Made](#assumptions-made)
- [Total Time Taken](#total-time-taken)
- [Solutions Relied on AI or Googling](#solutions-relied-on-ai-or-googling)

---

## Overview

**Inloop** is a simple React Native application built using Expo and Typescript. The app consists of two screens:

1. **Home Screen**: Displays a list of GIFs. When a user clicks on any GIF, it navigates to the feedback screen.
2. **Feedback Screen**: Shows the selected GIF along with its title. Users can rate the GIF using stars and provide comments, which are saved locally and displayed the next time the app is opened.

This app is designed to run on both Android and iOS devices/emulators.

---

## How to Run and Test the Application

To run this app locally on your machine, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/TheScriptedBoy/inloop.git
2. Navigate into the project directory:
   ```bash
   cd inloop
3. Install the dependencies:
   ```bash
   npm install
4. Start the Expo development server:
   ```bash
   npx expo start

5. Press a to run the app on an Android emulator or physical device.
6. Press i to run the app on an iOS simulator or physical device.

Once the app is running, you can test the functionality by interacting with the home screen and feedback screen.

---

## Reasoning Behind the Approach Taken

**Home Screen:**
1. Displays a list of GIFs, which gets trending gifs from an Giphy API
2. Functionality to search gifs
3. Pull down to refresh the list - trending/search
4. Scroll down to the bottom to load more gifs - trending/search
5. Tapping any gif navigates to feedback screen
6. Passing gif params to navigation - This could be replaced with simple context api

**Feedback Screen:**
1. The feedback screen shows the selected GIF and its title
2. A star rating system to allow users to provide a rating for the GIF
3. A text input field allows users to submit feedback on the GIF
4. Validation on submitting feedback
5. Feedback data (star ratings and comments) is stored locally on the device using React Native async-storage to ensure that the information persists between app sessions.
This approach was chosen to keep things simple while allowing for a clean, native-like experience across both Android and iOS platforms.

## Assumptions Made
1. Simple UI: The app assumes a basic UI layout with only two screens—one for the list of GIFs and another for submitting feedback to meet the deadline.
2. Local Storage: Since the app is primarily about interacting with GIFs and submitting simple feedback, local storage (async-storage) was assumed to be sufficient.
3. GIF Source: The app gets data from Giphy API using simple fetch api. To meet the deadline and simplicity no external 3rd party libs are used i.e Apollo and GraphQL.
4. Expo and React Native: The app was developed using Expo (version 47) and React Native (version 0.70.8) that supports my system.
5. Testing: The app was tested on both Android and iOS simulators. No major compatibility issues were encountered during testing.

## Total Time Taken

**Breakdown of Time Per Feature:**

1. Initial Setup (20 Mins):
Project setup, installed dependencies, and initialized the app using Expo.
Set up basic navigation between screens using React Navigation.

2. Home Screen Implementation (2 hours):
Added a list of GIFs, search function and set up a mechanism to tap and navigate to the feedback screen.

3. Feedback Screen Implementation (1 hour):
Displayed the selected GIF with its title.
Implemented the star rating system and comment box using basic React Native components.
Integrated local storage using Expo’s SecureStore to persist the feedback data.

4. Api Implementation (20 Mins):
Creating api key and building for trending and search functions

5. Building a header component (15 Mins):
Component that handles back button and search functionality

6. Testing and Debugging (15 Mins):
Tested the app on both Android and iOS devices/emulators.
Fixed minor issues with navigation and local storage.

Total Time: 4 - 5 hours

## Solutions Relied on AI or Googling

**React Navigation:**
Used React Navigation to handle navigation between screens. This was implemented by referring to the React Navigation documentation.
Example code and setup steps were adapted from community tutorials found online.

**Star Rating Component:**
For the star rating feature, I relied on a package from the community (e.g., react-native-ratings) and found relevant documentation and examples through GitHub and Stack Overflow.

**AsyncStorage:**
I used React Native AsyncStorage lib to persist user feedback locally. Documentation and examples were available through the React Native documentation.

**General Debugging and Learning:**
Throughout the development process, I frequently referred to Stack Overflow and other resources (like GitHub issues) to troubleshoot common errors such as navigation bugs, rendering issues, and integrating the feedback form correctly.
