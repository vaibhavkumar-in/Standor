# Standor Frontend — Integration Readme

## Phase 2 & 3: Marketing Implementation (Complete)
The premium, monochrome FAANG-level marketing shell is securely integrated into the `App.tsx` router. 

### Key Files:
- **`src/styles/design-tokens.css`**: The source of truth. Contains `--bg-900`, `--accent` (Teal #0EA5A4).
- **`src/pages/Landing.tsx`**: The main Hero view.
- **`src/components/3d/HeroScene.tsx`**: The particle generator.

## Phase 5: Demo Integration (Complete)
We implemented a true-to-life mockup of the interview environment. You can view this at `/demo`.
- **`src/mock/mockSocketSimulator.ts`**: Simulates the delay of human typing.
- **Monaco Editor**: Implemented and styled `vs-dark`.

## Next Steps for the Engineering Team (Phase 6+)
The marketing site and the mocked demo act as the top-of-funnel conversion tool. The core app (`/dashboard`, `/session/:id`) remains protected behind `Auth`.

To connect the mock Demo to the actual backend execution engine:
1. Replace `mockSocketSimulator` with the actual CRDT `y-websocket` binding for the Monaco instances.
2. Hook up the `Run & Analyze` button in `Demo.tsx` to the backend `/api/execute` endpoint.
3. Update `task.md` to reflect Phase 6 CRDT integration.
