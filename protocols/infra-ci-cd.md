# CI/CD (infra: pipelines)

A pipeline is a change-management system, not just a build script. Its job is to make bad code expensive to ship and good code cheap to ship — fast, deterministic, and secure by default.

## Best practices

1. **Four mandatory stages: build → test → scan → deploy** — each stage must be an explicit gate; a failing scan must block deploy; never merge scan results into the build stage to hide failures.
2. **Fast feedback first** — run unit tests and lint in under 3 minutes; integration tests in a separate parallelized stage; never make developers wait 20 minutes for linting feedback.
3. **Deterministic builds** — pin all dependency versions (lockfiles committed); use content-addressable caches (actions/cache keyed on lockfile hash); builds must be bit-for-bit reproducible from the same commit.
4. **Separate app repo from manifest repo** — the app pipeline builds and pushes an image; a separate GitOps manifest repo describes desired deployment state; Argo CD or Flux reconciles manifest repo → cluster; never `kubectl apply` directly from the app pipeline.
5. **Deployment strategies by risk** — rolling: stateless low-risk; blue-green: stateful or UI services needing instant cutover; canary: high-traffic services requiring traffic-split validation; feature flags for application-layer rollout decoupled from deploy.
6. **DORA metrics as pipeline outputs** — emit deployment frequency, lead time for changes, change failure rate, and MTTR from pipeline events; wire to a dashboard; use them to detect pipeline health regression.
7. **Secrets in pipeline secrets stores** — never hardcode credentials in YAML; use GitHub Actions secrets, GitLab CI variables (masked), or Vault dynamic secrets; rotate credentials via OIDC, not static tokens.
8. **Signed artifacts** — sign container images with Sigstore/cosign after build; verify signature before deploy; enforce admission control to reject unsigned images in production.
9. **Rollback is a first-class operation** — every deploy pipeline must have an explicit rollback path (previous image tag re-deploy or manifest revert); mean time to rollback must be under 5 minutes.
10. **Ephemeral environments per PR** — spin up isolated preview environments for every pull request; tear them down on merge; this catches integration bugs before they reach staging.

## Hygiene

- No `curl | bash` in pipeline steps — fetch and verify checksums or use pinned actions.
- Pin third-party actions to full SHA (`uses: actions/checkout@<sha>`) not a mutable tag.
- Pipeline YAML reviewed in code review like application code — misconfigured pipelines are a supply chain attack surface.
- Cache keys must include the lockfile hash, not just branch name — stale cache produces false green builds.
- Never share secrets between environment tiers — staging secrets must be distinct from production secrets.

## Mastery markers

- Can implement a canary deployment pipeline that automatically promotes or rolls back based on an error-rate threshold from a metrics query.
- Knows the difference between ephemeral build runners and persistent runners, and when each is appropriate for security isolation.
- Sets up OIDC trust between GitHub Actions and AWS/GCP so the pipeline never stores a long-lived credential.
- Writes a pipeline that publishes an SBOM, signs the image with cosign, and verifies the signature in a subsequent deploy job.
- Can articulate all four DORA metrics from memory and instrument them from pipeline webhook events.

## Failure signals

- Secrets in plaintext in pipeline YAML committed to the repository.
- `kubectl apply -f .` directly from the app pipeline against production — no manifest review, no GitOps audit trail.
- Tests skipped in a "hot-fix" branch merged directly to main.
- No rollback step — reverting requires a new commit, pushing, and waiting for a full pipeline run.
- Change failure rate never measured — broken deploys are discovered by users, not by the team.
- Third-party actions pinned to `@v3` (mutable tag) — supply chain compromise risk.
