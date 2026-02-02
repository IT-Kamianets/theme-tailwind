import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: number;
  category: string;
  tags: string[];
}

@Component({
  selector: 'app-content',
  imports: [CommonModule],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content {
  posts = signal<BlogPost[]>([
    {
      id: 1,
      title: 'Getting Started with Angular 21',
      excerpt: 'Learn the fundamentals of Angular 21 and build your first application.',
      content: `Angular 21 brings exciting new features and improvements to the framework. In this comprehensive guide, we'll explore the latest features including improved performance, new APIs, and best practices for building modern web applications. Whether you're new to Angular or an experienced developer, this article will help you understand what's new and how to leverage these features in your projects.`,
      author: 'John Developer',
      date: '2026-02-01',
      readTime: 8,
      category: 'Tutorial',
      tags: ['angular', 'web-development', 'javascript'],
    },
    {
      id: 2,
      title: 'Tailwind CSS Best Practices',
      excerpt: 'Master the utility-first approach to styling with Tailwind CSS.',
      content: `Tailwind CSS has revolutionized how we write CSS by embracing a utility-first approach. This article covers best practices for using Tailwind, including component composition, responsive design, performance optimization, and maintainability. Learn how to structure your Tailwind projects for maximum scalability and developer experience.`,
      author: 'Jane Designer',
      date: '2026-01-28',
      readTime: 10,
      category: 'Design',
      tags: ['tailwind', 'css', 'design'],
    },
    {
      id: 3,
      title: 'Building Scalable Applications',
      excerpt: 'Architecture patterns for growing your application without breaking scalability.',
      content: `As applications grow, maintaining clean architecture becomes crucial. This post explores various architectural patterns and best practices for building scalable applications. We'll discuss component organization, state management, API integration, and testing strategies that help maintain code quality as your project evolves.`,
      author: 'Bob Architect',
      date: '2026-01-25',
      readTime: 12,
      category: 'Architecture',
      tags: ['architecture', 'scalability', 'best-practices'],
    },
  ]);

  selectedPost = signal<BlogPost | null>(null);
  categories = signal<string[]>(['All', 'Tutorial', 'Design', 'Architecture']);

  selectPost(post: BlogPost) {
    this.selectedPost.set(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  clearSelection() {
    this.selectedPost.set(null);
  }

  getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      Tutorial: 'bg-blue-100 text-blue-800',
      Design: 'bg-purple-100 text-purple-800',
      Architecture: 'bg-green-100 text-green-800',
    };
    return colors[category] || 'bg-slate-100 text-slate-800';
  }
}
