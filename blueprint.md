
# Health Tracker Application Blueprint

## Overview

The Health Tracker is a comprehensive, modern Angular application designed to help users monitor and improve their health and wellness. It provides a centralized dashboard for tracking key metrics, logging activities, searching for food information, and setting personal goals. The application is built with the latest Angular features, including standalone components, signals for state management, and a clean, modular architecture.

## Style, Design, and Features

###-Phase 1: Initial Health Tracker App

- **Core Components**: The application is comprised of the following components:
    -  `Dashboard`: The main view, providing a snapshot of the user's health data.
    - `FoodSearch`: A feature to search for food items and view their nutritional information.
    - `GoalTracking`: A component for setting and tracking personal health goals.
    - `AddActivity`: A form to log physical activities and calculate calories burned.

- **Styling and Layout**:
    - The application uses a dark theme with a modern and clean design.
    - It is fully responsive and adapts to different screen sizes, ensuring a seamless experience on both mobile and desktop devices.
    - The layout is organized using a grid system, with components arranged in a card-based format.

- **Visual Elements**:
    - **Color Scheme**: A dark background with contrasting text and vibrant accent colors for interactive elements.
    - **Typography**: Clear and readable fonts with a hierarchy of sizes to guide the user's attention.
    - **Iconography**: The application includes icons for navigation and to enhance the user experience.

### Phase 2: Refactor Components and Add a Navigation Bar

- **Component Refactoring**:
    - All components have been refactored to separate their styles into dedicated CSS files. This improves code organization, maintainability, and reusability.
    - The new structure ensures that each component's styles are encapsulated and do not interfere with other components.

- **Navigation Bar**:
    - A navigation bar has been added to the main application component, `app.component`.
    - The navigation bar is designed to be intuitive and user-friendly, providing easy access to all the application's features.
    - It includes links to the "Dashboard," "Add Food," "Add Activity," and "Goal Tracking" sections, allowing for seamless navigation between the different views.

### Phase 3: Refactor Navigation Bar

- **Navigation Bar Refactoring**:
    - The navigation bar has been refactored to use a separate CSS file for its styles, replacing the previous utility classes.
    - The new stylesheet is more maintainable and easier to customize, improving the overall code quality of the application.
    - The component's logic has been updated to handle the mobile menu functionality, ensuring a consistent user experience across all devices.

### Phase 4: Add Report and Profile Navigation

- **New Components**:
    - `ProfileComponent`: A new component for managing user profile information.
    - `ReportComponent`: A new component for generating and viewing health reports.
- **Routing**:
    - The application's routing has been updated to include routes for the new `Profile` and `Report` components.
- **Navigation Bar**:
    - The navigation bar has been updated to include links to the new "Report" and "Profile" pages.

### Phase 5: Advanced Navigation Bar Styling

- **Glassmorphism Effect**: The header now has a background blur effect, creating a modern, glass-like appearance.
- **Active Link Indicator**: The active navigation link is highlighted with a background color for better visibility.
- **Smooth Transitions**: Hover effects on the logo and navigation links have been added for a more interactive user experience.
- **Animated Mobile Menu**: The mobile menu now slides in and out with a smooth animation.

### Phase 6: Modern Styling

- **Global Styles**:
    - A global stylesheet has been created to define a consistent set of modern styles for the entire application.
    - This includes a color palette, typography, and base styles for common elements like buttons, cards, and forms.
- **Component Styles**:
    - Each component's stylesheet has been updated to align with the new modern design.
    - The styles have been refactored to be more modular and easier to maintain.
- **Dark Mode**:
    - A dark mode theme has been implemented, which can be toggled by the user.
    - This provides a more comfortable viewing experience in low-light environments.
