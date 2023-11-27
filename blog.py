import tomllib
from pathlib import Path

from jinja2 import Environment, PackageLoader, select_autoescape
from my_blog.render_blog import render_blog
from my_blog.cli import cli
from my_blog.rss import render_rss

env = Environment(
    loader=PackageLoader("my_blog", "templates", encoding="utf-8"),
    autoescape=select_autoescape()
)

if __name__ == "__main__":
    args = cli.parse_args()
    match args.command:
        case "gen-html":
            render_blog(env, args.filename, args.outdir)
        case "gen-rss":
            with open('settings.toml', 'r') as fh:
                settings = tomllib.loads(fh.read())
            render_rss(env,
                       settings,
                       args.title,
                       args.category,
                       args.referred_file,
                       args.description if hasattr(args, "description") else "")
        case _:
            raise NotImplementedError()
