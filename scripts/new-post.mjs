import fs from 'node:fs';
import path from 'node:path';

const projectsDir = path.resolve('src/content/projects');
const validProjects = fs.existsSync(projectsDir)
	? fs.readdirSync(projectsDir).filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', ''))
	: [];

const args = process.argv.slice(2);
let selectedProject = null;
const titleWords = [];

for (let i = 0; i < args.length; i++) {
	if (args[i] === '--project' || args[i] === '-p') {
		selectedProject = args[i + 1]?.toLowerCase() || null;
		i++;
	} else if (args[i].startsWith('--project=')) {
		selectedProject = args[i].split('=')[1]?.toLowerCase() || null;
	} else {
		titleWords.push(args[i]);
	}
}

if (selectedProject && !validProjects.includes(selectedProject)) {
	console.error(`Error: Unknown project "${selectedProject}".`);
	console.error(`Available projects: ${validProjects.join(', ')}`);
	process.exit(1);
}

const rawTitle = titleWords.join(' ').trim();
const today = new Date().toISOString().split('T')[0];

const defaultTitle = selectedProject
	? `${selectedProject.charAt(0).toUpperCase() + selectedProject.slice(1)} Update ${today}`
	: `New Post ${today}`;
const title = rawTitle || defaultTitle;

const slug = title
	.toLowerCase()
	.replace(/[^\w\s-]/g, '')
	.trim()
	.replace(/[\s_-]+/g, '-')
	.replace(/^-+|-+$/g, '') || `post-${Date.now()}`;

const targetDir = path.resolve('src/content/blog');
if (!fs.existsSync(targetDir)) {
	fs.mkdirSync(targetDir, { recursive: true });
}

let filename = `${slug}.md`;
let targetPath = path.join(targetDir, filename);

let counter = 1;
while (fs.existsSync(targetPath)) {
	filename = `${slug}-${counter}.md`;
	targetPath = path.join(targetDir, filename);
	counter++;
}

const tagsString = selectedProject ? `["${selectedProject}"]` : '[]';
const projectField = selectedProject ? `project: "${selectedProject}"\n` : '';

const template = `---
title: "${title}"
description: ""
pubDate: ${today}
tags: ${tagsString}
${projectField}---

`;

fs.writeFileSync(targetPath, template, 'utf8');
console.log(`Created new blog post: src/content/blog/${filename}`);
if (selectedProject) {
	console.log(`Linked to project: ${selectedProject}`);
}
