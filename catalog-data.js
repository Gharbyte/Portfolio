// EDIT YOUR CATALOGS HERE. Both Home and the catalog pages use this data.
// Coming-soon copy is shared by Home and Projects. Tools use previewOrder for Home.
window.portfolioCatalog = {
  projectNotice: {
    title: 'Projects coming soon',
    description: "I'm building my first projects as a second-year computer engineering student. I'll share them here as they take shape."
  },
  // User-supplied stack. Group order follows the first item in each group.
  // Motion is intentionally categorized generically; its product is unspecified.
  tools: [
    { name: 'Cloudflare', category: 'Cloud platform', group: 'TECH STACK', icon: 'assets/icons/cloudflare.svg', placeholder: false, previewOrder: 4 },
    { name: 'Vercel', category: 'Deployment platform', group: 'TECH STACK', icon: 'assets/icons/vercel.svg', placeholder: false },
    { name: 'Motion', category: 'Tool', group: 'TECH STACK', icon: 'assets/icons/motion.svg', placeholder: false },
    { name: 'SQL', category: 'Query language', group: 'TECH STACK', icon: 'assets/icons/sql.svg', placeholder: false, previewOrder: 3 },
    { name: 'Python', category: 'Programming language', group: 'TECH STACK', icon: 'assets/icons/python.svg', placeholder: false, previewOrder: 1 },
    { name: 'C++', category: 'Programming language', group: 'TECH STACK', icon: 'assets/icons/cpp.svg', placeholder: false, previewOrder: 2 },
    { name: 'Claude Code', category: 'AI coding assistant', group: 'DEV TOOLS', icon: 'assets/icons/claude-code.svg', placeholder: false },
    { name: 'GitHub', category: 'Code hosting', group: 'DEV TOOLS', icon: 'assets/icons/github.svg', placeholder: false },
    { name: 'Cursor', category: 'Code editor', group: 'DEV TOOLS', icon: 'assets/icons/cursor.svg', placeholder: false },
    { name: 'Codex', category: 'AI coding assistant', group: 'DEV TOOLS', icon: 'assets/icons/codex.svg', placeholder: false }
  ]
};
