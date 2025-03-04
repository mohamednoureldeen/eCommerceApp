# ECommerceApp

## E-Commerce Project

This is a dynamic and responsive e-commerce web application built using Angular 19, delivering a seamless and engaging user experience. The application offers a range of features including product browsing, cart management, wishlist functionality, and smooth integration with backend services.

## Features
- **Product Browsing:** Display products with images, prices, ratings, and categories.
- **Search Functionality:** Real-time search for an enhanced user experience.
- **Cart Management:** Add to cart, view cart items, and update quantities.
- **Wishlist:** Add or remove items from the wishlist with animated heart effects.
- **Alerts & Notifications:** User-friendly feedback with SweetAlert2 and ngx-toastr.
- **Animations:** Interactive and responsive UI with Flowbite and FlyonUI.
- **Server-Side Rendering:** Improved performance and SEO using Angular Universal.

## What I Learned
This is my first complete Angular project, where I learned:
- Setting up and structuring an Angular project.
- Using Angular CLI for scaffolding components, services, and pipes.
- Implementing routing and route guards for navigation and security.
- Creating reusable components and leveraging Angular's component-based architecture.
- Working with Angular services and HTTPClient for API integration.
- Adding dynamic animations and user feedback using SweetAlert2 and ngx-toastr.
- Managing state and data flow between components.
- Applying responsive design principles with Tailwind CSS and Flowbite.
- Handling forms, validation, and reactive forms in Angular.

## Tech Stack
- **Frontend:** Angular 19, SCSS, Tailwind CSS, Flowbite
- **Backend:** Express (for server-side rendering and API integration)
- **UI Libraries:** Font Awesome, FlyonUI
- **Notifications & Alerts:** SweetAlert2, ngx-toastr
- **Testing:** Karma, Jasmine

## Architecture Overview
- **Components:** 21 reusable components for modular development.
- **Services:** 10 injectable services for data handling and business logic.
- **Pipe:** 1 custom pipe for data transformation in templates.
- **Guards:** 2 guards for route protection and authentication.
- **Interfaces:** 24 interfaces to define data models and ensure type safety.

## Component Tree
```
app
├─ core
│  ├─ environment
│  ├─ guards
│  ├─ interceptors
│  ├─ pipes
│  ├─ resolvers
│  ├─ services
│  ├─ utils
│  └─ layouts
│     └─ pages
│        ├─ allorders
│        ├─ brands
│        ├─ cart
│        ├─ categories
│        ├─ checkout
│        ├─ details
│        ├─ forgotpassword
│        ├─ home
│        ├─ login
│        ├─ notfound
│        ├─ products
│        ├─ register
│        └─ wishlist
├─ shared
│  ├─ components
│  │  ├─ business
│  │  └─ ui
│  │     ├─ card-for-orders
│  │     └─ search-input
│  ├─ directive
│  └─ interfaces
```

## Development Server
To start a local development server, run:
```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code Scaffolding
To generate a new component, run:
```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:
```bash
ng generate --help
```

## Building
To build the project run:
```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running Unit Tests
To execute unit tests with the [Karma](https://karma-runner.github.io) and [Jasmine](https://jasmine.github.io/) test frameworks, use the following command:
```bash
ng test
```

## Running End-to-End Tests
For end-to-end (e2e) testing, run:
```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources
For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Dependencies
```sh
@angular/animations : ^19.1.0
@angular/common : ^19.1.0
@angular/compiler : ^19.1.0
@angular/core : ^19.1.0
@angular/forms : ^19.1.0
@angular/platform-browser : ^19.1.0
@angular/platform-browser-dynamic : ^19.1.0
@angular/platform-server : ^19.1.0
@angular/router : ^19.1.0
@angular/ssr : ^19.1.5
@fortawesome/fontawesome-free : ^6.7.2
@ngx-translate/core : ^16.0.4
@ngx-translate/http-loader : ^16.0.1
@sweetalert2/ngx-sweetalert2 : ^13.0.0
express : ^4.18.2
flowbite : ^3.0.0
flyonui : ^1.3.0
jwt-decode : ^4.0.0
ngx-owl-carousel-o : ^19.0.0
ngx-pagination : ^6.0.3
ngx-spinner : ^19.0.0
ngx-toastr : ^19.0.0
rxjs : ~7.8.0
sweetalert2 : ^11.17.2
tslib : ^2.3.0
zone.js : ~0.15.0
```

## How to Run
1. Clone the repository:
```sh
git clone https://github.com/your-repo/ecommerce-project.git
```
2. Navigate to the project directory:
```sh
cd ecommerce-project
```
3. Install dependencies:
```sh
npm install
```
4. Run the development server:
```sh
ng serve
```
5. Open your browser at:
```sh
http://localhost:4200
```

## Contribution
Feel free to contribute by opening issues, creating pull requests, or suggesting features.

## License
This project is licensed under the MIT License.

## Author
- [Mohamed Noureldeen](https://github.com/mohamednoureldeen)
