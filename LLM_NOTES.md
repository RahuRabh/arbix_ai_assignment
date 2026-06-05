# LLM Notes

## Example Prompts Used

1. Generate a FastAPI request model with validation for agricultural credit scoring inputs.

2. Suggest a simple rule-based scoring approach that returns a score and explainability reason codes.

3. Generate a React form that submits data to a FastAPI endpoint and displays results.

4. Create unit tests for FastAPI using TestClient.

5. Suggest a lightweight audit logging approach for a scoring service.

---

## Example Improvement After Reviewing Tool Output

Initial generated code returned a variable number of reason codes depending on scoring outcomes.

I modified the implementation to ensure the API always returns exactly three reason codes, matching the assignment requirements and maintaining a consistent API contract.

```
```
