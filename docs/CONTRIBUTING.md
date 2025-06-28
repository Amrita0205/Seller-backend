# 🛠️ Contributing Guidelines & Best Practices

Welcome to the Seller Backend project! To keep the codebase clean, maintainable, and scalable, please follow these guidelines and best practices when contributing.

---

## **General Guidelines**

- **Read the API documentation** in `docs/API_DOCUMENTATION.md` before making changes.
- **Open an issue or discussion** before starting major features or refactors.
- **Write clear, descriptive commit messages.**
- **Keep PRs focused**: One feature/fix per pull request.
- **Update documentation** if your changes affect the API or usage.

---

## **Code Style & Standards**

- Use **TypeScript** for all code.
- Follow the existing **folder structure** (controllers, models, routes, middleware, utils, etc).
- Use **ESLint** and **Prettier** for code formatting and linting (`npm run lint` and `npm run format`).
- Use **async/await** for asynchronous code.
- Handle all errors gracefully and use the centralized error handler.
- Use **environment variables** for secrets and configuration (never hardcode sensitive data).
- Write **JSDoc comments** for complex functions and modules.

---

## **API & Security**

- Validate all incoming data using the validation middleware.
- Use JWT authentication for all protected routes.
- Restrict admin-only actions using role-based middleware.
- Never expose sensitive information in API responses.
- Sanitize and validate all user input to prevent security vulnerabilities.

---

## **Database**

- Use **Mongoose models** for all database interactions.
- Keep schema definitions clear and well-documented.
- Use references (`ObjectId`) for relationships (e.g., products to categories).
- Avoid duplicate indexes in schemas.

---

## **Testing**

- Write tests for new features and bug fixes (unit and integration tests).
- Use the `__tests__` directory for all test files.
- Run tests before submitting a PR (`npm test`).

---

## **Documentation**

- Update `API_DOCUMENTATION.md` for any API changes.
- Add or update code comments and docstrings as needed.
- Keep this `CONTRIBUTING.md` up to date with new practices.

---

## **Collaboration**

- Be respectful and constructive in code reviews and discussions.
- Help onboard new contributors by answering questions and improving docs.
- If you find a bug or security issue, report it immediately.

---

Thank you for helping make this project better! 🚀 