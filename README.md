# Arbix AI - Credit Scoring Application

## Overview

This project is a simple end-to-end credit scoring application consisting of:

* FastAPI backend
* React frontend
* Rule-based scoring engine
* Request validation
* Audit logging
* Unit tests

The application accepts agricultural and financial information and returns a credit score along with explainable reason codes.

---

## Project Structure

```
backend/
frontend/
README.md
LLM_NOTES.md
```

---

## Features Implemented

### Backend

* FastAPI REST API
* POST /score endpoint
* Input validation using Pydantic
* Rule-based scoring logic
* Request ID generation
* Timestamp generation
* Audit logging
* Health endpoint
* Unit tests

### Frontend

* React application
* Form-based input
* API integration
* Loading state handling
* Validation and backend error handling
* Score display
* Reason code display

---

## Scoring Logic

The scoring logic is intentionally simple and rule-based.

Factors considered:

* Repayment history score
* Land area
* Annual income band

The score is constrained between 0 and 100.

The API always returns exactly three reason codes to provide basic explainability.

---

## Running the Backend

```bash
cd backend

python3 -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend URL:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

## Running the Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Tests

Run tests using:

```bash
cd backend

python -m pytest
```

---

## Design Choices / Tradeoffs

* FastAPI was chosen for its built-in validation and automatic API documentation.
* Rule-based scoring was selected to keep the implementation simple and understandable within the time-constraint.
* Structured logging was added to support auditability.
* SQLite/database persistence was intentionally omitted to prioritize completion of the required scope.

---

## LLM / Tool Usage

Tools Used:

* ChatGPT

Usage:

* Discussing architecture and implementation approaches
* Generating boilerplate code examples
* Reviewing validation and testing approaches

Manual Verification Performed:

* Reviewed and modified generated code
* Verified API behaviour through Swagger UI
* Verified frontend-backend integration
* Executed and reviewed unit tests
* Corrected implementation issues during development

---

## What I Would Improve With 2 More Hours

* Add persistent audit logging using SQLite
* Add request history view
* Improve frontend styling and validation UX
* Add Docker support
* Add additional test coverage
* Add scoring configuration through external settings

```
```
