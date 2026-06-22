# Kubernetes (infra: orchestration)

Kubernetes is a desired-state machine. Every resource is a contract: the cluster reconciles toward it continuously. Operators who understand reconciliation loops write safer manifests than those who think imperatively.

## Best practices

1. **Deployments for stateless, StatefulSets for stateful** — StatefulSets provide stable network identity and ordered rollout; use PersistentVolumeClaims with `storageClassName` set explicitly, never implicitly via the default class.
2. **Resource requests AND limits on every container** — requests drive scheduling; limits prevent noisy-neighbor CPU steal and OOM eviction; absent requests cause unpredictable bin-packing.
3. **All three probe types** — `startupProbe` for slow-starting apps (prevents liveness from killing a healthy container in init); `readinessProbe` gates traffic; `livenessProbe` restarts genuinely hung processes; do not reuse the same endpoint for all three.
4. **HPA on CPU and custom metrics** — set `minReplicas ≥ 2` for any production Deployment; target CPU at 60–70% to leave headroom before scale; add KEDA for queue-depth or event-driven scaling.
5. **Namespaces for isolation** — one namespace per environment (prod, staging, dev); apply ResourceQuotas and LimitRanges at the namespace level; do not deploy everything to `default`.
6. **ConfigMaps for config, Secrets for credentials** — mount Secrets as volumes, not env vars, to avoid leaking into process listings; use External Secrets Operator or Sealed Secrets to keep plaintext out of Git.
7. **Helm or Kustomize, never raw YAML sprawl** — Helm for distributed packages with values-driven parameterization; Kustomize for in-repo overlays (base + patch); pick one per project and enforce it.
8. **Rolling updates with `maxSurge`/`maxUnavailable`** — default rolling update is safe for stateless apps; for zero-downtime use `maxUnavailable: 0, maxSurge: 1`; canary via Argo Rollouts when you need traffic-split graduation.
9. **Network Policies deny-by-default** — apply a default-deny ingress + egress policy per namespace; explicitly allow only required pod-to-pod and pod-to-external paths.
10. **Keep Kubernetes manifests in a separate GitOps repo** — the application repo produces an image; the manifest repo describes desired cluster state; coupling them creates blast-radius overlap.

## Hygiene

- No `imagePullPolicy: Always` with a mutable tag in production — pin SHA, set `IfNotPresent`.
- No `hostNetwork: true` or `hostPID: true` except for explicitly justified node-level tooling.
- Set `automountServiceAccountToken: false` on Pods that do not need API server access.
- `requests.memory` must equal `limits.memory` for Guaranteed QoS on critical workloads.
- Label every resource: `app`, `version`, `component`, `managed-by` — selectors and dashboards depend on consistent labels.
- Annotate rollout-triggering changes in Deployment (`kubectl.kubernetes.io/last-applied-configuration` is not enough; add a `rollme` annotation or equivalent).

## Mastery markers

- Can explain why a Pod in `Pending` state differs from `CrashLoopBackOff` and diagnoses each from `kubectl describe` output alone.
- Writes a custom Horizontal Pod Autoscaler targeting an external metric (e.g., SQS queue depth via KEDA) without documentation lookup.
- Understands Pod Disruption Budgets and can size them to guarantee availability during node drain without blocking cluster upgrades.
- Can set up a blue-green rollout with Argo Rollouts, including automated analysis via Prometheus metrics and rollback trigger.
- Writes OPA/Gatekeeper policies that enforce resource-limit presence and block privileged containers at admission time.

## Failure signals

- Containers with no resource requests — scheduler places them on already-saturated nodes.
- `livenessProbe` pointing at the same `/health` endpoint as `readinessProbe` with no `startupProbe` — restarts healthy pods during slow init.
- Secrets committed as base64 in plain YAML in the application repo.
- All workloads in the `default` namespace with no ResourceQuota — one runaway job exhausts the cluster.
- `kubectl apply` run manually from a developer laptop against production — no audit trail, no diff review.
- No Network Policy — every compromised pod can reach every other pod.
