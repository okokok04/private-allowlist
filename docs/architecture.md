# Architecture

The project is organized around a simple privacy-preserving flow:

1. The frontend collects proof intent.
2. The circuit creates a membership proof from a private witness.
3. The contract verifies the proof without exposing the identity.
4. The UI displays access granted or rejected.
