"""Generate static metadata and a JavaScript-free profile from shared content."""

import argparse
import html
import json
from pathlib import Path


def replace_region(document: str, name: str, content: str) -> str:
    start = f"<!-- {name}_START -->"
    end = f"<!-- {name}_END -->"
    if document.count(start) != 1 or document.count(end) != 1:
        raise ValueError(f"Expected one {name} marker pair in index.html")
    prefix, remainder = document.split(start, 1)
    _, suffix = remainder.split(end, 1)
    return f"{prefix}{start}\n{content}\n  {end}{suffix}"


def sync_site(profile_path: Path) -> None:
    profile_path = Path(profile_path).resolve()
    data = json.loads(profile_path.read_text(encoding="utf-8"))
    root = profile_path.parents[2]
    index = root / "index.html"
    escape = html.escape
    title = f"{data['name']} | AI & Cloud Architecture"
    contact = data["contact"]
    structured = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "url": contact["portfolio"],
        "mainEntity": {
            "@type": "Person",
            "name": data["name"],
            "description": data["summary"],
            "url": contact["portfolio"],
            "sameAs": [contact["linkedin"], contact["github"], contact["credly"]],
            "knowsAbout": [item for group in data["skills"] for item in group["items"]],
            "hasCredential": [
                {
                    "@type": "EducationalOccupationalCredential",
                    "name": item["name"],
                    "url": item["url"],
                }
                for item in data["certifications"]
            ],
        },
    }
    structured_json = json.dumps(structured, ensure_ascii=True, indent=2).replace(
        "<", "\\u003c"
    )
    metadata = "\n".join(
        [
            f"  <title>{escape(title)}</title>",
            f'  <meta name="description" content="{escape(data["summary"])}">',
            f'  <meta name="author" content="{escape(data["name"])}">',
            f'  <link rel="canonical" href="{escape(contact["portfolio"])}">',
            '  <meta property="og:type" content="website">',
            f'  <meta property="og:title" content="{escape(title)}">',
            f'  <meta property="og:description" content="{escape(data["summary"])}">',
            f'  <meta property="og:url" content="{escape(contact["portfolio"])}">',
            f'  <meta property="og:image" content="{escape(contact["portfolio"].rstrip("/") + "/assets/images/profile-pic.jpg")}">',
            '  <meta name="twitter:card" content="summary">',
            f'  <script type="application/ld+json">\n{structured_json}\n  </script>',
        ]
    )
    projects = {project["id"]: project for project in data["projects"]}
    fallback = [
        f"      <h1>{escape(data['name'])}</h1>",
        f"      <p>{escape(data['headline'])}</p>",
        f"      <p>{escape(data['summary'])}</p>",
        "      <h2>Selected work</h2>",
    ]
    for project_id in data["selectedProjectIds"]:
        project = projects[project_id]
        fallback.extend(
            [
                f"      <h3>{escape(project['title'])}</h3>",
                f"      <p>{escape(project['summary'])}</p>",
            ]
        )
    if data.get("showcaseProjectIds"):
        fallback.append("      <h2>Architecture showcase</h2>")
        for project_id in data["showcaseProjectIds"]:
            project = projects[project_id]
            fallback.extend(
                [
                    f"      <h3>{escape(project['title'])}</h3>",
                    f"      <p>{escape(project['summary'])}</p>",
                ]
            )
    fallback.append("      <h2>Experience</h2>")
    for item in data["experience"]:
        fallback.extend(
            [
                f"      <h3>{escape(item['title'])} - {escape(item['company'])}</h3>",
                f"      <p>{escape(item['period'])}. {escape(item['summary'])}</p>",
            ]
        )
    fallback.append(
        f'      <p><a href="{escape(contact["linkedin"])}">Connect on LinkedIn</a></p>'
    )
    original = index.read_text(encoding="utf-8")
    rendered = replace_region(original, "PROFILE_META", metadata)
    rendered = replace_region(rendered, "PROFILE_FALLBACK", "\n".join(fallback))
    if rendered != original:
        index.write_text(rendered, encoding="utf-8", newline="\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--profile",
        type=Path,
        default=Path(__file__).resolve().parents[1] / "assets" / "data" / "profile.json",
    )
    args = parser.parse_args()
    sync_site(args.profile)
    print("Website metadata and fallback synchronized.")
