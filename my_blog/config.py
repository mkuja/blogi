import pathlib
import tomllib
from typing import Any


def get_config() -> dict[str, Any]:
    with open('config.py') as fh:
        return tomllib.loads(fh.read())
