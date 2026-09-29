// Shared rendering only. Edit entries in catalog-data.js.
(() => {
  const data = window.portfolioCatalog;
  if (!data) return;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function projectNotice() {
    const article = element('article', 'project-coming-soon');
    const graphic = element('div', 'project-detail');
    graphic.setAttribute('aria-hidden', 'true');
    graphic.append(element('span', ''), element('span', ''), element('span', ''));
    article.append(graphic, element('h3', '', data.projectNotice.title),
      element('p', '', data.projectNotice.description));
    return article;
  }

  function toolEntry(tool) {
    const article = element('article', 'catalog-entry tool-entry');
    const icon = element('span', 'tool-icon');
    const image = element('img', '');
    image.src = tool.icon;
    image.alt = ''; // The adjacent tool name supplies the accessible label.
    image.width = 32;
    image.height = 32;
    icon.append(image);
    icon.setAttribute('aria-hidden', 'true');
    const copy = element('div', 'entry-copy');
    copy.append(element('h3', '', tool.name), element('p', 'entry-category', tool.category));
    if (tool.placeholder) copy.append(element('small', 'entry-status', 'Example placeholder'));
    // Decorative marker only: these entries do not have individual destinations.
    const arrow = element('span', 'tool-arrow', '\u2192');
    arrow.setAttribute('aria-hidden', 'true');
    article.append(icon, copy, arrow);
    return article;
  }

  const previewProjects = document.querySelector('[data-project-preview]');
  const previewTools = document.querySelector('[data-tool-preview]');
  const projectCatalog = document.querySelector('[data-project-catalog]');
  const toolCatalog = document.querySelector('[data-tool-catalog]');
  if (previewProjects) previewProjects.replaceChildren(projectNotice());
  if (previewTools) previewTools.replaceChildren(...data.tools.filter(t => t.previewOrder).sort((a, b) => a.previewOrder - b.previewOrder).slice(0, 4).map(toolEntry));
  if (projectCatalog) projectCatalog.replaceChildren(projectNotice());
  if (toolCatalog) {
    toolCatalog.replaceChildren();
    const groups = [...new Set(data.tools.map(tool => tool.group))];
    groups.forEach((group, index) => {
      const section = element('section', 'catalog-panel catalog-group');
      const header = element('div', 'section-heading');
      const heading = element('h2', '', group);
      heading.id = `tool-group-${index}`;
      section.setAttribute('aria-labelledby', heading.id);
      header.append(heading);
      const grid = element('div', 'catalog-grid');
      grid.append(...data.tools.filter(tool => tool.group === group).map(toolEntry));
      section.append(header, grid);
      toolCatalog.append(section);
    });
  }
})();
