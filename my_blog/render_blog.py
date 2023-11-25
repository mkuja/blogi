import pathlib
from pathlib import Path
from typing import List
import markdown as mk

from jinja2 import Environment


def render_blog(env: Environment, post_files_path: pathlib.Path):
    tmpl = env.get_template('blog_post.html.j2')
    posts = []
    for file_path in post_files_path.glob('*.md'):
        with open(file_path, 'r', encoding="utf-8") as fh:
            s = fh.read()
            posts.append((file_path, s))

    for ndx, post in enumerate(posts):
        html = mk.markdown(post[1])
        parts = post[0].parts[-1].split(".")[:-1]
        parts = ".".join(parts)
        fname = "html/" + parts + ".html"

        with open(fname, 'wb') as fh:
            fh.write(tmpl.render(post=html).encode("utf-8"))
