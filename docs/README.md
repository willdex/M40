# MANZANA40 Documentation

## Files

| File | Description |
|------|-------------|
| `GIT_WORKFLOW.md` | Git branching strategy and commit guidelines |
| `REPAIR_TEMPLATE.md` | Template for documenting fixes |
| `ARCHITECTURE.md` | Key architectural decisions |
| `STATUS.md` | Current project status |

## Quick Start

```bash
# Clone repository
git clone https://github.com/willdex/M40.git
cd M40

# Create dev branch
git checkout -b dev
git push -u origin dev

# Start dev server
npm install
npm run dev
```

## Common Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
```

## Repair Workflow

1. Create fix branch: `git checkout -b fix/description`
2. Make changes
3. Test: `npm run build`
4. Commit: `git commit -m "fix(scope): description"`
5. Merge to dev after verification

## Important Notes

- **NEVER commit directly to main**
- **Test build before merge**
- **Document all major fixes**
- **Small commits = easy rollback**
