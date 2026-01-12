**Mission Calculator – Dynamic Formula Builder & Validator**

Mission Calculator is a web-based dynamic formula builder and evaluator designed to allow users to create, validate, format, and test complex business formulas safely and interactively.
The application is built with ASP.NET MVC, JavaScript, jQuery, Bootstrap, and CodeMirror, focusing heavily on robust validation, syntax correctness, and user-friendly formula authoring.

**Project Overview**
    In many enterprise applications (Payroll, HRMS, Finance, Tax Engines), formulas must be:
        1. Dynamic
        2. User-defined
        3. Secure
        4. Strictly validated
        5. Testable before saving
        
/Views
 ├── Shared
 │   └── _Layout.cshtml
 ├── Formula
 │   ├── Create.cshtml
 │   ├── Index.cshtml

/Controllers
 └── FormulaController.cs

/Scripts
 ├── codemirror
 ├── formula-validation.js

/Content
 └── site.css


**Mission Calculator solves this problem by providing:**
        1. A formula editor with syntax highlighting
        2. A toolbar-driven formula builder
        3. Client-side and server-side validation
        4. Live testing with input values
        5. Error prevention for invalid logic

**Architecture Overview**
        1. Frontend
        2. Razor Views (.cshtml)
        3. Bootstrap 5 for UI
        5. CodeMirror Editor for formula editing
        6. JavaScript-based validation engine
        7. AJAX communication with server
        8. Backend
        9. ASP.NET MVC
        10. Controller-based validation
        11. Secure formula parsing & execution
        12. JSON-based formula testing

**Key Features:**
  **Formula Editor**
        1. CodeMirror-based editor
        2. Syntax highlighting
        3. Auto formatting
        4. Bracket matching
        5. Undo / Redo support
        6. Cursor-based function insertion
  
  **Formula Toolbar**
    Users can insert:
        1. Arithmetic operators (+ - * /)
        2. Logical operators (&& ||)
        3. Comparison operators (< > <= >= ==)
        4. Ternary operators (? :)
        5. Boolean values (true / false)
        6. Elements (dynamic variables)
        7. Constants (numeric only)
        8. Functions (Math.Min, Math.Max)
  
  **Formula Formatting**
        1. Normalizes spacing
        2. Uppercases keywords (CASE, WHEN, THEN, ELSE, END)
        3. Lowercases booleans (true, false)
        4. Ensures readable and consistent structure

**Advanced Formula Validation (Core Strength)**
  The validation system prevents all invalid or incomplete formulas, including:
  
  **Invalid Examples (Rejected)**
      ELSE
      CASE
      WHEN A > 5
      CASE ELSE END
      A +
      && A B
      Math.Min(A)
  
  **Valid Examples (Accepted)**
      A + B * 10
      A > 5 ? 100 : 50
      CASE WHEN A > 10 THEN 1 ELSE 0 END
      Math.Min(A, B)
  
  **Validation Rules Implemented**
    General Rules:
        - Formula name is mandatory
        - Formula body cannot be empty
        - No invalid characters allowed
        - No unmatched parentheses
        - No empty parentheses ()
        - Cannot start or end with operators
        - Logical Operators
        - && only (no single &)
        - || only (no single |
        - No &&& or |||
        - Ternary Operator
        - Each ? must have a matching :
        - Proper order enforced
        - CASE Expression (Strict)
        - Must start with CASE
        - Must end with END
        - Must contain at least one WHEN ... THEN
        - THEN must have a value
        - ELSE must have a value
        - Standalone keywords (ELSE, WHEN, THEN) are not allowed

**Formula Testing (Live Execution)**
        - Once validated, users can:
        - Test formulas with real input values
        - Auto-generate input fields based on variables
        - Support numeric and boolean inputs
        - See evaluated results instantly

**Replace Invalid Elements**
        - Detects invalid identifiers
        - Allows bulk replace
        - Supports replacing:
            1. Elements
            2. Constants
            3. Boolean values
        - Regex-safe replacement logic

**Safe Execution Model**
        - Client-side validation first
        - Server-side validation as final gate
        - Prevents unsafe or malformed execution
        - No direct code execution risk

**Example Formula**
        CASE
            WHEN BASIC > 10000 THEN BASIC * 0.10
            ELSE BASIC * 0.05
        END

**Use Cases**
      - Payroll Calculations
      - HR Allowance Rules
      - Tax Regime Engines
      - Financial Rule Engines
      - Dynamic Business Logic Configuration

**Future Enhancements**
      - Nested CASE validation depth check
      - AST-based formula parsing
      - Inline CodeMirror error highlighting
      - Formula versioning
      - Role-based formula access
      - Performance caching

**Conclusion**
  Mission Calculator is a production-grade dynamic formula engine with a strong focus on:
      - Correctness
      - Validation
      - Safety
      - User experience
      - It is ideal for enterprise applications where business users define logic, but developers must ensure correctness and security.

**Author**
      _Sundar Saran_
      _B.Tech_ – Computer Science & Engineering
      Full Stack / Cloud Engineer/ Enterprise Application Developer
