#!/usr/bin/env python3
"""Обновляет даты "lastmod/updated_at" в sitemap.xml, yandex-services.xml и FAQ-странице.

Запускать перед деплоем, чтобы поисковики видели свежую дату.

Usage:
  python scripts/update_dates.py
"""

from __future__ import annotations

import datetime
import pathlib
import re


def _today_date() -> str:
    return datetime.date.today().isoformat()


def _now_iso(offset_hours: int | None = None) -> str:
    # Возвращаем текущую дату/время в формате ISO 8601, с часовым поясом.
    if offset_hours is None:
        # локальное время с зоной
        dt = datetime.datetime.now().astimezone()
    else:
        tz = datetime.timezone(datetime.timedelta(hours=offset_hours))
        dt = datetime.datetime.now(tz)
    return dt.isoformat(timespec="seconds")


def replace_in_file(path: pathlib.Path, pattern: str, repl: str) -> bool:
    text = path.read_text(encoding="utf-8")
    (new_text, count) = re.subn(pattern, repl, text)
    if count:
        path.write_text(new_text, encoding="utf-8")
    return bool(count)


def main() -> None:
    today = _today_date()
    now = _now_iso()

    base = pathlib.Path(__file__).resolve().parent.parent

    # sitemap.xml: обновляем все lastmod
    sitemap = base / "sitemap.xml"
    if sitemap.exists():
        replace_in_file(sitemap, r"<lastmod>\d{4}-\d{2}-\d{2}</lastmod>", f"<lastmod>{today}</lastmod>")

    # yandex-services.xml: обновляем generated_at и updated_at
    yandex = base / "yandex-services.xml"
    if yandex.exists():
        replace_in_file(yandex, r'generated_at="[^"]+"', f'generated_at="{now}"')
        replace_in_file(yandex, r"<updated_at>\d{4}-\d{2}-\d{2}</updated_at>", f"<updated_at>{today}</updated_at>")

    # FAQ: обновляем lastReviewed/dateModified
    faq = base / "pages" / "faq.html"
    if faq.exists():
        replace_in_file(faq, r"\"lastReviewed\": \"\d{4}-\d{2}-\d{2}\"", f"\"lastReviewed\": \"{today}\"")
        replace_in_file(faq, r"\"dateModified\": \"\d{4}-\d{2}-\d{2}\"", f"\"dateModified\": \"{today}\"")

    print("✔ Даты обновлены:")
    print(f"  sitemap.xml lastmod -> {today}")
    print(f"  yandex-services.xml generated_at -> {now}")
    print(f"  yandex-services.xml updated_at -> {today}")
    print(f"  faq.html lastReviewed/dateModified -> {today}")


if __name__ == "__main__":
    main()
