# Back log for the URI parser

This backlog will discuss decisions taken during the course of this project.

## Day 2 - things due

1. Ensure you handle cases without :// after the scheme (e.g., in relative URIs).
2. The authorityRegex seems generally correct, but ensure you validate that the host is properly parsed according to the allowed characters, especially for IPv6 addresses.
3. The path regex should handle absolute and relative paths. According to RFC 3986:
4. The parsing of query and fragment should allow for their absence and ensure they are correctly parsed only if present.
5. After extracting each component, the slicing (uri = uri.slice(...)) should be carefully handled to avoid issues with extra characters (like /, ?, or #).
6. You may want to consider handling cases where the input URI might be malformed or incomplete. This might include checking for empty strings or invalid formats.

