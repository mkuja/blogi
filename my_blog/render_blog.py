from pathlib import Path
import markdown as mk

from jinja2 import Environment


def render_blog(env: Environment, input_md_file_path: str, outdir: str):
    tmpl = env.get_template('blog_post.html.j2')
    with open(input_md_file_path, 'r', encoding="utf-8") as fh:
        s = fh.read()

    html = mk.markdown(s, extensions=['extra', 'fenced_code', 'codehilite', 'admonition'])
    oname = Path(outdir) / (str(Path(input_md_file_path).stem) + ".html")
    print("Outfile: " / oname)

    with open(oname, 'wb') as fh:
        fh.write(tmpl.render(post=html).encode("utf-8"))
