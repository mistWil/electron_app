# TITLE: Protect Yourself
## A cybersecurity solution for non-expert users.

An open-source web application that simplifies computer protection by consolidating essential security tools into a single interface. This application is designed for novice users and aims not only to safeguard their computers but also to raise awareness about cybersecurity and the importance of maintaining good protection hygiene in today's digital landscape. Furthermore, it is not intended to compete with the existing protection tools on the various OSs but rather to offer tools that can complement them.
As such, it will be functional on a variety of OS and should be:
- Simple, effective protection against online threats
- Combines the main security tools in a single interface
- Free and easy to use, with no complex configuration.
- Suitable for users with little IT experience

## TEAM MEMBERS
- Wilfried Leroulier
- Gilles Richard

## MEMBER'S ROLES

### Wilfried Leroulier: Technical and architecture manager
- Define the overall architecture of the application, focusing on modularity and integration of the various components.
- Choose the most appropriate technologies, frameworks and tools (Node.js, Angular/React, Docker, Kubernetes, etc.).
- Set up the deployment infrastructure on the AWS cloud or another private server.
- Supervise microservices and API development.

### Gilles Richard: Functional and user interface manager
- Define the security features to be integrated into the application (malware detection, update management, URL filtering, etc.).
- Design the web user interface, focusing on ergonomics and user experience
- Develop the application's front-end components (HTML, CSS, Bootstrap, Angular/React, jQuery)
- Ensure visual consistency and integration with backend microservices

## TECHNOLOGIES

### Main technologies
- Javascript
- Node.js
- HTML: Markup language for web content structure
- CSS: Style sheet language for formatting and presenting web content

### Development tools
- Visual studio code
- GitHub
- MongoDB (noSQL)

### Additional libraries and frameworks:
- Bootstrap: Popular CSS framework for designing responsive user interfaces
- jQuery: JavaScript library for simplifying DOM manipulation and client-side interactions
- Angular or React
- Deployment and infrastructure tools
  - Containerisation: With Docker to package and deploy your application
  - Container orchestration: With Kubernetes to manage and orchestrate your containers
  - Cloud hosting: AWS or private server.

### Testing and quality tools
- Jest is arguably the most popular JavaScript testing framework, maintained by Facebook. It provides a "zero-configuration" testing experience and is highly preferred for React applications
- ESLint and JSHint are popular linting tools that identify syntax errors and code quality issues in JavaScript code
- They are available as free NPM packages and support configuring rules and checkers.

## CHALLENGE

This application meets a need for system security. Its aim is to simplify computer protection for novice users by consolidating essential security tools into a single interface. For that purpose, it is meant to be as user-friendly as possible and through the protection of their computer, accompany these users towards better protection practices.

This project does not constitute a complete protection solution that can be used by organizations and businesses. It is not intended to replace the robust but chargeable solutions available on the market nor is it intended to compete with OS's native security tools.

This web application is aimed at users who are new to computing and particularly to IT security. It provides a smooth understanding of these concepts and a simple response tailored to their needs. It is designed to help users improve their protection hygiene.

The initial aim is to install the tools via the web application on Windows OS but anticipate the installation on other OSs (Linux, Macos) and an extended range of security tools by using a modular implementation system. The web application will initially be in English, but is expected to integrate other languages at a later date.

## RISKS

### Technical risks
- Incompatibilities and malfunctions between different architecture components.
  - Potential impact: Problems with application stability and reliability.
  - Mitigation measures:
    - Adopt a modular architecture based on microservices to limit dependencies.
    - Implement integration tests between the various components.
    - Choose proven, well-documented technologies and tools.
- Application deployment difficulties.
  - Potential impact: Delivery and production delays.
  - Mitigation measures:
    - Use Docker containerization to guarantee application portability.
    - Automate deployment processes with tools like Kubernetes.
    - Test deployment procedures in the early stages of the project.

### Non-technical risks
- Delivery delays
  - Potential impact: Inability to meet project deadlines.
  - Mitigation measures:
    - Establish rigorous planning with intermediate milestones.
    - Establish regular monitoring of project progress.
    - Be proactive in communication and contingency management.
    - Reduce if necessary the scope of the project
- Lack of skills or resources within the team.
  - Potential impact: Difficulties in carrying out the project.
  - Mitigation measures:
    - Clearly define roles and responsibilities.
    - Identify the lacks in the early stages
    - Train early on to compensate these lacks if necessary

## INFRASTRUCTURE

### Branching and merging process:
- We will use a standard Git workflow with a main branch and feature/* branches.
- For merges, we'll use a three-way merge strategy to better manage divergent histories

### Deployment strategy:
- We will use Docker containers to package and deploy our application consistently across different environments

### Data feed:
- We will develop data import/export scripts to feed our application from existing data sources
- We will consider the use of third-party APIs to retrieve certain data dynamically
- We will set up processes for refreshing and synchronizing data

### Testing and automation:
- We will adopt a test-driven development (TDD) approach with unit, integration and end-to-end testing, and automate testing using tools such as Pytest, Selenium and Flake8.
- We will integrate the tests into our continuous integration pipeline to guarantee code quality

## EXISTING SOLUTIONS

- **Blumira**: An open XDR platform that provides advanced detection and response capabilities for small and medium-sized businesses. It includes a SIEM, endpoint visibility, and automated response features.

- **Aurora Lite**: This is the free version of the Nextron Aurora EDR agent. It has some limitations compared to the full version, but provides Sigma-based detection capabilities for free for private use.

- **Microsoft Defender for Endpoint**: Microsoft offers a trial version of their Defender for Endpoint EDR solution that can be used for private evaluation and learning.

- **OSSEC**: An open-source host-based intrusion detection system that provides EDR-like functionality for private use.

Here are the main differences between our end-of-year project and the open source tools mentioned:
Objective and functionalities: our project aims to develop a web or mobile interface to simply integrate several security, anti-spam and anti-virus tools on different operating systems. The open source tools mentioned have more specific objectives, such as advanced threat detection and response (Blumira), Sigma-based detection (Aurora Lite), endpoint protection (Microsoft Defender for Endpoint) or host intrusion detection (OSSEC)


