# Back log for the URI parser

This backlog will discuss decisions taken during the course of this project.

## Day 2 - things due

1. Ensure you handle cases without :// after the scheme (e.g., in relative URIs).
2. The authorityRegex seems generally correct, but ensure you validate that the host is properly parsed according to the allowed characters, especially for IPv6 addresses.
3. The path regex should handle absolute and relative paths. According to RFC 3986:
4. The parsing of query and fragment should allow for their absence and ensure they are correctly parsed only if present.
5. After extracting each component, the slicing (uri = uri.slice(...)) should be carefully handled to avoid issues with extra characters (like /, ?, or #).
6. You may want to consider handling cases where the input URI might be malformed or incomplete. This might include checking for empty strings or invalid formats.

## Day 3 - things to be done right now.

1/ finish percent encoding
2/ create a good regex for the URI components.

## Day 4 - Created URI Regex utility

For now error handling is missing, as well as a lot of verbose commenting.

### To-Do List

1. **Standardize Regex**: Ensure consistent use of `RegExp` and string formats.
2. **Simplify Patterns**: Remove redundant definitions like `path_empty`.
3. **Refine Comments**: Streamline comments for clarity.
4. **Implement Tests**: Create unit tests for regex patterns.
5. **Add Validation**: Write utility functions for URI validation.
6. **Document Utilities**: Improve documentation for usage.
