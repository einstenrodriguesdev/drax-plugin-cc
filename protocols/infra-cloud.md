# Cloud (infra: cloud-agnostic architecture)

Cloud platforms are commodity compute with a managed-service layer on top. The primitives are portable; the differentiated APIs are lock-in vectors. Architect for portability at the boundaries, leverage managed services in the interior.

## Best practices

1. **Abstract at the infrastructure layer, not the application layer** — use IaC (Terraform) to abstract provider APIs; keep application code cloud-agnostic (no AWS SDK calls in business logic); swap providers by changing infra config, not app code.
2. **Compute: match workload to primitive** — containers on managed Kubernetes (GKE Autopilot, EKS Fargate, AKS) for stateless services; serverless functions (Lambda, Cloud Run) for event-driven short workloads; VMs only for workloads that require OS-level control.
3. **Storage: tier by access pattern** — object storage (S3/GCS/Blob) for static assets and backups; block storage (EBS/PD) for databases that need IOPS guarantees; managed databases (RDS, Cloud SQL, Azure Database) over self-managed for operational leverage.
4. **Identity-based access, not network-based** — use IAM roles/service accounts for service-to-service auth; avoid long-lived credentials; prefer OIDC federation; network rules are a second layer, not the primary access control.
5. **Well-Architected reliability** — multi-AZ for any production stateful workload; health checks at every layer (LB → app → downstream); circuit breakers for external dependencies; RTO and RPO defined and tested in runbooks.
6. **FinOps from day one** — tag every resource with cost-center and environment; enable cost anomaly detection; use Savings Plans or Committed Use Discounts only after establishing a 60-day usage baseline; right-size monthly.
7. **Egress minimization** — cloud egress is expensive; co-locate services in the same region; use VPC endpoints for managed-service access; CDN for static assets to avoid per-request origin egress.
8. **Observability as a managed service** — use cloud-native or SaaS observability (CloudWatch, Cloud Monitoring, Datadog) not self-hosted ELK unless log volume/cost math favors it; structured JSON logs from day one.
9. **Managed services over self-run wherever the complexity trade-off is clear** — RDS over self-managed Postgres on a VM; managed Kafka over self-hosted Kafka; evaluate when managed cost exceeds self-run cost + maintenance burden.
10. **Multi-cloud via abstraction, not duplication** — run primary workloads on one provider; maintain portability via IaC and container images; multi-cloud active-active is an advanced pattern requiring explicit business justification (vendor resilience, data-residency law).

## Hygiene

- No cloud console changes that are not reflected in IaC — console drift is invisible to code review and audit.
- Enforce least-privilege IAM: no `*` actions, no `*` resources without explicit justification and time-boxed review.
- Enable cloud provider's default encryption at rest for all storage services; key management via KMS, not provider-default keys, for regulated data.
- Enable CloudTrail / Cloud Audit Logs / Azure Monitor Activity Log from account creation — retroactive enablement loses audit history.
- Delete unused resources weekly: unattached EBS volumes, idle load balancers, stale snapshots; budget waste is a hygiene signal.

## Mastery markers

- Can design a VPC with public/private/data tiers, NAT Gateway, VPC endpoints for S3 and DynamoDB, and explain why each subnet exists.
- Writes an IAM policy that grants exactly the permissions needed for a Lambda to write to a specific S3 prefix and nothing else.
- Implements a multi-AZ RDS deployment with read replicas, automated backups to a cross-region S3 bucket, and a tested restore runbook.
- Builds a FinOps dashboard from Cost Explorer or BigQuery Billing export that shows per-service, per-environment spend with week-over-week delta.
- Understands the shared responsibility model for each service tier (IaaS/PaaS/SaaS) and translates it into concrete security controls the team owns.

## Failure signals

- Manual changes via the cloud console that never make it into IaC — infrastructure drift accumulates silently.
- IAM roles with `"Action": "*", "Resource": "*"` — every compromised service is a full-account compromise.
- Single-AZ production databases with no backup schedule — one availability zone failure = unplanned downtime.
- No cost alerting — a runaway Lambda invocation loop or data transfer spike goes undetected for the entire billing cycle.
- Cloud SDK calls embedded in business logic — changing cloud providers requires application rewrites, not just infra changes.
