import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // Centralizado aquí para poder actualizarlo fácilmente desde un solo lugar.
  readonly businessHours = [
    { label: 'Lunes a viernes', schedule: '9:00 a. m. – 1:00 p. m. y 2:00 p. m. – 6:00 p. m.' },
    { label: 'Sábados', schedule: '9:00 a. m. – 2:00 p. m.' },
  ];

  constructor(
    private readonly router: Router,
    private readonly title: Title,
    private readonly meta: Meta,
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.updateSeo(event.urlAfterRedirects));

    this.updateSeo(this.router.url);
  }

  private updateSeo(url: string): void {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const title = route.snapshot.data['title'] as string | undefined;
    const description = route.snapshot.data['description'] as string | undefined;
    const path = url.split('?')[0] || '/';
    const canonicalUrl = `${window.location.origin}${path}`;

    if (title) {
      this.title.setTitle(title);
      this.meta.updateTag({ name: 'twitter:title', content: title });
      this.meta.updateTag({ property: 'og:title', content: title });
    }

    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ name: 'twitter:description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
    }

    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ name: 'twitter:url', content: canonicalUrl });

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }
}

