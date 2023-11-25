from pathlib import Path

from jinja2 import Environment, PackageLoader, select_autoescape
from my_blog.render_blog import render_blog

env = Environment(
    loader=PackageLoader("my_blog", "templates", encoding="utf-8"),
    autoescape=select_autoescape()
)

if __name__ == "__main__":
    render_blog(env, Path("blog_posts"))
