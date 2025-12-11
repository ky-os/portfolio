# Project Brief

## Recent Updates
- **Security & Gamification**: Implemented a security check for the Admin panel.
    - Only the owner (email check) can access `/admin`.
    - Unauthorized users are redirected to `/intruder`.
    - **Intruder Leaderboard**: Tracks unauthorized access attempts in a "Wall of Intruders".
    - **Backend**: Added `intruders` table, `logIntruder` mutation, and `getIntruders` query.
    - **Frontend**: Created `app/intruder/page.tsx` and updated `app/admin/layout.tsx` with `SecurityCheck` component.

## Next Steps
- Verify the owner email in `app/admin/layout.tsx` matches the actual production user.
- Add more "Easter Eggs" or interactive elements to the Intruder page.
