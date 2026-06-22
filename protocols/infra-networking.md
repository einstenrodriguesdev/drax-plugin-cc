# Networking (infra: network architecture)

Network design is trust design. Every path that exists between two components is an implicit trust relationship. Default-deny, explicit-allow, and encryption in transit are not hardening steps — they are the baseline.

## Best practices

1. **DNS as the service directory** — use private DNS zones for internal service discovery (not hardcoded IPs); external DNS (ExternalDNS in Kubernetes) manages public records from infrastructure state; TTLs: 300s for dynamic services, 3600s+ for stable endpoints.
2. **TLS everywhere, no exceptions** — terminate TLS at the load balancer for external traffic; re-encrypt in transit for internal service-to-service calls in regulated environments; use Let's Encrypt + cert-manager for automated certificate rotation; alert on certificates expiring within 30 days.
3. **VPC subnet segmentation by tier** — public subnets: load balancers and NAT gateways only; private subnets: application compute; data subnets (no internet route): databases and caches; no application server directly in a public subnet.
4. **Security groups / firewall rules: least-privilege, stateful** — allow only specific ports from specific CIDR ranges or security group IDs; deny all ingress by default; audit rules quarterly; remove stale rules as part of resource deletion.
5. **Zero-trust for service-to-service** — authenticate every internal call; use mTLS (service mesh: Istio, Linkerd, or Cilium) or short-lived tokens (SPIFFE/SPIRE); never trust source IP alone inside the VPC.
6. **Load balancer tiers** — L4 (NLB/TCP) for latency-sensitive or non-HTTP protocols; L7 (ALB/HTTP) for HTTP-aware routing, header manipulation, and WAF integration; configure connection draining and idle timeout aligned to application behavior.
7. **CDN for static assets and edge termination** — offload static files and cacheable API responses to CDN (CloudFront, Fastly, Cloudflare); configure Cache-Control headers correctly; use CDN's WAF for DDoS and injection protection at the edge.
8. **Latency budgets per tier** — define p99 latency budgets for each network hop (client→CDN, CDN→LB, LB→app, app→DB); instrument with distributed tracing (OpenTelemetry); a latency regression is a network or service-mesh misconfiguration until proven otherwise.
9. **Service mesh for east-west traffic observability** — in multi-service environments, a sidecar proxy (Envoy) provides per-service traffic metrics, retries, circuit breakers, and mTLS without application code changes; instrument before you need to debug.
10. **Egress control** — route all outbound traffic through a NAT gateway or explicit egress proxy (Squid, mitmproxy); block unexpected external destinations with allowlist rules; exfiltration is undetected egress.

## Hygiene

- No `0.0.0.0/0` ingress on SSH (port 22) or database ports — use VPN or SSM Session Manager for administrative access.
- Rotate TLS certificates automatically — manual rotation is a 3am incident waiting to happen.
- Never use `http://` for any cross-service call, even internal — TLS stripping attacks work inside networks.
- Document every security group rule with a description field — anonymous `allow 5432` rules become unremovable orphans.
- Test DNS failover before you need it: reduce TTL 24h before a planned cutover, verify old records resolve, then swap.

## Mastery markers

- Designs a multi-tier VPC with proper routing tables, NACLs, and security groups from scratch and explains each decision.
- Configures Istio mTLS in strict mode for a namespace and verifies service-to-service traffic is encrypted with `istioctl authn tls-check`.
- Sets up ExternalDNS + cert-manager to fully automate DNS record creation and TLS certificate issuance on Kubernetes Ingress creation.
- Can diagnose a latency spike using VPC Flow Logs + distributed traces — distinguishing network hop delay from application processing time.
- Implements a CDN cache invalidation strategy that avoids stale content on deploy without causing a full-origin cache storm.

## Failure signals

- SSH open to `0.0.0.0/0` in a security group — production server exposed to internet brute force.
- Self-signed certificates ignored in internal services (`InsecureSkipVerify: true`) — mTLS provides false security.
- No DNS TTL management before cutover — old records cached for hours after DNS change, causing split-brain traffic.
- All services in one flat subnet with no segmentation — a compromised app server has direct network access to the database.
- No CDN — all traffic hits origin servers; a traffic spike or DDoS brings down the application directly.
- Stale security group rules never removed — attackers enumerate open ports; outdated rules enable lateral movement.
