import datetime
from typing import Any
from pathlib import Path
import uuid

from jinja2 import Environment
from bs4 import BeautifulSoup as bs4, ResultSet

from .config import get_config


def render_rss(env: Environment,
               config: dict[str, Any],
               title: str,
               category: str,
               referred_html_file: str,
               description: str = ""):
    RSSTool(env, config).gen_rss(title, category, referred_html_file, description)


class RSSTool(object):

    def __init__(self, env: Environment, config: dict[str, Any]):
        self.env = env
        self.config = config

    def gen_rss(self,
                title: str,
                category: str,
                referred_html_file: str,
                description: str = "") -> str:
        data_str = self._try_load_current_data()
        if not data_str:
            data = []
        else:
            data = RSSTool._use_bs4_to_see_existing(data_str)
        data.insert(0, {
            "title":  title,
            "link": self.config["app"]["base_url"] + "/".join(Path(referred_html_file).parts[1:]),
            "description": description,
            "category": category,
            "guid": str(uuid.uuid4()),
            "pubDate": datetime.datetime.now()
        })

        tmpl = self.env.get_template('rss_feed.xml.j2')
        data_with_commons = {"lastBuildDate": datetime.datetime.now(),
                             "posts": data}
        output = tmpl.render(data=data_with_commons).encode("utf-8")
        with open(self.config["rss"]["rss_file"], 'wb') as fh:
            fh.write(output)

    def _try_load_current_data(self) -> None | str:
        rss_file = Path(self.config["rss"]["rss_file"])
        rss_file.parent.mkdir(parents=True, exist_ok=True)
        try:
            with open(rss_file, "r") as fh:
                data = fh.read()
        except FileNotFoundError as e:
            data = None  # Ignore. It'll be created.

        return data

    @staticmethod
    def _use_bs4_to_see_existing(data: str) -> list[dict[str, str]]:
        rss_data = []
        bs = bs4(data, "xml")
        for entry in bs.findAll("item"):
            rss_data.append({
                "title": entry.title.string.strip(),
                "link": entry.link.string.strip(),
                "category": entry.category.string.strip(),
                "guid": entry.guid.string.strip(),
                "pubDate": entry.pubDate.string.strip()
            })
        return rss_data


