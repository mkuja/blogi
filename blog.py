from pathlib import Path

from jinja2 import Environment, PackageLoader, select_autoescape
from my_blog.render_blog import render_blog
from my_blog.cli import cli

env = Environment(
    loader=PackageLoader("my_blog", "templates", encoding="utf-8"),
    autoescape=select_autoescape()
)

if __name__ == "__main__":
    args = cli.parse_args()
    print("Input file is " + args.filename)
    render_blog(env, args.filename, args.outdir)
