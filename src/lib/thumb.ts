import fs from 'node:fs';
import path from 'node:path';

// Finds a post's thumbnail by its filename.
// Drop public/images/thumbs/<post-filename>.jpg and it is picked up automatically.
// A "thumbnail:" line in the post frontmatter still overrides this.
export function thumbFor(id: string, explicit?: string): string | undefined {
  if (explicit) return explicit;
  for (const ext of ['jpg', 'jpeg', 'webp', 'png']) {
    const rel = `/images/thumbs/${id}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), 'public', rel))) return rel;
  }
  return undefined;
}
