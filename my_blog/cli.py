import argparse

cli = argparse.ArgumentParser(
    prog="blog.py",
    description="Convert Markdown to HTML blog posts",
    epilog=".. . .~(,,`>  It's a turbo mouse!",
)

cli.add_argument('filename', help="MD file to convert.")
cli.add_argument('outdir', help="Directory to save the converted output.")
