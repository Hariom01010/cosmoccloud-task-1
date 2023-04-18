# Task 1

## Working Principle ⚙️
This code is a React component that creates a form for creating dynamic form fields with nested fields. The main component, App, maintains the state for the form data, which is an array of field objects with properties like name, type, required, and fields. The App component renders multiple instances of the FormField component for each field in the formData array.

The FormField component is responsible for rendering individual form fields, handling field changes, and managing nested fields. It uses the useState hook to manage local state for each form field. It renders an input field for the field name, a select dropdown for the field type, a switch for the required property, and buttons for adding nested fields or deleting the field. It also recursively renders nested FormField components for fields with type "Object".

The App component provides callbacks to handle field changes, adding fields, deleting fields, and saving the form data. It also uses CSS modules to apply styling to the form fields and buttons.

## Schema 📄
At the core the data is stored as an array of objects. The object stores field name, it's type, required or not and nested fields(if the data type is object).
The nested fields is then further stored as an array of objects following the same pattern as stated above.
