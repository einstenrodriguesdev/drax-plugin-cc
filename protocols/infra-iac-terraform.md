# Terraform / IaC (infra: infrastructure-as-code)

Infrastructure defined as code is auditable, reviewable, and reproducible. Manually provisioned resources are technical debt the moment they exist — they diverge silently and cannot be version-controlled.

## Best practices

1. **Remote state with locking** — always store state in S3 + DynamoDB (AWS), GCS (GCP), or Terraform Cloud; never use local state for any shared environment; state locking prevents concurrent `apply` corruption.
2. **Modules for reuse, not one giant root** — extract reusable units (VPC, ECS service, RDS cluster) into versioned modules; call them from environment-specific roots; module inputs must have type constraints and validation blocks.
3. **`plan` before every `apply`** — review the diff for unexpected destroys or replacements; in CI, post the `terraform plan` output as a PR comment before merge; never run `apply` without a reviewed plan.
4. **Workspaces or directory-per-environment** — prefer directory separation (`envs/prod`, `envs/staging`) over Terraform workspaces for large teams; workspaces share state backend and are easy to accidentally target.
5. **Least-privilege provider credentials** — the Terraform runner IAM role must have only the permissions the config actually needs; audit with `terraform providers` and IAM Access Analyzer; rotate credentials via OIDC, not long-lived keys.
6. **Drift detection on a schedule** — run `terraform plan` in CI on a cron (e.g., nightly) even without a code change; alert on non-empty plans; drift is always unplanned change risk.
7. **`terraform validate` and `tflint` in pre-commit** — catch type errors, deprecated syntax, and provider-specific lint before a PR is created; add `checkov` or `tfsec` for security misconfiguration scanning.
8. **Explicit `depends_on` only when implicit dependencies fail** — Terraform infers dependencies from attribute references; explicit `depends_on` on modules signals a design smell; document why if used.
9. **No hardcoded credentials or region strings** — use variables with `sensitive = true` for secrets; inject via environment variable or CI secret store; regions and account IDs as variables with defaults.
10. **`lifecycle` blocks with care** — `prevent_destroy = true` on stateful resources (databases, S3 buckets with data); `create_before_destroy` for zero-downtime replacement; `ignore_changes` only with a comment explaining the exception.

## Hygiene

- Never commit `.terraform/` or `*.tfstate` — add both to `.gitignore`.
- Pin provider versions in `required_providers` with a `~>` constraint; pin Terraform CLI version in `.terraform-version` or `required_version`.
- Use `terraform fmt -recursive` as a pre-commit hook — diffs must be purely semantic.
- Tag every resource: environment, owner, managed-by=terraform, cost-center; untagged resources are invisible to FinOps.
- `terraform destroy` in production requires a named human approver in the CI pipeline, not just a merged PR.

## Mastery markers

- Can refactor a flat root module into child modules without a destroy/recreate cycle by using `moved` blocks.
- Writes custom validation rules on input variables (`validation { condition = ... error_message = "..." }`).
- Sets up Terraform with OIDC-federated credentials in GitHub Actions — no long-lived AWS access keys.
- Can diagnose and resolve state inconsistency using `terraform state rm`, `terraform import`, and `terraform state mv` without data loss.
- Implements policy-as-code with Sentinel or OPA to block non-compliant plans before apply in the CI gate.

## Failure signals

- `terraform apply -auto-approve` in a production pipeline with no plan review step.
- State stored locally on a developer's machine — no shared source of truth.
- All infrastructure in a single 2000-line `main.tf` with no module structure.
- Credentials hardcoded in `provider` blocks or committed in `.tfvars` files.
- No drift detection — infrastructure diverges undetected for months.
- Provider pinned to `version = ">= 3.0"` — any breaking minor release can break the apply.
