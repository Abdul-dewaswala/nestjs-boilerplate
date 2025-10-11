# Guided User Onboarding Flow Design

This document outlines the proposed guided user onboarding flow for the NestJS application. The flow is designed to progressively gather necessary information and introduce users to the application's core functionalities, ensuring a smooth and engaging initial experience.

## Onboarding Steps

The onboarding process will consist of the following sequential steps:

1.  **Welcome Screen**
    *   **Purpose**: Greet the new user and provide a brief overview of the application's value proposition.
    *   **Content**: A friendly welcome message, a short description of what the user can achieve with the application, and a prominent "Get Started" button.
    *   **Data Collected**: None.
    *   **Action**: User clicks "Get Started" to proceed.

2.  **Profile Information**
    *   **Purpose**: Collect essential user profile details not automatically provided by Auth0 or to allow users to update them.
    *   **Content**: Form fields for:
        *   First Name (pre-filled if available from Auth0, editable)
        *   Last Name (pre-filled if available from Auth0, editable)
        *   Optional: Profile Picture upload.
    *   **Data Collected**: `firstName`, `lastName`, `profilePictureUrl` (optional).
    *   **Action**: User fills in details and clicks "Save and Continue".

3.  **Role Selection (Optional/Conditional)**
    *   **Purpose**: If the application supports multiple user roles or requires users to specify their primary function, this step allows for that selection. This step might be skipped if roles are pre-assigned by an administrator.
    *   **Content**: A list of available roles or areas of interest with descriptions. User selects one or more roles.
    *   **Data Collected**: `roles` (array of role IDs or names).
    *   **Action**: User selects roles and clicks "Save and Continue".

4.  **Preferences/Settings**
    *   **Purpose**: Allow users to configure initial application preferences.
    *   **Content**: Options for:
        *   Theme preference (Light/Dark)
        *   Notification settings (Email, In-app)
        *   Timezone selection
        *   Language preference
    *   **Data Collected**: `themePreference`, `notificationSettings`, `timezone`, `language`.
    *   **Action**: User sets preferences and clicks "Save and Continue".

5.  **Tutorial/Walkthrough (Optional)**
    *   **Purpose**: Provide a brief, interactive introduction to key features or a quick tour of the application interface.
    *   **Content**: A series of guided tooltips or a short video tutorial.
    *   **Data Collected**: None (only tracks completion).
    *   **Action**: User completes the tutorial or skips it.

6.  **Completion Screen**
    *   **Purpose**: Confirm that the onboarding process is complete and direct the user to the main application dashboard.
    *   **Content**: A congratulatory message and a "Go to Dashboard" button.
    *   **Data Collected**: Marks `onboardingCompleted` as `true` for the user.
    *   **Action**: User clicks "Go to Dashboard".

## API Endpoints for Onboarding Management

The backend will expose the following API endpoints to manage the onboarding flow:

*   **`GET /users/onboarding/status`**
    *   **Description**: Retrieves the current onboarding status and progress for the authenticated user.
    *   **Response**: `{ currentStep: string, completedSteps: string[], onboardingCompleted: boolean }`

*   **`PATCH /users/profile`**
    *   **Description**: Updates user profile information. This endpoint will be used by the "Profile Information" step.
    *   **Request Body**: `{ firstName?: string, lastName?: string, profilePictureUrl?: string }`
    *   **Response**: Updated user profile.

*   **`PATCH /users/roles`**
    *   **Description**: Updates user roles. This endpoint will be used by the "Role Selection" step.
    *   **Request Body**: `{ roles: string[] }` (array of role names or IDs)
    *   **Response**: Updated user roles.

*   **`PATCH /users/preferences`**
    *   **Description**: Updates user preferences. This endpoint will be used by the "Preferences/Settings" step.
    *   **Request Body**: `{ themePreference?: string, notificationSettings?: any, timezone?: string, language?: string }`
    *   **Response**: Updated user preferences.

*   **`PATCH /users/onboarding/complete`**
    *   **Description**: Marks the entire onboarding process as complete for the authenticated user.
    *   **Request Body**: `{ onboardingCompleted: boolean }` (should be `true`)
    *   **Response**: `{ message: string }`

## Frontend Integration Notes

The frontend application will be responsible for:
*   Displaying the onboarding screens based on the user's `onboardingCompleted` status and `currentStep`.
*   Calling the appropriate backend API endpoints to save data and update progress.
*   Navigating the user through the steps.
*   Handling UI/UX for each step, including form validation and feedback.

This design provides a clear roadmap for implementing the guided user onboarding flow, ensuring both a positive user experience and robust backend support.