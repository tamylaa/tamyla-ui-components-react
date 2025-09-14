# Component Registry Parts

This directory contains the split component registry files for easier maintenance and development. The registry is split into logical parts to make it more manageable.

## Structure

- `component-registry-metadata.json` - Registry metadata and version info
- `component-registry-atoms.json` - Atomic components (16 components)
- `component-registry-molecules.json` - Molecule components (42 components)
- `component-registry-organisms.json` - Organism components (22 components)
- `component-registry-applications.json` - Application components (3 components)
- `component-registry-utilities.json` - Utility components (1 component)
- `component-registry-design-tokens.json` - Design tokens and theming
- `component-registry-usage-patterns.json` - Usage patterns, migration guides, and troubleshooting

## Development Workflow

### Editing Components

1. **Split the registry** (if not already split):
   ```bash
   node scripts/split-registry.js split
   ```

2. **Edit individual category files** in this directory:
   - Add new components to the appropriate category file
   - Update existing component definitions
   - Modify props, examples, or documentation

3. **Combine back into single registry** for distribution:
   ```bash
   node scripts/split-registry.js combine
   ```

### Benefits

- **Manageability**: Smaller files are easier to edit and review
- **Organization**: Components grouped by atomic design principles
- **Collaboration**: Multiple developers can work on different categories
- **Version Control**: Smaller, focused diffs for changes
- **Performance**: Load only needed categories during development

## File Sizes

- Atoms: ~17KB (16 components)
- Molecules: ~29KB (42 components)
- Organisms: ~14KB (14 components)
- Applications: ~2KB (3 components)
- Utilities: ~1KB (1 component)
- Design Tokens: ~2KB
- Usage Patterns: ~5KB
- Metadata: ~352 bytes

## Automation

The split/combine process is automated via `scripts/split-registry.js`. This ensures consistency and prevents manual errors when maintaining the registry.

## Note

The `component-registry.json` file in the root directory is the combined version used for distribution and runtime. The files in this directory are for development only.
