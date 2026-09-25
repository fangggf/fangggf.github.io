# Local development

The site uses Ruby 3.2.4 (see `.ruby-version`), Bundler 2.6.2, and Jekyll 4.4.1. Dependencies are pinned in `Gemfile.lock` and installed in the ignored `vendor/bundle` directory.

```sh
rbenv exec gem install bundler -v 2.6.2 --no-document
rbenv exec bundle config set --local path vendor/bundle
rbenv exec bundle install
./bin/jekyll serve --host 127.0.0.1 --port 4000
```

Open <http://127.0.0.1:4000>. The wrapper selects the project Ruby through rbenv, so it also works when a terminal defaults to macOS system Ruby.

To build the static site in `_site/`:

```sh
JEKYLL_ENV=production ./bin/jekyll build
```

## Editing content

- Introduction and portrait: `_pages/about.md`
- Experience, education, and logos: `_data/experience.yml`
- News: `_news/`
- Publications: `_bibliography/papers.bib` (`selected={true}` shows a paper on the home page)
- Homepage structure: `_layouts/about.html`
- Design and responsive layout: `_sass/_homepage.scss`
- Logo sources: `docs/LOGO-SOURCES.md`

The introduction uses two columns at all supported screen widths and justified body text. The original portrait file is unchanged and displays at its native aspect ratio, with no cropping or stretching. Publication previews use `object-fit: contain` to preserve the entire figure. Institution marks are stored locally so page visits do not depend on remote logo servers.

There is no top navigation or separate publications page. Selected papers are sorted by year, newest first, with one short venue line under the authors (for example, `NeurIPS 2025`). The section links directly to Google Scholar for the full publication list. Full publication notes remain in the bibliography source; the compact homepage only shows the Spotlight distinction where present.

Unused al-folio sample posts, projects, and dropdown pages are excluded from the build; their sources remain available. Original images are served directly, so ImageMagick and diagram-rendering tools are not required.
