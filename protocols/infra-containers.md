# Containers (infra: Docker)

Container images are deployment units, not build environments. Treat image size, layer ordering, user privileges, and reproducibility as first-class constraints, not afterthoughts.

## Best practices

1. **Multi-stage builds always** — one stage for compilation/dependency install, a separate minimal stage for the final image; never ship build toolchains into production.
2. **Minimal base images** — use `distroless` (Google) or `alpine` for final stages; prefer `gcr.io/distroless/nodejs` over `node:20` for Node apps; smaller attack surface, smaller CVE count.
3. **Layer cache discipline** — copy dependency manifests (`package.json`, `requirements.txt`) before source code; a source change must not invalidate the dependency-install layer.
4. **Non-root user** — add a named user in the Dockerfile (`RUN adduser -D appuser`), then `USER appuser`; never run as UID 0 in production.
5. **Pin base image digests** — `FROM node:20.14.0-alpine3.20@sha256:<digest>` not `FROM node:latest`; floating tags break reproducibility silently.
6. **`.dockerignore` is mandatory** — exclude `.git`, `node_modules`, `*.env`, test fixtures, coverage reports; anything not needed at runtime must not enter the build context.
7. **Image scanning in CI** — run Trivy or Grype on every built image before push; fail the pipeline on CRITICAL/HIGH CVEs; export the SBOM as a build artifact.
8. **Read-only filesystem** — set `readOnlyRootFilesystem: true` in the container runtime config; explicitly mount writable volumes only where the app requires writes.
9. **Explicit COPY, no ADD** — `ADD` auto-extracts and can pull remote URLs; use `COPY` unless extraction is intentional and documented.
10. **Reproducible builds** — lock npm/pip/gem versions; use `--frozen-lockfile`/`--no-cache-dir`; build args must not include secrets (use runtime env or secret mounts).

## Hygiene

- No secrets in ENV instructions — use runtime secret injection (Docker secrets, mounted env files, platform secret stores).
- No `RUN apt-get` without `&& rm -rf /var/lib/apt/lists/*` in the same layer.
- Image tags in CI: tag with git SHA + semver, never push `latest` as the only tag.
- One process per container — no supervisord wrapping multiple services unless the architecture explicitly requires it.
- `HEALTHCHECK` instruction required on every long-running service image.
- Prune unused images, volumes, and networks in CI workers to avoid disk exhaustion.

## Mastery markers

- Writes multi-stage Dockerfiles that produce images under 50 MB for Go services and under 150 MB for Node services.
- Understands `--mount=type=cache` in BuildKit to cache package manager downloads across builds without polluting the final layer.
- Can explain why `COPY --chown=appuser:appuser` is safer than a subsequent `RUN chown` (avoids an extra layer with root-owned files).
- Configures BuildKit `--secret` flag to inject credentials at build time without baking them into any image layer.
- Writes `.dockerignore` patterns that match both `node_modules` and nested `**/node_modules`.

## Failure signals

- `FROM node:latest` in a production Dockerfile.
- `COPY . .` as the first layer (invalidates cache on every source change).
- `RUN npm install` followed by `COPY . .` in the same stage shipped to production with `devDependencies` included.
- Container running as root because no USER instruction was added.
- Secrets visible in `docker history` or `docker inspect` output.
- No `.dockerignore` — build context includes `.git` and `node_modules`.
- Image scanning absent or running after push (too late to block).
