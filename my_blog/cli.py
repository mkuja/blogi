import argparse

cli = argparse.ArgumentParser(
    prog="blog.py",
    description="Convert Markdown to HTML blog posts",
    epilog=".. . .~(,,`>  It's a turbo mouse!",
)

_subparsers = cli.add_subparsers(help="Choose your destiny", dest="command", required=True)

# Add subparser for generate html file
_html = _subparsers.add_parser("gen-html", help="Generate HTML for blog posts")
_html.add_argument("-f", '--filename', help="MD file to convert.", required=True)
_html.add_argument("-o", '--outdir', help="Directory to save the converted output.", required=True)

# Add subparser for generate rss entry
_rss = _subparsers.add_parser("gen-rss", help="Generate RSS entry")
_rss.add_argument("-t", '--title', help="Title of the RSS entry", required=True)
_rss.add_argument("-c", "--category", help="Category of the latest blog post.", required=True)
_rss.add_argument("-d", "--description", help="Description of the latest blog post.", required=False)
_rss.add_argument("-f",
                  "--referred-file",
                  help="Referred HTML file of the latest blog",
                  required=True)
