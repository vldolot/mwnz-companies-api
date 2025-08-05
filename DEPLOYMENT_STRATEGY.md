# Deployment Strategy

Two main options:

## 1. **Serverless Deployment with AWS Lambda**

This approach is recommended for a scalable, cost-effective, and serverless deployment.

### Pros

- Auto scales with traffic
- Pay only when in use
- No server management
- Built-in high availability

### Cons

- Cold starts can slow first request
- 15-minute execution limit
- Debugging is harder
- Tied to AWS (vendor lock-in)

## 2. **Container-Based Deployment with Docker**

This approach is recommended if you want full control using containers (e.g. Docker, Kubernetes)

### Pros

- Full control over environment
- Always running (no cold starts)
- Custom CPU/memory settings
- Strong ecosystem (Docker/Kubernetes tools)

### Cons

- More setup and server management
- Costs more when idle
- Setup is more complex
- Manual scaling config needed
