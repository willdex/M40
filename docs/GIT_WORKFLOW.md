# MANZANA40 GIT WORKFLOW

## Repository
```
https://github.com/willdex/M40.git
```

## Branch Structure

```
main                    → Stable production-ready state (NEVER commit directly)
├── dev                 → Integration branch for verified fixes
├── feature/*           → New features (CMS, API, etc.)
├── fix/*               → Isolated visual/layout repairs
│   ├── fix/header-spacing
│   ├── fix/hero-video
│   ├── fix/responsive-home
│   ├── fix/footer-render
│   └── fix/mobile-layout
└── docs/               → Documentation
```

## Commit Message Format

```
type(scope): description

Types:
- fix:      Visual/layout repairs
- feat:     New features
- refactor: Code restructuring
- docs:     Documentation
- style:    CSS/styling changes
- chore:    Maintenance tasks

Good Examples:
- fix(hero): remove top spacing causing white gap
- fix(video): implement proper full-bleed hero video
- fix(layout): remove broken Elementor wrapper offsets
- feat(cms): add content API endpoint
- refactor(header): clean up navigation component

Bad Examples:
- update
- fix stuff
- changes
- WIP
```

## Workflow Steps

### 1. Setup (One Time)
```bash
git clone https://github.com/willdex/M40.git
cd M40
git checkout -b dev
git push -u origin dev
```

### 2. Start New Repair Session
```bash
git checkout dev
git pull origin dev
git checkout -b fix/description
```

### 3. Make Changes (Small, Focused Commits)
```bash
git add path/to/changed/file
git commit -m "fix(scope): precise description"
```

### 4. Test & Verify
- Run `npm run build` - must pass
- Visual verification of affected section
- No regressions in other areas

### 5. Merge to Dev (After Verification)
```bash
git checkout dev
git merge fix/description --no-ff
git push origin dev
```

### 6. Merge to Main (After Stable on Dev)
```bash
git checkout main
git merge dev --no-ff
git push origin main
```

## Version Tags

```bash
v0.1-foundation      → Initial structure
v0.2-homepage-stable → Homepage working
v0.3-video-fixed     → Hero video fixed
v0.4-responsive-pass  → Responsive verified
v1.0-production-ready → Ready for production
```

## Important Rules

1. **NEVER commit directly to main**
2. **ALWAYS create feature/fix branches**
3. **Test before merge**
4. **Small commits = easy rollback**
5. **Document all major fixes in docs/**

## Creating Fix Branches

```bash
# Header spacing issue
git checkout -b fix/header-spacing

# Hero video issue
git checkout -b fix/hero-video

# Footer rendering
git checkout -b fix/footer-render

# Mobile layout
git checkout -b fix/mobile-layout
```

## Rollback Procedure

```bash
# Find the last good commit
git log --oneline

# Create rollback branch
git checkout -b rollback/feature-name
git revert <bad-commit-hash>

# Or reset (if not pushed)
git checkout dev
git reset --hard <good-commit-hash>
```

## Documentation Requirements

Each fix must document:

1. **What was broken**
2. **Root cause**
3. **Exact fix applied**
4. **Files affected**
5. **Regression risks**
6. **Testing performed**
