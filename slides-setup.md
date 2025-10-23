# Slidev Presentation Setup

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the presentation in development mode:**
   ```bash
   npm run dev
   ```
   This will open your browser automatically with the presentation.

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Export to PDF:**
   ```bash
   npm run export
   ```

## Presentation Controls

- **Space** or **Arrow Keys**: Navigate slides
- **F**: Toggle fullscreen
- **O**: Toggle slide overview
- **D**: Toggle dark mode
- **C**: Toggle camera (for presenter mode)

## Files Overview

- `agentic-coding-presentation.md` - Main presentation file
- `lightning-talk-invitation.md` - Invitation text for speakers
- `package.json` - Slidev dependencies
- `slides-setup.md` - This setup guide

## Customization

The presentation uses the default Slidev theme. To customize:

1. **Add custom CSS** in the frontmatter of the presentation file
2. **Change theme** by modifying the `theme` property in the YAML frontmatter
3. **Add custom components** in a `components/` directory

## Tips for Presenting

1. **Presenter Mode**: Press `C` to show presenter notes and timer
2. **Remote Control**: Share the presenter URL with co-presenters
3. **Offline Mode**: Build the presentation and serve from `dist/` folder
4. **Print Version**: Use the export function to create a PDF backup

## Troubleshooting

- **Port conflicts**: Slidev runs on port 3030 by default. Add `--port 3031` to change.
- **Hot reload issues**: Restart the dev server if changes aren't reflected.
- **Build errors**: Check that all markdown syntax is valid.

## For the Meetup

- The presentation is ready to run with `npm run dev`
- Consider building it beforehand as backup: `npm run build`
- PDF export available for sharing: `npm run export`

Have a great presentation! 🚀